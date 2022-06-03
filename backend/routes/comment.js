const express = require("express");

const { authentication } = require("../middlewares/authentication");

const { createComment } = require("../controllers/comment");

const commentRouter = express.Router();

//post =>endpoint /comment
commentRouter.post("/:id", authentication, createComment);

module.exports = commentRouter;