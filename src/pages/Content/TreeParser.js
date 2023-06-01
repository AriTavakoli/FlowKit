import CustomMutation from "@Utils/MutationObservers";



const SearchStyleSheet = (className) => {
  console.log('executed');
  const styleSheet = findStyleSheet();

  ;

  console.log(styleSheet, 'stylesheet passed in');

  className = '.' + className;
  let newClassName = className.replace(/ /g, '-').toLowerCase();


  console.log(className, 'className');
  console.log(newClassName, 'newClassName');
  // tabCheck(className)

  for (let i = 0; i < Object.keys(styleSheet).length; i++) {
    if (styleSheet[i].selectorText.includes(newClassName)) {
      console.log(styleSheet[i].cssText, 'cssText');
      return styleSheet[i].cssText;
    }
  }

}

const SearchStyleSheetV2 = (className,) => {
  const styleSheet = findStyleSheet()[0];


  console.log(styleSheet, 'stlyeSheet');

  console.log(styleSheet);
  if (!className || !styleSheet) {
    console.log('className or styleSheet is undefined or null');
    return;
  }


  for (let i = 0; i < Object.keys(styleSheet.cssRules).length; i++) {
    const cssRule = styleSheet.cssRules[i];
    if (cssRule && cssRule.selectorText) {
      if (cssRule.selectorText === className) {
        console.log(cssRule.cssText, 'cssText');

        // const data = [cssRule.selectorText, e.data.payload.conditionText];
        // self.postMessage(data);
        return styleSheet[i].cssText;
      }
    }
  }
  // const data = ['not found', e.data.payload.conditionText];
  // self.postMessage(data);



};


function getAssetUrl(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === 'img' || tagName === 'audio' || tagName === 'video') {
    return element.src;
  } else if (tagName === 'link') {
    return element.href;
  }
  return null;
}




export default function parseHTMLString(htmlString, maxDepth = Infinity) {
  console.log(htmlString, 'htmlString');

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const classNames = new Set();

  function parseNode(element, depth) {
    if (depth > maxDepth) {
      return {
        tag: element.tagName.toLowerCase(),
        class: element.classList.length > 0 ? Array.from(element.classList).join(' ') : null,
        children: [],
        css: null,
        textContent: element.childNodes.length > 0 && Array.from(element.childNodes).some(child => child.nodeType === Node.TEXT_NODE) ? element.textContent.trim() : null,
        imageUrl: getAssetUrl(element)
      };
    }

    const node = {
      tag: element.tagName.toLowerCase(),
      class: element.classList.length > 0 ? Array.from(element.classList).join(' ') : null,
      children: [],
      css: null,
      textContent: element.childNodes.length > 0 && Array.from(element.childNodes).some(child => child.nodeType === Node.TEXT_NODE) ? element.textContent.trim() : null,
      imageUrl: getAssetUrl(element)
    };

    if (element.classList.length > 0) {
      const filteredClassList = Array.from(element.classList).filter(className => !className.startsWith('w'));

      if (filteredClassList.length > 0) {
        classNames.add('.' + filteredClassList.join('.'));

        // Add individual class names
        filteredClassList.forEach(className => {
          classNames.add('.' + className);
        });
      }
    }

    if (element.children.length > 0) {
      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        if (child.nodeType === Node.ELEMENT_NODE) {
          node.children.push(parseNode(child, depth + 1));
        }
      }
    }

    return node;
  }

  const parsedNode = parseNode(doc.body, 0);
  const classNamesArray = Array.from(classNames);
  return { parsedNode, classNamesArray };
}


export function findStyleSheet() {

  return new Promise((resolve, reject) => {

    console.log('I am finding StyleSheet');

    let iframeStylesheets = document.querySelector('#site-iframe-next').contentDocument.styleSheets;

    try {
      //loop through object check if the object has a key called cssRules if it does check if cssRules has a length greater than 0 if it does then set iframeStylesheets to that object
      for (let element of iframeStylesheets) {
        if (Object.keys(element['rules']).length > 1) {
          if (element['rules']) {
            for (let i = 0; i < Object.keys(element['rules']).length; i++) {
              // console.log(element['rules'][i], 'element');
              if (element['rules'][i].selectorText) {
                if (element['rules'][i].selectorText.includes('w-')) {
                  break;
                }
              }
              if (element['rules'][i].conditionText) {
                // console.log(element['rules'][i].cssRules, 'god mode');
                iframeStylesheets = element['rules']


                resolve(iframeStylesheets);
              }
            }
          }

        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  )


}



