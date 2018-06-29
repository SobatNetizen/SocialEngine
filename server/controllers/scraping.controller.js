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

function extractTweetProfile() {
  const extractedUsernames = document.querySelectorAll('div.stream-item-header > a > span.username.u-dir.u-textTruncate');
  const extractedTweets = document.querySelectorAll('div.js-tweet-text-container > p');

  const items = [];

  for (let i = 0; i < extractedUsernames.length; i++) {
    for (let j = 0; j < extractedTweets.length; j++) {
      if (i == j) {
        items.push({
          username: extractedUsernames[i].innerText,
          tweet: extractedTweets[j].innerText
        })
      }
    }
  }

  return items;
}

function extractTweetProfileDetails() {
  const location = document.querySelector('.ProfileHeaderCard-locationText');
  const join_date = document.querySelector('.ProfileHeaderCard-joinDateText');

  let data = {
    location: 'Unknown',
    join_date: 'Unknown'
  }

  if (location && location.innerText !== '\n              \n\n        ') {
    data.location = location.innerText
  }

  if (join_date) {
    data.join_date = join_date.innerText
  }

  return data;
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
  scrollDelay = 10,
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
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // page.setViewport({ width: 1280, height: 926 });
    const wordToSearch = changeValue(req.body.keyword)

    await page.goto(`https://twitter.com/search?f=tweets&q=${wordToSearch}&src=typd`);

    const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

    console.log(items)

    await browser.close();

    res.status(200).json({
      data: items
    })
  },

  async tweetScrapeProfile (req, res, next) {

    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    
    // page.setViewport({ width: 1280, height: 926 });
    const wordToSearch = changeValue(req.body.keyword)

    await page.goto(`https://twitter.com/search?l=&q=${wordToSearch}%20near%3A%22Indonesia%22%20within%3A15mi&src=typd`);

    // obtain profile names including '@'
    const profiles = await scrapeInfiniteScrollItems(page, extractTweetProfile, 100);
    // console.log(profiles)
    
    // excluding '@' from profiles' name
    let profilesClean = []
    let empty = []
    profiles.map((profile, index) => {
      let newProfile = profile.username.slice(1, profile.length)
      let tweet = profile.tweet
      profilesClean.push({
        newProfile,
        tweet
      })
    })
    console.log(empty.length)
    
    // obtaining user profile by looping each profiles
    let allProfiles = []
    for (let i = 0; i < profilesClean.length; i++) {
      const userToSearch = changeValue(profilesClean[i].newProfile)

      await page.goto(`https://twitter.com/${userToSearch}`);
      // await page.screenshot({ path: `screenshots/tempo${i}.png` });

      await page.waitForSelector('.ProfileHeaderCard-locationText')
      await page.waitForSelector('.ProfileHeaderCard-joinDateText')

      const profileDetail = await scrapeInfiniteScrollItems(page, extractTweetProfileDetails, 1);
      // console.log('===??',profileDetail, profilesClean[i], userToSearch)

      allProfiles.push({
        username: profilesClean[i].newProfile,
        tweet: profilesClean[i].tweet,
        profileDetail
      })
    }

    await browser.close();
     
    res.status(200).json({
      data: allProfiles
    })

  },

  async fbScrape (req, res, next) {
    // Set up browser and page.
    const browser = await puppeteer.launch({
      headless: false,
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
  
    await page.click(passSelector);
    await page.keyboard.type(process.env.FBPASSWORD);
  
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
    const items = await scrapeInfiniteScrollItems(page, extractItemsFB, 100);
  
    // Save extracted items to a file.
    console.log(items)
  
    // Close the browser.
    await browser.close();
    res.status(200).json({
      data: items
    })
  }


}