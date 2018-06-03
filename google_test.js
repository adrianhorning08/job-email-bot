const {Builder, By, Key, until} = require('selenium-webdriver');
const creds = require('./config');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.linkedin.com/');
    let email = await driver.findElement(By.id('login-email'));
    let password = await driver.findElement(By.id('login-password'));
    email.sendKeys('m.adrian.horning@gmail.com')
    password.sendKeys('liahona7')
    try {
      await driver.findElement(By.id('login-submit').click());
    } catch(err) {
      console.log(err);
    }
  } finally {
    // await driver.quit();
  }
})();
