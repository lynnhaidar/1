const axios = require("axios"); //promise-based HTTP library that lets us consume an API service
const express = require('express');
const Weather = require("../models/weatherModel");

exports.getWeatherByCountry = async (req, res) =>{
  const country = req.params.country;
  const API_KEY = "931665a2de727e20d70672a175ff1dd5"; //from openWeather API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${API_KEY}`;
  try{
    const response = await axios.get(url);
    const data = response.data;
    const weather = new Weather({
      country: data.name,
      temperature: data.main.temp,
      headline:response.data.main.headline,
      icon:response.data.weather[0].icon,
      description: data.weather[0].description,
    });

    await weather.save();
    res.json(weather);
  }catch(err){
    console.log(err);
  }
};

exports.getWeathersOfAllCountries = async(req,res) => {
  try {
    const weathers = await Weather.find();
    res.json(weathers);
  }catch (error) {
    console.error(err);
  }
};
