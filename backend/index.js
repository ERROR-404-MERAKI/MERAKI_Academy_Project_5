const express = require("express");
require("dotenv").config();
require("./models/db");

const app = express();
//Router
const roleRouter = require("./routes/role");
const registerRouter = require("./routes/register");

//built-in middleware
app.use(express.json());
app.use("/role", roleRouter);
app.use("/register", registerRouter);

//basic server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
