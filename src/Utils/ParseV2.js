// import css from '../test.text';
import csstree, { parse, generate, walk, findAll, cst } from 'css-tree';


export default class ParseV2 {


  static ast = null;


  static getStylesBySelector(css, selector) {
    if (this.ast === null) {
      this.ast = parse(css);
    }
    let styles = '';

    walk(this.ast, (node) => {
      if (node.type === 'Rule' && node.prelude && node.prelude.type === 'SelectorList' && node.prelude.children && node.prelude.children.head && node.prelude.children.head.data && node.prelude.children.head.data.children && node.prelude.children.head.data.children.head) {
        const selectorNode = node.prelude.children.head.data.children.head.data;

        if ((selectorNode.type === 'ClassSelector' && selectorNode.name === selector) || (selectorNode.type === 'IdSelector' && selectorNode.name === selector) || (selectorNode.type === 'TypeSelector' && selectorNode.name === selector)) {
          styles = generate(node.block);
        }
      }
    });

    return styles;
  }

  static parseAllSelectors(css) {
    if (this.ast === null) {
      this.ast = parse(css);
    }

    const selectors = {};

    walk(this.ast, (node) => {
      if (node.type === 'Rule' && node.prelude && node.prelude.type === 'SelectorList' && node.prelude.children && node.prelude.children.head && node.prelude.children.head.data && node.prelude.children.head.data.children && node.prelude.children.head.data.children.head) {
        const selector = node.prelude.children.head.data.children.head.data;

        if (selector.type === 'IdSelector' || selector.type === 'ClassSelector' || selector.type === 'TypeSelector') {
          const styles = generate(node.block);
          const selectorString = generate(selector);
          selectors[selectorString] = `${selectorString} ${styles} `
        }
      }
    });

    return selectors;
  }




}