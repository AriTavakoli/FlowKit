export default class CodeExtractor {






  mutationObserverElementWithSelector(selector) {

    console.log(`Waiting for element: ${selector} -- invoked by mutationObserverElementWithSelector()`);
    return new Promise(resolve => {

      if (document.querySelector(selector)) {
        console.log('resolved', selector)
        return resolve(document.querySelector(selector));
      }
      const observer = new MutationObserver(mutations => {

        //**listen Element CODE css */
        let listenElement = document.querySelectorAll(selector)[1]

        if (listenElement) {

          //get the export modal and display none

          // console.log('resolved', listenElement.textContent)
          console.log('successfull extraction');

          resolve(listenElement);
          observer.disconnect();
        }

      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }







  async extractCss() {


    const cssContent = await this.mutationObserverElementWithSelector('code')

    console.log(`StyleSheet extraction successfully completed`);

    console.log(cssContent, 'cssContent');

    const cssContentText = cssContent.textContent
    console.log(cssContentText, 'cssContentText');

    return cssContentText;

  }





   convertCssToJson(cssText) {
    const cssLines = cssText.split('\n');
    const cssJson = {};

    let currentClass = '';
    cssLines.forEach((line) => {
      if (line.startsWith('.')) {
        currentClass = line.substring(1, line.indexOf(' {'));
        cssJson[currentClass] = {};
      } else {
        const parts = line.split(':');
        if (parts.length === 2) {
          const key = parts[0].trim();
          const value = parts[1].trim();
          cssJson[currentClass][key] = value;
        }
      }
    });

    return cssJson;
  }




   convertCssToJsonV2(css) {
    // Create an empty object to store the parsed CSS
    const parsedCSS = {};

    // Split the CSS into individual lines
    const lines = css.split('\n');

    // Keep track of the current category (class or media query)
    let currentCategory = null;

    // Iterate through each line of the CSS
    for (const line of lines) {
      // Trim leading and trailing whitespace from the line
      const trimmedLine = line.trim();

      // Check if the line is a media query
      if (trimmedLine.startsWith('@media')) {
        // Extract the media query from the line
        const mediaQuery = trimmedLine.substring('@media'.length).trim();

        // Set the current category to the media query
        currentCategory = mediaQuery;

        // Initialize an empty object for the media query in the parsed CSS
        parsedCSS[mediaQuery] = {};
      } else if (trimmedLine.startsWith('.') || trimmedLine.startsWith('#')) {
        // Extract the class or ID name from the line
        const classOrID = trimmedLine.substring(1).split(' ')[0];

        // Set the current category to the class or ID
        currentCategory = classOrID;

        // Initialize an empty object for the class or ID in the parsed CSS
        parsedCSS[currentCategory] = {};
      } else if (trimmedLine.includes(':')) {
        // Split the line into property and value
        const [property, value] = trimmedLine.split(':');

        // Trim leading and trailing whitespace from the property and value
        const trimmedProperty = property.trim();
        const trimmedValue = value.trim();

        // Add the property and value to the current category in the parsed CSS
        parsedCSS[currentCategory][trimmedProperty] = trimmedValue;
      }
    }

    // Return the parsed CSS in JSON format
    return JSON.stringify(parsedCSS, null, 2);
  }












}

