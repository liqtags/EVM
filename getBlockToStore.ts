import getCurrentBlock from './getCurrentBlock';
import Web3 from 'web3';

// TODO: Fix this formatting

/**
 * @description Returns a block object to store in the database
 * @param currentHash - current block hash
 */
const getBlockToStore = (
  currentHash
): {
  number: string;
  hash: string;
  parentHash: string;
  nonce: string;
  extraData: string;
  sha3Uncles: string;
  transactionsRoot: string;
  receiptsRoot: string;
  stateRoot: string;
  miner: any;
  timestamp: string;
  size: string;
  gasLimit: string;
  gasUsage: string;
  logsBloom: string;
  totalDifficulty: string;
  difficulty: string;
  mixHash: string;
  transactions: any[];
  uncleHeaders: any[];
} => {
  let currentBlock = getCurrentBlock();

  let {
    number,
    parentHash,
    nonce,
    uncleHash,
    transactionsTrie,
    receiptTrie,
    coinbase,
    stateRoot,
    difficulty,
    logsBloom,
    gasLimit,
    gasUsed,
    mixHash,
    extraData,
    timestamp
  } = currentBlock.header;

  let blockTemplate = {
    number: Web3.utils.toHex(number.toString()),
    hash: '0x' + currentHash.toString('hex'),
    parentHash: '0x' + parentHash.toString('hex'),
    nonce: '0x' + nonce.toString('hex'),
    extraData: '0x' + extraData.toString('hex'),
    sha3Uncles: '0x' + uncleHash.toString('hex'),
    transactionsRoot: '0x' + transactionsTrie.toString('hex'),
    receiptsRoot: '0x' + receiptTrie.toString('hex'),
    stateRoot: '0x' + stateRoot.toString('hex'),
    miner: coinbase.toString(),
    timestamp: Web3.utils.toHex(timestamp.toString()),
    size: '0x0',
    gasLimit: Web3.utils.toHex(gasLimit.toString()),
    gasUsage: Web3.utils.toHex(gasUsed.toString()),
    logsBloom: '0x' + logsBloom.toString('hex'),
    totalDifficulty: '0x0',
    difficulty: Web3.utils.toHex(difficulty.toString()),
    mixHash: '0x' + mixHash.toString('hex'),
    transactions: [],
    uncleHeaders: []
  };

  return blockTemplate;
};

export default getBlockToStore;
