const express = require("express");
const { login } = require("../controllers/login");

// create router
const loginRouter = express.Router();

// endpoint /login 
loginRouter.post("/", login);

module.exports = loginRouter;
