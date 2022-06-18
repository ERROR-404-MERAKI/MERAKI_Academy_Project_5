const express = require("express");
require("dotenv").config();
const cors = require("cors");
const socket = require("socket.io");

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
const messageRouter = require("./routes/message");
const roomRouter = require("./routes/room");

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
app.use("/message", messageRouter);
app.use("/room", roomRouter);

//basic server

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

let array = [];
let arrayToperson = [];

io.on("connection", (socket) => {
  socket.on("JOIN_ROOM", (data) => {
    console.log("roomId ", data);
    socket.join(data);
  });
  socket.on("SEND_MESSAGE", (data) => {
    console.log("SEND: ", data);

    socket.to(data.room).emit("RECEIVE_MESSAGE", data.content);
  });
  socket.on("info", (data) => {
    array.push(data);
  });
  socket.on("reciveMessage", (data) => {
    const newArray = array.find((element) => {
      return (element.id = data.idPerson);
    });

    console.log(newArray, "hasan");
    socket.to(newArray.socketId).emit("Get_Message", data);
  });
  console.log(array, "areej");

  socket.on("disconnect", () => {
    array = array.filter((element) => {
      return element.socketId != socket.id;
    });
  });
});
