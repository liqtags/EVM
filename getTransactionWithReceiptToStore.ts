import { web3 } from './initEVM';
import { Transaction } from '@ethereumjs/tx';
import getCurrentBlock from './getCurrentBlock';
import storeLog from './storeLog';

/**
 * @description Returns a transaction object with receipt to store in the database
 * @param transactionInHex - transaction in hex
 * @param evmResult - EVM result
 * @param logsMap - logs map
 */
const getTransactionWithReceiptToStore = (
  transactionInHex: string,
  evmResult: {
    receipt: any;
    execResult: { executionGasUsed: { toString: () => any } };
    createdAddress: { toString: () => any };
  },
  logsMap: any
): { tx: any; receipt: any } => {
  let tx = Transaction.fromSerializedTx(
    Buffer.from(transactionInHex.slice(2), 'hex')
  );

  if (tx) {
    // TODO: Fix this any
    let transaction: any = tx.toJSON();
    transaction.blockHash = '0x' + getCurrentBlock().hash().toString('hex');

    transaction.blockNumber = web3.utils.toHex(
      getCurrentBlock().header.number.toString()
    );

    transaction.hash = '0x' + tx.hash().toString('hex');
    transaction.from ||= tx.getSenderAddress().toString();
    transaction.transactionIndex = 0;
    let receipt = evmResult.receipt;
    let { hash, blockHash, blockNumber, from, to, gasPrice } = transaction;
    let logsForReceipt = receipt.logs.map((singleLog) => {
      let [contractAddressBuffer, topicsBuffers, pureData] = singleLog;
      let address = '0x' + Buffer.from(contractAddressBuffer).toString('hex');
      let topics = topicsBuffers.map(
        (buffer) => '0x' + Buffer.from(buffer).toString('hex')
      );
      let data = '0x' + Buffer.from(pureData).toString('hex');

      let finalLogForm = {
        address,
        topics,
        data,
        blockNumber,
        transactionHash: hash,
        transactionIndex: '0x0',
        blockHash,
        logIndex: '0x0',
        removed: false
      };

      storeLog(logsMap, finalLogForm);
      return finalLogForm;
    });

    // TODO: Fix this any
    let futureReceipt: any = {
      status: receipt.status,
      transactionHash: hash,
      transactionIndex: '0x0',
      blockHash,
      blockNumber,
      from,
      cumulativeGasUsed: web3.utils.toHex(
        receipt.cumulativeBlockGasUsed.toString()
      ),
      effectiveGasPrice: gasPrice,
      gasUsed: web3.utils.toHex(
        evmResult.execResult.executionGasUsed.toString()
      ),
      type: web3.utils.toHex(tx.type),
      logsBloom: '0x' + receipt.bitvector.toString('hex'),
      logs: logsForReceipt
    };

    if (to) futureReceipt.to = to;
    if (evmResult.createdAddress)
      futureReceipt.contractAddress = evmResult.createdAddress.toString();
    else futureReceipt.contractAddress = null;

    return { tx: transaction, receipt: futureReceipt };
  }
};

export default getTransactionWithReceiptToStore;
