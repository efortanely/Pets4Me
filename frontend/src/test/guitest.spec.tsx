import { expect } from 'chai';
import { Builder, By } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import 'babel-polyfill'


describe('GuiTests', () => {
  let chrome_options = new chrome.Options()
  let path = process.cwd() + '/chromedriver'

  var service = new chrome.ServiceBuilder(path).build()
  chrome.setDefaultService(service)

  const driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chrome_options.headless())
      .build();
  
  driver.manage().window().maximize();
  
  const base_url = "https://pets4.me/"

  // author: Rosemary
  it('should have pets4me title', async () => {
      await driver.get(base_url);
      await driver.sleep(1500);
      const title = await driver.getTitle();
      expect(title).to.equal('Pets4Me');
  });

  // author: Rosemary
  it('should have adoption link', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const adoption_link = (await driver).findElement(By.linkText("adopt a pet today"))
    adoption_link.click()
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "pets/")
      );
});

  after(async () => driver.quit());
});
