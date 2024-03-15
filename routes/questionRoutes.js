const question = require("../controller/questionConteroler");

const express = require("express");
const router = express.Router();

router.get("/all-question", question);

module.exports = router;
