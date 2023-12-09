import callEthereumVirtualMachine from './callEthereumVirtualMachine';
import sandboxEthereumVirtualMachineCall from './sandboxEthereumVirtualMachineCall';
import putAccount from './putAccount';
import putContract from './putContract';
import getAccount from './getAccount';
import getStateRoot from './getStateRoot';
import setStateRoot from './setStateRoot';
import estimateGasUsed from './estimateGasUsed';
import getCurrentBlock from './getCurrentBlock';
import setCurrentBlockParams from './setCurrentBlockParams';
import getTransactionWithReceiptToStore from './getTransactionWithReceiptToStore';
import getBlockToStore from './getBlockToStore';
import storeLog from './storeLog';

export {
  callEthereumVirtualMachine as callEVM,
  sandboxEthereumVirtualMachineCall as sandboxCall,
  putAccount,
  putContract,
  getAccount,
  getStateRoot,
  setStateRoot,
  estimateGasUsed,
  getCurrentBlock,
  setCurrentBlockParams,
  getTransactionWithReceiptToStore,
  getBlockToStore,
  storeLog
};
