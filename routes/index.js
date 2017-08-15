const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://starwars:slaptazodis@ds161032.mlab.com:61032/star-wars-quotes', (err, database) => {
   if(err) return console.log(err)
   db=database
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/coord', (req, res) => {
   db.collection('coord').save(req.body, (err, result) => {
     if (err) return console.log(err)

     console.log('saved to database')
     res.redirect('/')
   })
})

router.post('/lists', (req, res) => {
  repo.addList(req.body, (err, data) => {
    repo.defaultCb(res, err, data, _io);
  });
});


module.exports = router;
