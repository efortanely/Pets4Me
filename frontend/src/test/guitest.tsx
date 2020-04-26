import { expect } from 'chai';
import { Builder, By, Key } from 'selenium-webdriver'
import firefox from 'selenium-webdriver/firefox'

describe('GuiTests', () => {
  let firefoxOptions = new firefox.Options()

  const driver = new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(firefoxOptions)
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

  // author: Rosemary
  it('should navigate to pets homepage', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const adoption_link = (await driver).findElement(By.linkText("PETS"))
    adoption_link.click()
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "pets")
      );
  });

  // author: Rosemary
  it('should navigate to dog breeds homepage', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const adoption_link = (await driver).findElement(By.linkText("DOG BREEDS"))
    adoption_link.click()
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "dog-breeds")
      );
  });

  // author: Rosemary
  it('should navigate to cat breeds homepage', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const adoption_link = (await driver).findElement(By.linkText("CAT BREEDS"))
    adoption_link.click()
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "cat-breeds")
      );
  });

  // author: Rosemary
  it('should navigate to shelters homepage', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const adoption_link = (await driver).findElement(By.linkText("SHELTERS"))
    adoption_link.click()
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "shelters")
      );
  });

  // author: Rosemary
  it('should navigate to about page', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const adoption_link = (await driver).findElement(By.linkText("ABOUT"))
    adoption_link.click()
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "about")
      );
  });

  // author: Rosemary
  it('should search pets for query', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const search_dropdown = (await driver).findElement(By.id("search-bar-select"))
    search_dropdown.click()
    const select_items = (await driver).findElements(By.className('select-option'));
    const pet_select = (await select_items)[1];
    pet_select.click()
    const search_bar = (await driver).findElement(By.id("search-bar-input"))
    search_bar.sendKeys("Labrador" + Key.ENTER)
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "pets?search=Labrador")
      );
  });

  // author: Rosemary
  it('should search dog breeds for query', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const search_dropdown = (await driver).findElement(By.id("search-bar-select"))
    search_dropdown.click()
    const select_items = (await driver).findElements(By.className('select-option'));
    const dog_breed_select = (await select_items)[2];
    dog_breed_select.click()
    const search_bar = (await driver).findElement(By.id("search-bar-input"))
    search_bar.sendKeys("Dog" + Key.ENTER)
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "dog-breeds?search=Dog")
      );
  });

  // author: Rosemary
  it('should search cat breeds for query', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const search_dropdown = (await driver).findElement(By.id("search-bar-select"))
    search_dropdown.click()
    const select_items = (await driver).findElements(By.className('select-option'));
    const cat_breed_select = (await select_items)[3];
    cat_breed_select.click()
    const search_bar = (await driver).findElement(By.id("search-bar-input"))
    search_bar.sendKeys("Shorthair" + Key.ENTER)
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "cat-breeds?search=Shorthair")
      );
  });

  // author: Rosemary
  it('should search shelters for query', async () => {
    await driver.get(base_url);
    await driver.sleep(1500);
    const search_dropdown = (await driver).findElement(By.id("search-bar-select"))
    search_dropdown.click()
    const select_items = (await driver).findElements(By.className('select-option'));
    const shelter_select = (await select_items)[4];
    shelter_select.click()
    const search_bar = (await driver).findElement(By.id("search-bar-input"))
    search_bar.sendKeys("Austin" + Key.ENTER)
    await driver.sleep(1500);
    const current_url = (await driver).getCurrentUrl()
      .then(value =>
        expect(value).to.include(base_url + "shelters?search=Austin")
      );
  });

  after(async () => driver.quit());
});
