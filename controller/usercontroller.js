// const express = require("express");
const dbconnection = require("../db/dbconfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jsonwebtoken = require("jsonwebtoken");
const middleware = require("../middleware/authmiddleware");
require("dotenv").config();
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !firstname || !lastname || !username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "pleace insert data" });
  }
  try {
    const [user] = await dbconnection.query(
      "select username, uid from users where username =? or email =?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user name already exist" });
    }

    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password length must be greater than 8" });
    }
    // encryption of password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    await dbconnection.query(
      "insert into users (username,firstname,lastname,email,password) values (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedpassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "insert data" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "pleace enter username or password" });
  }
  try {
    const [user] = await dbconnection.query(
      "select username,uid,password from users where email = ?",
      [email]
    );

    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credentials" });
    }
    // compare password
    const ismuch = await bcrypt.compare(password, user[0].password);
    if (!ismuch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    // return res.json({ user: user[0].password });
    const username = user[0].username;
    const uid = user[0].uid;

    const token = jsonwebtoken.sign({ username, uid }, process.env.JWT, {
      expiresIn: "1d",
    });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "successfully login", token });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function check(req, res) {
  const username = req.user.username;
  const uid = req.user.uid;

  return res.status(StatusCodes.OK).json({ msg: "valied user", username, uid });
}
module.exports = { register, login, check };
