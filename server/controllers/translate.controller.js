require('dotenv').config()
const Translate = require('yandex-translate-api')(process.env.APITRANSLATE)
const axios = require('axios')

const User = require('../models/user.model')
const Twitter = require('../models/twitter.model')
const TwitterScrape = require('../models/scrape/twitter.model')
const Facebook = require('../models/facebook.model')
const FacebookScrape = require('../models/scrape/facebook.model')
const News = require('../models/news.model')
const NewsScrape = require('../models/scrape/news.model')
const Google = require('../models/google.model')

const History = require('../models/history.model')

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': process.env.USERNAMEWATSON,
  'password': process.env.PASSWORDWATSON,
  'version': '2018-03-16'
})

module.exports = {
    twitter: ( req , res ) => {
        const {
            id,
            userId,
            keyword
        } = req.body

        TwitterScrape.findById(id)
        .then(result => {

            let profile = result.profile
            let resultTranslate = []

            let ID = 0 
            if (ID < profile.length) {
                doCall(profile[ID])
            }else{ 
                //console.log(result)
            }
            function doCall(params) {

                Translate.translate(`${params.tweet}`, { from: 'id', to: 'en' }, (err, translate) => {
                    if (translate!=null) {
                        let oldTwitter = params
                        oldTwitter["translate"] = translate.text
                        resultTranslate.push(oldTwitter)
                    }
                    ID++
                    if ( ID < profile.length){
                        doCall(profile[ID])
                    }
                    else{ 
                        const negative = []
                        const positive = []
                        const neutral = []

                        let ID = 0 
                        if (ID < resultTranslate.length) {
                            checksentiment(resultTranslate[ID])
                        }else{ 
                            //console.log(result)
                        }
                        function checksentiment(params) {

                            const parameters = {
                                'text': `${params.tweet}`,
                                'features': {
                                    'sentiment': {
                                        'document': true
                                    }
                                }
                            }

                            natural_language_understanding.analyze(parameters, ( err, response ) => {
                                if(response!=null){
                                    if (response.sentiment.document.label=='negative') {
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        negative.push(sent)
                                    }else if(response.sentiment.document.label=='positive'){
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        positive.push(sent)
                                    }else{
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        neutral.push(sent)
                                    }
                                }
                                ID++
                                if ( ID < resultTranslate.length){
                                    checksentiment(resultTranslate[ID])
                                }
                                else{
                                    History.create({
                                        keyword,
                                        result: [{
                                            'twitter': [
                                                negative,
                                                positive,
                                                neutral,
                                                keyword,
                                                userId
                                            ]
                                        }]
                                    })
                                    .then( result => {
                                        res.status(200).json({
                                            info: 'done save Twitter data to Database'
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                }
                            })
                        }
                    }
                })
            }

        })
        .catch(err => {
            console.log(err)
        })

    },
    facebook: async ( req , res ) => {
        const {
            id,
            userId,
            keyword,
            idHistory
        } = req.body

        FacebookScrape.findById(id)
        .then(result => {

            let profile = result.profile
            let resultTranslate = []

            let ID = 0 
            if (ID < profile.length) {
                doCall(profile[ID])
            }else{ 
                //console.log(result)
            }
            function doCall(params) {

                Translate.translate(`${params.opinion}`, { from: 'id', to: 'en' }, (err, translate) => {
                    if (translate!=null) {
                        let oldTwitter = params
                        oldTwitter["translate"] = translate.text
                        resultTranslate.push(oldTwitter)
                    }
                    ID++
                    if ( ID < profile.length){
                        doCall(profile[ID])
                    }
                    else{ 
                        const negative = []
                        const positive = []
                        const neutral = []

                        let ID = 0 
                        if (ID < resultTranslate.length) {
                            checksentiment(resultTranslate[ID])
                        }else{ 
                            //console.log(result)
                        }
                        function checksentiment(params) {

                            const parameters = {
                                'text': `${params.opinion}`,
                                'features': {
                                    'sentiment': {
                                        'document': true
                                    }
                                }
                            }

                            natural_language_understanding.analyze(parameters, ( err, response ) => {
                                if(response!=null){
                                    if (response.sentiment.document.label=='negative') {
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        negative.push(sent)
                                    }else if(response.sentiment.document.label=='positive'){
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        positive.push(sent)
                                    }else{
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        neutral.push(sent)
                                    }
                                }
                                ID++
                                if ( ID < resultTranslate.length){
                                    checksentiment(resultTranslate[ID])
                                }
                                else{
                                    History.findOneAndUpdate({_id: idHistory},
                                        { $push: { result: {
                                            'facebook': [
                                                negative,
                                                positive,
                                                neutral,
                                                keyword,
                                                userId
                                            ]
                                        }}
                                    })
                                    .then( result => {
                                        res.status(200).json({
                                            info: 'done save facebook data to Database'
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                    // let saveFacebook = new Facebook({ 
                                    //     negative,
                                    //     positive,
                                    //     neutral,
                                    //     keyword,
                                    //     userId
                                    // })
                                    // saveFacebook.save(function(err, response) {
                                    //     User.findByIdAndUpdate(userId, {
                                    //         $push: { facebook: response._id}
                                    //     }, {new: true, runValidators: true})
                                    //     .then(user => {
                                    //         res.status(200).json({
                                    //             info: 'done save Facebook data to Database'
                                    //         })
                                    //     })
                                    //     .catch(err => {
                                    //         console.log(err)
                                    //     })
                                    // })
                                }
                            })
                        }
                    }
                })
            }

        })
        .catch(err => {
            console.log(err)
        })
    },
    news: async ( req , res ) => {

        const {
            id,
            userId,
            keyword,
            idHistory
        } = req.body

        NewsScrape.findById(id)
        .then(result => {
            
            let profile = result.profile
            let resultTranslate = []

            let ID = 0 
            if (ID < profile.length) {
                doCall(profile[ID])
            }else{ 
                //console.log(result)
            }
            function doCall(params) {

                Translate.translate(`${params}`, { from: 'id', to: 'en' }, (err, translate) => {
                    if (translate!=null) {
                        resultTranslate.push(translate.text[0])
                    }
                    ID++
                    if ( ID < profile.length){
                        doCall(profile[ID])
                    }
                    else{ 
                        const negative = []
                        const positive = []
                        const neutral = []

                        let ID = 0 
                        if (ID < resultTranslate.length) {
                            checksentiment(resultTranslate[ID])
                        }else{ 
                            //console.log(result)
                        }
                        function checksentiment(params) {

                            const parameters = {
                                'text': `${params}`,
                                'features': {
                                    'sentiment': {
                                        'document': true
                                    }
                                }
                            }

                            natural_language_understanding.analyze(parameters, ( err, response ) => {
                                if(response!=null){
                                    if (response.sentiment.document.label=='negative') {
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        negative.push(sent)
                                    }else if(response.sentiment.document.label=='positive'){
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        positive.push(sent)
                                    }else{
                                        let sent = response.sentiment.document
                                        sent["detail"] = params
                                        neutral.push(sent)
                                    }
                                }
                                ID++
                                if ( ID < resultTranslate.length){
                                    checksentiment(resultTranslate[ID])
                                }
                                else{
                                    History.findOneAndUpdate({_id: idHistory},
                                        { $push: { result: {
                                            'news': [
                                                negative,
                                                positive,
                                                neutral,
                                                keyword,
                                                userId
                                            ]
                                        }}
                                    })
                                    .then( result => {
                                        res.status(200).json({
                                            info: 'done save News data to Database'
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                }
                            })
                        }
                    }
                })
            }
        
        })
    },

    google: async ( req , res ) =>{

        const {
            userId,
            keyword,
            idHistory
        } = req.body
        const geocode = 'ID'

        try{
            let time = await axios.post('http://localhost:3001/google/time', { keyword })
            let region = await axios.post('http://localhost:3001/google/region', { keyword, geocode })
            let queries = await axios.post('http://localhost:3001/google/queries', { keyword, geocode })
            let topics = await axios.post('http://localhost:3001/google/topics', { keyword, geocode })
            
            History.findOneAndUpdate({_id: idHistory},
                { $push: { result: {
                    'google': [
                        time.data.result,
                        region.data.regionData,
                        queries.data.result,
                        topics.data.result,
                        keyword,
                        userId
                    ]
                }}
            })
            .then( result => {
                res.status(200).json({
                    info: 'done save google data to Database'
                })
            })
            .catch(err => {
                console.log(err)
            })
            // let saveGoogle = await new Google({ 
            //     time: time.data.result,
            //     region: region.data.regionData,
            //     queries: queries.data.result,
            //     topics: topics.data.result,
            //     keyword,
            //     userId
            // })
            // saveGoogle.save(function(err, response) {
            //     User.findByIdAndUpdate(userId, {
            //         $push: { google: response._id}
            //     }, {new: true, runValidators: true})
            //     .then(user => {
            //         res.status(200).json({
            //             info: 'done save Google data to Database'
            //         })
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })
            // })
        }
        catch (err) {
            console.log(err)
        }

    }
}