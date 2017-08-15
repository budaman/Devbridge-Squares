var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient


var db

MongoClient.connect('mongodb://starwars:slaptazodis@ds161032.mlab.com:61032/star-wars-quotes', (err, database) => {
   if(err) return console.log(err)
   db=database
})

/* GET users listing. */
router.get('/', function(req, res, next) {

  var cursor = db.collection('coord').find().toArray(function(err, results) {
  res.json(results);
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




module.exports = router;
