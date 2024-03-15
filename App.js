const express = require("express");
const port = 4000;
const app = express();
app.use(express.json());
const dbconnection = require("./db/dbconfig");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const middleware = require("./middleware/authmiddleware");

// user routes middleware file
app.use("/api/users", userRoutes);

// answer router
app.use("/api/users", middleware, answerRoutes);
// question router
app.use("/api/users", middleware, questionRoutes);

async function start() {
  try {
    const result = await dbconnection.execute("select'db connected'");
    console.log(result);
    await app.listen(port);
  } catch (error) {
    console.log(error.message);
  }
}
start();
