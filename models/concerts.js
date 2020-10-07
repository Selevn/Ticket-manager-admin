const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "ticketmanager",
  password: ""
});

const getHalls = (cb)=>{
  connection.query(`SELECT * FROM halls`,
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

const getSectorsByPlace = (place, cb)=>{
  connection.query(`SELECT * FROM sector WHERE place = ?`,[place],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

const setSectorCost = (sectorId, concertId, cost, cb)=>{
  connection.query(`INSERT INTO costs (cost, sectorId, concertId)  VALUES (?,?,?)`,[cost, sectorId, concertId],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}
const addConcert = (band,place,date,imgSrc, cb)=>{
  connection.query(`INSERT INTO concerts (band, place, date, imgSrc) VALUES (?,?,?,?)`,[band,place,date,imgSrc],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}






module.exports.addConcert = addConcert
module.exports.setSectorCost = setSectorCost
module.exports.getSectorsByPlace = getSectorsByPlace
module.exports.getHalls = getHalls