const {Router} = require("express")
const {getAllUsers,getUserConcerts,getConcertTickets,getUserByEmail} = require('../models/users.js')
const concertRouter = Router()


const {check, validationResult} = require('express-validator')
const doSha1 = require('sha1')
const config = require("config")
const jwt = require("jsonwebtoken")


concertRouter.post("/login",
  [
    check('email', 'Incorrect Email').normalizeEmail().isEmail(),
    check('password', "Minimal password length is 6").isLength({min: 6})
  ]
  , async (request, response) => {
    try {
      const errors = validationResult(request)
      if (errors.errors.length !== 0) {
        await response.status(404).json({message: errors.errors[0].msg})
      }
      const {email, password} = request.body;

      getUserByEmail(email, async (err, data) => {
          try {
            if (!data) {
              await response.status(500).json({message: "User not found or password is incorrect. Please, check your data and try again!"})
            } else {
              const hashedPassword = doSha1(doSha1(doSha1(password)))
              data = data[0];
              if (hashedPassword === data.password && data.isApproved) {
                let token = jwt.sign({
                    email: email,
                    id: data.id,
                    userType: data.userType,
                  },
                  config.get("jwtSecretKey"),
                  {expiresIn: "1h"})
                await response.status(218).json({
                  token: token,
                  id: data.id,
                  userType: data.userType,
                  message: "You are loggined in"
                })
              } else {
                if (!data.isApproved) {
                  await response.status(500).json({message: "Approve your account!"})
                }
                else
                  await response.status(500).json({message: "User not found or password is incorrect. Please, check your data and try again!"})
              }
            }
          } catch
            (e) {
            console.log(e)
          }
        }
      )

    } catch (e) {
      response.status(500).json({message: "Oups! Smth went wrong. Try again later"})
    }
  })


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