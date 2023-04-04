const express = require('express');
const router = express.Router();
const userController = require("../controllers/userContoller");

router.post("/signingUp", userController.signingUp); //posting data to our db
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.patch("/resetPassword", userController.resetPassword); //update an existing user in the database (update a specific part) PARAMS: Everything that is in the url is params

module.exports = router;