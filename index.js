const express = require("express");
const { connection } = require("./db/db");
const {logger} = require("./logger");
const { authanticate } = require("./middleware/authanticate");
const { limiter } = require("./middleware/rateLimiter");
const { userRouter } = require("./Router/user.router");
const { weatherRouter } = require("./Router/weather");

require("dotenv").config()

const app =express()

app.get("/",(req,res)=>{
    res.send({"msg":"welcome to backend"})
})

app.use(express.json());
app.use("/user",userRouter)
app.use(authanticate)
app.use(limiter)
app.use("/weather",weatherRouter)



app.listen(process.env.port,async()=>{
     try {
        await connection
        console.log("connected to mongodb")
     } catch (error) {
        res.send({error:error.message})
        logger.error({error:error.message})
     }
     console.log("server is listing at port",process.env.port)
})