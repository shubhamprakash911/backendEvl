const winston = require("winston");
require("winston-mongodb")
const logger= winston.createLogger({
    level:"error",
    format:winston.format.json(),
    transports:[new winston.transports.File({filename:"error.txt",level:"error"})]
})

module.exports={logger}