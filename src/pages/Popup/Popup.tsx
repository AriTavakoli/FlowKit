import React, { useState, useEffect } from 'react';
// import Greetings from '../../containers/Greetings/Greetings';
import App from '../../components/index';
import SearchProvider from '@Context/SearchProvider';
import parseHTMLString from '@src/components/Webflow/Features/TreeView/Algo';
import './Popup.css';
import { GlobalProvider } from '@Context/Global/GlobalProvider';
import { ThemeProvider } from '@Context/Global/ThemeProvider';

const Popup = () => {

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
