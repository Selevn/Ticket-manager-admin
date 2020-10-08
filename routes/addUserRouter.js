const {Router} = require("express")
const {getAllUsers,getUserConcerts,getConcertTickets} = require('../models/users.js')
const concertRouter = Router()

concertRouter.post("/getAllUsers",
  async (request, response) => {
    await getAllUsers((err,data)=>{
      if(err)
        response.status(500).json({err:err})
      else
        response.status(200).json({data: data})
    })
  })

concertRouter.post("/getConcertTickets",
  async (request, response) => {
    await getConcertTickets(request.body.userId,request.body.concertId , (err,data)=>{
      if(err)
        response.status(500).json({err:err})
      else
        response.status(200).json({data: data})
    })
  })

concertRouter.post("/getUserConcerts",
  async (request, response) => {
    await getUserConcerts(request.body.userId, (err,data)=>{
      if(err)
        response.status(500).json({err:err})
      else
        response.status(200).json({data: data})
    })
  })





module.exports = concertRouter;