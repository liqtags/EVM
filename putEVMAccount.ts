import { Account, Address } from '@ethereumjs/util';
import { vm } from './initEVM';

/**
 * TODO: Do return type
 * @description Put account into EVM
 * @param address - Address of the account
 * @param balanceInNativeToken - Balance of the account in native token
 * @param nonce - Nonce of the account
 */
const putEVMAccount = async (address, balanceInNativeToken, nonce = 0) => {
  let accountData = {
    nonce,
    balance: BigInt(balanceInNativeToken) * BigInt(10) ** BigInt(18)
  };

  let status = await vm.stateManager
    .putAccount(
      Address.fromString(address),
      Account.fromAccountData(accountData)
    )
    .then(() => ({ status: true }))
    .catch((_) => ({ status: false }));

  return status;
};

export default putEVMAccount;
