

export default class IndexedDB {
  constructor(databaseName, storeName) {
    this.databaseName = databaseName;
    this.storeName = storeName;
    this.db = null;
  }




  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.databaseName, 1);
      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };
      request.onsuccess = () => {
        this.db = request.result;
        console.log('Database opened successfully');
        resolve();
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'className' });
        }
      };
    });
  }

  async clearAllStores() {
    return new Promise(async (resolve, reject) => {
      try {
        const storeNames = Array.from(this.db.objectStoreNames);

        for (const storeName of storeNames) {
          await this.clearStore(storeName);
        }

        resolve();
      } catch (error) {
        reject(new Error('Failed to clear all object stores'));
      }
    });
  }

  async clearStore(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      transaction.onerror = () => {
        reject(new Error(`Failed to clear object store ${storeName}`));
      };
      transaction.oncomplete = () => {
        resolve();
      };

      const objectStore = transaction.objectStore(storeName);
      objectStore.clear();
    });
  }


  async getTransaction(storeNames, mode) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeNames, mode);

      transaction.onabort = () => {
        reject(new Error('Transaction aborted'));
      };

      transaction.onerror = () => {
        reject(new Error('Transaction failed'));
      };

      transaction.oncomplete = () => {
        resolve();
      };

      resolve(transaction);
    });
  }


  async addAll(dataArray) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const requests = [];

      dataArray.forEach((data) => {
        const request = objectStore.add(data);
        request.onerror = () => {
          if (request.error.message.includes("Key already exists in the object store")) {
            console.log(`Data with ID ${data.className} already exists in the store`);
          } else {
            reject(new Error('Failed to add data'));
          }
        };
        requests.push(request);
      });

      transaction.onerror = () => {
        reject(new Error('Failed to add data'));
      };

      transaction.oncomplete = () => {
        console.log('All data added successfully');
        resolve();
      };
    });
  }




  async add(data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.add(data);

      request.onerror = () => {
        if (request.error.message.includes("Key already exists in the object store")) {
          resolve();
        } else {
          reject(new Error('Failed to add data'));
        }
      };

      request.onsuccess = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(new Error('Failed to add data'));
      };

      transaction.oncomplete = () => {
        resolve();
      };
    });
  }



  async get(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(id);

      request.onerror = () => {
        reject(new Error(`Failed to retrieve object with ID ${id} from object store.`));
      };

      request.onsuccess = () => {
        const object = request.result;
        if (object === undefined) {
          resolve(null)
        } else {
          resolve(object);
        }
      };
    });
  }



  async queryObjectStore(classNames) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const index = objectStore.index('className');
      const results = [];

      index.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const className = cursor.value.className;
          if (classNames.includes(className)) {
            results.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  }



  async createIndex(indexName, keyPath, options = {}) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const index = objectStore.createIndex(indexName, keyPath, options);

      index.onerror = () => {
        reject(new Error(`Failed to create index "${indexName}"`));
      };

      index.oncomplete = () => {
        resolve();
      };
    });
  }


  async hasIndex(indexName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const indexNames = Array.from(objectStore.indexNames);

      if (indexNames.includes(indexName)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }








  async getAll() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.getAll();
      request.onerror = () => {
        reject(new Error('Failed to get all data'));
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      transaction.onerror = () => {
        reject(new Error('Failed to update data'));
      };
      transaction.oncomplete = () => {
        resolve();
      };
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(id);
      request.onerror = () => {
        reject(new Error('Failed to get data'));
      };
      request.onsuccess = () => {
        const record = request.result;
        Object.assign(record, data);
        objectStore.put(record);
      };
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      transaction.onerror = () => {
        reject(new Error('Failed to delete data'));
      };
      transaction.oncomplete = () => {
        resolve();
      };
      const objectStore = transaction.objectStore(this.storeName);
      objectStore.delete(id);
    });
  }

  async clear() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      transaction.onerror = () => {
        reject(new Error('Failed to clear data'));
      };
      transaction.oncomplete = () => {
        resolve();
      };

      const objectStore = transaction.objectStore(this.storeName);
      objectStore.clear();
    });
  }

  async count() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.count();
      request.onerror = () => {
        reject(new Error('Failed to count data'));
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  async getAllKeys() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.getAllKeys();
      request.onerror = () => {
        reject(new Error('Failed to get all keys'));
      };
      request.onsuccess = () => {
        console.log(request.result);
        resolve(request.result);
      };
    });
  }
}
