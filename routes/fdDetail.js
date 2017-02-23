var express = require('express');
var router = express.Router();
var db = require('../database');

router.post('/', function(req, res, next) {
    var queryString = 'INSERT INTO `fixed_deposit` SET ?';
    var val = {
        user_id: req.body.user_id,
        bank_name: req.body.bank_name,
    }
    db.query(queryString, val, function(err, rows, field){
        if(err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.get('/:id', function(req, res, next) {
    var queryString = 'SELECT * FROM `fixed_deposit` WHERE `id` = ' + req.params.id;
    console.log('ok');
    db.query(queryString, function(err, rows, field) {
        if(err) {
            res.send(err); 
        } else {
            res.send(rows);
            console.log('ok1');
        }
    });
});

router.put('/', function(req, res, next) {
    var str = '';
    var dataArray = [];
    for(var k in req.body) {
        if(k !== 'id') {
            str += '`' + k + '` = ?, ';
            dataArray.push(req.body[k]);
        }
    }

    dataArray.push(req.body.id);
    
    str = str.replace(/(, $)/g, ""); // replace last comma
    console.log(str);
    db.query('UPDATE `fixed_deposit` SET ' + str + ' WHERE `id` = ?', dataArray, function(err, result, field){
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

router.delete('/:id', function(req, res){
    var queryString = 'DELETE FROM .`fixed_deposit` WHERE `id` = ' + req.params.id;
    db.query(queryString, function(err, result, field) {
        if(err) {
          res.send(err);
        } else {
         res.send(result);
        }
    });
});

module.exports = router;