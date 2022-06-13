const express = require("express");
const { createMessage ,gitAllMessage} = require("../controllers/message");
const { authentication } = require("../middlewares/authentication");
// create router
const messageRouter = express.Router();

// endpoint /login 
messageRouter.post("/:id", authentication, createMessage );
messageRouter.get("/", authentication, gitAllMessage );


module.exports = messageRouter;

