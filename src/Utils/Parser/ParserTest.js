// import css from '../test.text';
import { parse, generate, walk, findAll, cst } from 'css-tree';
import * as csstree from 'css-tree';
export default class ParserTest {




  static getMediaQueriesForSelector(css, selector) {
    const ast = csstree.parse(css);

    // Define the selector you're interested in
    const targetSelector = selector;

    // Define a flag to indicate whether we're inside the target selector
    let insideTargetSelector = false;

    // Define an object to store the media queries for the target selector
    const mediaQueries = {};

    // Define a visitor function that will be called for each node in the AST
    const visitor = (node, item, list) => {
      if (node.type === 'SelectorList') {
        // Check if this selector list includes the target selector
        const selectors = csstree.generate(node);
        insideTargetSelector = selectors.includes(targetSelector);
      } else if ((node.type === 'Atrule' || node.type === 'WhiteSpace') && node.name === 'media') {
        // This node is a media query that applies to the target selector
        const mediaQuery = csstree.generate(node);

        // Check if we've already seen this media query
        if (!mediaQueries[mediaQuery]) {
          mediaQueries[mediaQuery] = true;
          // console.log(targetSelector, ':', mediaQuery);
        }
      }
    };



    // Traverse the AST and call the visitor function for each node
    csstree.walk(ast, visitor);
    return mediaQueries

  }

  static removeNonMatchingSelectors(selector, mediaQuery) {

    // Get the index of the opening brace of the media query
    const openingBraceIndex = mediaQuery.indexOf('{');

    // Get the substring inside the braces
    const selectors = mediaQuery.substring(openingBraceIndex + 1, mediaQuery.length - 1);

    // Split the selectors into an array
    const selectorArray = selectors.split('}');

    // Filter the selector array to only include selectors that match the provided selector
    const matchingSelectors = selectorArray.filter((sel) => sel.includes(selector));

    // Join the matching selectors array back into a single string
    const matchingSelectorsString = matchingSelectors.join('}');

    // Return the media query string with the matching selectors string inside the braces
    return mediaQuery.substring(0, openingBraceIndex + 1) + matchingSelectorsString + '}';
  }

  static extractRelevantMediaQuery(css, selector) {


    let mediaQueries = this.getMediaQueriesForSelector(css, selector);

    let mediaArr = [];

    for (let element in mediaQueries) {
      let parsedMedia = this.removeNonMatchingSelectors(selector, element)
      mediaArr.push(parsedMedia)
    }

    let relevantMediaQueries = [];

    for (let i = 0; i < mediaArr.length; i++) {
      if (mediaArr[i].includes(selector)) {
        relevantMediaQueries.push(mediaArr[i])
      }
    }

    return relevantMediaQueries;



  }



  }