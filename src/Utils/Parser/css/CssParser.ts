
export default class CssParser {
  styleSheet: CSSStyleSheet;


  constructor(cssStyleSheet: string) {
    this.styleSheet = new CSSStyleSheet();
    this.styleSheet.replaceSync(cssStyleSheet);
  }


  getCssMediaRulesForSelectorV2(selector: string): Record<string, Record<string, string>> {
    const cssRules = this.styleSheet.cssRules;
    const result: Record<string, Record<string, string>> = {};
    const mediaRules: Record<string, Record<string, string>> = {};

    for (let i = 0; i < cssRules.length; i++) {
      const rule = cssRules[i];

      if (rule instanceof CSSMediaRule) {
        const conditions = rule.conditionText.split(',');

        for (let j = 0; j < rule.cssRules.length; j++) {
          const subRule = rule.cssRules[j];

          if (subRule instanceof CSSStyleRule && subRule.selectorText === selector) {
            const cssText = subRule.cssText;

            conditions.forEach(conditionText => {
              const condition = conditionText.trim();

              if (!mediaRules[condition]) {
                mediaRules[condition] = {};
              }

              if (!mediaRules[condition][selector]) {
                // @ts-ignore
                mediaRules[condition][selector] = {};
              }
              // @ts-ignore
              mediaRules[condition][selector].default = cssText;
            });
          }
        }
      } else if (rule instanceof CSSStyleRule && rule.selectorText === selector) {
        if (!mediaRules.default) {
          mediaRules.default = {};
        }

        if (!mediaRules.default[selector]) {
          // @ts-ignore
          mediaRules.default[selector] = {};
        }
        // @ts-ignore
        mediaRules.default[selector].default = rule.cssText;
      }
    }

    for (const condition in mediaRules) {
      if (Object.prototype.hasOwnProperty.call(mediaRules, condition)) {
        const selectors = mediaRules[condition];

        for (const selector in selectors) {
          if (Object.prototype.hasOwnProperty.call(selectors, selector)) {
            // @ts-ignore
            const cssText = selectors[selector].default;

            if (cssText) {
              if (!result[selector]) {
                result[selector] = {};
              }

              result[selector][condition] = cssText;
            }
          }
        }
      }
    }

    if (!result[selector]) {
      result[selector] = {};
    }

    return result;


  }

  getAllCssMediaRules(): { selector: string, css: object }[] {
    const cssRules = this.styleSheet.cssRules;
    const result = [];

    for (let i = 0; i < cssRules.length; i++) {
      const rule = cssRules[i];

      if (rule instanceof CSSStyleRule) {
        const selector = rule.selectorText.trim();
        const mediaRules = this.getCssMediaRulesForSelectorV2(selector);

        if (Object.keys(mediaRules).length > 0) {
          const cssObj = mediaRules[selector];
          result.push({ selector, css: cssObj });
        }
      }
    }

    return result;
  }

  createSearchIndex() {

  }


  filterFactory(extractionType: string) {
    const result = [];

    let filterType;

    switch (extractionType) {
      case 'id':
        filterType = this.extractIdSelectors();
        break;
      case 'class':
        filterType = this.extractClassSelectors();
        break;
      case 'keyFrames':
        filterType = this.extractKeyframesRules();
        break;
      case 'font':
        filterType = this.extractFontFaceRules();
        break;
      case 'all':
        return this.getAllCssMediaRules();
      default:
        return this.getAllCssMediaRules();
    }
    for (let i = 0; i < filterType.length; i++) {
      const selector = filterType[i];
      const mediaRules = this.getCssMediaRulesForSelectorV2(selector);

      if (Object.keys(mediaRules).length > 0) {
        const cssObj = mediaRules[selector];
        result.push({ selector, css: cssObj });
      }
    }
    return result;
  }



  extractIdSelectors() {
    const idSelectors = [];
    // Loop through each rule in the stylesheet
    for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
      const rule = this.styleSheet.cssRules[i];

      // Check if the rule is a CSSStyleRule and starts with an ID selector
      if (rule instanceof CSSStyleRule && rule.selectorText.startsWith('#')) {
        // Extract the ID selector and add it to the array
        const idSelector = rule.selectorText.trim();
        idSelectors.push(idSelector);
      }
    }
    return idSelectors;
  }

  extractClassSelectors() {
    const classSelectors = [];
    // Loop through each rule in the stylesheet
    for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
      const rule = this.styleSheet.cssRules[i];


      // Check if the rule is a CSSStyleRule and starts with an ID selector
      if (rule instanceof CSSStyleRule && rule.selectorText.startsWith('.')) {
        // Extract the ID selector and add it to the array
        const classSelector = rule.selectorText.trim();
        classSelectors.push(classSelector);
      }
    }
    return classSelectors;
  }


  extractKeyframesRules() {
    const keyframesRules = [];
    // Loop through each rule in the stylesheet
    for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
      const rule = this.styleSheet.cssRules[i];
      // Check if the rule is a CSSKeyframesRule
      if (rule instanceof CSSKeyframesRule) {
        // Extract the keyframes rule and add it to the array
        const keyframesRule = rule.cssText.trim();
        keyframesRules.push(keyframesRule);
      }
    }
    return keyframesRules;
  }

  extractFontFaceRules() {
    const fontFaceRules = [];
    // Loop through each rule in the stylesheet
    for (let i = 0; i < this.styleSheet.cssRules.length; i++) {
      const rule = this.styleSheet.cssRules[i];
      // Check if the rule is a CSSFontFaceRule
      if (rule instanceof CSSFontFaceRule) {
        // Extract the font-face rule and add it to the array
        const fontFaceRule = rule.cssText.trim();
        fontFaceRules.push(fontFaceRule);
      }
    }
    return fontFaceRules;
  }





  groupRulesByMedia() {

    const mediaRules: { [key: string]: string[] } = {};

    for (const rule of this.styleSheet.cssRules) {
      if (rule instanceof CSSMediaRule) {
        const mediaQuery: string = rule.media.mediaText;
        mediaRules[mediaQuery] = [];
        for (const subRule of rule.cssRules) {
          if (subRule instanceof CSSStyleRule) {
            mediaRules[mediaQuery].push(subRule.cssText);
          }
        }
      } else if (rule instanceof CSSStyleRule) {
        if (!mediaRules.default) {
          mediaRules.default = [];
        }
        mediaRules.default.push(rule.cssText);
      }
    }

    return mediaRules;
  }







}