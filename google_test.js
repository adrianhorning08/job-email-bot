const {Builder, By, Key, until} = require('selenium-webdriver');
const creds = require('./config.js');

driver = new Builder().forBrowser('chrome').build();
allLinks = [];

// searching for jobs
async function searchLinkedInJobs() {
  try {
    await driver.get('https://www.linkedin.com');
    await logIn();
    await driver.get('https://www.linkedin.com/jobs/search/?f_E=1%2C2&keywords=software%20engineer&location=San%20Francisco%20Bay%20Area&locationId=us%3A84');
    let divs = await driver.findElements(By.className('job-card-search--clickable'))
    // get the job ids
    const jobIds = await Promise.all(divs.map(async el => {
      let jobId = await el.getAttribute('data-job-id');
      return jobId;
    }))
    allLinks = jobIds
    // await driver.findElement(By.className('jobs-search-dropdown__option-button jobs-search-dropdown__option-button--single')).click()
    // await driver.findElement(By.className('job-home-search-button')).click();
    // let i = 5
    // while (i > 0) {
    //   const nextButton = driver.findElement(By.className('next-btn'));
    //   let links = await driver.findElements(By.className('job-title-link'));
    //   const linkedinLinks = await scrapeJobLinks(links);
    //   allLinks.concat(linkedinLinks);
    //   i--;
    //   nextButton.click();
    // }
  } catch(e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}

async function clickAll(links) {
  const newDriver = new Builder().forBrowser('chrome').build();
  try {
    links.forEach(async jobId => {
      await newDriver.executeScript('window.open(`https://www.google.com`);');
    })
  } catch (e) {
      console.log(e);
  }

}

async function logIn() {
  try {
    let email = await driver.findElement(By.id('login-email'));
    let password = await driver.findElement(By.id('login-password'));
    email.sendKeys(creds.username)
    password.sendKeys(creds.password)
    await driver.findElement(By.id('login-submit')).click();
  } catch (e) {
    console.log(e);
  }
}

async function scrapeJobLinks(links) {
  const linkedinLinks = [];
  try {
    const promises = await Promise.all(links.map(async job => {
      let link = await job.getAttribute('href');
      return link;
    }))
    return promises;
  } catch (e) {
    console.log(e);
  }
}

searchLinkedInJobs().then(() => clickAll(allLinks))







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
