const {Builder, By, Key, until} = require('selenium-webdriver');
const creds = require('./config.js');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.linkedin.com/');
    let email = await driver.findElement(By.id('login-email'));
    let password = await driver.findElement(By.id('login-password'));
    email.sendKeys(creds.username)
    password.sendKeys(creds.password)
    try {
      await driver.findElement(By.id('login-submit')).click();
      let searchBox = await driver.findElement(By.tagName('input'));
      searchBox.sendKeys('asana')
      let searchButton = await driver.findElement(By.className('search-typeahead-v2__button typeahead-icon')).click();
    } catch(err) {
      console.log(err);
    }
  } finally {
    // await driver.quit();
  }
})();
