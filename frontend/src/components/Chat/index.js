import React, { useEffect, useState, useSyncExternalStore } from "react";
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

  const { token } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
      myId: state.userId.myuser,
    };
  });

  const myUserid = localStorage.getItem("myId");

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [media, setMedia] = useState("");

  const [messageList, setMessageList] = useState("");
  const [mes, setMes] = useState("");
  const [following, setFollowing] = useState(0);

  // get message

  const userInfo = () => {
    axios
      .get(`http://localhost:5000/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.success) {
          setMedia(result.data.user[0].ProfilePicture);
          setName(result.data.user[0].firstName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMessages = () => {
    axios
      .get(`http://localhost:5000/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setMessageList(result.data.message);
        console.log(result);
      })
      .catch((err) => {});
  };

  const giveRoom = () => {
    axios
      .post(
        `http://localhost:5000/message/${id}
      `,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {})
      .catch((err) => {});
  };

  //  first step

  const joinRoom = () => {
    socket.emit("JOIN_ROOM", 1);
  };

  const sendMessage = () => {
    const messageContent = {
      room: 1,
      content: {
        sender: "hassan",
        message: message,
      },
    };
    socket.emit("SEND_MESSAGE", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  const followingId = () => {
    axios
      .get(`http://localhost:5000/user/followingProfile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setFollowing(result.data.user);
      })
      .catch((err) => {});
  };

  //  not needed
  socket.on("Get_Message", (data) => {
    setMes([...mes, data.message]);
  });

  useEffect(() => {
    followingId();
  }, []);

  useEffect(() => {
    // joinRoom();
    userInfo();

    socket.on("RECEIVE_MESSAGE", (data) => {
      setMes([...mes, data]);
    });
  });

  return (
    <div className="chat">
      <div className="nav_bar">
        <Navbar />
      </div>
      <div className="DM">
        <div className="users-chat">
          <div className="chatMain">
            {following
              ? following.map((element, index) => {
                  return (
                    <div key={index} className="leftSeccrion">
                      <img className="imgpoUs" src={element.ProfilePicture} />
                      <Link
                        className="linkName"
                        to={`/chat/${element.person_id}`}
                        onClick={() => {
                          joinRoom();
                          setUserName(element.firstName);
                          setImg(element.ProfilePicture);
                        }}
                      >{`${element.firstName} ${element.lastName}`}</Link>
                    </div>
                  );
                })
              : []}
          </div>
        </div>
        <div className="chat-box">
          <div className="topGetMes">
            <div className="cover">
              <div className="sender">
                {mes
                  ? mes.map((element, index) => {
                      return (
                        <div className="flexImg">
                          <img className="imgchat" src={img} />{" "}
                          <div key={index} className="SMes">
                            <p>
                              {userName} : {element.message}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : []}
              </div>
              <div className="resever">
                {messageList
                  ? messageList.map((element, index) => {
                      return (
                        <div className="flexImg1">
                          <div key={index} className="fMes">
                            <p>
                              {element.message} : {name}
                            </p>
                          </div>
                          <img className="imgchat" src={media} />{" "}
                        </div>
                      );
                    })
                  : []}
              </div>
            </div>

            <div className="chat-input">
              <textarea
                className="textareai"
                type="text"
                placeholder="Type message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="sendButton"
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
    </div>
  );
};

export default Chat;
