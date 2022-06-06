import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import Navbar from "../Navbar";

const Profile = () => {
  // state section
  const [media, setMedia] = useState("");
  const [url, setUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [post, setPost] = useState("");
  const [status, setStatus] = useState(false);

  // data from store
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  //fatch data from cloudnry

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "srcmongo");
    data.append("cloud_name", "mousa");

    fetch("https://api.cloudinary.com/v1_1/mousa/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
        setStatus(false);
      })
      .catch((err) => console.log(err));
  };

  // request to get user info
  const userInfo = () => {
    axios
      .get(`http://localhost:5000/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          setUrl(result.data.user[0].ProfilePicture);
          setFirstName(result.data.user[0].firstName);
          setLastName(result.data.user[0].lastName);
          setAge(result.data.user[0].age);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let numberOfPage = localStorage.getItem("UP") || 1;

  const postUser = () => {
    axios
      .get(`http://localhost:5000/post/profile?page=${numberOfPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setPost(result.data.posts.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userInfo();
    postUser();
  }, []);

  return (
    <div className="profile-div">
      <div className="nav_bar">
        <Navbar />
      </div>
      <div className="user_info">
        <div
          className="user_info_popup"
          style={{ display: status ? "block" : "none" }}
        >
          <button
            onClick={() => {
              setStatus(false);
            }}
          >
            X
          </button>
          <input
            type="file"
            onChange={(e) => {
              setMedia(e.target.files[0]);
            }}
          />
          <button
            onClick={() => {
              uploadImage();
            }}
          >
            upload
          </button>
        </div>
        <div className="user_info_img">
          <button onClick={() => setStatus(true)}>
            <img className="pro_img" src={url} />
          </button>
        </div>
        <div className="user_info_data">
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <div className="all_post">
        {post
          ? post.map((element, index) => {
              return (
                <div key={index} className="U_posts">
                  <div>
                    <img className="img_posts" src={element.media} />
                  </div>
                  <div>
                    <p className="p_posts"> {element.description}</p>
                  </div>
                </div>
              );
            })
          : []}
      </div>
    </div>
  );
};

export default Profile;
