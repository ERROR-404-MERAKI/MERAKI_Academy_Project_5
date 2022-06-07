import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { toLogout } from "../../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { addPosts, setPosts } from "../../redux/reducers/posts";
import { AiFillHome } from "react-icons/ai";
import { BsMessenger} from "react-icons/bs";
import { GoDiffAdded} from "react-icons/go";
import { BsSearch} from "react-icons/bs";




//====BsSearch=============NavBar==============
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
            <Link
              className="Link"
              to="/profile"
              onClick={() => {
                userProfile();
              }}
            ></Link>

            <div
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

            <div>
              <div className="search_bar">
                <input
                
                  id="search"
                  type="search"
                  list="users"
                  placeholder="Search"
                  
                  onChange={handleOnChange}
                />

                <button
                  onClick={() => {
                    searchBox();
                  }}
                >
                  
                  <BsSearch id="icon"/>
                </button>
<AiFillHome id="icon"/>

              </div>
            </div>
              <BsMessenger id="icon"/>
            <button
              onClick={() => {
                setAddPost(true);
                setStatus(false);
              }}
            >
             <GoDiffAdded/>
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

                    <button className="bb" onClick={uploadImage}>
                      Add
                    </button>
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
              onClick={() => {
                history("/profile");
              }}
            >
              profile
            </button>
            <button className="logout" onClick={() => logout()}>
              Logout
            </button>
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
                  <p>{`${user.firstName} ${user.lastName}`}</p>
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
