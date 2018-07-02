const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scrapeNewsSchema = mongoose.Schema({
    profile: Array,
    keyword: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const NewsScrape = mongoose.model('ScrapeNews', scrapeNewsSchema)

module.exports = NewsScrape