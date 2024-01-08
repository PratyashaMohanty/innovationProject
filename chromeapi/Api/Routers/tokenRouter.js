const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.get("/alltoken", authController.allToken); //to get all tokens
router.post("/createtoken", authController.addToken); //to post a new token

module.exports = router;