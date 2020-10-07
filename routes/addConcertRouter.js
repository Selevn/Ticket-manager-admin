const {Router} = require("express")
const {addConcert, setSectorCost, getHalls, getSectorsByPlace} = require('../models/concerts.js')
const concertRouter = Router()
//const {getUserByEmail, setUser, getSecret, approve} = require('../models/users.js')
concertRouter.post("/next",
  async (request, response) => {
    console.log(request.body);
    response.status(200).json({message: "Approved"})
  })

concertRouter.post("/getHalls",
  async (request, response) => {
    await getHalls((err,data) => {
      response.status(200).json({data: data})
    });

  })


concertRouter.post("/add",
  async (request, response) => {
    console.log(request.body);
    response.status(200).json({message: "Approved"})
  })


module.exports = concertRouter;