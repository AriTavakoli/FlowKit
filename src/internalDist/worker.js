"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/cssom/lib/StyleSheet.js
var require_StyleSheet = __commonJS({
  "node_modules/cssom/lib/StyleSheet.js"(exports) {
    var CSSOM2 = {};
    CSSOM2.StyleSheet = function StyleSheet() {
      this.parentStyleSheet = null;
    };
    exports.StyleSheet = CSSOM2.StyleSheet;
  }
});

// node_modules/cssom/lib/CSSRule.js
var require_CSSRule = __commonJS({
  "node_modules/cssom/lib/CSSRule.js"(exports) {
    var CSSOM2 = {};
    CSSOM2.CSSRule = function CSSRule() {
      this.parentRule = null;
      this.parentStyleSheet = null;
    };
    CSSOM2.CSSRule.UNKNOWN_RULE = 0;
    CSSOM2.CSSRule.STYLE_RULE = 1;
    CSSOM2.CSSRule.CHARSET_RULE = 2;
    CSSOM2.CSSRule.IMPORT_RULE = 3;
    CSSOM2.CSSRule.MEDIA_RULE = 4;
    CSSOM2.CSSRule.FONT_FACE_RULE = 5;
    CSSOM2.CSSRule.PAGE_RULE = 6;
    CSSOM2.CSSRule.KEYFRAMES_RULE = 7;
    CSSOM2.CSSRule.KEYFRAME_RULE = 8;
    CSSOM2.CSSRule.MARGIN_RULE = 9;
    CSSOM2.CSSRule.NAMESPACE_RULE = 10;
    CSSOM2.CSSRule.COUNTER_STYLE_RULE = 11;
    CSSOM2.CSSRule.SUPPORTS_RULE = 12;
    CSSOM2.CSSRule.DOCUMENT_RULE = 13;
    CSSOM2.CSSRule.FONT_FEATURE_VALUES_RULE = 14;
    CSSOM2.CSSRule.VIEWPORT_RULE = 15;
    CSSOM2.CSSRule.REGION_STYLE_RULE = 16;
    CSSOM2.CSSRule.prototype = {
      constructor: CSSOM2.CSSRule
      //FIXME
    };
    exports.CSSRule = CSSOM2.CSSRule;
  }
});

// node_modules/cssom/lib/CSSStyleRule.js
var require_CSSStyleRule = __commonJS({
  "node_modules/cssom/lib/CSSStyleRule.js"(exports) {
    var CSSOM2 = {
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration,
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM2.CSSStyleRule = function CSSStyleRule() {
      CSSOM2.CSSRule.call(this);
      this.selectorText = "";
      this.style = new CSSOM2.CSSStyleDeclaration();
      this.style.parentRule = this;
    };
    CSSOM2.CSSStyleRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSStyleRule.prototype.constructor = CSSOM2.CSSStyleRule;
    CSSOM2.CSSStyleRule.prototype.type = 1;
    Object.defineProperty(CSSOM2.CSSStyleRule.prototype, "cssText", {
      get: function() {
        var text;
        if (this.selectorText) {
          text = this.selectorText + " {" + this.style.cssText + "}";
        } else {
          text = "";
        }
        return text;
      },
      set: function(cssText) {
        var rule = CSSOM2.CSSStyleRule.parse(cssText);
        this.style = rule.style;
        this.selectorText = rule.selectorText;
      }
    });
    CSSOM2.CSSStyleRule.parse = function(ruleText) {
      var i = 0;
      var state = "selector";
      var index;
      var j = i;
      var buffer = "";
      var SIGNIFICANT_WHITESPACE = {
        "selector": true,
        "value": true
      };
      var styleRule = new CSSOM2.CSSStyleRule();
      var name, priority = "";
      for (var character; character = ruleText.charAt(i); i++) {
        switch (character) {
          case " ":
          case "	":
          case "\r":
          case "\n":
          case "\f":
            if (SIGNIFICANT_WHITESPACE[state]) {
              switch (ruleText.charAt(i - 1)) {
                case " ":
                case "	":
                case "\r":
                case "\n":
                case "\f":
                  break;
                default:
                  buffer += " ";
                  break;
              }
            }
            break;
          case '"':
            j = i + 1;
            index = ruleText.indexOf('"', j) + 1;
            if (!index) {
              throw '" is missing';
            }
            buffer += ruleText.slice(i, index);
            i = index - 1;
            break;
          case "'":
            j = i + 1;
            index = ruleText.indexOf("'", j) + 1;
            if (!index) {
              throw "' is missing";
            }
            buffer += ruleText.slice(i, index);
            i = index - 1;
            break;
          case "/":
            if (ruleText.charAt(i + 1) === "*") {
              i += 2;
              index = ruleText.indexOf("*/", i);
              if (index === -1) {
                throw new SyntaxError("Missing */");
              } else {
                i = index + 1;
              }
            } else {
              buffer += character;
            }
            break;
          case "{":
            if (state === "selector") {
              styleRule.selectorText = buffer.trim();
              buffer = "";
              state = "name";
            }
            break;
          case ":":
            if (state === "name") {
              name = buffer.trim();
              buffer = "";
              state = "value";
            } else {
              buffer += character;
            }
            break;
          case "!":
            if (state === "value" && ruleText.indexOf("!important", i) === i) {
              priority = "important";
              i += "important".length;
            } else {
              buffer += character;
            }
            break;
          case ";":
            if (state === "value") {
              styleRule.style.setProperty(name, buffer.trim(), priority);
              priority = "";
              buffer = "";
              state = "name";
            } else {
              buffer += character;
            }
            break;
          case "}":
            if (state === "value") {
              styleRule.style.setProperty(name, buffer.trim(), priority);
              priority = "";
              buffer = "";
            } else if (state === "name") {
              break;
            } else {
              buffer += character;
            }
            state = "selector";
            break;
          default:
            buffer += character;
            break;
        }
      }
      return styleRule;
    };
    exports.CSSStyleRule = CSSOM2.CSSStyleRule;
  }
});

// node_modules/cssom/lib/CSSStyleSheet.js
var require_CSSStyleSheet = __commonJS({
  "node_modules/cssom/lib/CSSStyleSheet.js"(exports) {
    var CSSOM2 = {
      StyleSheet: require_StyleSheet().StyleSheet,
      CSSStyleRule: require_CSSStyleRule().CSSStyleRule
    };
    CSSOM2.CSSStyleSheet = function CSSStyleSheet() {
      CSSOM2.StyleSheet.call(this);
      this.cssRules = [];
    };
    CSSOM2.CSSStyleSheet.prototype = new CSSOM2.StyleSheet();
    CSSOM2.CSSStyleSheet.prototype.constructor = CSSOM2.CSSStyleSheet;
    CSSOM2.CSSStyleSheet.prototype.insertRule = function(rule, index) {
      if (index < 0 || index > this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      var cssRule = CSSOM2.parse(rule).cssRules[0];
      cssRule.parentStyleSheet = this;
      this.cssRules.splice(index, 0, cssRule);
      return index;
    };
    CSSOM2.CSSStyleSheet.prototype.deleteRule = function(index) {
      if (index < 0 || index >= this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      this.cssRules.splice(index, 1);
    };
    CSSOM2.CSSStyleSheet.prototype.toString = function() {
      var result = "";
      var rules = this.cssRules;
      for (var i = 0; i < rules.length; i++) {
        result += rules[i].cssText + "\n";
      }
      return result;
    };
    exports.CSSStyleSheet = CSSOM2.CSSStyleSheet;
    CSSOM2.parse = require_parse().parse;
  }
});

// node_modules/cssom/lib/MediaList.js
var require_MediaList = __commonJS({
  "node_modules/cssom/lib/MediaList.js"(exports) {
    var CSSOM2 = {};
    CSSOM2.MediaList = function MediaList() {
      this.length = 0;
    };
    CSSOM2.MediaList.prototype = {
      constructor: CSSOM2.MediaList,
      /**
       * @return {string}
       */
      get mediaText() {
        return Array.prototype.join.call(this, ", ");
      },
      /**
       * @param {string} value
       */
      set mediaText(value) {
        var values = value.split(",");
        var length = this.length = values.length;
        for (var i = 0; i < length; i++) {
          this[i] = values[i].trim();
        }
      },
      /**
       * @param {string} medium
       */
      appendMedium: function(medium) {
        if (Array.prototype.indexOf.call(this, medium) === -1) {
          this[this.length] = medium;
          this.length++;
        }
      },
      /**
       * @param {string} medium
       */
      deleteMedium: function(medium) {
        var index = Array.prototype.indexOf.call(this, medium);
        if (index !== -1) {
          Array.prototype.splice.call(this, index, 1);
        }
      }
    };
    exports.MediaList = CSSOM2.MediaList;
  }
});

// node_modules/cssom/lib/CSSImportRule.js
var require_CSSImportRule = __commonJS({
  "node_modules/cssom/lib/CSSImportRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule,
      CSSStyleSheet: require_CSSStyleSheet().CSSStyleSheet,
      MediaList: require_MediaList().MediaList
    };
    CSSOM2.CSSImportRule = function CSSImportRule() {
      CSSOM2.CSSRule.call(this);
      this.href = "";
      this.media = new CSSOM2.MediaList();
      this.styleSheet = new CSSOM2.CSSStyleSheet();
    };
    CSSOM2.CSSImportRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSImportRule.prototype.constructor = CSSOM2.CSSImportRule;
    CSSOM2.CSSImportRule.prototype.type = 3;
    Object.defineProperty(CSSOM2.CSSImportRule.prototype, "cssText", {
      get: function() {
        var mediaText = this.media.mediaText;
        return "@import url(" + this.href + ")" + (mediaText ? " " + mediaText : "") + ";";
      },
      set: function(cssText) {
        var i = 0;
        var state = "";
        var buffer = "";
        var index;
        for (var character; character = cssText.charAt(i); i++) {
          switch (character) {
            case " ":
            case "	":
            case "\r":
            case "\n":
            case "\f":
              if (state === "after-import") {
                state = "url";
              } else {
                buffer += character;
              }
              break;
            case "@":
              if (!state && cssText.indexOf("@import", i) === i) {
                state = "after-import";
                i += "import".length;
                buffer = "";
              }
              break;
            case "u":
              if (state === "url" && cssText.indexOf("url(", i) === i) {
                index = cssText.indexOf(")", i + 1);
                if (index === -1) {
                  throw i + ': ")" not found';
                }
                i += "url(".length;
                var url = cssText.slice(i, index);
                if (url[0] === url[url.length - 1]) {
                  if (url[0] === '"' || url[0] === "'") {
                    url = url.slice(1, -1);
                  }
                }
                this.href = url;
                i = index;
                state = "media";
              }
              break;
            case '"':
              if (state === "url") {
                index = cssText.indexOf('"', i + 1);
                if (!index) {
                  throw i + `: '"' not found`;
                }
                this.href = cssText.slice(i + 1, index);
                i = index;
                state = "media";
              }
              break;
            case "'":
              if (state === "url") {
                index = cssText.indexOf("'", i + 1);
                if (!index) {
                  throw i + `: "'" not found`;
                }
                this.href = cssText.slice(i + 1, index);
                i = index;
                state = "media";
              }
              break;
            case ";":
              if (state === "media") {
                if (buffer) {
                  this.media.mediaText = buffer.trim();
                }
              }
              break;
            default:
              if (state === "media") {
                buffer += character;
              }
              break;
          }
        }
      }
    });
    exports.CSSImportRule = CSSOM2.CSSImportRule;
  }
});

// node_modules/cssom/lib/CSSGroupingRule.js
var require_CSSGroupingRule = __commonJS({
  "node_modules/cssom/lib/CSSGroupingRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM2.CSSGroupingRule = function CSSGroupingRule() {
      CSSOM2.CSSRule.call(this);
      this.cssRules = [];
    };
    CSSOM2.CSSGroupingRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSGroupingRule.prototype.constructor = CSSOM2.CSSGroupingRule;
    CSSOM2.CSSGroupingRule.prototype.insertRule = function insertRule(rule, index) {
      if (index < 0 || index > this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      var cssRule = CSSOM2.parse(rule).cssRules[0];
      cssRule.parentRule = this;
      this.cssRules.splice(index, 0, cssRule);
      return index;
    };
    CSSOM2.CSSGroupingRule.prototype.deleteRule = function deleteRule(index) {
      if (index < 0 || index >= this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
      }
      this.cssRules.splice(index, 1)[0].parentRule = null;
    };
    exports.CSSGroupingRule = CSSOM2.CSSGroupingRule;
  }
});

// node_modules/cssom/lib/CSSConditionRule.js
var require_CSSConditionRule = __commonJS({
  "node_modules/cssom/lib/CSSConditionRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule
    };
    CSSOM2.CSSConditionRule = function CSSConditionRule() {
      CSSOM2.CSSGroupingRule.call(this);
      this.cssRules = [];
    };
    CSSOM2.CSSConditionRule.prototype = new CSSOM2.CSSGroupingRule();
    CSSOM2.CSSConditionRule.prototype.constructor = CSSOM2.CSSConditionRule;
    CSSOM2.CSSConditionRule.prototype.conditionText = "";
    CSSOM2.CSSConditionRule.prototype.cssText = "";
    exports.CSSConditionRule = CSSOM2.CSSConditionRule;
  }
});

// node_modules/cssom/lib/CSSMediaRule.js
var require_CSSMediaRule = __commonJS({
  "node_modules/cssom/lib/CSSMediaRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule,
      CSSConditionRule: require_CSSConditionRule().CSSConditionRule,
      MediaList: require_MediaList().MediaList
    };
    CSSOM2.CSSMediaRule = function CSSMediaRule() {
      CSSOM2.CSSConditionRule.call(this);
      this.media = new CSSOM2.MediaList();
    };
    CSSOM2.CSSMediaRule.prototype = new CSSOM2.CSSConditionRule();
    CSSOM2.CSSMediaRule.prototype.constructor = CSSOM2.CSSMediaRule;
    CSSOM2.CSSMediaRule.prototype.type = 4;
    Object.defineProperties(CSSOM2.CSSMediaRule.prototype, {
      "conditionText": {
        get: function() {
          return this.media.mediaText;
        },
        set: function(value) {
          this.media.mediaText = value;
        },
        configurable: true,
        enumerable: true
      },
      "cssText": {
        get: function() {
          var cssTexts = [];
          for (var i = 0, length = this.cssRules.length; i < length; i++) {
            cssTexts.push(this.cssRules[i].cssText);
          }
          return "@media " + this.media.mediaText + " {" + cssTexts.join("") + "}";
        },
        configurable: true,
        enumerable: true
      }
    });
    exports.CSSMediaRule = CSSOM2.CSSMediaRule;
  }
});

// node_modules/cssom/lib/CSSSupportsRule.js
var require_CSSSupportsRule = __commonJS({
  "node_modules/cssom/lib/CSSSupportsRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule,
      CSSConditionRule: require_CSSConditionRule().CSSConditionRule
    };
    CSSOM2.CSSSupportsRule = function CSSSupportsRule() {
      CSSOM2.CSSConditionRule.call(this);
    };
    CSSOM2.CSSSupportsRule.prototype = new CSSOM2.CSSConditionRule();
    CSSOM2.CSSSupportsRule.prototype.constructor = CSSOM2.CSSSupportsRule;
    CSSOM2.CSSSupportsRule.prototype.type = 12;
    Object.defineProperty(CSSOM2.CSSSupportsRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@supports " + this.conditionText + " {" + cssTexts.join("") + "}";
      }
    });
    exports.CSSSupportsRule = CSSOM2.CSSSupportsRule;
  }
});

// node_modules/cssom/lib/CSSFontFaceRule.js
var require_CSSFontFaceRule = __commonJS({
  "node_modules/cssom/lib/CSSFontFaceRule.js"(exports) {
    var CSSOM2 = {
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration,
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM2.CSSFontFaceRule = function CSSFontFaceRule() {
      CSSOM2.CSSRule.call(this);
      this.style = new CSSOM2.CSSStyleDeclaration();
      this.style.parentRule = this;
    };
    CSSOM2.CSSFontFaceRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSFontFaceRule.prototype.constructor = CSSOM2.CSSFontFaceRule;
    CSSOM2.CSSFontFaceRule.prototype.type = 5;
    Object.defineProperty(CSSOM2.CSSFontFaceRule.prototype, "cssText", {
      get: function() {
        return "@font-face {" + this.style.cssText + "}";
      }
    });
    exports.CSSFontFaceRule = CSSOM2.CSSFontFaceRule;
  }
});

// node_modules/cssom/lib/CSSHostRule.js
var require_CSSHostRule = __commonJS({
  "node_modules/cssom/lib/CSSHostRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM2.CSSHostRule = function CSSHostRule() {
      CSSOM2.CSSRule.call(this);
      this.cssRules = [];
    };
    CSSOM2.CSSHostRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSHostRule.prototype.constructor = CSSOM2.CSSHostRule;
    CSSOM2.CSSHostRule.prototype.type = 1001;
    Object.defineProperty(CSSOM2.CSSHostRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@host {" + cssTexts.join("") + "}";
      }
    });
    exports.CSSHostRule = CSSOM2.CSSHostRule;
  }
});

// node_modules/cssom/lib/CSSKeyframeRule.js
var require_CSSKeyframeRule = __commonJS({
  "node_modules/cssom/lib/CSSKeyframeRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule,
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration
    };
    CSSOM2.CSSKeyframeRule = function CSSKeyframeRule() {
      CSSOM2.CSSRule.call(this);
      this.keyText = "";
      this.style = new CSSOM2.CSSStyleDeclaration();
      this.style.parentRule = this;
    };
    CSSOM2.CSSKeyframeRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSKeyframeRule.prototype.constructor = CSSOM2.CSSKeyframeRule;
    CSSOM2.CSSKeyframeRule.prototype.type = 8;
    Object.defineProperty(CSSOM2.CSSKeyframeRule.prototype, "cssText", {
      get: function() {
        return this.keyText + " {" + this.style.cssText + "} ";
      }
    });
    exports.CSSKeyframeRule = CSSOM2.CSSKeyframeRule;
  }
});

// node_modules/cssom/lib/CSSKeyframesRule.js
var require_CSSKeyframesRule = __commonJS({
  "node_modules/cssom/lib/CSSKeyframesRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule
    };
    CSSOM2.CSSKeyframesRule = function CSSKeyframesRule() {
      CSSOM2.CSSRule.call(this);
      this.name = "";
      this.cssRules = [];
    };
    CSSOM2.CSSKeyframesRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSKeyframesRule.prototype.constructor = CSSOM2.CSSKeyframesRule;
    CSSOM2.CSSKeyframesRule.prototype.type = 7;
    Object.defineProperty(CSSOM2.CSSKeyframesRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push("  " + this.cssRules[i].cssText);
        }
        return "@" + (this._vendorPrefix || "") + "keyframes " + this.name + " { \n" + cssTexts.join("\n") + "\n}";
      }
    });
    exports.CSSKeyframesRule = CSSOM2.CSSKeyframesRule;
  }
});

// node_modules/cssom/lib/CSSValue.js
var require_CSSValue = __commonJS({
  "node_modules/cssom/lib/CSSValue.js"(exports) {
    var CSSOM2 = {};
    CSSOM2.CSSValue = function CSSValue() {
    };
    CSSOM2.CSSValue.prototype = {
      constructor: CSSOM2.CSSValue,
      // @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
      set cssText(text) {
        var name = this._getConstructorName();
        throw new Error('DOMException: property "cssText" of "' + name + '" is readonly and can not be replaced with "' + text + '"!');
      },
      get cssText() {
        var name = this._getConstructorName();
        throw new Error('getter "cssText" of "' + name + '" is not implemented!');
      },
      _getConstructorName: function() {
        var s = this.constructor.toString(), c = s.match(/function\s([^\(]+)/), name = c[1];
        return name;
      }
    };
    exports.CSSValue = CSSOM2.CSSValue;
  }
});

// node_modules/cssom/lib/CSSValueExpression.js
var require_CSSValueExpression = __commonJS({
  "node_modules/cssom/lib/CSSValueExpression.js"(exports) {
    var CSSOM2 = {
      CSSValue: require_CSSValue().CSSValue
    };
    CSSOM2.CSSValueExpression = function CSSValueExpression(token, idx) {
      this._token = token;
      this._idx = idx;
    };
    CSSOM2.CSSValueExpression.prototype = new CSSOM2.CSSValue();
    CSSOM2.CSSValueExpression.prototype.constructor = CSSOM2.CSSValueExpression;
    CSSOM2.CSSValueExpression.prototype.parse = function() {
      var token = this._token, idx = this._idx;
      var character = "", expression = "", error = "", info, paren = [];
      for (; ; ++idx) {
        character = token.charAt(idx);
        if (character === "") {
          error = "css expression error: unfinished expression!";
          break;
        }
        switch (character) {
          case "(":
            paren.push(character);
            expression += character;
            break;
          case ")":
            paren.pop(character);
            expression += character;
            break;
          case "/":
            if (info = this._parseJSComment(token, idx)) {
              if (info.error) {
                error = "css expression error: unfinished comment in expression!";
              } else {
                idx = info.idx;
              }
            } else if (info = this._parseJSRexExp(token, idx)) {
              idx = info.idx;
              expression += info.text;
            } else {
              expression += character;
            }
            break;
          case "'":
          case '"':
            info = this._parseJSString(token, idx, character);
            if (info) {
              idx = info.idx;
              expression += info.text;
            } else {
              expression += character;
            }
            break;
          default:
            expression += character;
            break;
        }
        if (error) {
          break;
        }
        if (paren.length === 0) {
          break;
        }
      }
      var ret;
      if (error) {
        ret = {
          error
        };
      } else {
        ret = {
          idx,
          expression
        };
      }
      return ret;
    };
    CSSOM2.CSSValueExpression.prototype._parseJSComment = function(token, idx) {
      var nextChar = token.charAt(idx + 1), text;
      if (nextChar === "/" || nextChar === "*") {
        var startIdx = idx, endIdx, commentEndChar;
        if (nextChar === "/") {
          commentEndChar = "\n";
        } else if (nextChar === "*") {
          commentEndChar = "*/";
        }
        endIdx = token.indexOf(commentEndChar, startIdx + 1 + 1);
        if (endIdx !== -1) {
          endIdx = endIdx + commentEndChar.length - 1;
          text = token.substring(idx, endIdx + 1);
          return {
            idx: endIdx,
            text
          };
        } else {
          var error = "css expression error: unfinished comment in expression!";
          return {
            error
          };
        }
      } else {
        return false;
      }
    };
    CSSOM2.CSSValueExpression.prototype._parseJSString = function(token, idx, sep) {
      var endIdx = this._findMatchedIdx(token, idx, sep), text;
      if (endIdx === -1) {
        return false;
      } else {
        text = token.substring(idx, endIdx + sep.length);
        return {
          idx: endIdx,
          text
        };
      }
    };
    CSSOM2.CSSValueExpression.prototype._parseJSRexExp = function(token, idx) {
      var before = token.substring(0, idx).replace(/\s+$/, ""), legalRegx = [
        /^$/,
        /\($/,
        /\[$/,
        /\!$/,
        /\+$/,
        /\-$/,
        /\*$/,
        /\/\s+/,
        /\%$/,
        /\=$/,
        /\>$/,
        /<$/,
        /\&$/,
        /\|$/,
        /\^$/,
        /\~$/,
        /\?$/,
        /\,$/,
        /delete$/,
        /in$/,
        /instanceof$/,
        /new$/,
        /typeof$/,
        /void$/
      ];
      var isLegal = legalRegx.some(function(reg) {
        return reg.test(before);
      });
      if (!isLegal) {
        return false;
      } else {
        var sep = "/";
        return this._parseJSString(token, idx, sep);
      }
    };
    CSSOM2.CSSValueExpression.prototype._findMatchedIdx = function(token, idx, sep) {
      var startIdx = idx, endIdx;
      var NOT_FOUND = -1;
      while (true) {
        endIdx = token.indexOf(sep, startIdx + 1);
        if (endIdx === -1) {
          endIdx = NOT_FOUND;
          break;
        } else {
          var text = token.substring(idx + 1, endIdx), matched = text.match(/\\+$/);
          if (!matched || matched[0] % 2 === 0) {
            break;
          } else {
            startIdx = endIdx;
          }
        }
      }
      var nextNewLineIdx = token.indexOf("\n", idx + 1);
      if (nextNewLineIdx < endIdx) {
        endIdx = NOT_FOUND;
      }
      return endIdx;
    };
    exports.CSSValueExpression = CSSOM2.CSSValueExpression;
  }
});

// node_modules/cssom/lib/MatcherList.js
var require_MatcherList = __commonJS({
  "node_modules/cssom/lib/MatcherList.js"(exports) {
    var CSSOM2 = {};
    CSSOM2.MatcherList = function MatcherList() {
      this.length = 0;
    };
    CSSOM2.MatcherList.prototype = {
      constructor: CSSOM2.MatcherList,
      /**
       * @return {string}
       */
      get matcherText() {
        return Array.prototype.join.call(this, ", ");
      },
      /**
       * @param {string} value
       */
      set matcherText(value) {
        var values = value.split(",");
        var length = this.length = values.length;
        for (var i = 0; i < length; i++) {
          this[i] = values[i].trim();
        }
      },
      /**
       * @param {string} matcher
       */
      appendMatcher: function(matcher) {
        if (Array.prototype.indexOf.call(this, matcher) === -1) {
          this[this.length] = matcher;
          this.length++;
        }
      },
      /**
       * @param {string} matcher
       */
      deleteMatcher: function(matcher) {
        var index = Array.prototype.indexOf.call(this, matcher);
        if (index !== -1) {
          Array.prototype.splice.call(this, index, 1);
        }
      }
    };
    exports.MatcherList = CSSOM2.MatcherList;
  }
});

// node_modules/cssom/lib/CSSDocumentRule.js
var require_CSSDocumentRule = __commonJS({
  "node_modules/cssom/lib/CSSDocumentRule.js"(exports) {
    var CSSOM2 = {
      CSSRule: require_CSSRule().CSSRule,
      MatcherList: require_MatcherList().MatcherList
    };
    CSSOM2.CSSDocumentRule = function CSSDocumentRule() {
      CSSOM2.CSSRule.call(this);
      this.matcher = new CSSOM2.MatcherList();
      this.cssRules = [];
    };
    CSSOM2.CSSDocumentRule.prototype = new CSSOM2.CSSRule();
    CSSOM2.CSSDocumentRule.prototype.constructor = CSSOM2.CSSDocumentRule;
    CSSOM2.CSSDocumentRule.prototype.type = 10;
    Object.defineProperty(CSSOM2.CSSDocumentRule.prototype, "cssText", {
      get: function() {
        var cssTexts = [];
        for (var i = 0, length = this.cssRules.length; i < length; i++) {
          cssTexts.push(this.cssRules[i].cssText);
        }
        return "@-moz-document " + this.matcher.matcherText + " {" + cssTexts.join("") + "}";
      }
    });
    exports.CSSDocumentRule = CSSOM2.CSSDocumentRule;
  }
});

// node_modules/cssom/lib/parse.js
var require_parse = __commonJS({
  "node_modules/cssom/lib/parse.js"(exports) {
    var CSSOM2 = {};
    CSSOM2.parse = function parse(token) {
      var i = 0;
      var state = "before-selector";
      var index;
      var buffer = "";
      var valueParenthesisDepth = 0;
      var SIGNIFICANT_WHITESPACE = {
        "selector": true,
        "value": true,
        "value-parenthesis": true,
        "atRule": true,
        "importRule-begin": true,
        "importRule": true,
        "atBlock": true,
        "conditionBlock": true,
        "documentRule-begin": true
      };
      var styleSheet = new CSSOM2.CSSStyleSheet();
      var currentScope = styleSheet;
      var parentRule;
      var ancestorRules = [];
      var hasAncestors = false;
      var prevScope;
      var name, priority = "", styleRule, mediaRule, supportsRule, importRule, fontFaceRule, keyframesRule, documentRule, hostRule;
      var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g;
      var parseError = function(message) {
        var lines = token.substring(0, i).split("\n");
        var lineCount = lines.length;
        var charCount = lines.pop().length + 1;
        var error = new Error(message + " (line " + lineCount + ", char " + charCount + ")");
        error.line = lineCount;
        error["char"] = charCount;
        error.styleSheet = styleSheet;
        throw error;
      };
      for (var character; character = token.charAt(i); i++) {
        switch (character) {
          case " ":
          case "	":
          case "\r":
          case "\n":
          case "\f":
            if (SIGNIFICANT_WHITESPACE[state]) {
              buffer += character;
            }
            break;
          case '"':
            index = i + 1;
            do {
              index = token.indexOf('"', index) + 1;
              if (!index) {
                parseError('Unmatched "');
              }
            } while (token[index - 2] === "\\");
            buffer += token.slice(i, index);
            i = index - 1;
            switch (state) {
              case "before-value":
                state = "value";
                break;
              case "importRule-begin":
                state = "importRule";
                break;
            }
            break;
          case "'":
            index = i + 1;
            do {
              index = token.indexOf("'", index) + 1;
              if (!index) {
                parseError("Unmatched '");
              }
            } while (token[index - 2] === "\\");
            buffer += token.slice(i, index);
            i = index - 1;
            switch (state) {
              case "before-value":
                state = "value";
                break;
              case "importRule-begin":
                state = "importRule";
                break;
            }
            break;
          case "/":
            if (token.charAt(i + 1) === "*") {
              i += 2;
              index = token.indexOf("*/", i);
              if (index === -1) {
                parseError("Missing */");
              } else {
                i = index + 1;
              }
            } else {
              buffer += character;
            }
            if (state === "importRule-begin") {
              buffer += " ";
              state = "importRule";
            }
            break;
          case "@":
            if (token.indexOf("@-moz-document", i) === i) {
              state = "documentRule-begin";
              documentRule = new CSSOM2.CSSDocumentRule();
              documentRule.__starts = i;
              i += "-moz-document".length;
              buffer = "";
              break;
            } else if (token.indexOf("@media", i) === i) {
              state = "atBlock";
              mediaRule = new CSSOM2.CSSMediaRule();
              mediaRule.__starts = i;
              i += "media".length;
              buffer = "";
              break;
            } else if (token.indexOf("@supports", i) === i) {
              state = "conditionBlock";
              supportsRule = new CSSOM2.CSSSupportsRule();
              supportsRule.__starts = i;
              i += "supports".length;
              buffer = "";
              break;
            } else if (token.indexOf("@host", i) === i) {
              state = "hostRule-begin";
              i += "host".length;
              hostRule = new CSSOM2.CSSHostRule();
              hostRule.__starts = i;
              buffer = "";
              break;
            } else if (token.indexOf("@import", i) === i) {
              state = "importRule-begin";
              i += "import".length;
              buffer += "@import";
              break;
            } else if (token.indexOf("@font-face", i) === i) {
              state = "fontFaceRule-begin";
              i += "font-face".length;
              fontFaceRule = new CSSOM2.CSSFontFaceRule();
              fontFaceRule.__starts = i;
              buffer = "";
              break;
            } else {
              atKeyframesRegExp.lastIndex = i;
              var matchKeyframes = atKeyframesRegExp.exec(token);
              if (matchKeyframes && matchKeyframes.index === i) {
                state = "keyframesRule-begin";
                keyframesRule = new CSSOM2.CSSKeyframesRule();
                keyframesRule.__starts = i;
                keyframesRule._vendorPrefix = matchKeyframes[1];
                i += matchKeyframes[0].length - 1;
                buffer = "";
                break;
              } else if (state === "selector") {
                state = "atRule";
              }
            }
            buffer += character;
            break;
          case "{":
            if (state === "selector" || state === "atRule") {
              styleRule.selectorText = buffer.trim();
              styleRule.style.__starts = i;
              buffer = "";
              state = "before-name";
            } else if (state === "atBlock") {
              mediaRule.media.mediaText = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
              }
              currentScope = parentRule = mediaRule;
              mediaRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            } else if (state === "conditionBlock") {
              supportsRule.conditionText = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
              }
              currentScope = parentRule = supportsRule;
              supportsRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            } else if (state === "hostRule-begin") {
              if (parentRule) {
                ancestorRules.push(parentRule);
              }
              currentScope = parentRule = hostRule;
              hostRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            } else if (state === "fontFaceRule-begin") {
              if (parentRule) {
                fontFaceRule.parentRule = parentRule;
              }
              fontFaceRule.parentStyleSheet = styleSheet;
              styleRule = fontFaceRule;
              buffer = "";
              state = "before-name";
            } else if (state === "keyframesRule-begin") {
              keyframesRule.name = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
                keyframesRule.parentRule = parentRule;
              }
              keyframesRule.parentStyleSheet = styleSheet;
              currentScope = parentRule = keyframesRule;
              buffer = "";
              state = "keyframeRule-begin";
            } else if (state === "keyframeRule-begin") {
              styleRule = new CSSOM2.CSSKeyframeRule();
              styleRule.keyText = buffer.trim();
              styleRule.__starts = i;
              buffer = "";
              state = "before-name";
            } else if (state === "documentRule-begin") {
              documentRule.matcher.matcherText = buffer.trim();
              if (parentRule) {
                ancestorRules.push(parentRule);
                documentRule.parentRule = parentRule;
              }
              currentScope = parentRule = documentRule;
              documentRule.parentStyleSheet = styleSheet;
              buffer = "";
              state = "before-selector";
            }
            break;
          case ":":
            if (state === "name") {
              name = buffer.trim();
              buffer = "";
              state = "before-value";
            } else {
              buffer += character;
            }
            break;
          case "(":
            if (state === "value") {
              if (buffer.trim() === "expression") {
                var info = new CSSOM2.CSSValueExpression(token, i).parse();
                if (info.error) {
                  parseError(info.error);
                } else {
                  buffer += info.expression;
                  i = info.idx;
                }
              } else {
                state = "value-parenthesis";
                valueParenthesisDepth = 1;
                buffer += character;
              }
            } else if (state === "value-parenthesis") {
              valueParenthesisDepth++;
              buffer += character;
            } else {
              buffer += character;
            }
            break;
          case ")":
            if (state === "value-parenthesis") {
              valueParenthesisDepth--;
              if (valueParenthesisDepth === 0)
                state = "value";
            }
            buffer += character;
            break;
          case "!":
            if (state === "value" && token.indexOf("!important", i) === i) {
              priority = "important";
              i += "important".length;
            } else {
              buffer += character;
            }
            break;
          case ";":
            switch (state) {
              case "value":
                styleRule.style.setProperty(name, buffer.trim(), priority);
                priority = "";
                buffer = "";
                state = "before-name";
                break;
              case "atRule":
                buffer = "";
                state = "before-selector";
                break;
              case "importRule":
                importRule = new CSSOM2.CSSImportRule();
                importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet;
                importRule.cssText = buffer + character;
                styleSheet.cssRules.push(importRule);
                buffer = "";
                state = "before-selector";
                break;
              default:
                buffer += character;
                break;
            }
            break;
          case "}":
            switch (state) {
              case "value":
                styleRule.style.setProperty(name, buffer.trim(), priority);
                priority = "";
              case "before-name":
              case "name":
                styleRule.__ends = i + 1;
                if (parentRule) {
                  styleRule.parentRule = parentRule;
                }
                styleRule.parentStyleSheet = styleSheet;
                currentScope.cssRules.push(styleRule);
                buffer = "";
                if (currentScope.constructor === CSSOM2.CSSKeyframesRule) {
                  state = "keyframeRule-begin";
                } else {
                  state = "before-selector";
                }
                break;
              case "keyframeRule-begin":
              case "before-selector":
              case "selector":
                if (!parentRule) {
                  parseError("Unexpected }");
                }
                hasAncestors = ancestorRules.length > 0;
                while (ancestorRules.length > 0) {
                  parentRule = ancestorRules.pop();
                  if (parentRule.constructor.name === "CSSMediaRule" || parentRule.constructor.name === "CSSSupportsRule") {
                    prevScope = currentScope;
                    currentScope = parentRule;
                    currentScope.cssRules.push(prevScope);
                    break;
                  }
                  if (ancestorRules.length === 0) {
                    hasAncestors = false;
                  }
                }
                if (!hasAncestors) {
                  currentScope.__ends = i + 1;
                  styleSheet.cssRules.push(currentScope);
                  currentScope = styleSheet;
                  parentRule = null;
                }
                buffer = "";
                state = "before-selector";
                break;
            }
            break;
          default:
            switch (state) {
              case "before-selector":
                state = "selector";
                styleRule = new CSSOM2.CSSStyleRule();
                styleRule.__starts = i;
                break;
              case "before-name":
                state = "name";
                break;
              case "before-value":
                state = "value";
                break;
              case "importRule-begin":
                state = "importRule";
                break;
            }
            buffer += character;
            break;
        }
      }
      return styleSheet;
    };
    exports.parse = CSSOM2.parse;
    CSSOM2.CSSStyleSheet = require_CSSStyleSheet().CSSStyleSheet;
    CSSOM2.CSSStyleRule = require_CSSStyleRule().CSSStyleRule;
    CSSOM2.CSSImportRule = require_CSSImportRule().CSSImportRule;
    CSSOM2.CSSGroupingRule = require_CSSGroupingRule().CSSGroupingRule;
    CSSOM2.CSSMediaRule = require_CSSMediaRule().CSSMediaRule;
    CSSOM2.CSSConditionRule = require_CSSConditionRule().CSSConditionRule;
    CSSOM2.CSSSupportsRule = require_CSSSupportsRule().CSSSupportsRule;
    CSSOM2.CSSFontFaceRule = require_CSSFontFaceRule().CSSFontFaceRule;
    CSSOM2.CSSHostRule = require_CSSHostRule().CSSHostRule;
    CSSOM2.CSSStyleDeclaration = require_CSSStyleDeclaration().CSSStyleDeclaration;
    CSSOM2.CSSKeyframeRule = require_CSSKeyframeRule().CSSKeyframeRule;
    CSSOM2.CSSKeyframesRule = require_CSSKeyframesRule().CSSKeyframesRule;
    CSSOM2.CSSValueExpression = require_CSSValueExpression().CSSValueExpression;
    CSSOM2.CSSDocumentRule = require_CSSDocumentRule().CSSDocumentRule;
  }
});

// node_modules/cssom/lib/CSSStyleDeclaration.js
var require_CSSStyleDeclaration = __commonJS({
  "node_modules/cssom/lib/CSSStyleDeclaration.js"(exports) {
    var CSSOM2 = {};
    CSSOM2.CSSStyleDeclaration = function CSSStyleDeclaration() {
      this.length = 0;
      this.parentRule = null;
      this._importants = {};
    };
    CSSOM2.CSSStyleDeclaration.prototype = {
      constructor: CSSOM2.CSSStyleDeclaration,
      /**
       *
       * @param {string} name
       * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
       * @return {string} the value of the property if it has been explicitly set for this declaration block.
       * Returns the empty string if the property has not been set.
       */
      getPropertyValue: function(name) {
        return this[name] || "";
      },
      /**
       *
       * @param {string} name
       * @param {string} value
       * @param {string} [priority=null] "important" or null
       * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
       */
      setProperty: function(name, value, priority) {
        if (this[name]) {
          var index = Array.prototype.indexOf.call(this, name);
          if (index < 0) {
            this[this.length] = name;
            this.length++;
          }
        } else {
          this[this.length] = name;
          this.length++;
        }
        this[name] = value + "";
        this._importants[name] = priority;
      },
      /**
       *
       * @param {string} name
       * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
       * @return {string} the value of the property if it has been explicitly set for this declaration block.
       * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
       */
      removeProperty: function(name) {
        if (!(name in this)) {
          return "";
        }
        var index = Array.prototype.indexOf.call(this, name);
        if (index < 0) {
          return "";
        }
        var prevValue = this[name];
        this[name] = "";
        Array.prototype.splice.call(this, index, 1);
        return prevValue;
      },
      getPropertyCSSValue: function() {
      },
      /**
       *
       * @param {String} name
       */
      getPropertyPriority: function(name) {
        return this._importants[name] || "";
      },
      /**
       *   element.style.overflow = "auto"
       *   element.style.getPropertyShorthand("overflow-x")
       *   -> "overflow"
       */
      getPropertyShorthand: function() {
      },
      isPropertyImplicit: function() {
      },
      // Doesn't work in IE < 9
      get cssText() {
        var properties = [];
        for (var i = 0, length = this.length; i < length; ++i) {
          var name = this[i];
          var value = this.getPropertyValue(name);
          var priority = this.getPropertyPriority(name);
          if (priority) {
            priority = " !" + priority;
          }
          properties[i] = name + ": " + value + priority + ";";
        }
        return properties.join(" ");
      },
      set cssText(text) {
        var i, name;
        for (i = this.length; i--; ) {
          name = this[i];
          this[name] = "";
        }
        Array.prototype.splice.call(this, 0, this.length);
        this._importants = {};
        var dummyRule = CSSOM2.parse("#bogus{" + text + "}").cssRules[0].style;
        var length = dummyRule.length;
        for (i = 0; i < length; ++i) {
          name = dummyRule[i];
          this.setProperty(dummyRule[i], dummyRule.getPropertyValue(name), dummyRule.getPropertyPriority(name));
        }
      }
    };
    exports.CSSStyleDeclaration = CSSOM2.CSSStyleDeclaration;
    CSSOM2.parse = require_parse().parse;
  }
});

// node_modules/cssom/lib/clone.js
var require_clone = __commonJS({
  "node_modules/cssom/lib/clone.js"(exports) {
    var CSSOM2 = {
      CSSStyleSheet: require_CSSStyleSheet().CSSStyleSheet,
      CSSRule: require_CSSRule().CSSRule,
      CSSStyleRule: require_CSSStyleRule().CSSStyleRule,
      CSSGroupingRule: require_CSSGroupingRule().CSSGroupingRule,
      CSSConditionRule: require_CSSConditionRule().CSSConditionRule,
      CSSMediaRule: require_CSSMediaRule().CSSMediaRule,
      CSSSupportsRule: require_CSSSupportsRule().CSSSupportsRule,
      CSSStyleDeclaration: require_CSSStyleDeclaration().CSSStyleDeclaration,
      CSSKeyframeRule: require_CSSKeyframeRule().CSSKeyframeRule,
      CSSKeyframesRule: require_CSSKeyframesRule().CSSKeyframesRule
    };
    CSSOM2.clone = function clone(stylesheet) {
      var cloned = new CSSOM2.CSSStyleSheet();
      var rules = stylesheet.cssRules;
      if (!rules) {
        return cloned;
      }
      for (var i = 0, rulesLength = rules.length; i < rulesLength; i++) {
        var rule = rules[i];
        var ruleClone = cloned.cssRules[i] = new rule.constructor();
        var style = rule.style;
        if (style) {
          var styleClone = ruleClone.style = new CSSOM2.CSSStyleDeclaration();
          for (var j = 0, styleLength = style.length; j < styleLength; j++) {
            var name = styleClone[j] = style[j];
            styleClone[name] = style[name];
            styleClone._importants[name] = style.getPropertyPriority(name);
          }
          styleClone.length = style.length;
        }
        if (rule.hasOwnProperty("keyText")) {
          ruleClone.keyText = rule.keyText;
        }
        if (rule.hasOwnProperty("selectorText")) {
          ruleClone.selectorText = rule.selectorText;
        }
        if (rule.hasOwnProperty("mediaText")) {
          ruleClone.mediaText = rule.mediaText;
        }
        if (rule.hasOwnProperty("conditionText")) {
          ruleClone.conditionText = rule.conditionText;
        }
        if (rule.hasOwnProperty("cssRules")) {
          ruleClone.cssRules = clone(rule).cssRules;
        }
      }
      return cloned;
    };
    exports.clone = CSSOM2.clone;
  }
});

// node_modules/cssom/lib/index.js
var require_lib = __commonJS({
  "node_modules/cssom/lib/index.js"(exports) {
    "use strict";
    exports.CSSStyleDeclaration = require_CSSStyleDeclaration().CSSStyleDeclaration;
    exports.CSSRule = require_CSSRule().CSSRule;
    exports.CSSGroupingRule = require_CSSGroupingRule().CSSGroupingRule;
    exports.CSSConditionRule = require_CSSConditionRule().CSSConditionRule;
    exports.CSSStyleRule = require_CSSStyleRule().CSSStyleRule;
    exports.MediaList = require_MediaList().MediaList;
    exports.CSSMediaRule = require_CSSMediaRule().CSSMediaRule;
    exports.CSSSupportsRule = require_CSSSupportsRule().CSSSupportsRule;
    exports.CSSImportRule = require_CSSImportRule().CSSImportRule;
    exports.CSSFontFaceRule = require_CSSFontFaceRule().CSSFontFaceRule;
    exports.CSSHostRule = require_CSSHostRule().CSSHostRule;
    exports.StyleSheet = require_StyleSheet().StyleSheet;
    exports.CSSStyleSheet = require_CSSStyleSheet().CSSStyleSheet;
    exports.CSSKeyframesRule = require_CSSKeyframesRule().CSSKeyframesRule;
    exports.CSSKeyframeRule = require_CSSKeyframeRule().CSSKeyframeRule;
    exports.MatcherList = require_MatcherList().MatcherList;
    exports.CSSDocumentRule = require_CSSDocumentRule().CSSDocumentRule;
    exports.CSSValue = require_CSSValue().CSSValue;
    exports.CSSValueExpression = require_CSSValueExpression().CSSValueExpression;
    exports.parse = require_parse().parse;
    exports.clone = require_clone().clone;
  }
});

// src/pages/Content/Service/db/IndexDb.js
var IndexedDB = class {
  constructor(databaseName, storeName) {
    this.databaseName = databaseName;
    this.storeName = storeName;
    this.db = null;
  }
  open() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.databaseName, 1);
        request.onerror = () => {
          reject(new Error("Failed to open database"));
        };
        request.onsuccess = () => {
          this.db = request.result;
          console.log("Database opened successfully");
          resolve();
        };
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "className" });
          }
        };
      });
    });
  }
  clearAllStores() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => __async(this, null, function* () {
        try {
          const storeNames = Array.from(this.db.objectStoreNames);
          for (const storeName of storeNames) {
            yield this.clearStore(storeName);
          }
          resolve();
        } catch (error) {
          reject(new Error("Failed to clear all object stores"));
        }
      }));
    });
  }
  clearStore(storeName) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], "readwrite");
        transaction.onerror = () => {
          reject(new Error(`Failed to clear object store ${storeName}`));
        };
        transaction.oncomplete = () => {
          resolve();
        };
        const objectStore = transaction.objectStore(storeName);
        objectStore.clear();
      });
    });
  }
  getTransaction(storeNames, mode) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeNames, mode);
        transaction.onabort = () => {
          reject(new Error("Transaction aborted"));
        };
        transaction.onerror = () => {
          reject(new Error("Transaction failed"));
        };
        transaction.oncomplete = () => {
          resolve();
        };
        resolve(transaction);
      });
    });
  }
  addAll(dataArray) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const objectStore = transaction.objectStore(this.storeName);
        const requests = [];
        dataArray.forEach((data) => {
          const request = objectStore.add(data);
          request.onerror = () => {
            if (request.error.message.includes("Key already exists in the object store")) {
              console.log(`Data with ID ${data.className} already exists in the store`);
            } else {
              reject(new Error("Failed to add data"));
            }
          };
          requests.push(request);
        });
        transaction.onerror = () => {
          reject(new Error("Failed to add data"));
        };
        transaction.oncomplete = () => {
          console.log("All data added successfully");
          resolve();
        };
      });
    });
  }
  add(data) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.add(data);
        request.onerror = () => {
          if (request.error.message.includes("Key already exists in the object store")) {
            resolve();
          } else {
            reject(new Error("Failed to add data"));
          }
        };
        request.onsuccess = () => {
          resolve();
        };
        transaction.onerror = () => {
          reject(new Error("Failed to add data"));
        };
        transaction.oncomplete = () => {
          resolve();
        };
      });
    });
  }
  get(id) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.get(id);
        request.onerror = () => {
          reject(new Error(`Failed to retrieve object with ID ${id} from object store.`));
        };
        request.onsuccess = () => {
          const object = request.result;
          if (object === void 0) {
            resolve(null);
          } else {
            resolve(object);
          }
        };
      });
    });
  }
  queryObjectStore(classNames) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const objectStore = transaction.objectStore(this.storeName);
        const index = objectStore.index("className");
        const results = [];
        index.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            const className = cursor.value.className;
            if (classNames.includes(className)) {
              results.push(cursor.value);
            }
            cursor.continue();
          } else {
            resolve(results);
          }
        };
      });
    });
  }
  createIndex(_0, _1) {
    return __async(this, arguments, function* (indexName, keyPath, options = {}) {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const objectStore = transaction.objectStore(this.storeName);
        const index = objectStore.createIndex(indexName, keyPath, options);
        index.onerror = () => {
          reject(new Error(`Failed to create index "${indexName}"`));
        };
        index.oncomplete = () => {
          resolve();
        };
      });
    });
  }
  hasIndex(indexName) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const objectStore = transaction.objectStore(this.storeName);
        const indexNames = Array.from(objectStore.indexNames);
        if (indexNames.includes(indexName)) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  getAll() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.getAll();
        request.onerror = () => {
          reject(new Error("Failed to get all data"));
        };
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    });
  }
  update(id, data) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        transaction.onerror = () => {
          reject(new Error("Failed to update data"));
        };
        transaction.oncomplete = () => {
          resolve();
        };
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.get(id);
        request.onerror = () => {
          reject(new Error("Failed to get data"));
        };
        request.onsuccess = () => {
          const record = request.result;
          Object.assign(record, data);
          objectStore.put(record);
        };
      });
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        transaction.onerror = () => {
          reject(new Error("Failed to delete data"));
        };
        transaction.oncomplete = () => {
          resolve();
        };
        const objectStore = transaction.objectStore(this.storeName);
        objectStore.delete(id);
      });
    });
  }
  clear() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        transaction.onerror = () => {
          reject(new Error("Failed to clear data"));
        };
        transaction.oncomplete = () => {
          resolve();
        };
        const objectStore = transaction.objectStore(this.storeName);
        objectStore.clear();
      });
    });
  }
  count() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.count();
        request.onerror = () => {
          reject(new Error("Failed to count data"));
        };
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    });
  }
  getAllKeys() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const objectStore = transaction.objectStore(this.storeName);
        const request = objectStore.getAllKeys();
        request.onerror = () => {
          reject(new Error("Failed to get all keys"));
        };
        request.onsuccess = () => {
          console.log(request.result);
          resolve(request.result);
        };
      });
    });
  }
};

// src/pages/Content/Service/worker.ts
var import_cssom = __toESM(require_lib());
self.onmessage = function(e) {
  return __async(this, null, function* () {
    console.time("onmessage");
    const data = JSON.parse(e.data);
    if (data.type === "find") {
      let { conditionText } = data;
      let { designUrl, classNames } = data;
      let { payload, flag } = data;
      let cssText = payload;
      const styleSheet = e.data.payload;
      let parsedCss = import_cssom.default.parse(cssText);
      let cssRules = parsedCss.cssRules[0].cssRules;
      console.groupCollapsed("Worker init");
      console.log("designUrl", designUrl);
      console.log("classNames", classNames);
      console.log("conditionText", conditionText);
      console.log("payload", payload);
      console.log("styleSheet", styleSheet);
      console.log("cssRules", cssRules);
      console.groupEnd();
      const webInst = new IndexedDB(designUrl, conditionText);
      const workerStyleSheet = new WorkerStyleSheet(cssRules, webInst);
      yield webInst.open();
      if (flag === "update") {
        console.log("%cclearedAllStores", "color: lightblue; font-size: 14px", "clearedAllStores");
        yield webInst.clearAllStores();
      }
      const getPromises = classNames.map((className) => {
        return webInst.get(className).then((data2) => {
          if (data2) {
            if (data2.cssText) {
              workerStyleSheet.matchElements[className] = data2.cssText;
            } else {
              let searchResult = workerStyleSheet.SearchStyleSheet(className);
              console.log(searchResult, "searchResult");
              workerStyleSheet.toBeCached[className] = true;
            }
          } else {
            console.log("Error finding", className);
          }
        });
      });
      yield Promise.all(getPromises);
      const newObject = {
        [conditionText]: __spreadValues({}, workerStyleSheet.matchElements)
      };
      console.log(newObject, "newObject");
      console.log(workerStyleSheet.matchElements, "CLAUDE1");
      self.postMessage(newObject);
      console.timeEnd("onmessage");
      yield workerStyleSheet.cacheCorrelatedValues();
      yield workerStyleSheet.cacheAllStyles();
    }
  });
};
var WorkerStyleSheet = class {
  /**
   * @param  {CSSStyleRule[]} styleSheet each stylesheet is for a specific media query that was parsed in the worker init.
   * @param  {IndexedDB} webInst a instance of IndexedDb class which handles indexDb operation.
   */
  constructor(styleSheet, webInst) {
    this.styleSheet = styleSheet;
    this.matchElements = {};
    this.toBeCached = {};
    this.webInst = webInst;
  }
  /**
   * @param  {string} className  a class name provided by the classname payload from the worker init.
   */
  // SearchStyleSheet is an async function that takes a string as an argument.
  // It takes the string and searches the styleSheet array for a match.
  // If there is a match it will push the match into the matchElements array.
  SearchStyleSheet(className) {
    return __async(this, null, function* () {
      console.log(this.styleSheet, "this.styleSheet");
      for (let i = 0; i < this.styleSheet.length; i++) {
        const cssStyleRule = this.styleSheet[i];
        const selectorText = cssStyleRule.selectorText;
        const cssText = cssStyleRule.cssText;
        const selectors = selectorText.split(/,\s*/);
        for (const selector of selectors) {
          const classNames = selector.match(/\.[\w-]+/g);
          if (classNames && classNames.includes(className)) {
            const comboClassName = classNames.sort().join("");
            if (!this.matchElements[comboClassName]) {
              this.matchElements[comboClassName] = cssText;
            }
          }
        }
      }
    });
  }
  /**
   * @method cacheCorrelatedValues caches all the values that are correlated to the class names provided by the classname payload from the worker init.
   */
  cacheCorrelatedValues() {
    return __async(this, null, function* () {
      let cacheKeys = this.findCommonKeys(this.matchElements, this.toBeCached);
      for (let i = 0; i < cacheKeys.length; i++) {
        let key = cacheKeys[i];
        try {
          yield this.webInst.add({ className: key, cssText: this.matchElements[key].cssText });
        } catch (error) {
          throw new Error(`Error Caching ${key}`);
        }
      }
    });
  }
  findCommonKeys(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") {
      throw new Error("Input must be an object");
    }
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const commonKeys = obj1Keys.filter((key) => obj2Keys.includes(key));
    return commonKeys;
  }
  /**
   * @method cacheAllStyles caches everything in the stylesheet and adds it to the indexDb.
   */
  cacheAllStyles() {
    return __async(this, null, function* () {
      console.time("cacheAllStyles");
      for (let i = 0; i < this.styleSheet.length; i++) {
        const selectorText = this.styleSheet[i].selectorText;
        const cssText = this.styleSheet[i].cssText;
        if (!selectorText || !cssText) {
          continue;
        }
        let isCached = yield this.webInst.get(selectorText);
        if (isCached) {
          continue;
        } else {
          try {
            yield this.webInst.add({ className: selectorText, cssText });
          } catch (error) {
            throw new Error(`Error Caching ${selectorText}`);
          }
        }
      }
      console.timeEnd("cacheAllStyles");
    });
  }
};
//# sourceMappingURL=worker.js.map
