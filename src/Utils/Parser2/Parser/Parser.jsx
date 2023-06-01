

import React, { useEffect } from 'react';
import CssParser from './cssParser';
import css from '../css.txt'
import cssString from './cssString';
export default function Parser() {

  function getStyles() {
    const cssParser = new CssParser(css);
    // console.log(cssString);
    // console.log(cssParser.getMediaQueries(cssString));


    const string = cssParser.createCssString(css, ['clients-quote-two-copy']);


    // console.log(string, 'string');

    console.log(cssParser.getSelectorDeclarationsV2(cssString, '.clients-quote-two-copy'));

    const el = cssParser.parseAllSelectors(cssString)

    console.log(cssParser.getSelectorDeclarationsV2(cssString, el[1]));

    // console.log(parser.getClassNames(css));

  }

  useEffect(() => {
    getStyles();
  }, [])




  return (
    <div>
      <button onClick={getStyles}>Get Styles</button>
    </div>
  )


}