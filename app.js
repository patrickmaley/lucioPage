var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lucio');
var db = mongoose.connection;


db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected. '+ db);
});

var routes = require('./routes/index');
var users = require('./routes/users');
var videos = require('./routes/videos');

var app = express();

var Xray = require('x-ray');
var x = Xray();

var Schema = mongoose.Schema;
var linkSchema = new Schema({
title : String,
link : String,
});

var YoutubeLink = mongoose.model('video', linkSchema);

x('https://www.youtube.com/results?q=lucio+strategy&sp=EgIIAg%253D%253D', '.section-list, .yt-lockup-content',[{
  title: 'h3',
  link:'h3 a@href'
}])(function(err,obj){
  console.log("wrote to database");
  for(var i = 0; i < obj.length; i++){
    console.log(i);
    console.log(obj[i].title + ' ' + obj[i].link +'\n');

    var arvind = new YoutubeLink({
      title : obj[i].title,
      link : obj[i].link,
    });
     
    arvind.save(function (err, data) {
    if (err) console.log(err);
    else console.log('Saved : ', data );
    });
  }
  console.log("wrote to database");
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/videos', videos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
