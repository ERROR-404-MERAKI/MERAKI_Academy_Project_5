const express = require("express");

const {
  createNewPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
} = require("../controllers/post");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const { getCommentById } = require("../controllers/comment");
const postRouter = express.Router();

//POST=> endpoint /post
postRouter.post("/", authentication, createNewPost);
//comment =>
postRouter.get("/:id/comment", getCommentById);

//GET => endpoint /post
postRouter.get("/", getAllPost);

//GET => endpoint /post/id
postRouter.get("/profile", authentication, getPostById);

//Put => endpoint /post/id
postRouter.put("/:id", updatePostById);

//Delete => endpoint /post/id
postRouter.delete("/:id", deletePostById);

module.exports = postRouter;
