var express = require('express');
var router = express.Router();
var db = require('../database');
var Helper = require('./helper');
var async = require('async');
var allowedParams = ['id', 'users_id', 'bank_id', 'ac_number', 'amount', 'issue_date', 'renewal_date', 'interest']; // define allowed params globaly


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

        var getUserDetail = function (callback) {
            var userQuery = 'SELECT * FROM `users` WHERE `id` = ' + fd.users_id;
            db.query(userQuery, function(err, userRows) {
                callback(err, userRows);
            })
        };

        var getBankDetails = function (callback) {
            var bankQuery = 'SELECT * FROM `bank_detail` WHERE `id` = ' + fd.bank_id;
            db.query(bankQuery, function(err, bankRows) {
                callback(err, bankRows);
            })
        };

        // to make dynamic function

        // var returnFdFunc = function (userObj) {
        //     return function (callback) {

        //         var userQuery = 'SELECT * FROM `users` WHERE `id` = ' + userObj.id;
        //         db.query(userQuery, function(err, userRows) {
        //             callback(err, userRows);
        //         })
        //     }
        // };

        // var reqArr = [];
        // for(var i = 0; i < req.body.users.length; i++) {
        //     reqArr.push(returnFdFunc(req.body.users[i]));
        // }

        // async.parallel(reqArr, function (err, result) {

        // });

        // process both asyn and once done send response
        async.parallel([getUserDetail, getBankDetails], function (err, result) {
            if(err && err.length > 0) {
                res.send(err);
                return;
            }
            fd.user = result[0].length === 1 ? result[0][0] : {} ;
            fd.bank = result[1].length === 1 ? result[1][0] : {} ;
            res.send(fd);
        });

        // db.query(bankQuery, function(err, bankRows) {

        //     db.query(userQuery, function(err, userRows) {
        //         if (err) {
        //             res.send(err);
        //         } else {
        //             fd.bankDetails = bankRows.length === 1 ?  bankRows[0] : {} ;
        //             fd.userDetail = userRows.length === 1 ? userRows[0] : {} ; 
        //             res.send(fd);
        //         }
        //     })
        // });
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