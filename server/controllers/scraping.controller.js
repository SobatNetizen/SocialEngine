require('dotenv').config()
const User = require('../models/user.model')
const puppeteer = require('puppeteer');
const CODE = require('./URLCode');

function changeValue(value) {
  let newValue = '';
  for (let i of value) {
    if (CODE[i] != undefined) {
      newValue += CODE[i]
    } else {
      newValue += i;
    }
  }
  return newValue;
}

function extractItems() {
  const extractedElements = document.querySelectorAll('.TweetTextSize');
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerText);
  }
  return items;
}

function extractItemsFB() {
  const extractedElements = document.querySelectorAll('._5-jo');
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerText);
  }
  return items;
}

async function scrapeInfiniteScrollItems(
  page,
  extractItems,
  itemTargetCount,
  scrollDelay = 1000,
) {
  let items = [];
  try {
    let previousHeight;
    while (items.length < itemTargetCount) {
      items = await page.evaluate(extractItems);
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
      await page.waitFor(scrollDelay);
    }
  } catch(e) { }
  return items;
}

module.exports = {

  async tweetScrape (req, res, next) {
    // Set up browser and page.
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // page.setViewport({ width: 1280, height: 926 });
    const wordToSearch = changeValue(req.body.keyword)

    await page.goto(`https://twitter.com/search?f=tweets&q=${wordToSearch}&src=typd`);

    const items = await scrapeInfiniteScrollItems(page, extractItems, 50);
    let joinItem = items.join('$%@')
    //console.log(items)

    await browser.close();

    res.status(200).json({
      data: joinItem
    })
  },

  async fbScrape (req, res, next) {
    // Set up browser and page.
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // page.setViewport({ width: 1280, height: 926 });
  
    // Navigate to the demo page.
    await page.goto('https://facebook.com');
  
    const emailSelector = '#email'
    const passSelector = '#pass'
  
    const buttonSelector = '#loginbutton'
  
    await page.click(emailSelector);
    await page.keyboard.type(process.env.FBEMAIL);
  
    // await page.click(passSelector);
    // await page.keyboard.type(process.env.FBPASSWORD);
  
    await page.click(buttonSelector);
  
    await page.waitForNavigation();
  
    await page.click(passSelector);
    await page.keyboard.type(process.env.FBPASSWORD);
  
    await page.click(buttonSelector);
  
    await page.waitForNavigation();
  
    const wordToSearch = changeValue(req.body.keyword)
    const searchUrl = `https://www.facebook.com/search/str/${wordToSearch}/stories-keyword/stories-public`;
  
    await page.goto(searchUrl);
    await page.waitFor(2*1000);
  
    // Scroll and extract items from the page.
    const items = await scrapeInfiniteScrollItems(page, extractItemsFB, 50);
    let joinItem = items.join('$%@')
    // Save extracted items to a file.
    //console.log(items)
  
    // Close the browser.
    await browser.close();
    res.status(200).json({
      data: joinItem
    })
  }


}