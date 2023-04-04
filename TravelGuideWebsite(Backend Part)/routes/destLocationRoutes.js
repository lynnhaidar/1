const express = require('express');
const router = express.Router();
const destLocationController = require("../controllers/destLocationController");

router.post("/country", destLocationController.createCountry);
router.put("/:id", destLocationController.updateDestination);

module.exports = router;