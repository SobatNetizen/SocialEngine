const User = require('../models/user.model')
const History = require('../models/history.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

const secret = process.env.SECRET
const nodeEmail = process.env.FBEMAIL
const pass = process.env.FBPASSWORD

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${nodeEmail}`,
    pass: `${pass}`
  }
});

module.exports = {

    async history (req , res ){
        const {
            keyword
        } = req.body

        try{
            let history = await History.find({keyword})
            res.status(200).json({
                history
            })
        }
        catch(err){
            console.log(err)
        }
    },

    async getHistoryById (req , res ){

        try{
            let history = await History.findById(req.params.id)
            res.status(200).json({
                history
            })
        }
        catch(err){
            console.log(err)
        }
    },

    async registerUser (req, res, next) {
        try {
            let user = await User.create(req.body)
            let token = jwt.sign({ id: user._id }, secret)

            let mailOptions = {
              from: `${nodeEmail}`,
              to: `${user.email}`,
              subject: 'Thank you for signing up!',
              text: 'Thank you for signing up to Radar Social \n Hope you have a pleasant experience! \n \n Best Regards!'
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            })

            delete user.password

            res.header({
                'Access-Control-Expose-Headers': 'token',
                token
            })
            res.status(200).json({
                message: 'Berhasil membuat admin baru',
                user: {
                    companyname: user.companyname,
                    email: user.email
                }
            })
        } catch(err){
            next(err)
        }

    },

    async loginUser (req, res, next) {
        let { email, password } = req.body

        try {
            let user = await User.findOne({email})
                        .populate('twitter').populate('facebook').populate('news').populate('google')

            if (!user || !bcrypt.compareSync(password, user.password)) {

                throw ({status: 400, message: 'Email/password salah'})

            } else {
                let token = jwt.sign({ id: user._id }, secret)
                res.header({
                    'Access-Control-Expose-Headers': 'token',
                    token
                })
                res.status(200).json({
                    message: 'Berhasil masuk',
                    user: {
                        id: user._id,
                        companyname: user.companyname,
                        email: user.email,
                        keywords: user.keywords,
                        twitter: user.twitter,
                        facebook: user.facebook,
                        news: user.news,
                        google: user.google
                    }
                })
            }
        } catch(err) {
            next(err)
        }
    },

    updateUser (req, res, next) {
        let { id } = req.decoded

        // password punya controller sendiri
        if (req.body.password) delete req.body.password

        User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        .then(user => {
            res.status(200).json({
                message: 'Berhasil ganti data admin',
                user: {
                    companyname: user.companyname,
                    email: user.email
                }
            })
        }).catch(next)

    },

    getUser (req, res, next) {
        let { id } = req.decoded

        User.findById(id)
            .then(user => {
                res.status(200).json({
                    message: 'Berhasil masuk',
                    user: {
                        id: user._id,
                        companyname: user.companyname,
                        email: user.email,
                        keywords: user.keywords
                    }
                })
            }).catch(next)
    },

    changePassword (req, res, next) {
        let { id } = req.decoded
        let hash = bcrypt.hashSync(req.body.password, 10)

        User.findOneAndUpdate({_id: id}, {password: hash})
        .then(() => {
            res.status(200).send('Berhasil ganti password')
        })
        .catch(next)
    },

    deleteUser (req, res, next) {
        let { id } = req.decoded

        User.findByIdAndRemove(id)
        .then(() => {
            res.status(200).json({
                message: 'Berhasil delete data admin'
            })
        }).catch(next)
    },

    // verifyUser (req, res, next) {
    //     let { id } = req.decoded

    //     User.findById(id)
    //     .then(user => {
    //         res.status(200).json({
    //             message: 'Berhasil verify token admin',
    //             user: {
    //                 name: user.name,
    //                 email: user.email
    //             }
    //         })
    //     }).catch(next)
    // },

    addKeyword (req, res, next) {
        let { id } = req.decoded
        // console.log('oi', req.decoded, req.body)

        User.findByIdAndUpdate(id, {
            $push: { keywords: req.body.keyword}
        }, {new: true, runValidators: true})
        .then(user => {
            res.status(200).json({
                message: 'Berhasil ganti data admin',
                user: {
                    companyname: user.companyname,
                    email: user.email,
                    keywords: user.keywords
                }
            })
        }).catch(next)
    }
}
