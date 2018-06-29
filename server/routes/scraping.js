const router = require('express').Router()
const {
  tweetScrape,
  fbScrape,
  tweetScrapeProfile
} = require('../controllers/scraping.controller')

router.post('/tweet', tweetScrape)
router.post('/tweet/name', tweetScrapeProfile)
router.post('/fb', fbScrape)

module.exports = router