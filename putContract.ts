import { Account, Address } from '@ethereumjs/util';
import { vm } from './initEVM';

/**
 * TODO: Do return type
 * @description Put contract into EVM
 * @param address - Address of the contract
 * @param balanceInNativeToken - Balance of the contract in native token
 * @param nonce - Nonce of the contract
 * @param code - Code of the contract
 * @param storage - Storage of the contract
 */
const putContract = async (
  address,
  balanceInNativeToken,
  nonce,
  code,
  storage
) => {
  let accountData = {
    nonce,
    balance: BigInt(balanceInNativeToken) * BigInt(10) ** BigInt(18)
  };
  address = Address.fromString(address);

  await vm.stateManager.putAccount(
    address,
    Account.fromAccountData(accountData)
  );

  for (const [key, val] of Object.entries(storage)) {
    const storageKey = Buffer.from(key, 'hex');
    //@ts-expect-error - TODO: Fix this
    const storageVal = Buffer.from(val, 'hex');
    await vm.stateManager.putContractStorage(address, storageKey, storageVal);
  }
  const codeBuf = Buffer.from(code, 'hex');
  await vm.stateManager.putContractCode(address, codeBuf);
};

export default putContract;
