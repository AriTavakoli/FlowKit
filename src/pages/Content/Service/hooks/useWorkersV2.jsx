
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { findStyleSheet, findWebflowStyleSheet } from '../../TreeParser';
import chalk from 'chalk';
// import IndexedDB from '../db/IndexDb';



export default function useWeb(designUrl) {

  const didMount = useRef(false);
  const [workers, setWorkers] = useState([]);
  const [indexDb, setIndexDb] = useState();
  const [styleSheet, setStyleSheet] = useState();

  const [mediaQueryParsed, setMediaQueryParsed] = useState({});


  const [newStyleSheet, setNewStyleSheet] = useState(false);

  // useEffect(() => {
  //   setInterval(() => {

  //     let newStyleSheet = findStyleSheet().then((styleSheet) => {
  //       console.log(styleSheet, 'styleSheet from useWorker');
  //       setStyleSheet(styleSheet);
  //     });

  //     console.log(newStyleSheet, 'newStyleSheet');

  //   }, 2000);
  // }, []);





  useEffect(() => {
    if (didMount.current) {
      console.log('useWeb didMount', didMount.current);
      console.log(mediaQueryParsed, 'mediaQueryParsed');

    } else {
      didMount.current = true;
    }
  }, []);




  async function updateMediaQueryParsed() {
    const styleSheetInit = await findStyleSheet();


    console.log(styleSheetInit, 'styleSheet from useWorker');
    setStyleSheet(styleSheetInit);

    let mediaQueryInfo = {};

    for (let i = 0; i < Object.keys(styleSheetInit).length; i++) {
      const mediaQuery = styleSheetInit[i].conditionText;
      let cssRules = styleSheetInit[i].cssText
      mediaQueryInfo[mediaQuery] = cssRules;
    }
    setMediaQueryParsed(mediaQueryInfo);
  }


  useEffect(() => {

    if (didMount.current) {
      document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded');

        (async () => {
          await updateMediaQueryParsed();
          console.log('useWeb didMount', didMount.current);
        }
        )();
      }
      );
    }


  }, []);


  async function changeStyleSheet() {
    const styleSheetInit = await findStyleSheet();
    console.log(styleSheetInit, 'styleSheet from useWorker');
    setStyleSheet(styleSheetInit);

    let mediaQueryInfo = {};

    for (let i = 0; i < Object.keys(styleSheetInit).length; i++) {
      const mediaQuery = styleSheetInit[i].conditionText;
      let cssRules = styleSheetInit[i].cssText
      mediaQueryInfo[mediaQuery] = cssRules;
    }
    setMediaQueryParsed(mediaQueryInfo);
    setNewStyleSheet(true);
    console.log(mediaQueryParsed, 'mediaQueryParsed');
    console.log(styleSheet, 'styleSheet');
    console.log(mediaQueryInfo, 'mediaQueryInfo');
  }





  async function init() {
    const styleSheetInit = await findStyleSheet();
    console.log(styleSheetInit, 'styleSheet from useWorker');
    setStyleSheet(styleSheetInit);

    let mediaQueryInfo = {};



    for (let i = 0; i < Object.keys(styleSheetInit).length; i++) {
      const mediaQuery = styleSheetInit[i].conditionText;
      let cssRules = styleSheetInit[i].cssText
      mediaQueryInfo[mediaQuery] = cssRules;
    }

    setMediaQueryParsed(mediaQueryInfo);

    //check to see if there are no workers
    if (workers.length === 0) {
      const styleSheetLength = Object.keys(styleSheetInit).length;
      console.log(`Creating ${styleSheetLength} workers....`);

      // Create an array to hold the workers
      const arr = [];

      for (let i = 0; i < styleSheetLength; i++) {
        // const response = await fetch(chrome.runtime.getURL('worker.js'));
        // const text = await response.text();
        // const workerBlob = new Blob([text], { type: 'application/javascript' });

        const workerResponse = await fetch(chrome.runtime.getURL('workerBundle.js'));
        const workerText = await workerResponse.text();

        const workerBlob = new Blob([workerText], { type: 'application/javascript' });
        const combinedBlob = new Blob([workerBlob], { type: 'application/javascript' });

        // Create a new object URL for the combined blob
        const workerUrl = URL.createObjectURL(combinedBlob);

        // Create a new worker instance with the combined blob URL
        const worker = new Worker(workerUrl,
          {
            type: 'module',
            header: {
              'Content-Type': 'application/javascript',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',

            }
          });


        worker.onmessage = (event) => {
          console.log(event.data, 'event.data');
        };

        arr.push(worker);
      }


      console.log(arr, 'arr');
      createIndexedDB(designUrl, mediaQueryInfo);

      setWorkers(arr);
      return arr;
    } else {
      return workers;
    }

  }

  const runWorkers = (classNames) => {


    if (workers.length > 0) {
      const workerPromises = workers.map((worker, index) => {
        return new Promise((resolve) => {

          worker.onmessage = (event) => {
            resolve(event.data);
          };


          if (mediaQueryParsed) {
            try {
              const message = {
                type: 'find',
                designUrl: designUrl,
                conditionText: Object.keys(mediaQueryParsed)[index],
                payload: Object.values(mediaQueryParsed)[index],
                classNames: classNames,
                worker: index,
                flag: 'normal'

              };

              if (newStyleSheet) {
                message.flag = 'update';
              }

              console.log('%cmessage', 'color: lightblue; font-size: 14px', message);

              worker.postMessage(JSON.stringify(message));
              setNewStyleSheet(false);


            } catch (error) {
              console.log(error, 'error trying to send to worker');
            }
          }
        });
      });

      const startTime = performance.now();
      return Promise.all(workerPromises)
        .then((infoArr) => {
          const endTime = performance.now();
          console.log(`Execution time: ${endTime - startTime} milliseconds`);
          console.log(infoArr, 'infoArr');
          return infoArr;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return { runWorkers, init, changeStyleSheet };

}


async function createIndexedDB(designUrl, mediaQueries) {
  const dbName = designUrl;

  let db;
  const request = indexedDB.open(dbName, 1);
  const mediaQueriesParsed = JSON.parse(JSON.stringify(mediaQueries));


  request.onerror = (event) => {
    console.error("Why didn't you allow my web app to use IndexedDB?!");
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log('db', db.objectStoreNames);

  };


  request.onupgradeneeded = (event) => {
    // Save the IDBDatabase interface

    console.log(chalk.blue('onupgradeneeded'));
    const db = event.target.result;

    // Loop over each media query in the JSON object
    for (const query in mediaQueriesParsed) {
      // Check if the object store already exists in the database
      if (!db.objectStoreNames.contains(query)) {
        console.log('creating object store', query);
        // If it doesn't exist, create the object store
        const store = db.createObjectStore(query, { keyPath: "className" });
        // Loop over each style object in the media query
      }
    }
  };



}




