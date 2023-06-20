
import Browser from "webextension-polyfill";
import { getProviderConfigs, ProviderType } from "@src/config/config";
import {
  ChatGPTProvider,
  getChatGPTAccessToken,
  sendMessageFeedback,
} from "./providers/chatgpt";
import { OpenAIProvider } from "./providers/openai";
import { Provider } from "./GPT-Background/types";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import Bem from './Templates/BemMain.json'
import Pallete from './Templates/Palette.json';
import Webflow from './Templates/Webflow.json';
import SettingOps from "@Context/Global/classes/SettingsOps";


let p;
const requestUrls = [];



function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    const initTemplates = [
      {
        currentTemplateName: 'BEM',
        saveLocation: 'cssTemplate',
        storagePayload: {
          active: 'true',
          bubbleColor: '#FE8BFA',
          template: JSON.stringify(Bem),
          templateName: 'BEM',
        },
      },
      {
        currentTemplateName: 'Palette',
        saveLocation: 'cssTemplate',
        storagePayload: {
          active: 'true',
          bubbleColor: '#CD71FE',
          template: JSON.stringify(Pallete),
          templateName: 'Palette',
        },
      },
      {
        currentTemplateName: 'Webflow',
        saveLocation: 'cssTemplate',
        storagePayload: {
          active: 'true',
          bubbleColor: '#8BD8FE',
          template: JSON.stringify(Webflow),
          templateName: 'Webflow',
        },
      },
    ];


    (async () => {
      await SettingOps.addStorageItem('accentColor', 'userSettings', '#68BCFD');

    })();

    const addTemplatePromises = initTemplates.map(async (template, index) => {
      const { currentTemplateName, saveLocation, storagePayload } = template;
      console.log('%cstoragePayload', 'color: orange; font-size: 54px', storagePayload);

      // delay to prevent hitting the limit
      await delay(index * 1000);  // delay for each storage operation by 1 sec (increase if needed)

      return new StorageOps(currentTemplateName, saveLocation, storagePayload).addStorageItem();
    });

    // Use Promise.all to wait for all the promises to resolve
    Promise.all(addTemplatePromises)
      .then(() => console.log('All templates added to storage'))
      .catch(err => console.error('Error while adding templates to storage: ', err));

    console.log('This is a first install!');
  } else if (details.reason === 'update') {
    console.log('This is an update!');
  }
});



chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),  // replace popup.html with your HTML file
      type: "popup",
      width: 800,
      height: 500,
    });
  }
});






chrome.runtime.onConnect.addListener(function (port) {
  console.log("Connection established: ", port);
  if (port.name === "myConnectionName") {
    p = port;
    port.onMessage.addListener(function (msg) {
      // Handle message from popup here
      console.log(msg, "msg");
    });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  async function (request) {
    requestUrls.push(request.url);
  },
  { urls: ["<all_urls>"] }
);

let createdWindowId; // variable to store the ID of the created window

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "createPopup") {
    console.log("createTab");
    chrome.windows.create(
      {
        url: "popup.html",
        type: "popup",
        width: 900,
        height: 725,
        left: 50,
        top: 50,
        focused: true,
      },
      sendResponse({ message: requestUrls })
    );
  }
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "websiteData") {


    new StorageOps('websiteData', 'websiteData', request.payload).addStorageItem();


    console.log('%crequeswwwwwwwwwwwwwt', 'color: lightblue; font-size: 14px', request);

  }

});



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "updatePopup") {
    console.log(sender, "sender");
    chrome.windows.getAll(function (windows) {
      console.log(windows);
      for (var i = 0; i < windows.length; i++) {
        if (windows[i].type === "popup") {
          chrome.windows.update(windows[i].id, { focused: true });
        }
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "getCss") {
    console.log("getCss");
    chrome.runtime.sendMessage({ message: "getCss" });
  }
});

function updateScreenFocus() {
  chrome.windows.getAll(function (windows) {
    for (var i = 0; i < windows.length; i++) {
      if (windows[i].type === "popup") {
        chrome.windows.update(windows[i].id, { focused: true });
      }
    }
  });
}




chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'updateStyleSheet') {
    chrome.tabs.query({ active: true }, (tabs) => {
      // Filter tabs with Webflow Designer URL
      const webflowTab = tabs.find(tab => tab.url.startsWith("https://webflow.com/"));

      if (webflowTab) {
        console.log(webflowTab, 'webflowTab');
        console.log(request, '123');
        // Send a message to the content script of the Webflow Designer tab
        chrome.tabs.sendMessage(webflowTab.id, { message: "updateStyleSheet" });
      } else {
        console.log('No Webflow Designer tab found.');
      }
    });
    console.log('%crequest', 'color: lightblue; font-size: 14px', request);
  }
});

// Start updating screen focus every 100ms
// var intervalId = setInterval(updateScreenFocus, 100);

// Stop updating screen focus after 10 seconds
// setTimeout(function () {
//   clearInterval(intervalId);
// }, 10000);



function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func(...args, (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    });
  };
}


async function generateAnswers(port: Browser.Runtime.Port, question: string) {
  const providerConfigs = await getProviderConfigs();

  let provider: Provider;
  if (providerConfigs.provider === ProviderType.ChatGPT) {
    const token = await getChatGPTAccessToken();

    const modelSelected = await StorageOps.getSelectedModel();
    console.log('%cmodelSelected', 'color: lightblue; font-size: 14px', modelSelected);


    const selectedModel = "text-davinci-002-render-sha";
    provider = new ChatGPTProvider(token, modelSelected);
  } else if (providerConfigs.provider === ProviderType.GPT3) {
    const { apiKey, model } = providerConfigs.configs[ProviderType.GPT3]!;
    provider = new OpenAIProvider(apiKey, model);
  } else {
    throw new Error(`Unknown provider ${providerConfigs.provider}`);
  }

  const controller = new AbortController();
  port.onDisconnect.addListener(() => {
    controller.abort();
    cleanup?.();
  });

  const { cleanup } = await provider.generateAnswer({
    prompt: question,
    signal: controller.signal,
    onEvent(event) {
      if (event.type === "done") {
        port.postMessage({ event: "DONE" });
        return;
      }
      port.postMessage(event.data);
    },
  });
}

Browser.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg) => {
    console.debug("received msg", msg);
    try {
      await generateAnswers(port, msg.question);
    } catch (err: any) {
      console.error(err);
      port.postMessage({ error: err.message });
    }
  });
});

Browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "FEEDBACK") {
    const token = await getChatGPTAccessToken();
    await sendMessageFeedback(token, message.data);
  } else if (message.type === "OPEN_OPTIONS_PAGE") {
    Browser.runtime.openOptionsPage();
  } else if (message.type === "GET_ACCESS_TOKEN") {
    return getChatGPTAccessToken();
  }
});



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "saveChat") {
    //save to local storage

    const { logName, payload, type } = request;

    const { conversationId, messageId, text } = payload;

    const savePayload = {
      [logName]: {
        conversationId,
        messageId,
        text,
      },
    };

    chrome.storage.local.set(savePayload, function () {
      console.log("chat saved");
    });

    setTimeout(() => {
      chrome.storage.local.get([logName], function (result) {
        console.log(
          "Value currently is " + JSON.parse(JSON.stringify(result[logName]))
        );
      });
    }, 1000);

    printLocalStorage();

    //console entire storage

    //console the chrome storage
  }
});

function printLocalStorage() {
  chrome.storage.local.get(null, function (items) {
    console.log(JSON.parse(JSON.stringify(items)));
  });
}
