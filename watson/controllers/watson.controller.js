const axios = require('axios')

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': 'c78a3afe-2242-4cde-8bab-da3864e310c0',
  'password': 'rsX2fqeyrfPf',
  'version': '2018-03-16'
})

const Translate = require('yandex-translate-api')('trnsl.1.1.20180503T141519Z.407607057b00c677.78407971a76979f09a5894390fd65a810366d11b')

module.exports = {

    twitterAnalysis: async ( req , res ) => {
        const {
            keyword
        } = req.body

        let translateJoin = await axios.post('http://localhost:3001/scrape/tweet', { keyword })

        Translate.translate(`${translateJoin.data.data}`, { from: 'id', to: 'en' }, (err, translate) => {
            let resultTranslate = translate.text[0]

            let splitTranslate = resultTranslate.split('$%@')

            const negative = []
            const positive = []
            const neutral = []

            let ID = 0 
            if (ID < splitTranslate.length) {
                checksentiment(splitTranslate[ID])
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
                    if ( ID < splitTranslate.length){
                        checksentiment(splitTranslate[ID])
                    }
                    else{
                        res.status(200).json({
                            twitter: {
                                negative,
                                positive,
                                neutral
                            }
                        })
                    }
                })
            }
        })
    },

    facebookAnalysis: async ( req , res ) => {
        const {
            keyword
        } = req.body
        
        let translateJoin = await axios.post('http://localhost:3001/scrape/fb', { keyword })

        Translate.translate(`${translateJoin.data.data}`, { from: 'id', to: 'en' }, (err, translate) => {
            let resultTranslate = translate.text[0]

            let splitTranslate = resultTranslate.split('$%@')

            const negative = []
            const positive = []
            const neutral = []

            let ID = 0 
            if (ID < splitTranslate.length) {
                checksentiment(splitTranslate[ID])
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
                    if ( ID < splitTranslate.length){
                        checksentiment(splitTranslate[ID])
                    }
                    else{
                        res.status(200).json({
                            facebook: {
                                negative,
                                positive,
                                neutral
                            }
                        })
                    }
                })
            }
        })

        // let resultTranslate = []

        // let ID = 0 
        // if (ID < facebook.data.data.length) {
        //     doCall(facebook.data.data[ID])
        // }else{ 
        //     //console.log(result)
        // }
        // function doCall(params) {

        //     Translate.translate(`${params}`, { from: 'id', to: 'en' }, (err, translate) => {
        //         if (translate!=null) {
        //             resultTranslate.push(translate.text)
        //         }
        //         ID++
        //         if ( ID < facebook.data.data.length){
        //             doCall(facebook.data.data[ID])
        //         }
        //         else{ 
        //             const negative = []
        //             const positive = []
        //             const neutral = []

        //             let ID = 0 
        //             if (ID < resultTranslate.length) {
        //                 checksentiment(resultTranslate[ID])
        //             }else{ 
        //                 //console.log(result)
        //             }
        //             function checksentiment(params) {

        //                 const parameters = {
        //                     'text': `${params}`,
        //                     'features': {
        //                         'sentiment': {
        //                             'document': true
        //                         }
        //                     }
        //                 }

        //                 natural_language_understanding.analyze(parameters, ( err, response ) => {
        //                     if(response!=null){
        //                         if (response.sentiment.document.label=='negative') {
        //                             let sent = response.sentiment.document
        //                             sent["detail"] = params
        //                             negative.push(sent)
        //                         }else if(response.sentiment.document.label=='positive'){
        //                             let sent = response.sentiment.document
        //                             sent["detail"] = params
        //                             positive.push(sent)
        //                         }else{
        //                             let sent = response.sentiment.document
        //                             sent["detail"] = params
        //                             neutral.push(sent)
        //                         }
        //                     }
        //                     ID++
        //                     if ( ID < resultTranslate.length){
        //                         checksentiment(resultTranslate[ID])
        //                     }
        //                     else{
        //                         res.status(200).json({
        //                             facebook: {
        //                                 negative,
        //                                 positive,
        //                                 neutral
        //                             }
        //                         })
        //                     }
        //                 })
        //             }
        //         }
        //     })
        // }
    }
}