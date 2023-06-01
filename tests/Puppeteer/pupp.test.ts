//@ts-nocheck
import puppeteer, { Browser, Page } from 'puppeteer';
import { createRunner, PuppeteerRunnerExtension } from '@puppeteer/replay';
import * as path from 'path';
import { expect, jest, test, describe, it } from '@jest/globals';
const EXTENSION_PATH = path.resolve(__dirname, '../../build');
const extensionName = "FlowKit";
const extensionId = "cpcmiaelekjadffdchmfifphokbblkca";



describe('Puppeteer', () => {
  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
      ],
    });
    page = await browser.newPage();
    // await page.goto('https://webflow.com/design/cwbfoundation');
    await page.goto(`chrome://extensions//${extensionId}/popup.html`);

  });





  describe('Extension', () => {
    it('should be installed', async () => {
      const extension = await page.evaluate((extensionId) => {
        return chrome.management.get(extensionId);
      }, extensionId);

      expect(extension).toBeDefined();
    });

    it('should click on the element with text "Create tab" in Webflow Designer', async () => {
      // await page.goto('https://webflow.com/design/cwbfoundation');
      // await page.waitForSelector('body');

      // const createTabElement = await page.evaluateHandle(() => {
      //   const allElements = Array.from(document.querySelectorAll('*'));
      //   return allElements.find((element) => element.textContent === 'Create tab');
      // });

      // if (createTabElement) {
      //   await createTabElement.asElement().click();
      // } else {
      //   throw new Error('Create tab element not found');
      // }

      // Add any necessary assertions here after clicking on the "Create tab" element
    });
  });
});