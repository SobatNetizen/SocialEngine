const axios = require('axios')

const redis = require('redis')
const client = redis.createClient('17970', 'redis-17970.c1.ap-southeast-1-1.ec2.cloud.redislabs.com');
client.auth('dBMtpPy9yXTPtfdPHj78XAbqdTfrMLRj')

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': 'c78a3afe-2242-4cde-8bab-da3864e310c0',
  'password': 'rsX2fqeyrfPf',
  'version': '2018-03-16'
})

module.exports = {

    getAll: async ( req , res ) => {
        const {
            keyword,
            geocode
        } = req.body

        try{
            let time = await axios.post('http://localhost:3001/google/time', { keyword })
            let region = await axios.post('http://localhost:3001/google/region', { keyword, geocode })
            let queries = await axios.post('http://localhost:3001/google/queries', { keyword, geocode })
            let topics = await axios.post('http://localhost:3001/google/topics', { keyword, geocode })

            let twitter = await axios.post('http://localhost:3002/api/twitter', { keyword })
            let facebook = await axios.post('http://localhost:3002/api/facebook', { keyword })

            client.set(`${ keyword }`, JSON.stringify(
                {   
                    info: 'successfully get from redis',
                    time: time.data.timelineData,
                    region: region.data.geoMapData,
                    queries: queries.data.result,
                    topics: topics.data.result,
                    twitter: twitter.data,
                    facebook: facebook.data
                }
            ))

            res.status(200).json({
                info: 'successfully get all google trends',
                time: time.data.timelineData,
                region: region.data.geoMapData,
                queries: queries.data.result,
                topics: topics.data.result,
                twitter: twitter.data,
                facebook: facebook.data
            })
        }
        catch ( err ){
            console.log(err)
        }
    }

}