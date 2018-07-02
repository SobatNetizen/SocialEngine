const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  changePassword,
  addKeyword,
  getUser
} = require('../controllers/user.controller')
const { 
  authentication,
  authorisation
} = require('../middlewares/auth.middlewares')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getuser', authentication, authorisation, getUser)
router.put('/', updateUser)
router.put('/keyword', authentication, authorisation, addKeyword)
router.put('/pass', changePassword)
router.delete('/' , deleteUser)

module.exports = router
