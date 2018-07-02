const mongoose = require('mongoose')
const Schema = mongoose.Schema

const googleSchema = mongoose.Schema({
    time: Array,

    region: Array,

    queries: Array,

    topics: Array,

    keyword: String,

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})

const Google = mongoose.model('Google', googleSchema)

module.exports = Google