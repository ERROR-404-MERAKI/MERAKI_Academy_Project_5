import React, { useState } from "react";
import "./style.css";
import { io } from "socket.io-client";
import Navbar from "../Navbar";

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

const Chat = () => {
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [messageList, setMessageList] = useState("");

  const joinRoom = () => {
    socket.emit("JOIN_ROOM", room);
  };

  return (
    <div className="chat">
      <div className="nav_bar">
        <Navbar />
      </div>
      <div className="DM">
        <div className="users-chat">users</div>
        <div className="chat-box">Chat-box</div>
      </div>
    </div>
  );
};

export default Chat;
