const cron = require('cron');
const axios = require('axios');

var analysisTwitter = new cron.CronJob({
  cronTime: '05 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    let id = '5b3903df8398343600c788fa'
    let userId = '5b34aa41b31c366a122df79f'
    let keyword = 'asus'

    axios.post('http://localhost:3001/translate/twitter',{ id , userId, keyword })
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

analysisTwitter.start(); // job 1 started
 
console.log('analysis twitter status', analysisTwitter.running); // job1 status true