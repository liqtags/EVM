import { Address } from 'ethereumjs-util';
import { vm } from './initEVM';

/**
 * @description Get account
 * @param address 
 */
const getAccount = async (address): Promise<any> => {
  return vm.stateManager.getAccount(Address.fromString(address));
};

export default getAccount;
