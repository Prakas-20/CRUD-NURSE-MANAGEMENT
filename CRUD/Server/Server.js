const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const mySqlpool = require("./config/db");

// CONFIG DOTENV
dotenv.config();

// REST OBJECT
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// ROUTES
app.use("/nurse", require("./routes/NurseRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>Node js MYSQL CRUD APP</h1>");
});

const PORT = process.env.PORT || 8000;

mySqlpool
  .query("SELECT 1")
  .then(() => {
    console.log("MySql DB Connected");
    // LISTEN
    app.listen(PORT, () => {
      console.log(`Listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
