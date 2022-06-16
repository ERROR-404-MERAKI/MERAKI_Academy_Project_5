import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts, setPosts } from "../../redux/reducers/posts";
import { setUser } from "../../redux/reducers/auth";
import Picker from "emoji-picker-react";
import { addBookmark, deleteBookmark } from "../../redux/reducers/bookmark";
import { addstorys, setStorys } from "../../redux/reducers/story";
import Navbar from "../Navbar";
import { addComment, setComments } from "../../redux/reducers/comment";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import InputEmoji from "react-input-emoji";
//==================Home =====================
const Home = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const [imgStory, setImgStory] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [love, setLove] = useState(false);
  const [status_b, setStatus_b] = useState(false);
  const [showBook, setShowBook] = useState(0);
  const [removeBook, setRemoveBook] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showEmoji, setshowEmoji] = useState(false);
  const [showEmoji2, setshowEmoji2] = useState(false);

  const { token, posts, storys, comments, user } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      posts: state.posts.posts,
      storys: state.storys.storys,
      comments: state.comments.commented,
      user: state.auth.user,
    };
  });

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
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

  const backPost = () => {
    numberOfPage--;
    localStorage.setItem("NOP", numberOfPage);
    getAllPost();
  };
  const nextPost = () => {
    numberOfPage++;

    localStorage.setItem("NOP", numberOfPage);
    getAllPost();
  };
  //================git All User=========
  const getAllUser = () => {
    axios
      .get(`http://localhost:5000/register?page=1`)
      .then((result) => {
        dispatch(setUser(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //===============================
  let numberOfStory = localStorage.getItem("NOS") || 1;

  //
  const getAllStorys = () => {
    axios
      .get(`http://localhost:5000/story?page=${numberOfStory}`)
      .then((result) => {
        dispatch(setStorys(result.data.result.reverse()));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backStory = () => {
    numberOfStory--;
    localStorage.setItem("NOS", numberOfStory);
    getAllStorys();
  };
  const nextStory = () => {
    numberOfStory++;
    localStorage.setItem("NOS", numberOfStory);
    getAllStorys();
  };

  //================================
  const createStory = () => {
    axios
      .post(
        `http://localhost:5000/story`,
        { story, date: "9999-12-31 23:59:59 " },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        getAllStorys();
        getAllPost();
        dispatch(addstorys(result.data));

        setMessage("Created Story");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  //===============comment ===================
  const createNewComment = (id) => {
    axios
      .post(
        `http://localhost:5000/comment/${id}`,
        { comment, date: "9999-12-31 23:59:59 " },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        getAllPost();
        getCommentById(id);
        dispatch(addComment(result.data));
        setMessage("Created comment ");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const getCommentById = (id) => {
    axios
      .get(`http://localhost:5000/post/${id}/comment`)
      .then((result) => {
        dispatch(setComments(result.data.results));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //==================

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", imgStory);
    data.append("upload_preset", "srcmongo");
    data.append("cloud_name", "mousa");

    fetch("https://api.cloudinary.com/v1_1/mousa/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setStory(data.url);
      })
      .catch((err) => console.log(err));
  };
  //==============like==============

  const toLikes = (id, likes) => {
    let newLikes = likes++;
    setLove(true);
    if (love) addLikes(id, likes, newLikes);
  };

  const addLikes = (id, likes, newLikes) => {
    newLikes++;

    axios
      .put(
        `http://localhost:5000/post/${id}`,
        { newLikes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(updatePosts(id));
        getAllPost();
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  // bookmark

  const createBookmark = (id) => {
    axios
      .post(
        `http://localhost:5000/bookmark/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        if (result) {
          dispatch(addBookmark(result.data));
          setShowBook(id);
          setStatus_b(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeBookmark = (id) => {
    axios
      .delete(`http://localhost:5000/bookmark/${id}`)
      .then((result) => {
        if (result) {
          dispatch(deleteBookmark(result.data));
          setRemoveBook(id);
          setStatus_b(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUser();
    getAllStorys();
    getAllPost();
  }, []);

  // bookmark

  // ==========================
  return (
    <div className="contenar-main ">
      <div className="nav-section">
        <Navbar />
      </div>
      <div className="post_home">
        <div className="left_side"></div>
        <div className="middle_side">
          <div className="storys-department">
            <div className="main_story">
              <div>
                <button
                  className="bb set"
                  onClick={() => {
                    backStory();
                  }}
                >
                  <svg
                    className="svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                  </svg>
                </button>
                {/* */}
              </div>
              {/* ============================= */}
              <div className="map_story">
                {storys
                  ? storys.map((element, index) => {
                      return (
                        <div key={index}>
                          <img alt="art"
                            onClick={() => {
                              setShowStory(true);
                            }}
                            className="img_story"
                            src={element.story}
                          />
                          <div
                            className="show_story"
                            style={{
                              display:
                                showStory == element.id ? "block" : "none",
                            }}
                          >
                            <div className="sss">
                              <div className="close">
                                <button
                                  className="closeb"
                                  onClick={() => {
                                    setShowStory(false);
                                  }}
                                >
                                  X
                                </button>
                              </div>
                              <img alt="art" className="img_s" src={element.story} />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : []}
              </div>
              <div>
                <button
                  className="bb set"
                  onClick={() => {
                    nextStory();
                  }}
                >
                  <svg
                    className="svg"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                </button>
              </div>
            </div>

            <br />
            <div className="button_story">
              <label>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                </svg>
                <input
                  id="inputTag"
                  className="choosePic"
                  type="file"
                  onChange={(e) => {
                    setImgStory(e.target.files[0]);
                  }}
                ></input>
              </label>
              <button className="bb set" onClick={uploadImage}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                  <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                </svg>{" "}
              </button>

              <button className="bb set" onClick={createStory}>
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </button>
            </div>
          </div>
          {/* =========================================== */}

          {/* ====================Post==================== */}
          <br />
          <div className="post_department">
            <div className="main">
              {posts
                ? posts.map((element, index) => {
                    return (
                      <div className="map_post" key={index}>
                        <div className="headerName">
                          <img alt="art"
                            className="imgpoUs"
                            src={element.ProfilePicture}
                          />{" "}
                          {element.firstName} {element.lastName}
                        </div>
                        <div
                          className="img_main"
                          onClick={() => {
                            setshowEmoji2(false);
                          }}
                        >
                          <img alt="art" id="img_post" src={element.media} />
                        </div>
                        <div className="icon_main">
                          <div className="headicon">
                            <button
                              id="icon_home"
                              onClick={() => {
                                toLikes(element.id, element.likes);
                              }}
                            >
                              <BsHeart id="icon" />
                            </button>
                            <button
                              id="icon_home"
                              onClick={() => {
                                setShow(element.id);
                                getCommentById(element.id);
                              }}
                            >
                              <FaRegComment id="icon" />
                            </button>

                            <button
                              className="bookmarkmark"
                              style={{ display: !status_b ? "block" : "none" }}
                              onClick={() => {
                                element.id === showBook && status_b ? (
                                  <></>
                                ) : (
                                  createBookmark(element.id)
                                );
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                              </svg>
                            </button>
                            <button
                              className="bookmarkmark"
                              style={{ display: status_b ? "block" : "none" }}
                              onClick={() => {
                                element.id === removeBook && status_b ? (
                                  removeBookmark(element.id)
                                ) : (
                                  <></>
                                );
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                className="bi bi-bookmark-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                              </svg>{" "}
                            </button>
                          </div>
                          <div className="numLikes">
                            <h4>{element.likes} Likes</h4>
                          </div>

                          <div id="p_post">
                            <h5>
                              {element.firstName} {element.lastName}:
                            </h5>{" "}
                            <p className="desc">{element.description}</p>
                          </div>
                          <div className="datee">
                            <p>{element.date}</p>
                          </div>
                          <div className="FooterCCo">
                            <input
                              className="azx"
                              placeholder="Add a comment.."
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                            ></input>
                            <button
                              onClick={() => {
                                setshowEmoji2(true);
                              }}
                              className="bEmoji"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                              </svg>
                            </button>
                            <div
                              className="emojiPopup2"
                              style={{
                                display: showEmoji2 ? "block" : "none",
                              }}
                            >
                              <div>
                                <Picker onEmojiClick={onEmojiClick} />
                              </div>
                            </div>
                            <p
                              className="cruser bbllue"
                              onClick={() => {
                                createNewComment(element.id);
                              }}
                            >
                              post
                            </p>
                          </div>
                          {/* ========== comment ======== */}

                          <div
                            className="show_comment"
                            style={{
                              display: show == element.id ? "block" : "none",
                            }}
                          >
                            <div className="main_comment">
                              {/* ========img-comment======== */}
                              <div className="right_s">
                                <img alt="art" className="img-c" src={element.media} />
                              </div>
                              <div className="left_s">
                                <div className="close">
                                  <button
                                    className="closeb"
                                    onClick={() => {
                                      setShow(false);
                                    }}
                                  >
                                    X
                                  </button>
                                </div>

                                {/* ====================== */}

                                <div className="fl_co">
                                  <img alt="art"
                                    className="imgpoUs"
                                    src={element.ProfilePicture}
                                  />
                                  <div className="h5_co">
                                    <h5 id="ww">{element.firstName}</h5>
                                    <h5>{element.lastName} :</h5>{" "}
                                  </div>{" "}
                                  <p>{element.description}</p>
                                </div>
                                <br />

                                <div
                                  className="comment_section"
                                  onClick={() => {
                                    setshowEmoji(false);
                                  }}
                                >
                                  {comments &&
                                    comments.map((e, i) => {
                                      return (
                                        <div key={i}>
                                          {element.id === e.post_id ? (
                                            <div className="main_co">
                                              <div className="fl_co1">
                                                <img alt="art"
                                                  className="imgpoUs"
                                                  src={e.ProfilePicture}
                                                />
                                                <div className="h5_co">
                                                  <h5>{e.firstName}</h5>
                                                  <h5>{e.lastName}:</h5>
                                                </div>
                                              </div>
                                              <div className="p_co">
                                                <p className="comment">
                                                  {e.comment}
                                                </p>
                                              </div>
                                              <br />
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      );
                                    })}
                                </div>
                                <br />
                                <div className="input_button">
                                  <input
                                    className="azx2"
                                    type="text"
                                    placeholder="Add comment"
                                    onChange={(e) => {
                                      setComment(e.target.value);
                                    }}
                                  />
                                  <button
                                    onClick={() => {
                                      setshowEmoji(true);
                                    }}
                                    className="bEmoji"
                                  >
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                    </svg>
                                  </button>
                                  <div
                                    className="emojiPopup"
                                    style={{
                                      display: showEmoji ? "block" : "none",
                                    }}
                                  >
                                    <div>
                                      <Picker onEmojiClick={onEmojiClick} />
                                    </div>
                                  </div>
                                  <button
                                    className="buttonAdd"
                                    onClick={(e) => {
                                      createNewComment(element.id);
                                    }}
                                  >
                                    post
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : []}
            </div>
            <div>
              <button
                className="bbset"
                onClick={() => {
                  backPost();
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                </svg>
              </button>
              <button
                className="bbset"
                onClick={() => {
                  nextPost();
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="right_side">
          <div className="mosaaaa">
            <div className="headsug">
              <h5>Suggestions you may like</h5>
            </div>
            {user.map((u, i) => {
              return (
                <div className="headerName1" key={i}>
                  <div className="onnne">
                    {" "}
                    <img alt="art" className="imgpoUs" src={u.ProfilePicture} />
                  </div>
                  <div className="secconnd">
                    {" "}
                    <h6>{u.firstName}</h6>
                    <h6>{u.lastName}</h6>
                  </div>
                  <div className="ff410">
                    {" "}
                    <button className="r410">Follow</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
