import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, setPosts } from "../../redux/reducers/posts";
import { addstorys, setStorys } from "../../redux/reducers/story";
import Navbar from "../Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const [media, setMedia] = useState("");
  const [description, setDescrption] = useState("");
  const [message, setMessage] = useState("");
  const [story, setStory] = useState("");
  const [imgStory, setImgStory] = useState("");

  const { token, isLoggedIn, posts, storys } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      posts: state.posts.posts,
      storys: state.storys.storys,
    };
  });

  let numberOfPage = localStorage.getItem("NOP") || 1;

  const getAllPost = () => {
    axios
      .get(`http://localhost:5000/post?page=${numberOfPage}`)
      .then((result) => {
        dispatch(setPosts(result.data.posts));
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
        dispatch(setStorys(result.data.result));
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

  useEffect(() => {
    getAllStorys();
    getAllPost();
  }, []);
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
                  console.log(e.target.files[0]);
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
                        <div>
                          <img id="img_post" src={element.media} />
                        </div>
                        <div>
                          <p id="p_post">{element.description}</p>
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
