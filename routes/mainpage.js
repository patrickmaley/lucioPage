var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	 console.log("TETSING");
    YoutubeLink.find({}, function(err, videos){
        if (err) throw err;
        console.log(videos);
      	res.json(videos);
    });
  res.render('../partials/mainpage', {  });
});

module.exports = router;
