const {Builder, By, Key, until} = require('selenium-webdriver');
const creds = require('./config.js');

// sometimes it doesn't work. Gotta somehow try an action again if it fails

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
      await searchBox.sendKeys('asana engineering')
      await driver.findElement(By.className('search-typeahead-v2__button typeahead-icon')).click()

      await driver.wait(until.elementLocated(By.className('search-results-container')), 50000);
      let results = await driver.findElements(By.className('name actor-name'))
      results.map(async el => {
        let text = await el.getText();
        console.log(text);
      })
    } catch(err) {
      console.log(err);
    }
  } finally {
    await driver.quit();
  }
})();
