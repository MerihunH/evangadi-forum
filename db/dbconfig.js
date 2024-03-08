const mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: "evangadi_admin",
  password: "123",
  host: "localhost",
  database: "evangadiforum",
  connectionLimit: 10,
});

// dbConnection.execute(
//   "select'database connected successfully'",
//   (error, results) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(results);
//     }
//   }
// );
module.exports = dbConnection.promise();
