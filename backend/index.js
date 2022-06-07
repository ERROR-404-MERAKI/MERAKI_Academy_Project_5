const express = require("express");
require("dotenv").config();
const cors = require("cors");


require("./models/db");

const app = express();
//Router
const roleRouter = require("./routes/role");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const postRouter = require("./routes/post");
const storyRouter = require("./routes/story");
const permissionRouter = require("./routes/permissions");
const followRouter = require("./routes/follow");
const commentRouter = require("../backend/routes/comment");

const bookmarkRouter = require("./routes/bookmark");

//import middleware
app.use(cors());
//built-in middleware
app.use(express.json());
app.use("/role", roleRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/post", postRouter);
app.use("/story", storyRouter);
app.use("/permission", permissionRouter);
app.use("/user", followRouter);
app.use("/comment", commentRouter);
app.use("/bookmark", bookmarkRouter);
//basic server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
