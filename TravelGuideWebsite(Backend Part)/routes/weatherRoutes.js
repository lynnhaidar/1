const express = require('express');
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/weather/:country", weatherController.getWeatherByCountry);
router.get("/", weatherController.getWeathersOfAllCountries);

module.exports = router;