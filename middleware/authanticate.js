const { client } = require("../db/redis")
const { logger } = require("../logger")
const jwt = require("jsonwebtoken")

const authanticate = async(req,res,next)=>{
     try {
        const token = await client.get("token")
        const blacklist = await client.get("blacklist")
        if(token===blacklist){
          res.send({"msg":"please login again"})
        }
        let decoded =jwt.verify(token,process.env.jwtSecretKey)

        if(decoded){
           next()
        }
     } catch (error) {
        res.send({error:error.message})
        logger.error({error:error.message})
     }
}

module.exports={authanticate}