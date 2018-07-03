const cron = require('cron');
const axios = require('axios');

var analysisTwitter = new cron.CronJob({
  cronTime: '46 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    // let id = '5b3af44cedf3d53d57cd7328'
    // let userId = '5b34aa41b31c366a122df79f'
    // let keyword = 'samsung'

    // let id = '5b3af4a0edf3d53d57cd7329'
    // let userId = '5b34aa41b31c366a122df79f'
    // let keyword = 'iphone'

    let id = '5b3af4cfedf3d53d57cd732a'
    let userId = '5b34aa41b31c366a122df79f'
    let keyword = 'asus'

    axios.post('http://localhost:3001/translate/twitter',{ id, userId ,keyword })
    .then(result => {
        console.log('done analysis twitter')
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