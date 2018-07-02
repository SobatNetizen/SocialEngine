const cron = require('cron');
const axios = require('axios');

var scrapeTwitter = new cron.CronJob({
  cronTime: '37 * * * *',
  onTick: async function() {
    console.log('time for cron job running')

    let idUser = '5b34aa41b31c366a122df79f'
    let keyword = 'iphone'

    axios.post('http://localhost:3001/scrape/tweet/profile',{ idUser , keyword })
    .then(result => {
        console.log("cron job to get twitter finish")
    })
    .catch(err => {
        console.log("cron job to get twitter finish")
    })
     
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

scrapeTwitter.start(); // job 1 started
 
console.log('scrapeTwitter status', scrapeTwitter.running); // job1 status true