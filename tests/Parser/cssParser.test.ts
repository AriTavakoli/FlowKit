// @ts-nocheck
import CssParser from '../../src/Utils/Parser/css/CssParser'
import { expect, jest, test, describe, it } from '@jest/globals';

const sampleCSS = `
body {
  background-color: white;
}

@media screen and (min-width: 480px) {
  body {
    background-color: blue;
  }
}

#main-content {
  color: red;
}

.class-selector {
  font-size: 18px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@font-face {
  font-family: 'Roboto';
  src: url('Roboto-Regular.ttf');
}
`;

const css = `
  .class1 { color: red; }
  #id1 { font-size: 20px; }
  @media screen and (max-width: 600px) {
    .class1 { color: blue; }
    #id1 { font-size: 15px; }
  }
`;

const parser = new CssParser(css);

console.log('--- Extract ID selectors ---');
console.log(parser.extractIdSelectors());

console.log('--- Extract class selectors ---');
console.log(parser.extractClassSelectors());

console.log('--- Extract keyframes rules ---');
console.log(parser.extractKeyframesRules());

console.log('--- Extract font-face rules ---');
console.log(parser.extractFontFaceRules());

console.log('--- Get CSS media rules for selector .class1 ---');
console.log(parser.getCssMediaRulesForSelectorV2('.class1'));

console.log('--- Get all CSS media rules ---');
console.log(parser.getAllCssMediaRules());

console.log('--- Group rules by media ---');
console.log(parser.groupRulesByMedia());

console.log('--- Filter factory with extraction type "class" ---');
console.log(parser.filterFactory('class'));
