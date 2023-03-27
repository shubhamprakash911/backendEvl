
const express = require("express");
const {logger} = require("../logger")
const {client} = require("../db/redis");
const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
const userRouter = express.Router();
require("dotenv").config()

userRouter.post("/register",async (req,res)=>{
    try {
        const {email,pass}= req.body
        const hashPass= await bcrypt.hash(pass,+process.env.saltRound)
        await new userModel({email,pass:hashPass}).save()
        res.send({"msg":"user is register successfully"})
    } catch (error) {
        res.send({error:error.message})
        logger.error({error:error.message})
    }
})

userRouter.post("/login",async (req,res)=>{
    try {
        const {email,pass} = req.body
        const user= await userModel.findOne({email})
        if(user){
            const passMatch=await bcrypt.compare(pass,user.pass)
            if(passMatch){
                let token = await jwt.sign({userId:user._id},process.env.jwtSecretKey)
                await client.setEx("token",60*30,token)
                res.send({"msg":"login successfull"})
            }else{
              res.send({"msg":"wrong credential"})
            }
        }else{
            res.send({"msg":"wrong credential"})
        }
    } catch (error) {
        res.send({error:error.message})
        logger.error({error:error.message})
    }
})

userRouter.get("/logout",async(req,res)=>{
    try {
        let token= await client.get("token")
        await client.set("blacklist",token)
    } catch (error) {
        res.send({error:error.message})
        logger.error({error:error.message})
    }
})

module.exports= {userRouter}