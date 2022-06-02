const express = require("express");

const { register,getAllUser } = require("../controllers/register");

const registerRouter = express.Router();

registerRouter.post("/", register);
registerRouter.get("/", getAllUser);


module.exports = registerRouter;
