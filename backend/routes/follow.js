const express = require("express");
const {
  addFollow,
  getProfile,
  updateUser,
  getProfileUser,
} = require("../controllers/follow");
const { authentication } = require("../middlewares/authentication");

// create router
const followRouter = express.Router();

// endpoint /user/id
followRouter.post("/:id", authentication, addFollow);

// endpoint /user/
followRouter.get("/profile", authentication, getProfile);

// endpoint /user/edit
followRouter.put("/edit", authentication, updateUser);
// endpoint /user/edit
followRouter.get("/profile/name/:id", getProfileUser);

module.exports = followRouter;
