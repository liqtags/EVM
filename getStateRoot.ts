import { vm } from './initEVM';

const getStateRoot = async (): Promise<any> => {
  let stateRoot = await vm.stateManager.getStateRoot();
  return stateRoot.toString('hex'); //32-bytes hexadecimal form
};

export default getStateRoot;
