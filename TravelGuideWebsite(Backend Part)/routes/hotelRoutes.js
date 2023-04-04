const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.post("/create", hotelController.createHotel);
router.put("/:id", hotelController.updateHotel);
router.delete("/:id", hotelController.deleteHotel);
router.get("/find/:id", hotelController.findHotel);
router.get("/", hotelController.findAllHotels);
router.put("/:id", hotelController.updateRating);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);

module.exports = router;
