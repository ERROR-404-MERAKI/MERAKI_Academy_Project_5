const express = require("express");
const {
  addBookmark,
  allBookmark,
  deleteBookmark,
} = require("../controllers/bookmark");

const { authentication } = require("../middlewares/authentication");

const bookmarkRouter = express.Router();

bookmarkRouter.post("/:id", authentication, addBookmark);
bookmarkRouter.get("/user/", authentication, allBookmark);
bookmarkRouter.delete("/:id", deleteBookmark);

module.exports = bookmarkRouter;
