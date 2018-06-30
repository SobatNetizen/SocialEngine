require('dotenv').config()
const cron = require('cron');
const axios = require('axios');

const mongoose = require('mongoose');
let admin = process.env.DBUSER;
let password = process.env.DBPASSWORD;

mongoose.connect(`mongodb://${admin}:${password}@ds217921.mlab.com:17921/sobat-server`, () => {
  console.log('Connedted to Cron Job Database')
});

const User = require('./models/user.model')

var scrapeTwitter = new cron.CronJob({
  cronTime: '* * * * *',
  onTick: async function() {

    User.find()
    .then(userKeyword => {
        console.log('sedang get data')
        for(let i=0; i < userKeyword.length; i++){
            let idUser = userKeyword[i]._id
            userKeyword[i].keywords.forEach(keyword => {
                axios.post('http://localhost:3001/scrape/tweet',{ idUser , keyword })
                .then(result => {
                    console.log(result.data.info)
                })
                .catch(err => {
                    console.log(err)
                })

                axios.post('http://localhost:3001/scrape/fb',{ idUser , keyword })
                .then(result => {
                    console.log(result.data.info)
                })
                .catch(err => {
                    console.log(err)
                })
            })
        }

    })
    .catch(err =>{
        console.log(err)
    })
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

scrapeTwitter.start(); // job 1 started
 
console.log('scrapeTwitter status', scrapeTwitter.running); // job1 status true