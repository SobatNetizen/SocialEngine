const router = require('express').Router()
const {
  twitter,
  facebook,
  news,
  google
} = require('../controllers/translate.controller')

router.post('/twitter', twitter)
router.post('/fb', facebook)
router.post('/news', news)
router.post('/google', google)

module.exports = router