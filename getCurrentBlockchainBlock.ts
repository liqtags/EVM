import { block } from './initEVM';

export const getCurrentBlockchainBlock = () => {
  return block; // the global block variable
};

export default getCurrentBlockchainBlock;
