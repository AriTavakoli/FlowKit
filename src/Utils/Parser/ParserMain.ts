// import css from '../test.text';
import { parse, generate, walk, findAll, CssNode, EnterOrLeaveFn, List, } from 'css-tree';
import * as csstree from 'css-tree';
import stripCssComments from 'strip-css-comments';

export default class ParserTestMain {


  // gets all the media queries available
  public static getAllMediaQueries(css: string, selector: string): string[] {
    const ast = csstree.parse(css);

    // Define the selector you're interested in
    const targetSelector = selector;

    // Define a flag to indicate whether we're inside the target selector
    let insideTargetSelector = false;

    // Define an array to store the media queries for the target selector
    const mediaQueries: string[] = [];

    // Define a visitor function that will be called for each node in the AST
    const visitor: EnterOrLeaveFn<CssNode> = (node, item, list: List<CssNode>) => {
      if (node.type === 'SelectorList') {
        // Check if this selector list includes the target selector
        const selectors = csstree.generate(node);
        insideTargetSelector = selectors.includes(targetSelector);
      } else if (node.type === 'Atrule' && node.name === 'media') {
        // This node is a media query that applies to the target selector
        const mediaQuery = csstree.generate(node);

        // Check if we've already seen this media query
        if (!mediaQueries.includes(mediaQuery)) {
          mediaQueries.push(mediaQuery);
        }
      }
    };

    // Traverse the AST and call the visitor function for each node
    csstree.walk(ast, visitor);

    return mediaQueries;
  }


  static extractMediaQuerySize(cssString: string) {
    const regex = /@media\s+screen\s+and\s+\(min-width:\s*(\d+)px\)\s+and\s+\(max-width:\s*(\d+)px\)/;
    const match = cssString.match(regex);
    return match && { minSize: match[1], maxSize: match[2] };
  }



  static getRulesFromMediaQuery(css: string) {
    // Parse the CSS string using a CSS parser
    const ast = csstree.parse(css);

    // Find the first media query in the AST
    let mediaQuery: string | null = null;
    const rules: string[] = [];
    csstree.walk(ast, (node) => {
      if (node.type === 'Atrule' && node.name === 'media' && node.prelude !== null) {
        // Extract the media query and set the `mediaQuery` variable
        mediaQuery = csstree.generate(node.prelude);
        const mediaQuerySize = this.extractMediaQuerySize(mediaQuery); // Use the regex function here
        mediaQuery = mediaQuerySize ? `${mediaQuerySize.minSize}px-${mediaQuerySize.maxSize}px` : mediaQuery;
        return true;
      } else if (node.type === 'Rule') {
        // Extract the CSS text of the rule and add it to the `rules` array
        const cssText = csstree.generate(node);
        rules.push(cssText);
      }
    });

    return { '@mediaQuery': mediaQuery, rules };
  }


  static getCssBlockForSelector(rules: string[], selector: string) {
    // Find the rule that matches the selector
    const rule = rules.find((r) => r.startsWith(selector));

    if (rule) {
      // Extract the selector and CSS block from the rule
      const selectorText = rule.substring(0, rule.indexOf('{')).trim();
      const cssBlock = rule.substring(rule.indexOf('{') + 1, rule.indexOf('}')).trim();
      const ruleText = `${selectorText} {${cssBlock}}`;
      return { selector: selectorText, block: cssBlock, rule: ruleText };
    } else {
      return null;
    }
  }

  static removeComments(css: string) : string {
    // Remove all comments from the CSS string
    return stripCssComments(css);
  }

  static getCssBlockForSelectorAndMediaQuery(mediaQueryString: string, selector: string) {
    const cssObj = this.getRulesFromMediaQuery(mediaQueryString);

    const rules = cssObj.rules;
    const mediaQuery = cssObj['@mediaQuery'];

    const cssBlock = this.getCssBlockForSelector(rules, selector);

    return { mediaQuery, cssBlock };
  }



}

