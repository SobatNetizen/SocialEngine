const redis = require('redis')
const client = redis.createClient('17970', 'redis-17970.c1.ap-southeast-1-1.ec2.cloud.redislabs.com');
client.auth('dBMtpPy9yXTPtfdPHj78XAbqdTfrMLRj')

module.exports = {
    cacheGoogleTrends: ( req , res , next ) => {
        const {
            keyword,
            geocode
        } = req.body

        client.get(`${ keyword }`, ( err , google ) => {
            if( !err ){
                google ?
                res.status(200).json(JSON.parse(google)) : next ()
            }
            else {
                res.status(400).json({
                    info: err.message
                })
            }
        })
    }
}