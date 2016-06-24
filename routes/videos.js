var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lucio');
var Schema = mongoose.Schema;
var VideoSchema = new Schema({
    title: String,
    description: String,
   
});

// Mongoose Model definition
var Video = mongoose.model('videos', VideoSchema);

var db = mongoose.connection;


db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected. '+ db);
});


router.get('/', function(req, res) {
   
    Video.find({}, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

module.exports = router;