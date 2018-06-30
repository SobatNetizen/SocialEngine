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
  const extractedTweetUrls = document.querySelectorAll('.js-stream-item');

  const items = [];

  for (let i = 0; i < extractedUsernames.length; i++) {
    for (let j = 0; j < extractedTweets.length; j++) {
      for (let k = 0; k < extractedTweetUrls.length; k++) {
        if (i == j && i == k && j == k) {
          items.push({
            username: extractedUsernames[i].innerText,
            tweet: extractedTweets[j].innerText,
            link: extractedTweetUrls[k].getAttribute('data-item-id')
          })
        }
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


function extractItemsFBProfile() {
  const extractedUrls = document.querySelectorAll('div._lic > a:nth-child(2)');
  const extractedOpinions = document.querySelectorAll('._5-jo');
  const extractedOpinionUrls = document.querySelectorAll('div._lie > a');
  // #u_ps_0_3_h > div:nth-child(2) > div._lid.fsm.fwn.fcg > div._lie > a

  const items = [];

  for (let i = 0; i < extractedUrls.length; i++) {
    for (let j = 0; j < extractedOpinions.length; j++) {
      for (let k = 0; k < extractedOpinionUrls.length; k++) {
        if (i == j && i == k && j == k) {
          items.push({
            url: extractedUrls[i].href,
            opinion: extractedOpinions[j].innerText,
            link: extractedOpinionUrls[k].href
          })
        }
      }
    }
  }

  return items;
}


function extractFbProfileName() {
  const extractedName = document.querySelector('._2nlw');
  return extractedName.innerText
}


function extractFbProfileGender() {
  const extractedGender = document.querySelector('#pagelet_basic > div > ul > li._3pw9._2pi4._2ge8._3ms8 > div > div._4bl7._pt5 > div > div > span');
  let gender = 'Unknown'
  if (extractedGender) {
    gender = extractedGender.innerText
  }
  return gender
}


function extractFbProfileBirth() {
  const extractedBirthday = document.querySelector('#pagelet_basic > div > ul > li._3pw9._2pi4._2ge8._4vs2 > div > div._4bl7._pt5 > div > div > span'); 
  let birth = 'Unknown'
  if (extractedBirthday) {
    birth = extractedBirthday.innerText
  }
  return birth
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
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // page.setViewport({ width: 1280, height: 926 });
    const wordToSearch = changeValue(keyword)

    await page.goto(`https://twitter.com/search?f=tweets&q=${wordToSearch}&src=typd`);

    const items = await scrapeInfiniteScrollItems(page, extractItems, 50);
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
      headless: true,
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
      let link = profile.link
      profilesClean.push({
        newProfile,
        tweet,
        link
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
        tweetLink: `https://twitter.com/${profilesClean[i].newProfile}/status/${profilesClean[i].link}`,
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
  
    const wordToSearch = changeValue(keyword)
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

  async fbScrapeProfile (req, res, next) {
  
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
    const searchUrl = `https://www.facebook.com/search/str/${wordToSearch}/stories-keyword/stories-opinion`;
  
    await page.goto(searchUrl);
    // await page.screenshot({ path: 'screenshots/check.png' });
  
    // Scroll and extract items from the page.
    const opinions = await scrapeInfiniteScrollItems(page, extractItemsFBProfile, 100);

    // Go to each profile url to obtain their information
    let allProfiles = []
    for (let i = 0; i < opinions.length; i++) {
      const url = opinions[i].url

      await page.goto(url);

      await page.waitForSelector('._2nlw')

      const profileName = await scrapeInfiniteScrollItems(page, extractFbProfileName, 1);

      const aboutUrl = url.replace('?fref=search', '/about?section=contact-info')

      await page.goto(aboutUrl);

      const profileGender = await scrapeInfiniteScrollItems(page, extractFbProfileGender, 1);
      // console.log(profileOther)

      const profileBirth = await scrapeInfiniteScrollItems(page, extractFbProfileBirth, 1);
      let nowYear = new Date(Date.now()).getFullYear()
      let birthYear = new Date(profileBirth).getFullYear()
      let age = 'Unknown'
      if (profileBirth !== 'Unknown') {
        if (birthYear == 2001 && profileBirth.search(2001) !== -1) {
          age = nowYear - birthYear
        } else if (birthYear == 2001 && profileBirth.search(2001) == -1) {
          age = 'Unknown'
        } else {
          age = nowYear - birthYear
        }
      }

      allProfiles.push({
        profileUrl: opinions[i].url,
        profileName,
        gender: profileGender,
        birthday: profileBirth,
        age,
        opinionUrl: opinions[i].link,
        opinion: opinions[i].opinion,
      })
    }

    let genderData = {
      male: {
        below20: 0, // 1- 19
        below30: 0, // 20 - 29
        below40: 0, // 30 - 39
        below50: 0, // 40 - 49
        above50: 0, // >= 50
        unknown: 0,
      },
      female: {
        below20: 0, // 1- 19
        below30: 0, // 20 - 29
        below40: 0, // 30 - 39
        below50: 0, // 40 - 49
        above50: 0, // >= 50
        unknown: 0
      },
      unknown: {
        below20: 0, // 1- 19
        below30: 0, // 20 - 29
        below40: 0, // 30 - 39
        below50: 0, // 40 - 49
        above50: 0, // >= 50
        unknown: 0,
      }
    }

    for (let i = 0; i < allProfiles.length; i++) {
      if (allProfiles[i].gender == 'Male') {
        if (allProfiles[i].age < 20) {
          genderData.male.below20++
        } else if (allProfiles[i].age >= 20 && allProfiles[i].age < 30) {
          genderData.male.below30++
        } else if (allProfiles[i].age >= 30 && allProfiles[i].age < 40) {
          genderData.male.below40++
        } else if (allProfiles[i].age >= 40 && allProfiles[i].age < 50) {
          genderData.male.below50++
        } else if (allProfiles[i].age >= 50) {
          genderData.male.above50++
        } else {
          genderData.male.unknown++
        }
      } else if (allProfiles[i].gender == 'Female') {
        if (allProfiles[i].age < 20) {
          genderData.female.below20++
        } else if (allProfiles[i].age >= 20 && allProfiles[i].age < 30) {
          genderData.female.below30++
        } else if (allProfiles[i].age >= 30 && allProfiles[i].age < 40) {
          genderData.female.below40++
        } else if (allProfiles[i].age >= 40 && allProfiles[i].age < 50) {
          genderData.female.below50++
        } else if (allProfiles[i].age >= 50) {
          genderData.female.above50++
        } else {
          genderData.female.unknown++
        }
      } else {
        if (allProfiles[i].age < 20) {
          genderData.unknown.below20++
        } else if (allProfiles[i].age >= 20 && allProfiles[i].age < 30) {
          genderData.unknown.below30++
        } else if (allProfiles[i].age >= 30 && allProfiles[i].age < 40) {
          genderData.unknown.below40++
        } else if (allProfiles[i].age >= 40 && allProfiles[i].age < 50) {
          genderData.unknown.below50++
        } else if (allProfiles[i].age >= 50) {
          genderData.unknown.above50++
        } else {
          genderData.unknown.unknown++
        }
      }

    }

    // console.log(items)
    // let joinItem = items.join('$%@')
    // Save extracted items to a file.
  
    // Close the browser.
    await browser.close();

    res.status(200).json({
      data: allProfiles,
      genderData
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