const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

//cherrio
// const axios = require('axios')
// const cheerio = require('cheerio')

// let base_url = 'https://twitter.com/jokowi'

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const watsonRouter = require('./routes/watson')

const app = express()

//cherrio
// axios.get(base_url)
// .then(( result ) => {
//   let $ = cheerio.load(result.data)
  
//   const fruits = [];
 
//   $('.TweetTextSize').each(function(i, elem) {
//     fruits[i] = $(this).text()
//   })

//   console.log(fruits)

// })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/api', watsonRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
