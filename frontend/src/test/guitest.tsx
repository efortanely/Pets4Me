import { expect } from 'chai';
import { Builder, By, Key, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

describe('DefaultTest', () => {
  let chrome_options = new chrome.Options()
      // uncomment if you need to specify a specific binary
      // .setChromeBinaryPath("/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe")
      
  const driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chrome_options)
      .build();

  it('should go to nehalist.io and check the title', async () => {
      await driver.get('https://www.nehalist.io');
      const title = await driver.getTitle();

      expect(title).to.equal('nehalist.io');
  });

  after(async () => driver.quit());
});