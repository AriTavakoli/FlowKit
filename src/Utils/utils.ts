import Browser from 'webextension-polyfill'

export function getPossibleElementByQuerySelector<T extends Element>(
  queryArray: string[],
): T | undefined {
  for (const query of queryArray) {
    const element = document.querySelector(query)
    if (element) {
      return element as T
    }
  }
}

export function endsWithQuestionMark(question: string) {
  return (
    question.endsWith('?') || // ASCII
    question.endsWith('？') || // Chinese/Japanese
    question.endsWith('؟') || // Arabic
    question.endsWith('⸮') // Arabic
  )
}

export function isBraveBrowser() {
  return (navigator as any).brave?.isBrave()
}

export async function shouldShowRatingTip() {
  const { ratingTipShowTimes = 0 } = await Browser.storage.local.get('ratingTipShowTimes')
  if (ratingTipShowTimes >= 5) {
    return false
  }
  await Browser.storage.local.set({ ratingTipShowTimes: ratingTipShowTimes + 1 })
  return ratingTipShowTimes >= 2
}



export function getStorageItem(key: string) {

  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      resolve(result[key]);
    });
  }
  );

}

export function getAllChats() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, function (result) {
      const filteredItems = Object.keys(result)
        .filter(key => result[key]?.text?.length > 0)
        .reduce((obj, key) => {
          obj[key] = result[key];
          return obj;
        }, {});
      resolve(filteredItems);
    });
  });
}

export function getAllStorageItems() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(null, function (result) {
      resolve(result);
    });
  });
}


export function getFirstWords(str: string) {
  const trimmedStr = (str || "").trim();
  if (trimmedStr.length === 0) {
    return "";
  }

  const words = trimmedStr.split(/\s+/);
  const first10Words = words.slice(0, 7);

  return first10Words.join(" ");
}

// a function that changes the name of the item in the storage
export function changeStorageItemName(oldName: string, newName: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([oldName], function (result) {
      const item = result[oldName];
      chrome.storage.local.remove([oldName], function () {
        chrome.storage.local.set({ [newName]: item }, function () {
          resolve('success');
        });
      });
    });
  }
  );
}
