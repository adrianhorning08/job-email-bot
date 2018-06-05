const {Builder, By, Key, until} = require('selenium-webdriver');
const creds = require('./config.js');

// searching for jobs
async function findLinkedInJobLinks() {
  const linkedinLinks = [];
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.linkedin.com/jobs');
    let searchBox = await driver.wait(until.elementLocated(By.id('keyword-search-box')), 3000);
    searchBox.sendKeys('Software Engineer')
    await driver.findElement(By.className('job-home-search-button')).click();
    let results = await driver.findElements(By.className('job-title-link'));
     const promises = await Promise.all(results.map(async job => {
      let link = await job.getAttribute('href');
      return link;
    }))
    return promises;
  } catch(e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

findLinkedInJobLinks()







// searching for people
// (async function example() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     await driver.get('https://www.linkedin.com/');
//     await driver.wait(until.elementLocated(By.id('login-email')), 50000);
//     let email = await driver.findElement(By.id('login-email'));
//     let password = await driver.findElement(By.id('login-password'));
//     email.sendKeys(creds.username)
//     password.sendKeys(creds.password)
//     try {
//       await driver.findElement(By.id('login-submit')).click();
//       let searchBox = await driver.findElement(By.tagName('input'));
//       await searchBox.sendKeys('asana engineering')
//       await driver.findElement(By.className('search-typeahead-v2__button typeahead-icon')).click()
//
//       await driver.wait(until.elementLocated(By.className('search-results-container')), 50000);
//       let results = await driver.findElements(By.className('name actor-name'))
//       await Promise.all(results.map(async el => {
//         let text = await el.getText();
//         console.log(text);
//
//       }))
//     } catch(err) {
//       console.log(err);
//     }
//   } finally {
//     await driver.quit();
//   }
// })();
