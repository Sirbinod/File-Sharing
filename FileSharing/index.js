const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const fileshare = require("./routes/fileshare");

// database
const connectDB = require("./db");
connectDB();

// middleware
app.use(bodyParser.json());

// Routes middleware
app.use("/api/v1", fileshare);

// server listener
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running at post: ${port}`);
});
