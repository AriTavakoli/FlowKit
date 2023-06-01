
// shape of local storage
// {
//   "template": {
//    "asd": {
//      "queryName": "asd",
//      "bubbleColor": "blue",
//      "conversationStyle": "conversational",
//      "responseLength": 99,
//      "markDownTemplate": "tell me something funny "
//    },
//    "nextkey": {}
//  },
//  "chat": {
//    "asd": {
//      "queryName": "asd",
//      "bubbleColor": "blue",
//      "conversationStyle": "conversational",
//      "responseLength": 99,
//      "markDownTemplate": "tell me something funny "
//    },
//   nextkey": {}
//  }
// }




export default class SettingOps {
  itemKey: string;
  accessType: string;
  payload: any;

  constructor(itemKey: string, accessType: string, payload: any) {
    this.itemKey = itemKey;
    this.payload = payload;
    this.accessType = '';


    this.checkKeyInit().then(() => {
      switch (accessType) {
        case 'accentColor':
          this.accessType = 'accentColor';
          break;

        default:
          this.accessType = 'accentColor';
          break;
      }
    });

    // this.clearLocalStorage().then((result) => {
    //   console.log(result, 'clearLocalStorage');
    // });

  }


  static async getUserSettings() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['userSettings'], (result) => {
        let template = result['userSettings'];
        resolve(template);
      });
    });
  }


  clearLocalStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        console.log('Chrome local storage cleared.');
        resolve('cleared');
      });
    });
  }


  static clearLocalStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.clear(() => {
        console.log('Chrome local storage cleared.');
        resolve('cleared');
      });
    });
  }


  static printAllStorageItems() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(null, (result) => {
        console.log('All storage items:', result);
        resolve(result);
      }
      );
    });
  }

   static async getSetting(key: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['userSettings'], (result) => {
        let template = result['userSettings'];
        resolve(template[key]);
      });
    });
  }


  static getLastLiveCss() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['lastLiveCss'], (result) => {
        console.log('lastLiveCss:', result);
        resolve(result);
      }
      );
    });
  }

  static setLastLiveCss(css: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ lastLiveCss: css }, () => {
        console.log(`Added |lastLiveCss| with access type |lastLiveCss| in storage with value |${css}|`);
        resolve('success');
      });
    });
  }


static addStorageItem(itemKey: string, accessType: string, payload: any) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([accessType], (result) => {
        let template = result[accessType];
        template = { ...template, [itemKey]: payload };
        chrome.storage.local.set({ [accessType]: template }, () => {
          console.log(`Added |${itemKey}| with access type |${accessType}| in storage with value |${payload}|`);
          resolve('success');
        });
      });
    });
  }

  static getStorageItem(itemKey: string, accessType: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([accessType], (result) => {
        let template = result[accessType];
        resolve(template[itemKey]);
      });
    });
  }





  //This function adds a new key to the storage. If the key already exists, it returns a message saying so. The function uses the variable accessType to determine the storage it will write to.

  async addStorageItem() {
    this.checkIfStorageItemExists().then((exists) => {
      if (exists) {
        return "Item already exists";
      } else {

        switch (this.accessType) {


          case 'accentColor':
            return new Promise((resolve, reject) => {
              chrome.storage.local.set({ [this.accessType]: this.payload }, () => {
                console.log(`Added |${this.accessType}| in storage with value |${this.payload}|`);
                resolve('success');
              });
            });



          default:
            return new Promise((resolve, reject) => {
              chrome.storage.local.get([this.accessType], (result) => {
                let template = result[this.accessType];
                template = { ...template, [this.itemKey]: this.payload };
                chrome.storage.local.set({ [this.accessType]: template }, () => {
                  console.log(`Added |${this.itemKey}| with access type |${this.accessType}| in storage with value |${this.payload}|`);
                  resolve('success');
                });
              });
            });
        }
      }
    });
  }



  changeStorageItemName(newName: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.accessType], (result) => {
        let item = result[this.accessType][this.itemKey];
        delete result[this.accessType][this.itemKey];
        result[this.accessType] = { ...result[this.accessType], [newName]: item };
        chrome.storage.local.set({ [this.accessType]: result[this.accessType] }, () => {
          console.log(`Changed |${this.itemKey}| to |${newName}|`);
          resolve('success');
        });
      });
    });
  }

  deleteStorageItem(itemKey: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.accessType], (result) => {
        delete result[this.accessType][itemKey];
        chrome.storage.local.set({ [this.accessType]: result[this.accessType] }, () => {
          console.log(`Deleted |${itemKey}|`);
          resolve('success');
        });
      });
    });
  }


  static deleteStorageItemByAccessType(itemKey: string, accessType: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([accessType], (result) => {
        delete result[accessType][itemKey];
        chrome.storage.local.set({ [accessType]: result[accessType] }, () => {
          console.log(`Deleted |${itemKey}|`);
          resolve('success');
        });
      });
    });
  }




  // check for chrome storage update
  static watchForStorageUpdate() {
    return new Promise((resolve, reject) => {
      chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          // console.log(
          //   `Storage key "${key}" in namespace "${namespace}" changed.`,
          //   `Old value was "${oldValue}", new value is "${newValue}".`
          // );
          resolve('updated');
        }
      });
    });
  }

  getStorageItem(itemKey: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.accessType], function (result) {
        resolve(result[itemKey]);
      });
    }
    );
  }


  static getStorageItemByAccessType(itemKey: string, accessType: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(accessType, function (result) {
        resolve(result[accessType][itemKey]);
      });
    }
    );
  }


  static async getSelectedModel() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('modelSelected', function (result) {
        resolve(result['modelSelected']);
      });
    }
    );
  }


  //get all storage items
  static getAllStorageItems() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(null, function (result) {
        resolve(result);
      });
    }
    );
  }

  //get all storage items by access type
  static getAllStorageItemsByAccessType(accessType: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(accessType, function (result) {
        resolve(result[accessType]);
      });
    }
    );
  }

  // checks if the keys for the specified access type exist in storage. If not, it creates them.
  checkKeyInit() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.accessType], (result) => {
        if (result === undefined || result === null) {
          console.log('key not initialized');
          chrome.storage.local.set({ [this.accessType]: {} }, () => {
            console.log('key initialized');
            resolve('success');
          });
        } else {
          resolve('success');
        }
      });
    });
  }


  checkIfStorageItemExists() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.accessType], (result) => {
        if (!result || !result[this.accessType] || result[this.accessType][this.itemKey] === undefined) {
          console.log('item does not exist');
          resolve(false);
        } else {
          console.log('item exists');
          resolve(true);
        }
      });
    });
  }


}