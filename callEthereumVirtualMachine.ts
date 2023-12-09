import { Transaction } from '@ethereumjs/tx';
import { vm, block } from './initEVM';

/**
 * @description Call Ethereum Virtual Machine
 * @param serializedEVMTxWith0x - serialized EVM transaction with 0x
 */
const callEthereumVirtualMachine = async (serializedEVMTxWith0x) => {
  let serializedEVMTxWithout0x = serializedEVMTxWith0x.slice(2); // delete 0x

  let tx = Transaction.fromSerializedTx(
    Buffer.from(serializedEVMTxWithout0x, 'hex')
  );

  let txResult = await vm.runTx({ tx, block });

  // We'll need full result to store logs and so on
  if (!txResult.execResult.exceptionError) return txResult;
};

export default callEthereumVirtualMachine;
