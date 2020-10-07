const {Router} = require("express")
const {getAllUsers,getUserTickets} = require('../models/users.js')
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

concertRouter.post("/getUserTickets",
  async (request, response) => {
  console.log(request.body)
    await getUserTickets(request.body.userId, (err,data)=>{
      if(err)
        response.status(500).json({err:err})
      else
        response.status(200).json({data: data})
    })
  })



module.exports = concertRouter;