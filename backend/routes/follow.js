const express = require("express");
const {
  addFollow,
  getProfile,
  updateUser,
  getProfileUser,
  deleteFollow,
  getFollower
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

followRouter.get("/follower", authentication, getFollower);




module.exports = followRouter;
