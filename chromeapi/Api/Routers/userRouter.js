const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

//building endpoints
router.post("/signup",authController.signUp); //to get all tokens
router.post("/login",authController.login); //to post a new token

module.exports = router;