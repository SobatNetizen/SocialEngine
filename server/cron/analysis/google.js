const cron = require('cron');
const axios = require('axios');

var analysisNews = new cron.CronJob({
  cronTime: '05 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    let userId = '5b34aa41b31c366a122df79f'
    let keyword = 'samsung'

    axios.post('http://localhost:3001/translate/google',{ userId, keyword })
    .then(result => {
        console.log(result.data.info)
    })
    .catch(err => {
        console.log(err)
    })
     
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

analysisNews.start(); // job 1 started
 
console.log('analysis news status', analysisNews.running); // job1 status true