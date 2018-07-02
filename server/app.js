require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors')

let admin = process.env.DBUSER;
let password = process.env.DBPASSWORD;
 
mongoose.connect(`mongodb://${admin}:${password}@ds217921.mlab.com:17921/sobat-server`, () => {
  console.log('Connedted to DB mLab sobat-netizen :3')
});

const indexRouter = require('./routes/index');
const scrapingRouter = require('./routes/scraping');
const usersRouter = require('./routes/users');
const googleRouter = require('./routes/google');
const translateRouter = require('./routes/translate');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/scrape', scrapingRouter);
app.use('/users', usersRouter);
app.use('/google', googleRouter);
app.use('/translate', translateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
