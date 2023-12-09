import level from 'level';
const ENCODING_OPTS = { keyEncoding: 'buffer', valueEncoding: 'buffer' };

/**
 * LevelDB wrapper
 * @class
 * @param {Object} [leveldb] - LevelDB instance
 * @param {Object} [leveldb.db] - LevelDB instance
 * @param {Function} [leveldb.get] - LevelDB instance
 * @param {Function} [leveldb.put] - LevelDB instance
 * @param {Function} [leveldb.del] - LevelDB instance
 * @param {Function} [leveldb.batch] - LevelDB instance
 * @param {Function} [leveldb.copy] - LevelDB instance
 */
export class LevelDB {
  _leveldb;

  constructor(leveldb) {
    // @ts-expect-error
    this._leveldb = leveldb ?? level();
  }

  async get(key): Promise<Buffer | null> {
    let value = null;

    try {
      value = await this._leveldb.get(key, ENCODING_OPTS);
    } catch (error) {
      if (error.notFound) {
        // not found, returning null
      } else {
        throw error;
      }
    }

    return value;
  }

  async put(key, val): Promise<any> {
    await this._leveldb.put(key, val, ENCODING_OPTS);
  }

  async del(key): Promise<any> {
    await this._leveldb.del(key, ENCODING_OPTS);
  }

  async batch(opStack): Promise<any> {
    await this._leveldb.batch(opStack, ENCODING_OPTS);
  }

  copy(): LevelDB {
    return new LevelDB(this._leveldb);
  }
}
