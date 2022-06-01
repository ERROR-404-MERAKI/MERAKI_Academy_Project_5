const express = require("express");
const { createStory,getAllStory} = require("../controllers/story");
const {authentication} =require("../middlewares/authentication")
const storyRouter = express.Router();

/*test
{
    "story":"story",
    "date":"9999-12-31 23:59:59"

}


*/



storyRouter.post("/",authentication,createStory );
storyRouter.get("/", getAllStory);



module.exports = storyRouter;
