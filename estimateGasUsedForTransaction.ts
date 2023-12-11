import { Transaction } from '@ethereumjs/tx';
import { Address } from '@ethereumjs/util';
import { vm, block, web3, config as CONFIG, creds } from './initEVM';

/**
 * @description Estimate gas used
 * @param txData - transaction data
 */
const estimateGasUsedForTransaction = async (txData): Promise<any> => {
  let tx = Transaction.fromTxData(txData);

  let { to, data } = tx;

  let origin =
    Address.fromString(txData.from) || (tx.isSigned() && tx.getSenderAddress());

  let caller = origin;

  let vmCopy = await vm.copy();

  let txResult = await vmCopy.evm.runCall({
    origin,
    caller,
    to,
    data,
    block
  });

  let gasUsed = txResult.execResult.executionGasUsed;

  // If gas is 0 - then it's default tx, so we need to run it via .runTx after getting signed with our private key and nonce

  if (gasUsed === BigInt(0)) {
    try {
      txData.gasLimit = txData.gas || txData.gasLimit;

      txData.gasLimit =
        BigInt(txData.gasLimit) === BigInt(0)
          ? BigInt(CONFIG.EVM.maxAllowedGasAmountForSandboxExecution)
          : txData.gasLimit;

      txData.gasPrice =
        BigInt(txData.gasPrice) === BigInt(0)
          ? BigInt(CONFIG.EVM.gasPriceInWeiAndHex)
          : txData.gasPrice;

      let finalTx = Transaction.fromTxData(txData);

      finalTx = finalTx.sign(Buffer.from(creds.privateKey, 'hex'));

      txResult = await vmCopy.runTx({
        tx: finalTx,
        block,
        skipBalance: true,
        skipNonce: true
      });

      gasUsed = txResult.totalGasSpent;
    } catch (e) {
      return { error: { msg: JSON.stringify(e) } };
    }
  }

  return (
    txResult.execResult.exceptionError || web3.utils.toHex(gasUsed.toString())
  );
};

export default estimateGasUsedForTransaction;
