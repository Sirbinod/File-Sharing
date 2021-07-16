const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// database
const connectDB = require('./db');
connectDB();

// middleware 
app.use(bodyParser);



// server listener
const port = process.env.PORT;
app.listen(port,()=>{console.log(`server running at post: ${port}`);});
