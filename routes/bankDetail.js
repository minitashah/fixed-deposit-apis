var express = require('express');
var router = express.Router();
var db = require('../database');
var Helper = require('./helper');
var allowedParams = ['id', 'bank_name', 'bank_branch', 'ifsc_code'];

router.post('/', function(req, res) {
    req.body = Helper.filterRequestBody(req.body, allowedParams);
    var queryString = 'INSERT INTO `bank_detail` SET ?';
    db.query(queryString, req.body, function(err, rows, fields) {
        if(err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.get('/:id', function(req, res) {
    var queryString = 'SELECT * FROM `bank_detail` WHERE `id` = ' + req.params.id;
    db.query(queryString, function(err, rows, fields) {
        if(err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.put('/', function(req,res) {
    req.body = Helper.filterRequestBody(req.body, allowedParams);
    var updateData = Helper.createDbUdateString(req.body);
    var queryString = 'UPDATE `bank_detail` SET ' + updateData.updateString + 'WHERE `id` = ?;'
    db.query(queryString, updateData.dataArray, function(err, result, fields) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.delete('/:id', function(req, res) {
    var queryString = '"DELETE FROM `bank_detail` WHERE `id` = "?';
    db.query(queryString, function(err, result, fields) {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;