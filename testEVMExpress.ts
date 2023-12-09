import express from 'express';
import bodyParser from 'body-parser';
import callEthereumVirtualMachine from './callEthereumVirtualMachine';
import sandboxEthereumVirtualMachineCall from './sandboxEthereumVirtualMachineCall';
import putAccount from './putAccount';
import putContract from './putContract';
import getAccount from './getAccount';
import getStateRoot from './getStateRoot';
import setStateRoot from './setStateRoot';
import estimateGasUsed from './estimateGasUsed';
import getCurrentBlock from './getCurrentBlock';
import setCurrentBlockParams from './setCurrentBlockParams';
import getTransactionWithReceiptToStore from './getTransactionWithReceiptToStore';
import getBlockToStore from './getBlockToStore';
import storeLog from './storeLog';

// Create the express application
const app = express();
// The port the express app will listen on
const port: number = 3000;

// Add body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes - unsecure now

// Add the / route
app.get('/', (req: any, res: any) => {
  res.send('Hello world!');
});

// callEthereumVirtualMachine
app.post('/callEVM', async (req: any, res: any) => {
  const data = req.body;
  const result = await callEthereumVirtualMachine(data);
  res.send(result);
});

// sandboxEthereumVirtualMachineCall
app.post('/sandboxCall', async (req: any, res: any) => {
  const data = req.body;
  const result = await sandboxEthereumVirtualMachineCall(data, false);
  res.send(result);
});

// putAccount
app.post('/putAccount', async (req: any, res: any) => {
  const data = req.body;
  const result = await putAccount(data.address, data.account);
  res.send(result);
});

// putContract
app.post('/putContract', async (req: any, res: any) => {
  const data = req.body;
  const result = await putContract(
    data.address,
    data.contract,
    data.nonce,
    data.code,
    data.storage
  );
  res.send(result);
});

// getAccount
app.get('/getAccount', async (req: any, res: any) => {
  const data = req.body;
  const result = await getAccount(data.address);
  res.send(result);
});

// getStateRoot
app.get('/getStateRoot', async (req: any, res: any) => {
  const data = req.body;
  const result = await getStateRoot();
  res.send(result);
});

// setStateRoot
app.post('/setStateRoot', async (req: any, res: any) => {
  const data = req.body;
  const result = await setStateRoot(data.stateRoot);
  res.send(result);
});

// estimateGasUsed - get
app.get('/estimateGasUsed', async (req: any, res: any) => {
  const data = req.body;
  const result = await estimateGasUsed(data.tx);
  res.send(result);
});

// getCurrentBlock
app.get('/getCurrentBlock', async (req: any, res: any) => {
  const data = req.body;
  const result = await getCurrentBlock();
  res.send(result);
});

// setCurrentBlockParams
app.post('/setCurrentBlockParams', async (req: any, res: any) => {
  const data = req.body;
  const result = await setCurrentBlockParams(
    data.nextIndex,
    data.timestamp,
    data.parentHash
  );
  res.send(result);
});

// getTransactionWithReceiptToStore
app.get('/getTransactionWithReceiptToStore', async (req: any, res: any) => {
  const data = req.body;
  const result = await getTransactionWithReceiptToStore(
    data.transactionInHex,
    data.evmResult,
    data.logsMap
  );
  res.send(result);
});

// getBlockToStore
app.get('/getBlockToStore', async (req: any, res: any) => {
  const data = req.body;
  const result = await getBlockToStore(data.currentHash);
  res.send(result);
});

// storeLog
app.get('/storeLog', async (req: any, res: any) => {
  const data = req.body;
  const result = await storeLog(data.logsMap, data.logInstance);
  res.send(result);
});

// Add the /messages route
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
