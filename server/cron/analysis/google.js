const cron = require('cron');
const axios = require('axios');

var analysisNews = new cron.CronJob({
  cronTime: '01 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    // let userId = '5b34aa41b31c366a122df79f'
    // let idHistory = '5b3afe06c330d24e6e46e419'
    // let keyword = 'samsung'

    // let userId = '5b34aa41b31c366a122df79f'
    // let idHistory = '5b3aff49e4f3204fd2aede91'
    // let keyword = 'iphone'

    let userId = '5b34aa41b31c366a122df79f'
    let idHistory = '5b3affa514228d504ccd4055'
    let keyword = 'asus'

    axios.post('http://localhost:3001/translate/google',{ userId, keyword, idHistory })
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