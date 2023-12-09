import express from 'express';
import bodyParser from 'body-parser';
import { LevelDB } from './LevelDB';
import { Level } from 'level';

// Create the express application
const app = express();
// The port the express app will listen on
const port: number = 3000;

// LevelDB
const dbPath: string = './db';
// const db: LevelDB = new LevelDB(dbPath);

const db = new LevelDB(new Level(dbPath));

// Add body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add the / route
app.get('/', (req: any, res: any) => {
  res.send('Hello world!');
});

// Add the /data route
app.post('/data/:key/:value', async (req: any, res: any) => {
  const key: string = req.params.key;
  const value: string = req.params.value;

  await db.put(key, value);
  res.send(`Added key ${key} with value ${value}`);
});

app.get('/data/:key', async (req: any, res: any) => {
  const key: string = req.params.key;
  const value = await db.get(key);
  res.send(`Value for key ${key} is ${value}`);
});

// Add the /messages route
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
