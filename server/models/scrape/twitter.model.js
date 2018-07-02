const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scrapeTwitterSchema = mongoose.Schema({
    profile: Array,
    keyword: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const TwitterScrape = mongoose.model('ScrapeTwitter', scrapeTwitterSchema)

module.exports = TwitterScrape