var express = require('express');
var router = express.Router();
var db = require('../database');
var Helper = require('./helper');
var allowedParams = ['id', 'user_id', 'bank_name', 'ac_number', 'ifsc_code', 'micr_code', 'amount', 'issue_date', 'renewal_date', 'interest']; // define allowed params globaly


router.post('/', function (req, res, next) {
    req.body = Helper.filterRequestBody(req.body, allowedParams);
    var queryString = 'INSERT INTO `fixed_deposit` SET ?';
    db.query(queryString, req.body, function (err, rows, field) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.get('/:id', function (req, res, next) {
    var queryString = 'SELECT * FROM `fixed_deposit` WHERE `id` = ' + req.params.id;
    db.query(queryString, function (err, rows, field) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
            console.log('ok1');
        }
    });
});

router.put('/', function (req, res, next) {
    req.body = Helper.filterRequestBody(req.body, allowedParams);
    var updateData = Helper.createDbUdateString(req.body);

    db.query('UPDATE `fixed_deposit` SET ' + updateData.updateString + ' WHERE `id` = ?', 
              updateData.dataArray, function (err, result, field) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
})

router.delete('/:id', function (req, res) {
    var queryString = 'DELETE FROM .`fixed_deposit` WHERE `id` = ' + req.params.id;
    db.query(queryString, function (err, result, field) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


module.exports = router;