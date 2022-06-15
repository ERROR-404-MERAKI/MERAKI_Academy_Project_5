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

  const { isLoggedIn, token, myId } = useSelector((state) => {
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
  const [messageList, setMessageList] = useState("");
  const [mes, setMes] = useState("");
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
        console.log(result.data.message);
        setMessageList(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const giveRoom = () => {
    console.log(token, "am in giveROom");
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
      .then((result) => {
        console.log(result, "crreeeeaate message");
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
      room,
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

  const send = () => {
    giveRoom();

    socket.emit("reciveMessage", {
      message: message,
      idPerson: id,
    });

    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList([...messageList, data]);
    });
  };

  socket.on("Get_Message", (data) => {
    setMes([...mes, data.message]);
  });
  console.log(mes);

  useEffect(() => {
    joinRoom();

    followingId();
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList([...messageList, data]);
    });

    socket.on("connect", () => {
      socket.emit("info", {
        socketId: socket.id,
        id: myUserid,
      });
    });

    getMessages();
    // getMessages();
  }, []);

console.log(messageList);

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
                      >{`${element.firstName} ${element.lastName}`}</Link>
                    </div>
                  );
                })
              : []}
          </div>
        </div>
        <div className="chat-box">
          <div className="topGetMes">
            <div>
              <div>weeno</div>
              {mes
                ? mes.map((element, index) => {
                    console.log(element);
                    return <div className="fMes">{element}</div>;
                  })
                : []}
            </div>
            {/*  <div className="mapareej">
              {messageList
                ? messageList.map((element, index) => {
                    {
                      console.log(element);
                    }
                    return (
                      <div
                        key={index}
                        className="mapMes"
                        onClick={() => {
                          setRoom(element.roomId);
                          setUserName(element.firstName);
                        }}
                      >
                        <div className="ttopz">
                          <img
                            className="imgpoUs"
                            src={element.ProfilePicture}
                          />
                          <div>
                            {element.firstName} {element.lastName}
                          </div>
                        </div>
                        <div className="chatMessages">{element.message}</div>
                      </div>
                    );
                  })
                : []}
            </div> */}
          </div>
          <div>
            <input
              type="text"
              placeholder="Type message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={() => {
                send();
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
