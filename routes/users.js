var express = require('express');
var router = express.Router();
var db = require("../database");

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var queryString = 'SELECT * FROM `users` WHERE `id` = ' + req.params.id;
  db.query(queryString, function(err, rows, field) {
    if(err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/', function(req, res, next) {
  var queryString = 'INSERT INTO .`users` SET ?'; 
  var val = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    createdAt: req.body.createdAt
  }
  db.query(queryString, val, function(err, rows, field){
    if(err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

router.put('/', function(req, res, next){
  db.query('UPDATE .`users` SET `fname` = ?,`lname` = ?  WHERE `id` = ?', [req.body.fname,req.body.lname,req.body.id], function(err, result, field){
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.delete('/:id', function(req, res, next){
 var queryString = 'DELETE FROM .`users` WHERE `id` = ' + req.params.id;
 db.query(queryString, function(err, result, field){
  if(err){
    res.send(err);
  } else {
    res.send(result);
  }
 });
});

module.exports = router;
