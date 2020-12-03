var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');
var index = require('./routes/index');
var user = require('./routes/user');
var company = require('./routes/company');
var auth = require('./auth/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// moment scripts
var shortDateFormat = "D/M/YY @ kk:mm"; // this is just an example of storing a date format once so you can change it in one place and have it propagate
app.locals.moment = require('moment');; // this makes moment available as a variable in every EJS page
app.locals.shortDateFormat = shortDateFormat;

 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('process.env.COOKIE_SECRET'));
app.use(express.static('public'));
app.use(express.static('public/clientjs'));
app.use(express.static('public/images'));

// any request that begins with /auth will go into the auth router defined above (var auth = require...)
app.use('/auth', auth);
// any request that begins with / will go into the index router defined above (var index = require...)
app.use('/', index);
// any request that begins with /user will go into the user router defined above (var user = require...)
app.use('/user', user);
// any request that begins with /company will go into the company router defined above (var company = require...)
app.use('/company', company);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
