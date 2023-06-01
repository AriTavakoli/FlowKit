

export default class WebflowExtractor {



  simulateMouseClick(element) {
    const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
    mouseClickEvents.forEach(mouseEventType =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      ),
    );
  };

  waitForCloseModal() {
    return new Promise(resolve => {
      const observer = new MutationObserver(mutations => {
        // Check if element exists
        let element = document.querySelector('[data-automation-id="modal-close-button"]');
        if (element) {
          console.log(element, 'actually resolved');
          document.querySelector('[data-automation-id="modal-close-button"]').parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';

          resolve(element);
          observer.disconnect();
        }
      });

      // Observe changes to the document and its descendants
      observer.observe(document, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
  }


  waitForDomElement(selector) {


    console.log(`Waiting for element: ${selector} -- invoked by waitForDomElement()`);
    console.log(document.querySelector(selector));

    return new Promise(resolve => {

      let element = document.querySelector(selector);

      if (element) {
        console.log(`Already Exists: ${element} -- invoked by waitForDomElement()`);

        return resolve(element);

      }

      const observer = new MutationObserver(mutations => {
        if (element) {
          console.log(`Found element: ${element} -- invoked by waitForDomElement()`);
          resolve(element);
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  waitForElementInIframe(selector) {
    let iframe = document.getElementById('site-iframe-next').contentWindow;
    let element = iframe.document.getElementsByClassName(selector)[0];

    // Create a MutationObserver
    return new Promise(resolve => {
      const observer = new MutationObserver(mutations => {
        // Check if element exists
        element = iframe.document.getElementsByClassName(selector)[0];
        if (element) {
          console.log(element, 'actually resolved');
          resolve(element);
          observer.disconnect();
        }
      });

      // Observe changes to the document and its descendants
      observer.observe(document, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
  }





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

          document.querySelector('[data-automation-id="modal-close-button"]').parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
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





  mutationObserverElementWithSelectorV2(selector) {
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









  async extractStyleSheet() {

    try {

      const exportButton = document.querySelector('.bem-TopBar_Body_Button.bem-TopBar_Body_ExportButton')
      if (!exportButton) {
        throw new Error(`No element found with selector "${exportButton}"`);
      }

      this.simulateMouseClick(exportButton)//


      const cssContent = await this.mutationObserverElementWithSelector('code')

      console.log(`StyleSheet extraction successfully completed`);

      console.log(cssContent, 'cssContent');

      const cssContentText = cssContent.textContent
      console.log(cssContentText, 'cssContentText');
      return cssContentText;
    }
    catch (error) {
      console.error(`Error extracting StyleSheet: ${error}`);
      return null;
    }


  }




  async extractCss() {

    this.waitForCloseModal().then(() => {
      console.log('modal closed')
    }
    )

   let code = this.mutationObserverElementWithSelector('code').then((code) => {
      const closeModal = document.querySelector('[data-automation-id="modal-close-button"]')
      this.simulateMouseClick(closeModal);
      // console.log(code.textContent, 'code')
      return code.textContent

    })


    const exportButton = document.querySelector('.bem-TopBar_Body_Button.bem-TopBar_Body_ExportButton')
    if (!exportButton) {
      throw new Error(`No element found with selector "${exportButton}"`);
    }
    this.simulateMouseClick(exportButton)//

    return code;


  }




  async extractHtmlDoc() {

    try {

      const exportButton = document.querySelector('.bem-TopBar_Body_Button.bem-TopBar_Body_ExportButton')
      if (!exportButton) {
        throw new Error(`No element found with selector "${exportButton}"`);
      }
      this.simulateMouseClick(exportButton)//

      const cssContent = await this.observeHtmlDoc('code')

      console.log(`StyleSheet extraction successfully completed`);

      console.log(cssContent, 'cssContent');

      const cssContentText = cssContent.textContent

      console.log(cssContentText, 'cssContentText');

      return cssContentText;
    }
    catch (error) {
      console.error(`Error extracting StyleSheet: ${error}`);
      return null;
    }


  }


  observeHtmlDoc(selector) {
    this.waitForDomElement('[data-automation-id="modal-close-button"]').then((elm) => {

      console.log('Grandparent Element hidden', elm.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);

      elm.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    });

    return new Promise(resolve => {

      if (document.querySelector(selector)) {
        console.log('resolved', selector)
        return resolve(document.querySelector(selector));
      }
      const observer = new MutationObserver(mutations => {

        //**listen Element CODE css */
        let listenElement = document.querySelectorAll(selector)[0]

        if (listenElement) {

          //get the export modal and display none

          const closeModal = document.querySelector('[data-automation-id="modal-close-button"]')

          this.simulateMouseClick(closeModal);
          document.querySelector('[data-automation-id="modal-close-button"]').parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
          // console.log('resolved', listenElement.textContent)

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








}