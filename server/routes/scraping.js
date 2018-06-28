const router = require('express').Router()
const {
  tweetScrape,
  fbScrape
} = require('../controllers/scraping.controller')

router.post('/tweet', tweetScrape)
router.post('/fb', fbScrape)

module.exports = router