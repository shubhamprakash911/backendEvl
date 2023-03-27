const { logger } = require("../logger")

const validation = (req,res,next)=>{
    try {
        const city = req.params.city
        let alphabet = /^[A-Za-z]+$/;
        if(city.value.match(alphabet)){
            next()
        }else{
            res.send({"msg":"city containing number or special character"})
        }
    } catch (error) {
        res.send({error:error.message})
        logger.error({error:error.message})
    }
}

module.exports={validation}