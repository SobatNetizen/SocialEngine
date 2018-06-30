const mongoose = require('mongoose')
const Schema = mongoose.Schema

const facebookSchema = mongoose.Schema({
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

const Facebook = mongoose.model('Facebook', facebookSchema)

module.exports = Facebook