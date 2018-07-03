const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = mongoose.Schema({
    keyword: String,
    result: Array
}, {
    timestamps: true
})

const History = mongoose.model('History', historySchema)

module.exports = History