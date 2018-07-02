const cron = require('cron');
const axios = require('axios');

var analysisNews = new cron.CronJob({
  cronTime: '05 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    let id = '5b39ace3f8a81632c7aade10'
    let userId = '5b34aa41b31c366a122df79f'
    let idHistory = '5b3a0903bb417d046e6dbc0c'
    let keyword = 'samsung'

    // let id = '5b39ad57f8a81632c7aade11'
    // let userId = '5b34aa41b31c366a122df79f'
    // let keyword = 'iphone'

    // let id = '5b39ad83f8a81632c7aade12'
    // let userId = '5b34aa41b31c366a122df79f'
    // let keyword = 'asus'

    axios.post('http://localhost:3001/translate/news',{ id , userId, keyword })
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