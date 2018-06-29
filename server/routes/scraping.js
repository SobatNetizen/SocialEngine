const router = require('express').Router()
const {
  tweetScrape,
  fbScrape,
  newsScrape
} = require('../controllers/scraping.controller')

router.post('/tweet', tweetScrape)
router.post('/fb', fbScrape)
router.post('/news', newsScrape)

module.exports = router