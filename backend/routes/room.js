const express = require("express");

const {createRoom}  = require("../controllers/room");
const { authentication } = require("../middlewares/authentication");


const roomRouter = express.Router();


roomRouter.post("/:id",authentication, createRoom);

module.exports = roomRouter;