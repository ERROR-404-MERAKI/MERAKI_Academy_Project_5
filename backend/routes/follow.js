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
  followersMyProfile,
  followingMyProfile,
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

followRouter.get("/visit/:id", followers);

followRouter.get("/following/:id", following);

followRouter.get("/visitProfile",authentication, followersMyProfile);

followRouter.get("/followingProfile",authentication, followingMyProfile);

module.exports = followRouter;
