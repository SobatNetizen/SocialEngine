const router = require('express').Router()

const {
    cacheGoogleTrends
} = require('../helpers/cache')

const {
    getAll
} = require('../controllers/store.controller')

router.post('/', cacheGoogleTrends, getAll)

module.exports = router