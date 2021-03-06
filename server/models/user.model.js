const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const userSchema = mongoose.Schema({
    companyname: {
        type: String,
        required: [true, 'Tolong isi nama admin']
    },

    email: {
        type: String,
        unique: true,
        match: [email_regex, 'Masukan email dengan format yang benar']
    },

    password: {
        type: String,
        match: [password_regex, 'Password setidaknya memiliki 1 huruf, 1 angka dan panjang 8 karakter']
    },

    keywords: {
        type: Array
    },

    twitter: [{
        type: Schema.Types.ObjectId,
        ref: "Twitter"      
    }],

    scrapetwitter: [{
        type: Schema.Types.ObjectId,
        ref: "ScrapeTwitter"      
    }],

    facebook: [{
        type: Schema.Types.ObjectId,
        ref: "Facebook"      
    }],

    scrapefacebook: [{
        type: Schema.Types.ObjectId,
        ref: "ScrapeFacebook"      
    }],

    news: [{
        type: Schema.Types.ObjectId,
        ref: "News"      
    }],

    scrapenews: [{
        type: Schema.Types.ObjectId,
        ref: "ScrapeNews"      
    }],

    google: [{
        type: Schema.Types.ObjectId,
        ref: "Google"      
    }],
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {    
    try {        
        this.password = bcrypt.hashSync(this.password, 10)  
        next()
    } catch(err){
        next(err)
    }    
})

const User = mongoose.model('User', userSchema)

module.exports = User