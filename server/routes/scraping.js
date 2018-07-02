const router = require('express').Router()
const {
  tweetScrapeProfile,
  fbScrapeProfile,
  newsScrape
} = require('../controllers/scraping.controller')

router.post('/tweet/profile', tweetScrapeProfile)
router.post('/fb/profile', fbScrapeProfile)
router.post('/news', newsScrape)

module.exports = router