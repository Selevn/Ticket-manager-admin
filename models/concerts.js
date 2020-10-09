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

const getAllConcerts = (cb)=>{
  connection.query(`SELECT * FROM concerts`,
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

const deleteConcert = (id, cb)=>{
  connection.query(`DELETE FROM concerts WHERE id = ?`,[id],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

const undoConcert = (id, cb)=>{
  connection.query(`UPDATE concerts SET status = 2 WHERE id = ?`,[id],
    function (err, data) {
      if (err)
        cb(err, null);
      else
        cb(null, data);
    })
}

const newConcertData = (id,date, cb)=>{
  connection.query(`UPDATE concerts SET date = ?, status=1 WHERE id = ?`,[date,id],
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
module.exports.getAllConcerts = getAllConcerts
module.exports.deleteConcert = deleteConcert
module.exports.undoConcert = undoConcert
module.exports.newConcertData = newConcertData
module.exports.getHalls = getHalls