import React, { useEffect, useState } from "react";
import "./style.css";
import { io } from "socket.io-client";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

const Chat = () => {
  const { id } = useParams();

  const { isLoggedIn, token } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
    };
  });

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [messageList, setMessageList] = useState("");
  const [following, setFollowing] = useState(0);

  // get message

  const getMessages = () => {
    axios
      .get(`http://localhost:5000/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const joinRoom = () => {
    socket.emit("JOIN_ROOM", room);
  };

  const sendMessage = () => {
    const messageContent = {
      room: room,
      content: {
        sender: userName,
        message: message,
      },
    };
    socket.emit("SEND_MESSAGE", messageContent);

    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  const followingId = () => {
    axios
      .get(`http://localhost:5000/user/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setFollowing(result.data.user);
      })
      .catch((err) => {});
  };
  console.log(following);

  useEffect(() => {
    followingId();
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList([...messageList, data]);
    });
    // getMessages()
    // getMessages();
  }, []);

  return (
    <div className="chat">
      <div className="nav_bar">
        <Navbar />
      </div>
      <div className="DM">
        <div className="users-chat">
          <div>
            {following
              ? following.map((element, index) => {
                  return (
                    <div key={index}>
                      <img src={element.ProfilePicture} />
                      <Link
                        to={`/chat/${element.person_id}`}
                      >{`${element.firstName} ${element.lastName}`}</Link>
                    </div>
                  );
                })
              : []}
          </div>
        </div>
        <div className="chat-box">
          <div></div>
          <div>
            <input
              type="text"
              placeholder="Type message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
