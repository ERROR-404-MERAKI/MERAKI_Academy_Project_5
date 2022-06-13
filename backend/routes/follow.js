const express = require("express");
const {
  addFollow,
  getProfile,
  updateUser,
  getProfileUser,
  deleteFollow,
  getFollower,
  followers,
  following,
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
// endpoint /user/edit
followRouter.delete("/:id", authentication, deleteFollow);

followRouter.get("/follower/:id", authentication, getFollower);

followRouter.get("/follower/:id", followers);

followRouter.get("/following", authentication, following);

module.exports = followRouter;
