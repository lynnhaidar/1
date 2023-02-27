const express = require("express");
const router = express.Router(); 
const controller = require("../controllers/controller");

router.post("/longURL", controller.longurl);
router.post("/shortURL", controller.shorturl);


module.exports = router;