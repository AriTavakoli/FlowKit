import React, { useState, useEffect } from 'react';
// import Greetings from '../../containers/Greetings/Greetings';
import App from '../../components/index';
import SearchProvider from '@Context/SearchProvider';
import parseHTMLString from '@src/components/Webflow/Features/TreeView/Algo';
import './Popup.css';

const Popup = () => {

  let str2 = '<img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124a55c612aae2_portfolio%202%20-%20wide.svg" loading="lazy" data-wf-id="[&quot;12afc27f-411c-f77d-8ec6-31c195e062ca&quot;]" data-w-id="12afc27f-411c-f77d-8ec6-31c195e062ca" alt="" class="team-member-image"> parsedEvent'


  let html = parseHTMLString(str2);

  const [isIconClickPopup, setIsIconClickPopup] = useState(false);

  useEffect(() => {
    // Check the type of the current window
    chrome.windows.getCurrent((window) => {
      if (window.type === 'popup') {
        // The popup is opened as an extension's action popup (icon click popup)
        setIsIconClickPopup(false);
      } else {
        // The popup is opened as a standalone window popup
        setIsIconClickPopup(true);
      }
    });
  }, []);


  const [data, setData] = useState();
  const [css, setCss] = useState(data);
  const [styleSheet, setStyleSheet] = useState();


  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      // console.log(request.css, 'css');
      if (request.css) {
        setCss(request.css);
      }
    }
  );

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.styleSheet) {
        // console.log(request.styleSheet, 'stylesheet');
        setStyleSheet(request.styleSheet);
      }
    }
  );


  return (
    <div className={isIconClickPopup ? "cornerWidget" : ""}>
      <SearchProvider>
        <App styleSheet={styleSheet} css={css} ></App>
      </SearchProvider>
    </div>
  );
};

export default Popup;
