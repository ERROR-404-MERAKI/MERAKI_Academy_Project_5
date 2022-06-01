const express = require("express");

const { createNewPost } = require("../controllers/post");
const { authentication } = require("../middlewares/authentication");

const postRouter = express.Router();

// endpoint /login
postRouter.post("/", authentication, createNewPost);

module.exports = postRouter;
