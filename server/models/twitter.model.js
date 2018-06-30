const mongoose = require('mongoose')
const Schema = mongoose.Schema

const twitterSchema = mongoose.Schema({
    negative: Array,

    positive: Array,

    neutral: Array,

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const Twitter = mongoose.model('Twitter', twitterSchema)

module.exports = Twitter