import StorageOps from "@src/Utils/LocalStorage/StorageOps";

export default class ComponentLibOps {
  componentKey: string;
  componentDetails: any;
  jsonData: any;
  accessType: string;



  constructor(componentKey: string, accessType = 'webflowComponent', componentDetails: any, jsonData: any) {
    this.componentKey = componentKey;

    this.componentDetails = componentDetails;
    this.jsonData = jsonData;
    this.accessType = " ";
    this.checkKeyInit().then(() => {
      this.accessType = accessType;
    });


  }

  async addStorageItem() {




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





}