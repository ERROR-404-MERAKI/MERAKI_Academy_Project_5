const express = require("express");

const { register,getAllUser,getUserById,getUserByName } = require("../controllers/register");

const registerRouter = express.Router();

registerRouter.post("/", register);
registerRouter.get("/", getAllUser);
registerRouter.get("/:id", getUserById);
registerRouter.get("/search/:firstName", getUserByName);



module.exports = registerRouter;
