const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : process.env.HOST,
    user :process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE

})
connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });
  
  module.exports = connection;