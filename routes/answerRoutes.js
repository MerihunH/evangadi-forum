const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbconfig");
const answer = require("../controller/AnswerControler")
// Answer route
router.get("/answer", answer);
module.exports = router;
