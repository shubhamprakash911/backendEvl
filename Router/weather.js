const express = require("express");
const { model } = require("mongoose");
const { client } = require("../db/redis");
const weatherRouter= express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {validation} = require("../middleware/validation");
const { historyModel } = require("../model/history.model");


let apiKey='ca0ebf826938023bb51a5c2f44007290'
weatherRouter.get("/:city",validation,async(req,res)=>{
    try {
        let city= req.params.city

        //check current weather is on redis chache
        let currentWeatherChache=await client.hGet("currentWeather",city)
        if(currentWeatherChache){
            res.send({"msg":currentWeather})
            
        }else{
            let currentWeather =  fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&city=${city}`)
            await client.hSet("currentWeather",city,currentWeather)
            await client.expire("currentWeather",60*30)

            //search history store in mongodb
            await new historyModel({city:currentWeather}).save()

            res.send({"msg":currentWeather})
        }


    } catch (error) {
        res.send({error:error.message})
        logger.error({error:error.message})
    }
})

module.exports={weatherRouter}