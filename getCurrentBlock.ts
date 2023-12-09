import { block } from './initEVM';

export const getCurrentBlock = () => {
  return block; // the global block variable
};

export default getCurrentBlock;
