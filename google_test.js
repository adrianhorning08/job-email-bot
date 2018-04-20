const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    el = await driver.findElement(By.tagName('div'));
    console.log(el);
    await el.getText(text => console.log(text));
  } finally {
    await driver.quit();
  }
})();
