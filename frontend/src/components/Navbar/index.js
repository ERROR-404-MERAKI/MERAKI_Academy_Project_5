import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toLogout } from "../../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { addPosts, setPosts } from "../../redux/reducers/posts";

//====FiLogOut=============NavBar==============
const Navbar = () => {
  // data from store

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
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
  const [userId, setUserId] = useState("");

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
      .get(`http://localhost:5000/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUserId(result.data.user[0].idUser);
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
  useEffect(() => {
    userProfile();
  }, []);

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
                  <svg
                    className="svgsearch"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
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
                  <div className="xUp">
                    <button
                      className="buttonX"
                      onClick={() => {
                        setAddPost(false);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="headerAdd">Create New Post</div>
                  <div className="imNouse">
                    <svg
                      color="#262626"
                      fill="#262626"
                      height="77"
                      role="img"
                      viewBox="0 0 97.6 77.3"
                      width="96"
                    >
                      <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"></path>
                      <path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"></path>
                      <path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"></path>
                    </svg>
                  </div>
                  <div className="llo">Drag photos and videos here</div>

                  <div className="heren mar">
                    <label>
                      <p className="cruser sene">Select from your computer</p>
                      <input
                        className="choosePic"
                        type="file"
                        onChange={(e) => {
                          setImgPost(e.target.files[0]);
                        }}
                      ></input>
                    </label>
                    <button className="bb set" onClick={uploadImage}>
                      {" "}
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                        <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                      </svg>{" "}
                    </button>
                  </div>
                  <div className="desctik">
                    <input
                      className="slize"
                      placeholder="Description"
                      onChange={(e) => {
                        setDescrption(e.target.value);
                      }}
                    />
                  </div>
                  <div className="footerpo">
                    <button className="sinz" onClick={createNewPost}>
                      Add Post{" "}
                    </button>
                  </div>
                </div>
              </div>
              <button
                id="icon2"
                onClick={() => {
                  history(`/profile/${userId}`);
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
        <div className="xUp">
          <button
            className="buttonX"
            onClick={() => {
              setStatus(false);
            }}
          >
            X
          </button>
        </div>
        <div className="headerAdd">
          <h3>Search results</h3>
        </div>
        {names ? (
          <>
            {names.map((user, index) => {
              return (
                <div key={index} className="search_user">
                  <div>
                    <img className="p_pic" src={user.ProfilePicture} />
                  </div>
                  <div className="mmid">
                    {user.idUser !== userId ? (
                      <Link
                        className="link_name"
                        to={`/user/${user.idUser}`}
                      >{`${user.firstName} ${user.lastName}`}</Link>
                    ) : (
                      <Link
                        to={`/profile/${user.idUser}`}
                      >{`${user.firstName} ${user.lastName}`}</Link>
                    )}
                  </div>
                  <div className="bbut1">
                    <button className="rzz">Follow</button>
                  </div>
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
