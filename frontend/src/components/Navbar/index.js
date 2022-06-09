import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { toLogout } from "../../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { addPosts, setPosts } from "../../redux/reducers/posts";
import { RiHome2Line } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { GoDiffAdded } from "react-icons/go";
import { BsSearch } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

//====FiLogOut=============NavBar==============
const Navbar = () => {
  // instance
  const dispatch = useDispatch();
  const history = useNavigate();

  // useState
  const [firstName, setFirstName] = useState("");
  const [names, setNames] = useState("");
  const [status, setStatus] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [media, setMedia] = useState("");
  const [description, setDescrption] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [imgPost, setImgPost] = useState("");

  //request to server
  const searchBox = () => {
    axios
      .post(`http://localhost:5000/register/search`, { firstName })
      .then((result) => {
        setNames(result.data.users);
        setStatus(true);
        setAddPost(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userProfile = () => {
    axios
      .get(`http://localhost:5000/register/profile`, {
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

  //   function create new post
  const createNewPost = () => {
    axios
      .post(
        `http://localhost:5000/post`,
        { media, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(addPosts(result.data));
        setAddPost(false);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  //handle onChange event
  const handleOnChange = (e) => {
    e.preventDefault();
    setFirstName(`%${e.target.value}%`);
  };
  // data from store
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  // ------------- Upload media Function
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", imgPost);
    data.append("upload_preset", "srcmongo");
    data.append("cloud_name", "mousa");

    fetch("https://api.cloudinary.com/v1_1/mousa/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMedia(data.url);
      })
      .catch((err) => console.log(err));
  };

  // logout function
  const logout = () => {
    dispatch(toLogout());
    history("/");
  };

  return (
    <div className="nav_header">
      {" "}
      <div className="navbar">
        {token ? (
          <>
            <div className="dev_imgss">
              <div
                className="imggg"
                onClick={() => {
                  history("/home");
                }}
              >
                <img
                  className="logo"
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png
"
                />
              </div>
            </div>

            <div className="main_s">
              <div className="search_bar">
                <button
                  id="icon1"
                  onClick={() => {
                    searchBox();
                  }}
                >
                  <BsSearch id="search1" />
                </button>
                <input
                  id="search"
                  type="search"
                  list="users"
                  placeholder="Search"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="icon_section">
              <button id="icon2">
                {" "}
                <RiHome2Line id="icon" />{" "}
              </button>

              <button id="icon2">
                <BsChatDots id="icon" />
              </button>
              <button
                id="icon2"
                onClick={() => {
                  setAddPost(true);
                  setStatus(false);
                }}
              >
                <svg id="icon1" width="20" height="20" viewBox="0 0 16 16">
                  <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                </svg>
              </button>
              <button id="icon2">
                <BsHeart id="icon1" />
              </button>

              <div
                className="add_poster"
                style={{ display: addPost ? "block" : "none" }}
              >
                <div className="post_input">
                  <button
                    onClick={() => {
                      setAddPost(false);
                    }}
                  >
                    close
                  </button>

                  <div>
                    <div>
                      <input
                        type="file"
                        onChange={(e) => {
                          setImgPost(e.target.files[0]);
                        }}
                      ></input>

                      <button onClick={uploadImage}>Add</button>
                    </div>

                    <input
                      placeholder="Description"
                      onChange={(e) => {
                        setDescrption(e.target.value);
                      }}
                    />
                  </div>
                  <button onClick={createNewPost}>Add Post </button>
                </div>
              </div>
              <button
                id="icon2"
                onClick={() => {
                  history("/profile");
                }}
              >
                <svg id="icon1" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </button>
              <button id="icon1" onClick={() => logout()}>
                <svg id="icon1" width="16" height="16" viewBox="0 0 16 16">
                  <path
                    fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            {" "}
            <Link className="Link" to="/">
              Login
            </Link>
            <Link className="Link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
      <div
        className="search_popup"
        style={{ display: status ? "block" : "none" }}
      >
        <button
          className="search_b"
          onClick={() => {
            setStatus(false);
          }}
        >
          close
        </button>
        {names ? (
          <>
            {names.map((user, index) => {
              return (
                <div key={index} className="search_user">
                  <img className="p_pic" src={user.ProfilePicture} />
                  <Link
                    onClick={() => history(`/profile/${user.id}`)}
                    to={`/profile/${user.id}`}
                  >{`${user.firstName} ${user.lastName}`}</Link>
                </div>
              );
            })}{" "}
          </>
        ) : (
          []
        )}
      </div>
    </div>
  );
};

export default Navbar;
