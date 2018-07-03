const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  changePassword,
  addKeyword,
  getUser,
  history,
  getHistoryById
} = require('../controllers/user.controller')
const { 
  authentication,
  authorisation
} = require('../middlewares/auth.middlewares')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getuser', authentication, authorisation, getUser)
router.post('/gethistory', authentication, authorisation, history)
router.put('/', updateUser)
router.put('/keyword', authentication, authorisation, addKeyword)
router.put('/pass', changePassword)
router.delete('/' , deleteUser)
router.get('/history/:id', getHistoryById)

module.exports = router
