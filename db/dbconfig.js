require("dotenv").config();
const mysql2 = require("mysql2");
const dbconnection = mysql2.createPool({
  user: process.env.USER,
  host: "127.0.0.1",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: "10",
});

module.exports = dbconnection.promise();
