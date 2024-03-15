const answer = require("../controller/answerControler");
const express = require("express");
const router = express.Router();

router.get("/answer", answer);

module.exports = router;
