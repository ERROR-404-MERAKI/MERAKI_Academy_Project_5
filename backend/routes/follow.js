const express = require("express");
const { addFollow, getProfile } = require("../controllers/follow");
const { authentication } = require("../middlewares/authentication");

// create router
const followRouter = express.Router();

// endpoint /user/id
followRouter.post("/:id", authentication, addFollow);

// endpoint /user/
followRouter.get("/profile", authentication, getProfile);

module.exports = followRouter;
