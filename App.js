const express = require("express");
const port = 5000;
const App = express();
// Json middleware
App.use(express.json());

// Database connection file
const dbConnection = require("./db/dbconfig");
// use router middlware login,register and check file
const UseRoutes = require("./routes/userRoutes");
// use router middlware question file
const questionRoutes = require("./routes/questionRoutes");
// use router middlware answer file
const answerRoutes = require("./routes/answerRoutes");

// use router login,register and check middlware
App.use("/api/users/", UseRoutes);
// use router question middlware
App.use("/api/users/", questionRoutes);
// use router answer middlware
App.use("/api/users/", answerRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    await App.listen(port);
    console.log("database connected successfully");
    console.log(`i'm liting at ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
