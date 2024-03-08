const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbconfig");
const question = require("../controller/questionConteroler");
// Question route
router.post("/question", question);
module.exports = router;
