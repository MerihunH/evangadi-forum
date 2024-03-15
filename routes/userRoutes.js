const { register, login, check } = require("../controller/usercontroller");
const express = require("express");
const router = express.Router();
// Authorization middleware
const middleware = require("../middleware/authmiddleware");
// register route
router.post("/register", register);

// login route
router.post("/login", login);

// check route
router.get("/check", middleware, check);
module.exports = router;
