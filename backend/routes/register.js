const express = require("express");

const { register,getAllUser,getUserById } = require("../controllers/register");

const registerRouter = express.Router();

registerRouter.post("/", register);
registerRouter.get("/", getAllUser);
registerRouter.get("/:id", getUserById);



module.exports = registerRouter;
