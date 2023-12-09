import { Transaction } from '@ethereumjs/tx';
import { vm, block, web3 } from './initEVM';

/**
 * @description Call contract in EVM
 * @param txDataOrSerializedTxInHexWith0x - Transaction data or serialized transaction in hex with 0x 
 * @param isJustCall - Is just call
 */
const sandboxEthereumVirtualMachineCall = async (
  txDataOrSerializedTxInHexWith0x,
  isJustCall
) => {
  let tx = isJustCall
    ? Transaction.fromTxData(txDataOrSerializedTxInHexWith0x)
    : Transaction.fromSerializedTx(
        Buffer.from(txDataOrSerializedTxInHexWith0x.slice(2), 'hex')
      );

  if (isJustCall) {
    let { to, data } = tx;
    let vmCopy = await vm.copy();
    // TODO: Fix this type
    let txResult: any = await vmCopy.evm.runCall({
      to,
      data,
      block
    });

    return (
      txResult.execResult.exceptionError ||
      web3.utils.toHex(txResult.execResult.returnValue)
    );
  } else {
    let vmCopy = await vm.copy();
    let origin = tx.getSenderAddress();
    let { to, data, value, gasLimit } = tx;
    let caller = origin;

    if (tx.validate() && tx.verifySignature()) {
      let account = await vmCopy.stateManager.getAccount(origin);

      if (account.nonce === tx.nonce && account.balance >= value) {
        // TODO: Fix this type
        let txResult: any = await vmCopy.evm.runCall({
          origin,
          caller,
          to,
          data,
          gasLimit,
          block
        });

        return (
          txResult.execResult.exceptionError ||
          web3.utils.toHex(txResult.execResult.returnValue)
        );
      }
      return { error: { msg: 'Wrong nonce value or insufficient balance' } };
    }
    return {
      error: {
        msg: 'Transaction validation failed. Make sure signature is ok and required amount of gas is set'
      }
    };
  }
};

export default sandboxEthereumVirtualMachineCall;
