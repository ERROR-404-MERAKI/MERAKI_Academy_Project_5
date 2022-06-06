const express = require("express");

const {
  register,
  getAllUser,
  getUserById,
  getUserByName,
} = require("../controllers/register");
const { authentication } = require("../middlewares/authentication");

const registerRouter = express.Router();

registerRouter.post("/", register);
registerRouter.get("/", getAllUser);
registerRouter.get("/:id", getUserById);
registerRouter.post("/search", getUserByName);

module.exports = registerRouter;
