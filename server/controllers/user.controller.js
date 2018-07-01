const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const secret = process.env.SECRET

module.exports = {
    async registerUser (req, res, next) {        
        try {
            let user = await User.create(req.body)        
            let token = jwt.sign({ id: user._id }, secret)
            
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
                        keywords: user.keywords
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