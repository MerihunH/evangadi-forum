const express = require("express");
// User controller
const { register, login, check } = require("../controller/usercontroller");
const router = express.Router();
const dbConnection = require("../db/dbconfig");
const middlemare = require("../middleware/authmiddleware");
// Register route
router.post("/register", register);
// login route
router.post("/login", login);
// check route
router.get("/check", middlemare, check);
module.exports = router;
