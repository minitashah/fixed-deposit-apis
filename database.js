var mysql = require('mysql');
 
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'fd',
    }
);
 
connection.connect();

 module.exports = connection;