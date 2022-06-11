import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setBookmark, deleteBookmark } from "../../redux/reducers/bookmark";

import "./style.css";
import Navbar from "../Navbar";

const Profile = () => {
  const dispatch = useDispatch();
  // state section
  const [media, setMedia] = useState("");
  const [ProfilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [newfirstName, setNewFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [newlastName, setNewLastName] = useState("");

  const [age, setAge] = useState(0);
  const [post, setPost] = useState("");
  const [status, setStatus] = useState(false);
  const [is_deleted, setis_deleted] = useState(0);
  const [showStatus, setshowStatus] = useState(false);
  const [removeBook, setRemoveBook] = useState(0);
  const [status_b, setStatus_b] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState("");

  // data from store
  const { token, bookmark } = useSelector((state) => {
    return {
      token: state.auth.token,
      bookmark: state.bookmark.bookmark,
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
        setProfilePicture(data.url);
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
        if (result.data.success) {
          setProfilePicture(result.data.user[0].ProfilePicture);
          setFirstName(result.data.user[0].firstName);
          setLastName(result.data.user[0].lastName);
          setBio(result.data.user[0].bio);
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
        setPost(result.data.posts.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editInfo = () => {
    axios
      .put(
        `http://localhost:5000/user/edit`,
         {firstName:newfirstName, lastName:newlastName ,ProfilePicture , bio} ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        userInfo()
        setStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllBookmark = () => {
    axios
      .get(`http://localhost:5000/bookmark/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setBookmark(result.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePostBtId = (id) => {
    axios
      .put(
        `http://localhost:5000/post/delete/${id}`,
        { is_deleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setis_deleted(1);
        postUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //============remove BookMark ==========
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
    userInfo();
    postUser();
  }, []);
  

  return (
    <div className="profile_div">
      <div className="nav_bar">
        <Navbar />
      </div>
      <div className="main">
        <div className="user_info">
          <div
            className="user_info_popup"
            style={{ display: status ? "block" : "none" }}
          >
            <div className="mainEdit">
              <div className="HeaderUpload">
                <h4>Change Profile Photo</h4>
              </div>
              <div className="sec_Chose">
                <label>
                  {" "}
                  <h3 className="cruser">Upload Photo</h3>
                  <input
                    d="inputTag"
                    className="choosePic"
                    type="file"
                    onChange={(e) => {
                      setMedia(e.target.files[0]);
                    }}
                  />
                </label>
                <button
                  className="bb set"
                  onClick={() => {
                    uploadImage();
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                    <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
                  </svg>{" "}
                </button>
              </div>
              <div className="thirdSe">
                <button
                  className="butSh"
                  onClick={() => {
                    editInfo();
                  }}
                >
                  Share
                </button>
              </div>
              <div className="X">
                <button
                  className="XB db"
                  onClick={() => {
                    setStatus(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="user_info_img">
            <button className="pro_img bu" onClick={() => setStatus(true)}>
              <img className="pro_img" src={ProfilePicture} />
            </button>
          </div>
          <div className="infoUsser">
            <div className="userNamee">
              <p className="nameUser">
                {firstName} {lastName}
              </p>
              <button
                className="editButton"
                onClick={() => {
                  setEdit(true);
                  setStatus(false);
                }}
              >
                {" "}
                Edit Profile{" "}
              </button>
              <div
                className="user_info_popup"
                style={{ display: edit ? "block" : "none" }}
              >
                <div className="mainEdit">
                  <div className="HeaderUpload">Edit Your profile</div>
                  <div className="sec_Chosetow">
                    <div className="ff nnn">
                      First Name:{" "}
                      <input
                        onChange={(e) => {
                          setNewFirstName(e.target.value);
                        }}
                        className="mz"
                        placeholder="Insert First Name.."
                      ></input>
                    </div>
                    <br />
                    <div className="ff">
                      Second Name:{" "}
                      <input
                        className="mz"
                        onChange={(e) => {
                          setNewLastName(e.target.value);
                        }}
                        placeholder="Insert Second Name.."
                      ></input>
                    </div>
                    <br />

                    <div className="ff bbb">
                      Add Bio:{" "}
                      <input
                        className="mz"
                        onChange={(e) => {
                          setBio(e.target.value);
                        }}
                        placeholder="Insert Bio.."
                      ></input>
                    </div>
                  </div>
                  <div className="X">
                    <button
                      className="XB db"
                      onClick={() => {
                        editInfo()
                        setEdit(false);
                      }}
                    >
                      update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="activeUser">
              <div>{`${post.length} Posts`}</div>
              <div>{`280 Follower`}</div>
              <div>{`205 Following`}</div>
            </div>
            <div className="bio">
              <div>
                <p className="pBio">{bio}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="navBottom">
          <button
            onClick={() => {
              setshowStatus(false);
            }}
            className="buttonNavB"
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z" />
            </svg>
            posts
          </button>
          <button className="buttonNavB">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
              <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
              <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>{" "}
            Reels
          </button>
          <button className="buttonNavB">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
            </svg>{" "}
            Video
          </button>
          {/* =========bookmark========== */}
          <button
            onClick={() => {
              setshowStatus(true);
              getAllBookmark();
            }}
            className="buttonNavB"
          >
            {" "}
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            </svg>{" "}
            Bookmark
          </button>
          <button className="buttonNavB">
            {" "}
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
            </svg>{" "}
            Tags
          </button>
        </div>

        <div
          className="post_post"
          style={{ display: showStatus == false ? "block" : "none" }}
        >
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
                      <div className="reactionPost">
                        <button
                          className="buto"
                          onClick={() => {
                            deletePostBtId(element.id);
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <path d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z" />
                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                          </svg>
                        </button>
                        <button className="buto">
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                          </svg>
                        </button>
                        <button className="buto">
                          <svg width="16" height="16" viewBox="0 0 16 16">
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              : []}
          </div>
        </div>
        <div
          className="post_post"
          style={{ display: showStatus == true ? "block" : "none" }}
        >
          <div className="all_post">
            {bookmark.map((element, index) => {
              return (
                <div className="U_posts">
                  <div>
                    <img className="img_posts" src={element.media} />
                  </div>

                  <div>
                    <p className="p_posts"> {element.description}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        element.id === removeBook && status_b ? (
                          removeBookmark(element.id)
                        ) : (
                          <></>
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bookmark"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                      </svg>
                    </button>
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

export default Profile;

/* 

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
            <button
              onClick={() => {
                editInfo();
              }}
            >
              Add
            </button>
          </div>
*/
