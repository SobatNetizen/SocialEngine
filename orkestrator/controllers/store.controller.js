const axios = require('axios')

// const redis = require('redis')
// const client = redis.createClient('17970', 'redis-17970.c1.ap-southeast-1-1.ec2.cloud.redislabs.com');
// client.auth('dBMtpPy9yXTPtfdPHj78XAbqdTfrMLRj')

const History = require('../models/history.model')

module.exports = {

    getAll: async ( req , res ) => {
        const {
            keyword,
        } = req.body
        const geocode = 'ID'

        try{
            let time = await axios.post('http://localhost:3001/google/time', { keyword })
            let region = await axios.post('http://localhost:3001/google/region', { keyword, geocode })
            let queries = await axios.post('http://localhost:3001/google/queries', { keyword, geocode })
            let topics = await axios.post('http://localhost:3001/google/topics', { keyword, geocode })

            let twitter = await axios.post('http://localhost:3001/scrape/tweet/profile', { keyword })
            //let facebook = await axios.post('http://localhost:3002/api/facebook', { keyword })

            // client.set(`${ keyword }`, JSON.stringify(
            //     {   
            //         info: 'successfully get from redis',
            //         time: time.data.timelineData,
            //         region: region.data.geoMapData,
            //         queries: queries.data.result,
            //         topics: topics.data.result,
            //         twitter: twitter.data,
            //         facebook: facebook.data
            //     }
            // ))
            let saveHistory = new History({ 
                google: {
                    time:  time.data.result,
                    region: region.data.regionData,
                    queries: queries.data.result,
                    topics: topics.data.result,
                },
                twitter: twitter.data,
            })
            saveHistory.save()
            
                //facebook: facebook.data
        }
        catch ( err ){
            console.log(err)
        }
    }

}