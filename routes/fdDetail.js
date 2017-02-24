var express = require('express');
var router = express.Router();
var db = require('../database');
var Helper = require('./helper');
var allowedParams = ['id', 'user_id', 'bank_id', 'ac_number', 'amount', 'issue_date', 'renewal_date', 'interest']; // define allowed params globaly


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
    var fdQuery = 'SELECT * FROM `fixed_deposit` WHERE `id` = ' + req.params.id;
    db.query(fdQuery, function (err, fdRows) {
        if(fdRows.length === 0) {
            res.status(404).send({
                error: "Not found."
            });
            return;
        }
        var fd = fdRows[0];

        var bankQuery = 'SELECT * FROM `bank_detail` WHERE `id` = ' + fd.bank_id;
        db.query(bankQuery, function(err, bankRows) {
            if (err) {
                res.send(err);
            } else {
                fd.bankDetails = bankRows.length === 1 ?  bankRows[0] : {} ;
                res.send(fd);
            }
        });
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