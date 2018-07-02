const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scrapeFacebookSchema = mongoose.Schema({
    profile: Array,
    genderData: Array,
    keyword: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const FacebookScrape = mongoose.model('ScrapeFacebook', scrapeFacebookSchema)

module.exports = FacebookScrape