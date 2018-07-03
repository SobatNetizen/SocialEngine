const cron = require('cron');
const axios = require('axios');

var analysisNews = new cron.CronJob({
  cronTime: '51 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    // let id = '5b3af94531ed6846946611a1'
    // let userId = '5b34aa41b31c366a122df79f'
    // let idHistory = '5b3afe06c330d24e6e46e419'
    // let keyword = 'samsung'

    // let id = '5b3afa8e061ea2488386e204'
    // let userId = '5b34aa41b31c366a122df79f'
    // let idHistory = '5b3aff49e4f3204fd2aede91'
    // let keyword = 'iphone'

    let id = '5b3afac7061ea2488386e205'
    let userId = '5b34aa41b31c366a122df79f'
    let idHistory = '5b3affa514228d504ccd4055'
    let keyword = 'asus'

    axios.post('http://localhost:3001/translate/news',{ id , userId, keyword, idHistory })
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