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
      .then((result) => {})
      .catch((err) => {
        /* console.log(err); */
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
        getAllPost();
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

  let numberOfPage = localStorage.getItem("NOP") || 1;

  const getAllPost = () => {
    axios
      .get(`http://localhost:5000/post?page=${numberOfPage}`)
      .then((result) => {
        dispatch(setPosts(result.data.posts.reverse()));
      })
      .catch((err) => {
        console.log(err);
      });
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
                  className="icon_SearchOne"
                  onClick={() => {
                    searchBox();
                  }}
                >
                  <svg className="svgsearch" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
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
                <svg id="icon1" width="20" height="20" viewBox="0 0 16 16">
                  <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z" />
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
              </button>

              <button id="icon2">
                <svg id="icon1" width="20" height="20" viewBox="0 0 16 16">
                  <path d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                </svg>
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
                <svg width="20" height="20" viewBox="0 0 16 16">
                  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                </svg>
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
                <svg id="icon1" width="20" height="20" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </button>
              <button id="icon1" onClick={() => logout()}>
                <svg id="icon1" width="20" height="20" viewBox="0 0 16 16">
                  <path d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                  <path d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
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
                    onClick={() => history(`/profile/${user.idUser}`)}
                    to={`/profile/${user.idUser}`}
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
