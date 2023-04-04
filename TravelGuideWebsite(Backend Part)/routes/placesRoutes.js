const express = require("express");
const router = express.Router();
const placesController = require("../controllers/placesController");

router.post("/create", placesController.createPlace);
router.put("/:id", placesController.updatePlace);
router.delete("/:id", placesController.deletePlace);
router.get("/find/:id", placesController.findPlace);
router.get("/", placesController.findAllPlaces);
router.put("/:id", placesController.updateRating); //sending a PUT request to the API with the place's id and the new rating
router.get("/countByCity", placesController.countByCity);
router.get("/countByType", placesController.countByType);

module.exports = router;