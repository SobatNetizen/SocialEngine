const router = require('express').Router()
const {
  tweetScrape,
  fbScrape,
  tweetScrapeProfile,
  fbScrapeProfile,
  newsScrape
} = require('../controllers/scraping.controller')

router.post('/tweet', tweetScrape)
router.post('/tweet/&profile', tweetScrapeProfile)
router.post('/fb', fbScrape)
router.post('/fb/&profile', fbScrapeProfile)
router.post('/news', newsScrape)

module.exports = router