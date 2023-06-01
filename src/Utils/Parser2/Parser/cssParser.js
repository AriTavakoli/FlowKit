
import { parse, walk, find, findAll, generate } from 'css-tree';
// import css from '../test.text';


export default class CssParser {
  getAllCssMediaRules() {
      throw new Error('Method not implemented.');
  }

  constructor(css) {
    this.css = css;
  }

  /**
   * Parses CSS text and creates an object representation of it.
   *
   * @param {string} cssText - The CSS text to be parsed.
   * @param {string} className - The class name to search for in the CSS text.
   * @return {Object} An object representation of the CSS text, with the specified class name as the root.
   */
  parseCssTree(cssText = '', className = '') {
    // Check if the input is valid

    if (typeof cssText !== 'string' || cssText === '') {
      return {};
    }
    if (typeof className !== 'string' || className === '') {
      return {};
    }

    let obj = {};

    try {
      // Parse the CSS text and create an AST representation of it
      const ast = parse(cssText);

      const rules = findAll(ast, (node, item, list) =>
        node.type === 'Rule'
      );

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        // Check if the class name exists
        if (!rule.prelude.children.head || !rule.prelude.children.head.data) {
          continue;
        }

        let classNames = rule.prelude.children.head.data.children.head.data.name;

        // Check if the class name matches the provided className
        if (classNames === className) {
          let children = generate(rule);
          obj[className] = children;
        }
      }
    } catch (error) {
      // Handle any errors that might occur
      console.error(error);
      return {};
    }

    return obj;
  }



  getClassNames(cssString) {
    const ast = parse(cssString, {
      context: 'declarationList'
    });

    const classNames = [];

    walk(ast, {
      visit: 'ClassSelector',
      enter: (node) => {
        classNames.push(node.name);
      }
    });

    return classNames;
  }

  // Output: ['.modalitem']





  /**
   * Extracts all the media queries from the CSS text.
   *
   * @return {Array} An array of all the media queries present in the CSS text.
   */
  getMediaQueries(css) {
    const ast = parse(css);
    const mediaQueries = []


    walk(ast, (node) => {
      if (node.type === 'Atrule' && node.name === 'media') {
        // console.log(node);
        // get the media query
        const mediaQuery = `@media ${generate(node.prelude)}`
        mediaQueries.push(generate(node))
      }
    });
    console.log(mediaQueries, 'mediaQueries');
    return mediaQueries;
  }


  getKeyFrames(css) {
    const ast = parse(css);
    const keyframes = [];

    walk(ast, (node) => {
      if (node.type === 'Atrule' && node.name === 'keyframes') {
        // get the keyframes name
        const keyframesName = `@keyframes ${generate(node.prelude)}`;
        keyframes.push(generate(node));
      }
    });

    return keyframes;
  }

  getAnimations(css) {
    const ast = parse(css);
    const animations = [];

    walk(ast, (node) => {
      if (node.type === 'Rule' && node.name === 'animation') {
        animations.push(generate(node));
      }
    });

    return animations;
  }

  findElementById(css, id) {
    const ast = parse(css);
    let element = null;

    walk(ast, (node) => {
      if (node.type === 'Rule' && node.prelude && node.prelude.type === 'SelectorList' && node.prelude.children && node.prelude.children.head && node.prelude.children.head.data && node.prelude.children.head.data.children && node.prelude.children.head.data.children.head) {
        const idSelector = node.prelude.children.head.data.children.head.data;

        if (idSelector.type === 'IdSelector' && idSelector.name === id) {
          element = generate(node);
        }
      }
    });

    return element;
  }



  // returns all elements
  parseAllSelectors(css) {
    const ast = parse(css);
    const selectors = [];

    walk(ast, (node) => {
      if (node.type === 'Rule' && node.prelude && node.prelude.type === 'SelectorList' && node.prelude.children && node.prelude.children.head && node.prelude.children.head.data && node.prelude.children.head.data.children && node.prelude.children.head.data.children.head) {
        const selector = node.prelude.children.head.data.children.head.data;

        if (selector.type === 'IdSelector' || selector.type === 'ClassSelector' || selector.type === 'TypeSelector') {
          selectors.push(generate(selector));
        }
      }
    });

    return selectors;
  }





  getSelectorDeclarations(css, selector, returnStylesheetFormat = false) {
    const ast = parse(css);
    let declarations = [];

    walk(ast, (node) => {
      if (node.type === 'Rule' && node.prelude && node.prelude.type === 'SelectorList' && node.block && node.block.children) {
        node.prelude.children.forEach((sel) => {
          if (sel.type === 'Selector' && generate(sel) === selector) {
            // Extract all declarations for the specified selector
            node.block.children.forEach((declaration) => {
              // Use the generate function to get the string representation of the declaration
              declarations.push(generate(declaration));
            });
          }
        });
      }
    });

    if (returnStylesheetFormat) {
      // Return the declarations in a stylesheet format
      return `${selector} {\n  ${declarations.join('\n  ')}\n}`;
    } else {
      return declarations;
    }
  }



  getSelectorDeclarationsV2(css, selector) {
    const ast = parse(css);
    const declarations = [];

    function traverse(node) {
      if (node.type === 'Rule' && node.prelude && node.prelude.type === 'SelectorList' && node.block && node.block.children) {
        node.prelude.children.forEach((sel) => {
          if (sel.type === 'Selector' && generate(sel) === selector) {
            // Extract all declarations for the specified selector
            node.block.children.forEach((declaration) => {
              // Use the generate function to get the string representation of the declaration
              declarations.push(generate(declaration));
            });
          }
        });
      }

      // Recursively traverse the children nodes
      if (node.children) {
        node.children.forEach((child) => traverse(child));
      }
    }

    traverse(ast);

    return declarations;
  }

  // prelude.children.head.data.children.head


  isEqualMediaQuery(mediaQuery1, mediaQuery2) {
    const parsedMediaQuery1 = this.parseMediaQuery(mediaQuery1);
    const parsedMediaQuery2 = this.parseMediaQuery(mediaQuery2);
    return parsedMediaQuery1 === parsedMediaQuery2;
  }





  parseMediaQuery(mediaQueryString) {
    if (!mediaQueryString || mediaQueryString.trim() === '') {
      return null;  // handle empty media query string
    }

    const openBraceIndex = mediaQueryString.indexOf('{');
    if (openBraceIndex < 0) {
      return mediaQueryString;  // handle media query string without '{' character
    }

    return mediaQueryString.substring(0, openBraceIndex);
  }



  extractRelevantClasses(classNames = [], mediaQueryArr) {
    const relevantClasses = {};

    for (let i = 0; i < classNames.length; i++) {
      const className = classNames[i];

      for (let j = 0; j < mediaQueryArr.length; j++) {
        const mediaQuery = mediaQueryArr[j];

        const parsed = this.parseCssTree(mediaQuery, className);

        if (parsed) {
          const mediaQueryKey = this.parseMediaQuery(mediaQuery);
          if (!relevantClasses[mediaQueryKey]) {
            relevantClasses[mediaQueryKey] = [];
          }
          relevantClasses[mediaQueryKey].push(parsed);
        }
      }
    }

    return relevantClasses;
  }


  createMediaComponent(relevantClassesObj) {
    let mediaString = '';

    for (const key in relevantClassesObj) {
      if (relevantClassesObj.hasOwnProperty(key)) {
        const element = relevantClassesObj[key];
        mediaString += key + '{';
        // eslint-disable-next-line no-loop-func
        element.forEach((elem) => {
          for (const classKey in elem) {
            if (elem.hasOwnProperty(classKey)) {
              const classValue = elem[classKey];
              mediaString += classValue + 'sdsd';
            }
          }
        });
        mediaString += '}';
      }
    }

    return mediaString;
  }



  createCssString(cssText, relevantClassesArr) {
    let cssString = '';
    relevantClassesArr.forEach((className) => {
      const parsedCssTree = this.parseCssTree(cssText, className);
      for (const classKey in parsedCssTree) {
        if (parsedCssTree.hasOwnProperty(classKey)) {
          const classValue = parsedCssTree[classKey];
          cssString += classValue;
        }
      }
    });
    return cssString;
  }


  createCssComponent = (cssText, relevantClassesArr, relevantClassesObj) => {


    return this.createCssString(cssText, relevantClassesArr) + this.createMediaComponent(relevantClassesObj);


  }
  // prelude.children.head.data.children.head.data.children.head.next.next.data.name;






}