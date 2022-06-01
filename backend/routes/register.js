const express = require("express");

const { register } = require("../controllers/register");

const registerRouter = express.Router();

registerRouter.post("/", register);

module.exports = registerRouter;
