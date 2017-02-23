var express = require('express');
var router = express.Router();
var db = require("../database");
var Helper = require('./helper');
var allowedParams = ['id', 'fname', 'lname', 'phone', 'email', 'address', 'createdAt']; //define params globaly


/* GET users listing. */
router.get('/:id', function (req, res, next) {
  var queryString = 'SELECT * FROM `users` WHERE `id` = ' + req.params.id;
  db.query(queryString, function (err, rows, field) {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

router.post('/', function (req, res, next) {
  req.body = Helper.filterRequestBody(req.body, allowedParams);
  var queryString = 'INSERT INTO `users` SET ?';
  db.query(queryString, req.body, function (err, rows, field) {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

router.put('/', function (req, res) {
  req.body = Helper.filterRequestBody(req.body, allowedParams);
  var updateData = Helper.createDbUdateString(req.body);
  var queryString = 'UPDATE `users` SET ' + updateData.updateString + ' WHERE id = ?';
  db.query(queryString, updateData.dataArray, function (err, result, field) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.delete('/:id', function (req, res, next) {
  var queryString = 'DELETE FROM `users` WHERE `id` = ' + req.params.id;
  db.query(queryString, function (err, result, field) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
