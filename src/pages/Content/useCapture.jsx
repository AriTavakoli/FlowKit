import { useState, useEffect } from 'react';
import captureEventTarget from './modules/captureEventTarget.js';
import searchStyleSheet from './modules/searchStyleSheet.js';
import parseHTMLString from './modules/parseHTMLString.js';

function useCapturedElements() {
  const [capturedElements, setCapturedElements] = useState([]);

  useEffect(() => {
    let eventTarget = null;
    let styleSheets = null;

    function handleEvent(event) {
      console.log('Element clicked in iframe:', event.target);
      eventTarget = event.target;
    }

    function findStyleSheet(className) {
      if (!styleSheets) {
        styleSheets = Array.from(document.styleSheets);
      }
      className = '.' + className.replace(/ /g, '-').toLowerCase();
      for (let i = 0; i < styleSheets.length; i++) {
        const rules = styleSheets[i].rules || styleSheets[i].cssRules;
        for (let j = 0; j < rules.length; j++) {
          if (rules[j].selectorText.includes(className)) {
            return rules[j].cssText;
          }
        }
      }
      return null;
    }

    function parseHTMLStringWrapper(htmlString, maxDepth = 4) {
      return parseHTMLString(htmlString, maxDepth, findStyleSheet);
    }

    function handleCapturedElements() {
      const newElements = captureEventTarget(eventTarget, parseHTMLStringWrapper);
      setCapturedElements(newElements);
    }

    const iframe = document.querySelector('#site-iframe-next');
    if (iframe) {
      iframe.contentWindow.addEventListener('click', handleEvent);
      return () => {
        iframe.contentWindow.removeEventListener('click', handleEvent);
      };
    }

    return () => {};
  }, []);

  return capturedElements;
}

export default useCapturedElements;
