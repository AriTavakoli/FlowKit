import { printLine } from './modules/print';
import axios from 'axios';
import * as ReactDOM from 'react-dom/client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import WebflowExporter from '@Utils/WebflowExporter';
import Network from '@src/Utils/Network/Network';
import UrlExtractor from '@Utils/UrlExtractor';
import MessageFactory from '@src/Utils/MessageFactory';
import { findStyleSheet } from './TreeParser';
// import MutationObserver from '@Utils/MutationObservers';
// import parseHTMLString from '@Features/TreeView/Algo';
import CustomMutation from '@Utils/MutationObservers';
import parseHTMLString from './TreeParser';
import useWeb from './Service/hooks/useWorkersV2';
import '@Global/styles/dark.scss';
console.log('Content script ggworks!');
console.log('Must reload extension for modifications to take effect.');


const App = () => {
  let port;

  const [siteUrls, setSiteUrls] = useState({ siteUrl: '', refresh: 0 });

  const [styleSheet, setStyleSheet] = useState({ styleSheet: '', refresh: 0 });
  const [liveStreamStyles, setLiveStreamStyles] = useState();
  const [foundLiveElements, setFoundLiveElements] = useState();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [currentElements, setCurrentElements] = useState('');
  const [sideBarReady, setSideBarReady] = useState(false);

  const [run, setRun] = useState(false);


  const [websiteData, setWebsiteData] = useState({});

  const [result, setResult] = useState();
  const [selector, setSelector] = useState(['.navbar-logo-center-container', '.gallery-scroll', '.container-3', '.gallery-sticky', '.team-circles',]);

  let arr = ['selector3', 'selector2', ['.navbar-logo-center-container', '.gallery-scroll', '.container-3', '.gallery-sticky', '.team-circles', 'selector234', 'selector22', 'selector5000', 'selector292']]


  const {
    init,
    runWorkers,
    changeStyleSheet
  } = useWeb(new UrlExtractor(document.location.href).extractDesignUrl());


  useEffect(() => {

    async function getResults() {
      console.log('running');
      console.log(selector, 'selector');
      const result = await runWorkers(selector);
      console.log(result, 'result');
      setResult(result);
    }

    if (run) {
      getResults();
    }


  }, [run]);



  useEffect(() => {
    (async () => {
      if (websiteData) {
        console.log(websiteData, 'websiteData');

        const response = await chrome.runtime.sendMessage({ type: 'websiteData', payload : websiteData });

        console.log(response);
      }
    })();

  }, [websiteData]);



  const handleSelector = () => {
    setSelector(['navbar-logo-center-container', '.navbar-logo-center-container']);
  }





  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          "from the extension");
        if (request.designUrl) {
          console.log(request.designUrl, "Request Url ");
          sendResponse({ message: "Got the url " });
        }
      }
    );
  }, [])



  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      function (request, sender, sendResponse) {
        if (request.message === 'updateStyleSheet') {
          changeStyleSheet();
        }
        console.log('%crequesssssst', 'color: red; font-size: 20px', request);
      }
    );
  }, [])



  useEffect(() => {
    console.log(siteUrls, 'SITE URL ---------<>');
  }, [siteUrls])





  // useEffect(() => {

  //   //loop through currentStyles and run it through searchstyles and then push the result to an array and set the final array to foundElements
  //   let foundElements = [];

  //   if (liveStreamStyles) {
  //     for (let i = 0; i < liveStreamStyles.length; i++) {
  //       let element = SearchStyleSheet(liveStreamStyles[i]);
  //       foundElements.push(element);
  //     }
  //     setFoundLiveElements(foundElements);
  //     console.log(foundElements, 'foundElements');
  //   }

  // }, [liveStreamStyles, refreshCounter])







  useEffect(() => {
    // console.log(liveStreamStyles, 'liveStreamStyles');
    // console.log(currentElements, 'currentElements');

    (async () => {
      if (foundLiveElements) {
        console.log(foundLiveElements, 'foundLiveElements');
        let foundClassNames = await runWorkers(foundLiveElements.parsed.classNamesArray)

        const response = await chrome.runtime.sendMessage({ type: 'cssTree', css: foundLiveElements, foundClassNames: JSON.stringify(foundClassNames), });

        console.log(JSON.parse(JSON.stringify(foundClassNames)), 'foundClassNames');
        console.log(response);
      }
    })();



    (async () => {
      const response = await chrome.runtime.sendMessage({ css: foundLiveElements });
      // do something with response here, not outside the function
      console.log(response);
    })();


  }, [refreshCounter, foundLiveElements, liveStreamStyles,])



  useEffect(() => {

    (async () => {
      const response = await chrome.runtime.sendMessage({ styleSheet: styleSheet.styleSheet });
      // do something with response here, not outside the function
      console.log(response);
    })();


  }, [styleSheet])



  useEffect(() => {
    const observer =
      CustomMutation.observeDomForSidebar(function () {
        setSideBarReady(true);
      });
    return () => {
      observer.disconnect();
    };
  }, []);



  const networkRequest = async () => {

    let designUrl = new UrlExtractor(document.location.href).extractDesignUrl();

    const exporter = new WebflowExporter(designUrl);

    exporter.export()
      .then(async (data) => {
        console.log(data.status.data.url, 'data');
        if (data.status.data.url) {
          const jsonData = await exporter.fetchJson(data.status.data.url)


            console.log('%cparsed', 'color: lightblue; font-size: 24px', jsonData);
            setWebsiteData(jsonData)



          setStyleSheet({ styleSheet: jsonData.data.css, refresh: Math.random });
          //  console.log(jsonData.data.css, typeof(jsonData.data.css),'jsonData');
        }
        console.log('Export task completed successfully.');
      })
      .catch((error) => {
        console.error('Export task failed:', error);
      });



  }

  const CreateTab = async () => {
    // // post message to background.js
    // (async () => {
    // const response = await chrome.runtime.sendMessage({ message: "createPopup" });

    const response = await MessageFactory.CreateMessage("message", "createPopup");
    // do something with response here, not outside the function
    // setSiteUrl({response.message : Math.random});
    setSiteUrls({ siteUrl: response.message, refresh: Math.random });
    setRefreshCounter((prevCounter) => prevCounter + 1);
    console.log(response, 'Tab Created & site Url now');
    // })();
    // MessageFactory.sendMessage()
    port = chrome.runtime.connect({ name: "myConnectionName" });
    // classMutationObserver();



    captureEventTarget();


    init();



  }

  //


  const updateTab = () => {

    (async () => {
      const response = await chrome.runtime.sendMessage({ message: "updatePopup" });
      console.log(response, 'Tab Updated');
    })();
  };


  useEffect(() => {
    if (siteUrls.siteUrl) {
      networkRequest(siteUrls.siteUrl);
    }
  }, [siteUrls])


  function captureEventTargetSideBar() {
    const element = document.querySelector('#right-sidebar');
    if (element) {
      const events = ['click', 'resize', 'mousedown', 'dblclick', 'change', 'drag', 'dragstart', 'touchstart',]; // add more events as needed
      events.forEach((eventName) => {
        element.addEventListener(eventName, (event) => {
          try {
            console.time('findStyleSheet')
            // findStyleSheet();
            console.log('Event triggered on side-bar element:', event.type, event.target);
            console.timeEnd('findStyleSheet')
          } catch (error) {
            console.error('Error in captureEventTargetSideBar() function:', error);
          }
        });
      });
    }
  }

  async function captureEventTarget() {
    let iframe = document.querySelector('#site-iframe-next')
    if (iframe) {
      iframe.contentWindow.addEventListener('click', async (event) => {
        console.log('Element clicked in iframe:', event.target);

        let parsedEvent = elementToString(event.target);

        let parsed = parseHTMLString(parsedEvent.toString());

        console.log('%cparsed', 'color: red; font-size: 14px', parsed);

        let styleSheet = await findStyleSheet();

        console.log(styleSheet, 'styleSheet');

        console.log(JSON.stringify(styleSheet), 'parsed');

        let message = {
          parsed: parsed,
          styleSheet: styleSheet
        }

        setFoundLiveElements(message)

      });

    }



  }

  function elementToString(element) {
    // Create a temporary div element
    var tempDiv = document.createElement('div');

    // Append the passed element to the temp div
    tempDiv.appendChild(element.cloneNode(true));

    // Return the innerHTML of the temp div
    return tempDiv.innerHTML;
  }


  function classMutationObserver() {
    // Select the node that will be observed for mutations
    const target = document.body;
    // Options for the observer (which mutations to observe)
    const config = { childList: true, subtree: true };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutations) => {
      const elArr = []
      const nodeArr = []

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node.querySelector("[data-automation-id='style-rule-token-text']");
              if (element) {
                // console.log("New element: ", element);
                // console.log(element, 'element');
                if (element.innerText.length > 0) {
                  console.log(element.innerText, 'element.innerText');
                  elArr.push(element.innerText);
                  nodeArr.push(element);
                }
                console.log(elArr, 'elARr pre setState');
                setLiveStreamStyles(elArr)
                setCurrentElements(nodeArr)
              }
            }
          });
        }
      });
    });

    // Start observing the target node for configured mutations
    observer.observe(target, config);
  }


  function moveWindowToLeft() {
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.windows.update(currentWindow.id, {
        left: 0,
        top: 0
      });
    });
  }


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={() => { CreateTab() }}>Create Tab</button>
    </div>
  );
};


const body = document.querySelector('body')
const app = document.createElement('div')


app.id = 'react-root'

if (body) {
  body.prepend(app)
}

const container = document.getElementById('react-root');
const root = ReactDOM.createRoot(container);

root.render(<App />)






// add react to page


