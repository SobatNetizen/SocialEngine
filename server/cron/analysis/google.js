const cron = require('cron');
const axios = require('axios');
const nodemailer = require('nodemailer')

const nodeEmail = process.env.FBEMAIL
const pass = process.env.FBPASSWORD

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${nodeEmail}`,
    pass: `${pass}`
  }
});

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

        let mailOptions = {
          from: `${nodeEmail}`,
          to: `${user.email}`,
          subject: 'Radar Social Media Analysis has been Completed',
          text: 'Radar Social Media Analysis has been Completed \n you can check it out now!'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
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
