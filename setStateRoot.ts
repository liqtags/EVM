import { stateManager } from './initEVM';

/**
 * @description Set state root
 * @param stateRootInHex - State root in hex
 */
const setStateRoot = (stateRootInHex) => {
  return stateManager.setStateRoot(Buffer.from(stateRootInHex, 'hex'));
};

export default setStateRoot;
