const dbConnection = require("../db/dbconfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter required information" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, Uid from users where username =? or email=?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ meg: "user alread existed" });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ meg: "password must be greater than 8 character" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "insert into users(username,firstname,lastname,email,password) values (?,?,?,?,?)",
      [username, firstname, lastname, email, hashpass]
    );

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "user successfully registered" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try later" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter email or password" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username,Uid,password from users where email = ?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    // compare password
    const ismuch = await bcrypt.compare(password, user[0].password);
    if (!ismuch) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credential" });
    }

    const uname = user[0].username;
    const pass = user[0].password;

    const token = jwt.sign({ uname, pass }, "secret", { expiresIn: "1d" });
    res.status(StatusCodes.OK).json({ msg: "user successfull login", token });
    // return res.json({ user: user[0].password });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try later" });
  }
}
async function check(req, res) {
  const username = req.user.username;
  const Uid = req.user.pasword;
  res.status(StatusCodes.OK).json({ msg: "valied user", username, Uid });
}

module.exports = { register, login, check };
