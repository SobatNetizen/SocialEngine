const cron = require('cron');
const axios = require('axios');
const mongoose = require('mongoose');

let admin = 'Admin';
let password = 'pass123';

mongoose.connect(`mongodb://${admin}:${password}@ds217921.mlab.com:17921/sobat-server`, () => {
  console.log('Connedted to DB mLab sobat-netizen :3')
});

const User = require('../../models/user.model')

var scrapeTwitter = new cron.CronJob({
  cronTime: '55 * * * *',
  onTick: async function() {
    console.log('time for cron job running')

    let idUser = '5b34aa41b31c366a122df79f'
    User.findById(idUser)
    .then( async result => {
        let loop = result.keywords
        for(let i=0; i< loop.length; i++){
            let keyword = loop[i]
            await axios.post('http://localhost:3001/scrape/tweet/profile',{ idUser , keyword })
            .then(result => {
                console.log("cron job to get twitter finish")
            })
            .catch(err => {
                console.log("cron job to get twitter finish")
            })
        }
    })
    .catch(err => {
      console.log(err)
    })
     
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

scrapeTwitter.start(); // job 1 started
 
console.log('scrapeTwitter status', scrapeTwitter.running); // job1 status true