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
  },

  async newsScrape (req, res, next) {
    try {
      const browser = await puppeteer.launch({
        headless: false
      });
      const page = await browser.newPage();
      await page.evaluate('navigator.userAgent');
  
  
      wordToSearch = 'samsung'
  
      await page.goto(`https://www.cnnindonesia.com/search/?query=${wordToSearch}`);
      await page.waitForSelector('.list');
  
      const CNNheadlines = await page.$$('.box_text')
  
      let CNNtitles = []
  
      for (let i = 0; i < CNNheadlines.length; i++) {
        const CNNheadline = CNNheadlines[i]
        let title = await CNNheadline.$('.title')
        let titleText = await page.evaluate(title => title.innerText, title)
        CNNtitles.push(titleText)
        // console.log(titleText)
      }
      console.log(CNNtitles)
  
      await page.goto(`https://www.liputan6.com/`);
      await page.waitForSelector('#search > button');
  
      const search_selector = '#q'
      const search_button_selector = '#search > button'
      await page.click(search_selector);
      await page.keyboard.type(wordToSearch);
  
      await page.click(search_button_selector);
  
  
      await page.waitForSelector('.articles--iridescent-list--text-item__title-link-text');
  
      const L6headlines = await page.$$('.articles--iridescent-list--text-item__title-link')
  
      let L6titles = []
  
      for (let i = 0; i < 10; i++) {
        const L6headline = L6headlines[i]
        let title = await L6headline.$('.articles--iridescent-list--text-item__title-link-text')
        let titleText = await page.evaluate(title => title.innerText, title)
        L6titles.push(titleText)
      }
  
      console.log(L6titles)
  
      await page.goto(`https://www.detik.com/search/searchall?query=${wordToSearch}`)
      await page.waitForSelector('.box_text');
  
      let titles = 'body > div.wrapper.full > div > div.list.media_rows.list-berita > article:nth-child(INDEX) > a > span.box_text > p'
  
      let detikTitiles = []
  
      for (let i = 1; i <= 11; i++) {
        if (i !== 4 && i !== 8) {
          let titleSelector = titles.replace("INDEX", i);
  
          let title = await page.$(titleSelector)
          detikTitiles.push(await page.evaluate(title => title.innerText, title))
        }
      }
  
      console.log(detikTitiles)
  
      browser.close();
    } catch (error) {
      console.log(error)
    }
  }
}