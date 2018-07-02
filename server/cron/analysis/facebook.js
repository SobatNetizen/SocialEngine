const cron = require('cron');
const axios = require('axios');

var analysisFacebook = new cron.CronJob({
  cronTime: '05 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    let id = '5b39c78b36b52248754fea88'
    let userId = '5b34aa41b31c366a122df79f'
    let keyword = 'samsung'

    axios.post('http://localhost:3001/translate/fb',{ id , userId, keyword })
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

analysisFacebook.start(); // job 1 started
 
console.log('analysis facebook status', analysisFacebook.running); // job1 status true