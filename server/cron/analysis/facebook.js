const cron = require('cron');
const axios = require('axios');

const mongoose = require('mongoose');

let admin = 'Admin';
let password = 'pass123';

mongoose.connect(`mongodb://${admin}:${password}@ds217921.mlab.com:17921/sobat-server`, () => {
  console.log('Connedted to DB mLab sobat-netizen :3')
});

var analysisFacebook = new cron.CronJob({
  cronTime: '19 * * * *',
  onTick: function() {
    console.log('time for cron job running')

    // let id = '5b3af70deebe614275b87fe0'
    // let userId = '5b34aa41b31c366a122df79f'
    // let keyword = 'samsung'
    // let idHistory = '5b3afe06c330d24e6e46e419'

    // let id = '5b3af7c6eebe614275b87fe1'
    // let userId = '5b34aa41b31c366a122df79f'
    // let keyword = 'iphone'
    // let idHistory = '5b3aff49e4f3204fd2aede91'

    let id = '3b3a2676d11e33193405ef01'
    let userId = '5b34aa41b31c366a122df79f'
    let keyword = 'asus'
    let idHistory = '5b3affa514228d504ccd4055'

    axios.post('http://localhost:3001/translate/fb',{ id, userId ,keyword, idHistory })
    .then(result => {
        console.log('done analysis facebook')
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