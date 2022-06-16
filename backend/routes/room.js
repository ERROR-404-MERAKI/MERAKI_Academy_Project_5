const express = require("express");

const { createRoom, getRoom } = require("../controllers/room");
const { authentication } = require("../middlewares/authentication");

const roomRouter = express.Router();

roomRouter.post("/:id", authentication, createRoom);

roomRouter.get("/:id", authentication, getRoom);

module.exports = roomRouter;
