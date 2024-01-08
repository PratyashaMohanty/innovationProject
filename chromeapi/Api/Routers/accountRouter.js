const express = require("express");
const authController = require("../Controllers/authController");


const router = express.Router();

router.get("/allaccount", authController.allAccount); //to get all accounts
router.post("/createaccount", authController.createAccount); //to post a new account

module.exports = router;