//@ts-nocheck
//@ts-nocheck
import puppeteer, { Browser, Page } from 'puppeteer';
import { createRunner, PuppeteerRunnerExtension } from '@puppeteer/replay';
import * as path from 'path';
import { expect, jest, test, describe, it } from '@jest/globals';
const EXTENSION_PATH = path.resolve(__dirname, '../../build');
const extensionName = "FlowKit";
const extensionId = "nkbikllfnflpbgjgejkgofmdgoddhkog";

const replayConfig = {};

const runnerExtension = createRunner(replayConfig, PuppeteerRunnerExtension);

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

  it('should click the first tab', async () => {
    await page.waitForTimeout(2000); // Wait for 2 seconds
    const tabs = await page.$$('.Tabs__Tab___p4SAj');
    if (tabs.length > 0) {
        await tabs[1].click();
    }
});




  afterEach(async () => {
    // Clean up and close browser after each test
    await page.close();
    await browser.close();
  });





});