import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts, setPosts } from "../../redux/reducers/posts";
import { addBookmark } from "../../redux/reducers/bookmark";
import { addstorys, setStorys } from "../../redux/reducers/story";
import Navbar from "../Navbar";
import { addComment, setComments } from "../../redux/reducers/comment";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";


//==================Home =====================
const Home = () => {
  const dispatch = useDispatch();
  const [media, setMedia] = useState("");
  const [description, setDescrption] = useState("");
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const [imgStory, setImgStory] = useState("");
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [love, setLove] = useState(false);

  const { token, isLoggedIn, posts, storys, comments } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        posts: state.posts.posts,
        storys: state.storys.storys,
        comments: state.comments.commented,
      };
    }
  );

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
        console.log(err, "am errrrrrrr");
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
        console.log(data);
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

  useEffect(() => {
    getAllStorys();
    getAllPost();
  }, []);

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
        dispatch(addBookmark(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ==========================
  return (
    <div className="contenar-main ">
      <div className="nav-section">
        <Navbar />
      </div>
      <div className="post_home">
        <div className="left_side">
          <h1>hello from dev left</h1>
        </div>
        <div className="middle_side">
          <div className="storys-department">
            <div className="main_story">
              <div>
                <button
                  className="bb"
                  onClick={() => {
                    backStory();
                  }}
                >
                  back
                </button>
              </div>
              <div className="map_story">
                {storys
                  ? storys.map((element, index) => {
                      return (
                        <div key={index}>
                          <img className="img_story" src={element.story} />
                        </div>
                      );
                    })
                  : []}
              </div>
              <div>
                <button
                  className="bb"
                  onClick={() => {
                    nextStory();
                  }}
                >
                  next
                </button>
              </div>
            </div>

            <br />
            <div className="button_story">
              <input
                type="file"
                onChange={(e) => {
                  setImgStory(e.target.files[0]);
                }}
              ></input>
              <button className="bb" onClick={uploadImage}>
                Add
              </button>

              <button onClick={createStory}>Add Story </button>
            </div>
          </div>
          {/* ====================Post==================== */}
          <br />
          <div className="post_department">
            <div className="main">
              {posts
                ? posts.map((element, index) => {
                    return (
                      <div className="map_post" key={index}>
                        <div className="img_main">
                          <img id="img_post" src={element.media} />
                        </div>
                        <div className="icon_main">
                           {/* ====like==== */}
                          <button id="icon_home"
                            onClick={() => {
                              toLikes(element.id, element.likes);
                            }}
                          ><BsHeart id="icon"/>
                          </button>
                          <button id="icon_home"
                            onClick={() => {
                              setShow(element.id);
                              getCommentById(element.id);
                            }}
                          >
                           <FaRegComment id="icon"/>
                          </button>
                         
                          

                          <button id="icon_home" onClick={() => createBookmark(element.id)}>
                           <BsBookmark id="icon"/>
                          </button>
                          <h4>{element.likes} Likes</h4>

                          <p id="p_post">{element.description}</p>
                          <br/>
                          <p >{element.date}</p>


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
                                <img className="img-c" src={element.media} />
                              </div>
                              <div className="left_s">
                                <button
                                  onClick={() => {
                                    setShow(false);
                                  }}
                                >
                                  close
                                </button>
                                {/* ====================== */}
                                <br />
                                <p id="p_post">{element.description}</p>
                                <div className="comment_section">
                                  {comments &&
                                    comments.map((e, i) => {
                                      return (
                                        <div key={i}>
                                          {element.id === e.post_id ? (
                                            <p className="comment">
                                              {e.comment}
                                            </p>
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
                                    className="Add_comment"
                                    type="text"
                                    placeholder="Add comment"
                                    onChange={(e) => {
                                      setComment(e.target.value);
                                    }}
                                  />
                                  <button
                                    className="buttonAdd"
                                    onClick={(e) => {
                                      createNewComment(element.id);
                                    }}
                                  >
                                    Add comment
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
                onClick={() => {
                  backPost();
                }}
              >
                back
              </button>
              <button
                onClick={() => {
                  nextPost();
                }}
              >
                next
              </button>
            </div>
          </div>
        </div>
        <div className="right_side"></div>
      </div>
    </div>
  );
};
export default Home;
