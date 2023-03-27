
const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
    city:{type:String}
})

const historyModel = mongoose.model("history",historySchema)

module.exports={historyModel}