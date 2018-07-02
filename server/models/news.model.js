const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = mongoose.Schema({
    negative: Array,

    positive: Array,

    neutral: Array,

    keyword: String,

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const News = mongoose.model('News', newsSchema)

module.exports = News