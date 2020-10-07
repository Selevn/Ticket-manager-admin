const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "ticketmanager",
  password: ""
});

const getAllUsers = (cb)=>{
  connection.query(`SELECT email, id  FROM users WHERE isApproved = 1`,
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

const getUserTickets = (userId, cb)=>{
  connection.query(`SELECT * FROM ticket WHERE userId = ?`,[userId],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

module.exports.getAllUsers = getAllUsers
module.exports.getUserTickets = getUserTickets