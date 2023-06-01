import React from 'react';
import App from '../../components/index';
import logo from '../../assets/img/logo.svg';
import SearchProvider, { useSearchContext } from '@Context/SearchProvider';
import { useState, useEffect } from 'react';
import './Newtab.css';
import './Newtab.scss';
import { ChatGptProvider } from '@src/components/GPT/Context/ChatGptContext';
import StyleGpt from '@src/components/GPT/GPT';
import MessageFactory from '@src/Utils/MessageFactory';


const Newtab = () => {
  const [data, setData] = useState({});
  const [css, setCss] = useState();
  const [styleSheet, setStyleSheet] = useState();

  useEffect(() => {
    console.log('Stylsheet is updated on Popup');
    console.log(styleSheet, 'styleSheet');
    console.log(css, 'css2');


  }, [css])


  // chrome.runtime.onMessage.addListener(
  //   function (request, sender, sendResponse) {
  //     console.log(request.css, 'css');
  //     setCss(request.css.toString());
  //   }
  // );

  // chrome.runtime.onMessage.addListener(
  //   function (request, sender, sendResponse) {
  //     if (request.styleSheet) {
  //       console.log(request.styleSheet, 'stylesheet');
  //       setStyleSheet(request.styleSheet);
  //     }
  //   }
  // );

  function createPopup() {
    MessageFactory.CreateMessage('message', 'createPopup');
  }


  return (
    <div>

      <button onClick={createPopup}> woa</button>
      <SearchProvider>
        <App styleSheet={styleSheet} css={css} ></App>
      </SearchProvider>
      {/*
      <ChatGptProvider>
        <StyleGpt></StyleGpt>
      </ChatGptProvider> */}


    </div>
  );
};

export default Newtab;
