var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.sendFile('weather.html', { root:  'public' });
});

router.get('/getcity',function(req,res,next) {
    console.log("In getcity route");
    var fs = require('fs');
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        if(err) throw err;
        var cities = data.toString().split("\n");
        var myRe = new RegExp("^" + req.query.q);
        console.log(myRe);
        var jsonresult = [];
        for(var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe); 
            if(result != -1) {
                console.log(cities[i]);
                jsonresult.push({city:cities[i]});
            } 
        }   
        res.status(200).json(jsonresult);
    });
});

var owlSearch = "https://owlbot.info/api/v1/dictionary/"
router.get('/api',function(req,res,next) {
    console.log("In api route");
    var fs = require('fs');
    request(owlSearch).pipe(res);
});

module.exports = router;

