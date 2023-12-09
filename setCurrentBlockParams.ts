import { Block } from '@ethereumjs/block';
import { block, config, common } from './initEVM';

/**
 * @description Set current block params
 * @param nextIndex - Next index
 * @param timestamp - Timestamp
 * @param parentHash - Parent hash
 */
export const setCurrentBlockParams = (nextIndex, timestamp, parentHash) => {
  return Block.fromBlockData(
    {
      header: {
        gasLimit: config.EVM.gasLimitForBlock,
        // @ts-expect-error - TODO: Fix this
        miner: config.EVM.coinbase,
        timestamp,
        parentHash: Buffer.from(parentHash, 'hex'),
        number: nextIndex
      }
    },
    { common }
  );
};

export default setCurrentBlockParams;
