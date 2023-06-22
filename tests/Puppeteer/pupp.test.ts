//@ts-nocheck
import * as path from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';
import { expect, jest, test, describe, it } from '@jest/globals';
import { config } from 'dotenv';
config();

const EXTENSION_PATH = path.resolve(__dirname, '../../build');

//  Make sure to get the latest extension id
const extensionId = process.env.EXTENSION_ID;



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
    await page.goto(`chrome-extension://${extensionId}/newtab.html`);
  });

  it('should click the Editor tab and check for all rendered init elements', async () => {
    await page.waitForTimeout(2000); // Wait for 2 seconds
    const tabs = await page.$$('.Tabs__Tab___p4SAj');
    if (tabs.length > 0) {
      await tabs[1].click();

      // After clicking on the tab, wait for an element on the new page to load.
      const selector = '.dropdown-button___Eszaj';

      await page.waitForSelector(selector);

      // Check if the element is indeed there.
      const element = await page.$(selector);
      expect(element).not.toBeNull();

      // Wait for the main template element to be rendered
      const mainTemplateSelector = '.template___iDsXo';
      await page.waitForSelector(mainTemplateSelector);

      // Check if the main template is there
      const mainTemplateElement = await page.$(mainTemplateSelector);
      expect(mainTemplateElement).not.toBeNull();

      // Check if the child element 'template__topBar___FYRoA' is there
      const topBarElement = await page.$(`${mainTemplateSelector} .template__topBar___FYRoA`);
      expect(topBarElement).not.toBeNull();

      // Check if the child element 'control__bar___mnOyB' is there
      const controlBarElement = await page.$(`${mainTemplateSelector} .control__bar___mnOyB`);
      expect(controlBarElement).not.toBeNull();

    }
  });



  it('should click the Editor tab and check for all rendered init elements', async () => {
    await page.waitForTimeout(2000); // Wait for 2 seconds
    const tabs = await page.$$('.Tabs__Tab___p4SAj');
    if (tabs.length > 0) {
      await tabs[2].click();
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // Wait for the container to be rendered
      const containerSelector = '.container___BY_1b';
      await page.waitForSelector(containerSelector);

      // Get all the buttons' text and check if "Webflow", "BEM", and "Palette" are there
      const buttonLabels = await page.$$eval(`${containerSelector} .bubble__title___TMWD9`, nodes => nodes.map(n => n.textContent));
      expect(buttonLabels).toContain('Webflow');
      expect(buttonLabels).toContain('BEM');


    }
  });





  it('Click on FlowView and check for flow render', async () => {
    const tabs = await page.$$('.Tabs__Tab___p4SAj');
    if (tabs.length > 0) {
      await tabs[0].click();
      await page.waitForTimeout(2000); // Wait for 2 seconds

      // Wait for a specific element to be rendered
      const elementSelector = '.c-button.c-button--undefined.c-button--square.c-button--outline-grey';
      await page.waitForSelector(elementSelector);

      // Click the element
      await page.click(elementSelector);

      const element = await page.$('.react-flow');
      expect(element).not.toBeNull();
      // Get all the elements that match the given XPath

    }

  });



  afterEach(async () => {
    // Clean up and close browser after each test
    await page.close();
    await browser.close();
  });


});