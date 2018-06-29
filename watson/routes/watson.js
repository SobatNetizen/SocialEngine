const express = require('express')
const router = express.Router()

const { 
    twitterAnalysis,
    facebookAnalysis
} = require('../controllers/watson.controller')

router.post('/twitter', twitterAnalysis)
router.post('/facebook', facebookAnalysis)

module.exports = router
