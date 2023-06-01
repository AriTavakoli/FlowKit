import IndexedDB from './db/IndexDb';
import CSSOM from 'cssom';

/**
 *
 * @requires ESBUIlD webworkers in chrome extension environment have many limitations.
 *  To get around them and make them behaive as they would in a native environment we use ESBUILD to bundle the worker and all of its related packages
 * Then we use webpack to copy the esbuild bundle located in internalDist to the build folder
 *
 */

// eslint-disable-next-line no-restricted-globals
self.onmessage = async function (e: MessageEvent) {
  console.time("onmessage");

  const data = JSON.parse(e.data);

  if (data.type === 'find') {

    let { conditionText } = data
    let { designUrl, classNames } = data
    let { payload } = data

    let cssText = payload;

    const styleSheet = e.data.payload;

    let parsedCss = CSSOM.parse(cssText)


    let cssRules = parsedCss.cssRules[0].cssRules



    console.groupCollapsed('Worker init');
    console.log('designUrl', designUrl);
    console.log('classNames', classNames);
    console.log('conditionText', conditionText);
    console.log('payload', payload);
    console.log('styleSheet', styleSheet);
    console.log('cssRules', cssRules);
    console.groupEnd();


    const webInst = new IndexedDB(designUrl, conditionText);

    const workerStyleSheet = new WorkerStyleSheet(cssRules, webInst);

    await webInst.open();

    const getPromises = classNames.map((className) => {
      return webInst.get(className).then((data) => {
        // first pass data.cssText is undefined
        // second pass data.cssText is the cssText

        if (data) {
          if (data.cssText) {
            workerStyleSheet.matchElements[className] = data.cssText
          } else {

            let searchResult = workerStyleSheet.SearchStyleSheet(className);
            console.log(searchResult, 'searchResult');
            workerStyleSheet.toBeCached[className] = true;
          }
        } else {
          console.log('Error finding', className);
          // throw new Error(`Error finding ${className} `);
        }
      });
    });

    await Promise.all(getPromises);


    // workerStyleSheet.matchElements[conditionText] = true;

    const newObject = {
      [conditionText]: { ...workerStyleSheet.matchElements },
    };

    console.log(newObject, 'newObject');


    console.log(workerStyleSheet.matchElements, 'CLAUDE1');
    // eslint-disable-next-line no-restricted-globals
    self.postMessage(newObject);

    console.timeEnd("onmessage");
    await workerStyleSheet.cacheCorrelatedValues();
    await workerStyleSheet.cacheAllStyles();


  }
}


interface WorkerStyleSheet {
  styleSheet: CSSStyleRule[];
  matchElements: { [key: CSSStyleRule]: string };
  toBeCached: any;
  webInst: IndexedDB;
}


class WorkerStyleSheet {

  /**
   * @param  {CSSStyleRule[]} styleSheet each stylesheet is for a specific media query that was parsed in the worker init.
   * @param  {IndexedDB} webInst a instance of IndexedDb class which handles indexDb operation.
   */
  constructor(styleSheet: CSSStyleRule[], webInst: IndexedDB) {
    this.styleSheet = styleSheet;
    this.matchElements = {};
    this.toBeCached = {};
    this.webInst = webInst;
  }


  /**
   * @param  {string} className  a class name provided by the classname payload from the worker init.
   */
  // SearchStyleSheet is an async function that takes a string as an argument.
  // It takes the string and searches the styleSheet array for a match.
  // If there is a match it will push the match into the matchElements array.

  async SearchStyleSheet(className: string): Promise<void> {

    console.log(this.styleSheet, 'this.styleSheet');

    for (let i = 0; i < this.styleSheet.length; i++) {
      const cssStyleRule = this.styleSheet[i];
      const selectorText = cssStyleRule.selectorText;
      const cssText = cssStyleRule.cssText;

      // Split the selectorText into individual selectors
      const selectors = selectorText.split(/,\s*/);

      for (const selector of selectors) {
        // Split the selector into individual class names
        const classNames = selector.match(/\.[\w-]+/g);

        // Check if the provided className is part of the classNames in the selector
        if (classNames && classNames.includes(className)) {
          // Use a key with joined classNames to store combo classes CSS
          const comboClassName = classNames.sort().join('');
          if (!this.matchElements[comboClassName]) {
            this.matchElements[comboClassName] = cssText;
          }
        }
      }
    }
  }


  /**
   * @method cacheCorrelatedValues caches all the values that are correlated to the class names provided by the classname payload from the worker init.
   */
  async cacheCorrelatedValues() {

    let cacheKeys = this.findCommonKeys(this.matchElements, this.toBeCached);

    for (let i = 0; i < cacheKeys.length; i++) {
      let key = cacheKeys[i];

      try {
        await this.webInst.add({ className: key, cssText: this.matchElements[key].cssText });
      } catch (error) {
        throw new Error(`Error Caching ${key}`);
      }

    }

  }

  findCommonKeys(obj1: Object, obj2: Object): string[] {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
      throw new Error('Input must be an object');
    }
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const commonKeys = obj1Keys.filter((key) => obj2Keys.includes(key));
    return commonKeys;
  }



  /**
   * @method cacheAllStyles caches everything in the stylesheet and adds it to the indexDb.
   */
  async cacheAllStyles(): Promise<void> {
    console.time("cacheAllStyles");
    for (let i = 0; i < this.styleSheet.length; i++) {
      const selectorText = this.styleSheet[i].selectorText;
      const cssText = this.styleSheet[i].cssText;

      if (!selectorText || !cssText) {
        continue;
      }

      let isCached = await this.webInst.get(selectorText);
      if (isCached) {
        continue;
      } else {
        try {
          await this.webInst.add({ className: selectorText, cssText: cssText });
        } catch (error) {
          throw new Error(`Error Caching ${selectorText}`)
        }
      }
    }

    console.timeEnd("cacheAllStyles");
  }


}

