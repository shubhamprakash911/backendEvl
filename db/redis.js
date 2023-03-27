const redis = require("redis");

const client = redis.createClient({
    url:"redis://default:8nwAwvrTl0jr8RSFTICZqWC86Mh8ZuFb@redis-17560.c301.ap-south-1-1.ec2.cloud.redislabs.com:17560"
})

client.on("error",(err)=>console.log("error in connecting to redis cloud ",err))
client.on("connect",()=>console.log("connected to redis cloud"))

client.connect()

module.exports={client}