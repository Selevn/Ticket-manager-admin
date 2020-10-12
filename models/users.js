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

const getConcertTickets = (userId, concertId, cb)=>{
  connection.query(`SELECT t.id, con.band, con.place, sec.name, cos.cost FROM ticket t
left JOIN concerts con on con.id=t.concertId
left join sector sec on sec.id = t.sectorId
left join costs cos on cos.concertId = t.concertId AND cos.sectorId = t.sectorId
WHERE t.userId = ? AND t.concertId = ?`,[userId, concertId],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}
const getUserConcerts = (userId, cb)=>{
  connection.query(`SELECT con.id as concertId, con.band, con.place, count(con.id) as ticketCount  FROM ticket t inner JOIN concerts con on con.id=t.concertId WHERE t.userId = ? group by con.id`,[userId],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

const getUserByEmail = (email, cb)=>{
  connection.query(`SELECT * FROM users WHERE email = (?)`,[email],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

const deleteUser = (id, cb)=>{
  connection.query(`DELETE FROM users WHERE id = (?)`,[id],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}





module.exports.getAllUsers = getAllUsers
module.exports.getUserByEmail = getUserByEmail
module.exports.getUserConcerts = getUserConcerts
module.exports.getConcertTickets = getConcertTickets
module.exports.deleteUser = deleteUser