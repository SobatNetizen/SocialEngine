const cron = require('cron');
const axios = require('axios');

var scrapeNews = new cron.CronJob({
  cronTime: '01 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    let idUser = '5b34aa41b31c366a122df79f'
    let keyword = 'samsung'

    axios.post('http://localhost:3001/scrape/news',{ idUser , keyword })
    .then(result => {
        console.log("cron job to get news finish")
    })
    .catch(err => {
        console.log("cron job to get news finish")
    })
     
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

scrapeNews.start(); // job 1 started
 
console.log('scrapeNews status', scrapeNews.running); // job1 status true