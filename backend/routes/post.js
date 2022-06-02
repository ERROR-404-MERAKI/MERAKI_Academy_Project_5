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
const { createComment } = require("../controllers/comment");
const postRouter = express.Router();

//POST=> endpoint /post
postRouter.post("/", authentication, authorization("ADD_AD"), createNewPost);

//GET => endpoint /post
postRouter.get("/", getAllPost);

//GET => endpoint /post/id
postRouter.get("/:id", getPostById);

//Put => endpoint /post/id
postRouter.put("/:id", updatePostById);

//Delete => endpoint /post/id
postRouter.delete("/:id", deletePostById);
//post =>endpoint /comment
postRouter.post("/:id/comment", authentication, createComment);
module.exports = postRouter;
