const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();
async function middleware(req, res, next) {
  const authoheader = req.headers.authorization;

  if (!authoheader || !authoheader.startsWith("Bearer")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "authorization invalid" });
  }
  const token = authoheader.split(" ")[1];
  // console.log(authoheader);
  // console.log(token);

  try {
    // { username, password }token
    const { username, uid } = jwt.verify(token, process.env.JWT);
    req.user = { username, uid };
    next();

    // req.user = { username, password };
    // next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
}
module.exports = middleware;
