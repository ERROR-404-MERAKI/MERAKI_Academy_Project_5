const express = require("express");
require("dotenv").config();
require("./models/db")


const app = express();

//built-in middleware
app.use(express.json());


//basic server 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});