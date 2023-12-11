import callEthereumVirtualMachine from './callEthereumVirtualMachine';
import sandboxEthereumVirtualMachineCall from './sandboxEthereumVirtualMachineCall';
import putEVMAccount from './putEVMAccount';
import putEVMContract from './putEVMContract';
import getEVMAccount from './getEVMAccount';
import getStateRootForEVM from './getStateRootForEVM';
import setEVMStateRoot from './setEVMStateRoot';
import estimateGasUsedForTransaction from './estimateGasUsedForTransaction';
import getCurrentBlockchainBlock from './getCurrentBlockchainBlock';
import setParamsForCurrentBlock from './setParamsForCurrentBlock';
import getTransactionWithStoredReceipt from './getTransactionWithStoredReceipt';
import getBlockToStoreInBlockchain from './getBlockToStoreInBlockchain';
import storeEVMLog from './storeEVMLog';

export {
  callEthereumVirtualMachine as callEVM,
  sandboxEthereumVirtualMachineCall as sandboxCall,
  putEVMAccount,
  putEVMContract,
  getEVMAccount,
  getStateRootForEVM,
  setEVMStateRoot,
  estimateGasUsedForTransaction,
  getCurrentBlockchainBlock,
  setParamsForCurrentBlock,
  getTransactionWithStoredReceipt,
  getBlockToStoreInBlockchain,
  storeEVMLog
};
