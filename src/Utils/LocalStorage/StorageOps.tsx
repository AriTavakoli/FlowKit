import LZString from 'lz-string';
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




export default class StorageOps {
  itemKey: string;
  accessType: string;
  payload: any;

  constructor(itemKey: string, accessType: string, payload: any) {
    this.itemKey = itemKey;
    this.payload = payload;
    this.accessType = '';


    this.checkKeyInit().then(() => {
      switch (accessType) {
        case 'template':
          this.accessType = 'template';
          break;

        case 'nodeTemplates':
          this.accessType = 'nodeTemplates';
          break;

        case 'default':
          this.accessType = 'default';
          break;
        case 'design':
          this.accessType = 'design';
          break;

        case 'currentNodeSelectedId':
          this.accessType = 'currentNodeSelectedId';
          break;

        case 'webflowComponent':
          this.accessType = 'webflowComponent';
          break;

        case 'cssTemplate':
          this.accessType = 'cssTemplate';
          break;

        case 'chat':
          this.accessType = 'chat';
          break;

        case 'workSpace':
          this.accessType = 'workSpace';
          break;

        case 'modelSelected':
          this.accessType = 'modelSelected';
          break;

        case 'lastLiveCss':
          this.accessType = 'lastLiveCss';
          break;

        case 'nodeAnalysis':
          this.accessType = 'nodeAnalysis';
          break;

        case 'websiteData':
          this.accessType = 'websiteData';
          break;
        default:
          this.accessType = 'template';
          break;
      }
    });




  }


  static async addNodeAnalysis(nodeAnalysis: any) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ nodeAnalysis }, () => {
        console.log('nodeAnalysis saved');
        resolve('saved');
      });
    });
  }



  static async getWebsiteData() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['websiteData'], (result) => {
        console.log('websiteData:', result);
        resolve(result);
      }
      );
    });
  }


  static async getNodeAnalysis() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['nodeAnalysis'], (result) => {
        console.log('nodeAnalysis:', result);
        resolve(result);
      }
      );
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




  //This function adds a new key to the storage. If the key already exists, it returns a message saying so. The function uses the variable accessType to determine the storage it will write to.

  async addStorageItem() {
    this.checkIfStorageItemExists().then((exists) => {
      if (exists) {
        return "Item already exists";
      } else {

        switch (this.accessType) {
          case 'template':
            return new Promise((resolve, reject) => {
              chrome.storage.local.get([this.accessType], (result) => {
                let template = result[this.accessType];
                template = { ...template, [this.itemKey]: this.payload };
                chrome.storage.local.set({ [this.accessType]: template }, () => {
                  console.log(`Added |${this.itemKey}| with access type |${this.accessType}| in storage with value |${this.payload}|`);
                  resolve('success');
                });
                console.log('template', template);
              });
            });

          case 'webflowComponent':
            return new Promise((resolve, reject) => {
              chrome.storage.local.get([this.accessType], (result) => {
                let webflowComponent = result[this.accessType];

                // Compress component data
                const compressedComponentData = LZString.compress(JSON.stringify(this.payload.componentData));

                // Update the payload with the compressed data
                const updatedPayload = { ...this.payload, componentData: compressedComponentData };

                webflowComponent = { ...webflowComponent, [this.itemKey]: updatedPayload };
                chrome.storage.local.set({ [this.accessType]: webflowComponent }, () => {
                  console.log(`Added |${this.itemKey}| with access type |${this.accessType}| in storage with value |${updatedPayload}|`);
                  resolve('success');
                });
                console.log('webflowComponent', webflowComponent);
              });
            });


          case 'nodeTemplates':
            return new Promise((resolve, reject) => {
              chrome.storage.local.get([this.accessType], (result) => {
                let nodeTemplates = result[this.accessType];
                nodeTemplates = { ...nodeTemplates, [this.itemKey]: this.payload };
                chrome.storage.local.set({ [this.accessType]: nodeTemplates }, () => {
                  console.log(`Added |${this.itemKey}| with access type |${this.accessType}| in storage with value |${this.payload}|`);
                  resolve('success');
                });
                console.log('nodeTemplates', nodeTemplates);
              });
            });

          case 'webflow':
            return new Promise((resolve, reject) => {
              chrome.storage.local.get([this.accessType], (result) => {
                let webflow = result[this.accessType];
                webflow = { ...webflow, [this.itemKey]: this.payload };
                chrome.storage.local.set({ [this.accessType]: webflow }, () => {
                  console.log(`Added |${this.itemKey}| with access type |${this.accessType}| in storage with value |${this.payload}|`);
                  resolve('success');
                });
                console.log('webflow', webflow);

              });
            });


          case 'currentNodeSelectedId':
            return new Promise((resolve, reject) => {
              chrome.storage.local.set({ [this.accessType]: this.payload }, () => {
                console.log(`Added |${this.accessType}| in storage with value |${this.payload}|`);
                resolve('success');
              });
            });


          case 'chat':
            return new Promise((resolve, reject) => {
              chrome.storage.local.get([this.accessType], (result) => {
                let chat = result[this.accessType];
                chat = { ...chat, [this.itemKey]: this.payload };
                chrome.storage.local.set({ [this.accessType]: chat }, () => {
                  console.log(`Added |${this.itemKey}| with access type |${this.accessType}| in storage with value |${this.payload}|`);
                  resolve('success');
                });
              });
            });

          case 'modelSelected':
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


  static addBatchTemplateItems(payload: any) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['template'], (result) => {
        let template = result['template'] || {};

        Object.keys(payload).forEach((queryName) => {
          template[queryName] = {
            ...template[queryName],
            ...payload[queryName],
          };
        });
        chrome.storage.local.set({ 'template': template }, () => {
          console.log(`Added ${Object.keys(payload).length} items with access type 'template' in storage`);
          resolve('success');
        });
      });
    });
  }


  getAllTemplatesForNode(nodeId: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['nodeTemplates'], (result) => {
        const nodeTemplates = result['nodeTemplates'];
        const templates = Object.keys(nodeTemplates).reduce((acc, templateName) => {
          if (nodeTemplates[templateName].nodeId === nodeId) {
            acc[templateName] = nodeTemplates[templateName];
          }
          return acc;
        }, {});
        resolve(templates);
      });
    });
  }


  static getAllTemplatesForNode(nodeId: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['nodeTemplates'], (result) => {
        const nodeTemplates = result['nodeTemplates'];
        let templates = {};
        if (nodeTemplates[nodeId]) {
          templates = nodeTemplates[nodeId];
        }
        console.log('%ctemplates', 'color: lightblue; font-size: 74px', templates);
        resolve(templates);
      });
    });
  }


  static getAllTemplatesForCurrentNodeSelected = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['nodeTemplates', 'currentNodeSelectedId'], (result) => {
        const nodeTemplates = result['nodeTemplates'];
        const currentNodeSelectedId = result['currentNodeSelectedId'];
        let templates = {};
        if (nodeTemplates[currentNodeSelectedId]) {
          templates = nodeTemplates[currentNodeSelectedId];
        }
        resolve(templates);
      });
    });
  }


  static setCurrentSelectedNodeId = (nodeId: string) => {
    chrome.storage.local.set({ 'currentNodeSelectedId': nodeId }, () => {
      console.log(`Added 'currentNodeSelectedId' in storage with value |${nodeId}|`);
    });
  }


  static getSelectedNodeId = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['currentNodeSelectedId'], (result) => {
        const currentNodeSelectedId = result['currentNodeSelectedId'];
        resolve(currentNodeSelectedId);
      });
    });
  }

  addTemplateToNode = async (nodeId: string, templateName: string, template: any) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['nodeTemplates'], (result) => {
        let nodeTemplates = result['nodeTemplates'] || {};
        nodeTemplates = {
          ...nodeTemplates,
          [nodeId]: {
            ...nodeTemplates[nodeId],
            [templateName]: {
              templateName,
              ...template,
              nodeId,
            }
          },
        };
        chrome.storage.local.set({ 'nodeTemplates': nodeTemplates }, () => {
          console.log(`Added |${templateName}| with access type 'nodeTemplates' in storage with value |${JSON.stringify(template)}|`);
          resolve('success');
        });
      });
    });
  }


  static deleteTemplateFromNode = async (nodeId: string, templateName: string) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['nodeTemplates'], (result) => {
        let nodeTemplates = result['nodeTemplates'] || {};
        if (nodeTemplates[nodeId] && nodeTemplates[nodeId][templateName]) {
          delete nodeTemplates[nodeId][templateName];
          chrome.storage.local.set({ 'nodeTemplates': nodeTemplates }, () => {
            console.log(`Deleted |${templateName}| with access type 'nodeTemplates' in storage`);
            resolve('success');
          });
        } else {
          reject(`Template |${templateName}| for node |${nodeId}| not found in 'nodeTemplates'`);
        }
      });
    });
  }



  async addTemplateToWorkSpace(tabId, templateName, template) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['workSpaceTemplates'], (result) => {
        let workSpaceTemplates = result['workSpaceTemplates'] || {};
        workSpaceTemplates = {
          ...workSpaceTemplates,
          [tabId]: {
            ...workSpaceTemplates[tabId],
            [templateName]: {
              templateName,
              ...template,
              tabId,
            }
          },
        };
        chrome.storage.local.set({ 'workSpaceTemplates': workSpaceTemplates }, () => {
          console.log(`Added |${templateName}| with access type 'workSpaceTemplates' in storage with value |${JSON.stringify(template)}|`);
          resolve('success');
        });
      });
    });
  }

  static addTemplateToWorkSpace(tabId, templateName, template) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['workSpaceTemplates'], (result) => {
        let workSpaceTemplates = result['workSpaceTemplates'] || {};
        workSpaceTemplates = {
          ...workSpaceTemplates,
          [tabId]: {
            ...workSpaceTemplates[tabId],
            [templateName]: {
              templateName,
              ...template,
              tabId,
            }
          },
        };
        chrome.storage.local.set({ 'workSpaceTemplates': workSpaceTemplates }, () => {
          console.log(`Added |${templateName}| with access type 'workSpaceTemplates' in storage with value |${JSON.stringify(template)}|`);
          resolve('success');
        });
      });
    });
  }


  static addWorkSpaceToStorage(workSpaceId, workSpace) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['workSpaces'], (result) => {
        let workSpaces = result['workSpaces'] || {};
        workSpaces = {
          ...workSpaces,
          [workSpaceId]: {
            ...workSpaces[workSpaceId],
            ...workSpace,
            tabId: workSpaceId,
          }
        };
        chrome.storage.local.set({ 'workSpaces': workSpaces }, () => {
          console.log(`Added |${workSpaceId}| with access type 'workSpaces' in storage with value |${JSON.stringify(workSpace)}|`);
          resolve('success');
        });
      });
    });
  }

  static getAllWorkSpaces() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['workSpaces'], (result) => {
        const workSpaces = result['workSpaces'];
        resolve(workSpaces);
      });
    });
  }

  // a method that deletes the jsonData that doesnt have a matching jsonDataKey in the blocks
  static removeUnusedJsonData = (workspace) => {
    if (!workspace) {
      throw new Error('Workspace is undefined');
    }

    const allKeysInBlocks = new Set();
    if (workspace.tabs) {
      workspace.tabs.forEach(tab => {
        if (tab.content && tab.content.blocks) {
          tab.content.blocks.forEach(block => {
            if (block && block.jsonDataKey) {
              allKeysInBlocks.add(block.jsonDataKey);
            }
          });
        }
      });
    }

    const filteredJsonData = (workspace.jsonData || []).filter(data => data && allKeysInBlocks.has(data.key));

    return { ...workspace, jsonData: filteredJsonData };
  }


  static clearAllStorageForAccessType = (accessType: string) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([accessType], (result) => {
        const storage = result[accessType];
        Object.keys(storage).forEach((key) => {
          delete storage[key];
        });
        chrome.storage.local.set({ [accessType]: storage }, () => {
          console.log(`Cleared all storage for access type |${accessType}|`);
          resolve('success');
        });
      });
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
        if (accessType === 'webflowComponent') {
          // Decompress the payload before returning
          const decompressedPayload = JSON.parse(LZString.decompress(result[accessType][itemKey]));
          resolve(decompressedPayload);
        } else {
          resolve(result[accessType][itemKey]);
        }
      });
    });
  }

  static async getSelectedModel() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('modelSelected', function (result) {
        resolve(result['modelSelected']);
      });
    }
    );
  }


  static getAllComponents(accessType = 'webflowComponent') {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([accessType], (result) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          const components = result[accessType];
          console.log(`Retrieved all components with access type |${accessType}|:`, components);
          resolve(components);
        }
      });
    });
  }

  async checkIfComponentWithNameExists(componentName, accessType = 'webflowComponent') {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([accessType], (result) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          const components = result[accessType];
          const componentNames = Object.keys(components);

          const nameExists = componentNames.some((name) => name === componentName);
          console.log(`Component with name "${componentName}" exists:`, nameExists);
          resolve(nameExists);
        }
      });
    });
  }




  static changeTemplateActiveProperty(itemKey: string, activeStatus: string, accessType: string) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([accessType], (result) => {

        let template = result[accessType][itemKey];


        template.active = activeStatus;




        console.log('template', template);

        result[accessType][itemKey] = template;
        chrome.storage.local.set({ [accessType]: result[accessType] }, () => {
          console.log(`Changed active property of template |${itemKey}| to |${template.active}|`);
          resolve('success');
        });
      });
    });
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