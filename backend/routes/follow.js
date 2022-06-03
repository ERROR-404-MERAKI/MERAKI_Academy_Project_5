const express = require("express");
const { addFollow } = require("../controllers/follow");
const { authentication } = require("../middlewares/authentication");

// create router
const followRouter = express.Router();

// endpoint /user/id
followRouter.post("/:id", authentication, addFollow);

module.exports = followRouter;
