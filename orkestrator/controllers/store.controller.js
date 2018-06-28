const axios = require('axios')

const redis = require('redis')
const client = redis.createClient('17970', 'redis-17970.c1.ap-southeast-1-1.ec2.cloud.redislabs.com');
client.auth('dBMtpPy9yXTPtfdPHj78XAbqdTfrMLRj')

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

            client.set(`${ keyword }`, JSON.stringify(
                {   
                    info: 'successfully get from redis',
                    time: time.data.timelineData,
                    region: region.data.geoMapData,
                    queries: queries.data.result,
                    topics: topics.data.result
                }
            ))

            res.status(200).json({
                info: 'successfully get all google trends',
                time: time.data.timelineData,
                region: region.data.geoMapData,
                queries: queries.data.result,
                topics: topics.data.result,
            })
        }
        catch ( err ){
            console.log(err)
        }
    }

}