import { DefaultStateManager } from '@ethereumjs/statemanager';
import { Common } from '@ethereumjs/common';
import { Block } from '@ethereumjs/block';
import { Trie } from '@ethereumjs/trie';
import { LevelDB } from './LevelDB';
import { VM } from '@ethereumjs/vm';
import { Level } from 'level';
import Web3 from 'web3';

const initEVM = async (): Promise<{
  web3: Web3;
  vm: VM;
  block: Block;
  creds: { address: string; privateKey: string };
  config: {
    EVM: {
      name: string;
      networkId: string;
      chainId: string;
      coinbase: string;
      hardfork: string;
      gasLimitForBlock: number;
      clientVersion: string;
      protocolVersionInHex: string;
      gasPriceInWeiAndHex: string;
      maxAllowedGasAmountForSandboxExecution: number;
      creds: { address: string; privateKey: string };
    };
  };
  common: Common;
  stateManager: DefaultStateManager;
}> => {
  const CHAINDATA_PATH = './chaindata';

  const config = {
    EVM: {
      name: 'LINOCHAIN',
      networkId: '0x1ca3',
      chainId: '0x1ca3',
      coinbase: '0x0000000000000000000000000000000000000000',
      hardfork: 'merge',
      gasLimitForBlock: 30000000,
      clientVersion: 'Node.js',
      protocolVersionInHex: '0x1',
      gasPriceInWeiAndHex: '0x49ad39126',
      maxAllowedGasAmountForSandboxExecution: 100000,
      creds: {
        address: 'SOME_ADDRESS',
        privateKey: 'SOME_PRIVATE_KEY'
      }
    }
  };

  const {
    name,
    networkId,
    chainId,
    coinbase, // this address will be set as a block creator, but all the fees will be automatically redirected to KLY env and distributed among pool stakers
    hardfork,
    gasLimitForBlock,
    creds
  } = config.EVM;

  // state trie is responsible for storing the state of the blockchain
  const trie = new Trie({
    // level db is used as a storage
    db: new LevelDB(new Level(CHAINDATA_PATH + '/customEVM')),
    // use key hashing to avoid collisions
    useKeyHashing: true
  });

  //@ts-expect-error - TODO: Fix this
  // use own implemenation.
  const common = Common.custom({ name, networkId, chainId }, hardfork);
  // state manager is responsible for storing the state trie
  const stateManager = new DefaultStateManager({ trie });

  // Create our VM instance
  const vm = await VM.create({ common, stateManager });
  // Create a web3 instance
  const web3 = new Web3();
  // Create a block
  let block = Block.fromBlockData(
    //@ts-expect-error - TODO: Fix this
    { header: { gasLimit: gasLimitForBlock, miner: coinbase } },
    { common }
  );

  return {
    web3,
    vm,
    block,
    creds,
    config,
    common,
    stateManager
  };
};

const { web3, vm, block, creds, config, common, stateManager }: any = initEVM();

export { web3, vm, block, creds, config, common, stateManager };
