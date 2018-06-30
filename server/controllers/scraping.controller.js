require('dotenv').config()
const User = require('../models/user.model')
const puppeteer = require('puppeteer');
const CODE = require('./URLCode');

const axios = require('axios')
const Twitter = require('../models/twitter.model')
const Facebook = require('../models/facebook.model')

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': process.env.USERNAMEWATSON,
  'password': process.env.PASSWORDWATSON,
  'version': '2018-03-16'
})

const Translate = require('yandex-translate-api')(process.env.APITRANSLATE)

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

    const {
      idUser,
      keyword
    } = req.body

    // Set up browser and page.
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // page.setViewport({ width: 1280, height: 926 });
    const wordToSearch = changeValue(keyword)

    await page.goto(`https://twitter.com/search?f=tweets&q=${wordToSearch}&src=typd`);

    const items = await scrapeInfiniteScrollItems(page, extractItems, 5);
    let joinItem = items.join('$%@')
    //console.log(items)

    await browser.close();

    Translate.translate(`${joinItem}`, { from: 'id', to: 'en' }, (err, translate) => {
        let resultTranslate = translate.text[0]

        let splitTranslate = resultTranslate.split('$%@')

        const resultNegative = []
        const resultPositive = []
        const resultNeutral = []

        let ID = 0 
        if (ID < splitTranslate.length) {
            checksentiment(splitTranslate[ID])
        }else{ 
            //console.log(result)
        }
        function checksentiment(params) {

            const parameters = {
                'text': `${params}`,
                'features': {
                    'sentiment': {
                        'document': true
                    }
                }
            }

            natural_language_understanding.analyze(parameters, ( err, response ) => {
                if(response!=null){
                    if (response.sentiment.document.label=='negative') {
                        let sent = response.sentiment.document
                        sent["detail"] = params
                        resultNegative.push(sent)
                    }else if(response.sentiment.document.label=='positive'){
                        let sent = response.sentiment.document
                        sent["detail"] = params
                        resultPositive.push(sent)
                    }else{
                        let sent = response.sentiment.document
                        sent["detail"] = params
                        resultNeutral.push(sent)
                    }
                }
                ID++
                if ( ID < splitTranslate.length){
                    checksentiment(splitTranslate[ID])
                }
                else{
                    let saveTwitter = new Twitter({ 
                        negative: resultNegative,
                        positive: resultPositive,
                        neutral: resultNeutral
                    })
                    saveTwitter.save(function(err, response) {
                        User.findByIdAndUpdate(idUser, {
                            $push: { twitter: response._id}
                        }, {new: true, runValidators: true})
                        .then(user => {
                          res.status(200).json({
                              info: 'done save Twitter data to Database'
                          })
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    })
                }
            })
        }
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

    const {
      idUser,
      keyword
    } = req.body

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
  
    // await page.click(passSelector);
    // await page.keyboard.type(process.env.FBPASSWORD);
  
    await page.click(buttonSelector);
  
    await page.waitForNavigation();
  
    await page.click(passSelector);
    await page.keyboard.type(process.env.FBPASSWORD);
  
    await page.click(buttonSelector);
  
    await page.waitForNavigation();
  
    const wordToSearch = changeValue(keyword)
    const searchUrl = `https://www.facebook.com/search/str/${wordToSearch}/stories-keyword/stories-public`;
  
    await page.goto(searchUrl);
    await page.waitFor(2*1000);
  
    // Scroll and extract items from the page.
    const items = await scrapeInfiniteScrollItems(page, extractItemsFB, 5);
    let joinItem = items.join('$%@')
    // Save extracted items to a file.
    //console.log(items)
  
    // Close the browser.
    await browser.close();
    
    Translate.translate(`${joinItem}`, { from: 'id', to: 'en' }, (err, translate) => {
        let resultTranslate = translate.text[0]

        let splitTranslate = resultTranslate.split('$%@')

        const resultNegative = []
        const resultPositive = []
        const resultNeutral = []

        let ID = 0 
        if (ID < splitTranslate.length) {
            checksentiment(splitTranslate[ID])
        }else{ 
            //console.log(result)
        }
        function checksentiment(params) {

            const parameters = {
                'text': `${params}`,
                'features': {
                    'sentiment': {
                        'document': true
                    }
                }
            }

            natural_language_understanding.analyze(parameters, ( err, response ) => {
                if(response!=null){
                    if (response.sentiment.document.label=='negative') {
                        let sent = response.sentiment.document
                        sent["detail"] = params
                        resultNegative.push(sent)
                    }else if(response.sentiment.document.label=='positive'){
                        let sent = response.sentiment.document
                        sent["detail"] = params
                        resultPositive.push(sent)
                    }else{
                        let sent = response.sentiment.document
                        sent["detail"] = params
                        resultNeutral.push(sent)
                    }
                }
                ID++
                if ( ID < splitTranslate.length){
                    checksentiment(splitTranslate[ID])
                }
                else{
                    let saveFacebook = new Facebook({ 
                        negative: resultNegative,
                        positive: resultPositive,
                        neutral: resultNeutral
                    })
                    saveFacebook.save(function(err, response) {
                        User.findByIdAndUpdate(idUser, {
                            $push: { facebook: response._id}
                        }, {new: true, runValidators: true})
                        .then(user => {
                          res.status(200).json({
                              info: 'done save facebook data to Database'
                          })
                        })
                        .catch(err => {
                          console.log(err)
                        })
                    })
                }
            })
        }
    })
  },

  async newsScrape (req, res, next) {
    try {
      const browser = await puppeteer.launch({
        headless: true
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