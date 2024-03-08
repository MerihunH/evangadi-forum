const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
function middlemare(req, res, next) {
  const authoheader = req.headers.authorization;

  if (!authoheader || !authoheader.startsWith("Bearer")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "authorization invalid" });
  }
  const token = authoheader.split(" ")[1];
  console.log(authoheader);
  console.log(token);

  try {
    const { username, password } = jwt.verify(token, "secret");

    req.user = { username, password };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
}
module.exports = middlemare;
