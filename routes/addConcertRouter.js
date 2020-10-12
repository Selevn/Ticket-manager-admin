const {Router} = require("express")
const {addConcert, setSectorCost, getHalls, getSectorsByPlace, getAllConcerts,deleteConcert,newConcertData,undoConcert} = require('../models/concerts.js')
const concertRouter = Router()
//const {getUserByEmail, setUser, getSecret, approve} = require('../models/users.js')
concertRouter.post("/next",
  async (request, response) => {
    await getSectorsByPlace(request.body.place, (err,data)=>{
      if(err)
        response.status(500).json({err:err})
      else
        response.status(200).json({data: data})
    })
  })

concertRouter.post("/getHalls",
  async (request, response) => {
    await getHalls((err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })

concertRouter.post("/deleteUser",
  async (request, response) => {
    await deleteUser((err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })



concertRouter.post("/getAllConcerts",
  async (request, response) => {
    await getAllConcerts((err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })

concertRouter.post("/delete",
  async (request, response) => {
    await deleteConcert(request.body.concertId, (err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })

concertRouter.post("/change",
  async (request, response) => {
    await newConcertData(request.body.concertId,request.body.date, (err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })

concertRouter.post("/undo",
  async (request, response) => {
    await undoConcert(request.body.concertId, (err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })

concertRouter.post("/addConcert",
  async (request, response) => {
    await addConcert(request.body.band, request.body.place, request.body.date, request.body.imgSrc,(err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })

concertRouter.post("/fillSectors",
  async (request, response) => {
    await setSectorCost(request.body.sectorId, request.body.concertId,request.body.cost, (err,data) => {
      if(err)
        response.status(500).json({err: err})
      else
        response.status(200).json({data: data})
    });
  })

concertRouter.post("/add",
  async (request, response) => {
    console.log(request.body);
    response.status(200).json({message: "Approved"})
  })


module.exports = concertRouter;