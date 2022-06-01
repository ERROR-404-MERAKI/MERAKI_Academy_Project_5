const express = require("express");

const {
  createNewPost,
  getAllPost,
  getPostById,
} = require("../controllers/post");
const { authentication } = require("../middlewares/authentication");

const postRouter = express.Router();

//POST=> endpoint /post
postRouter.post("/", authentication, createNewPost);

//GET => endpoint /post
postRouter.get("/", getAllPost);

//GET => endpoint /post/id
postRouter.get("/:id", getPostById);

module.exports = postRouter;
