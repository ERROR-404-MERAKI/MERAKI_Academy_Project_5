import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { setId } from "../../redux/reducers/users/index";
import "./style.css";

const ProfileUser = () => {
  // state section
  const [ProfilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [post, setPost] = useState("");
  const [users, setUsers] = useState(0);
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();

  // data from store
  const { token, person_id } = useSelector((state) => {
    return {
      token: state.auth.token,
      person_id: state.userId.userId,
    };
  });

  // get user info
  const gitUser = () => {
    axios
      .get(`http://localhost:5000/user/profile/name/${id}`)
      .then((result) => {
        setProfilePicture(result.data.user[0].ProfilePicture);
        setFirstName(result.data.user[0].firstName);
        setLastName(result.data.user[0].lastName);
        setAge(result.data.user[0].age);
        dispatch(setId(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get user by post id
  const postUser = () => {
    axios
      .get(`http://localhost:5000/post/${id}`)
      .then((result) => {
        setPost(result.data.posts.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // follow user
  const followUser = () => {
    axios
      .post(
        `http://localhost:5000/user/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        getUserFollower();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserFollower = () => {
    axios
      .get(`http://localhost:5000/user/follower/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUsers(result.data.user);
      })
      .catch((err) => {});
  };

  const unFollow = () => {
    axios
      .delete(`http://localhost:5000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        getUserFollower();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const followerId = () => {
    axios
      .get(`http://localhost:5000/user/follow/${id}`)
      .then((result) => {
        console.log(result.data.user, "follow");
        setFollower(result.data.user);
        getUserFollower();
      })
      .catch((err) => {});
  };

  const followingId = () => {
    axios
      .get(`http://localhost:5000/user/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.user, "following");

        setFollowing(result.data.user);
        getUserFollower();
      })
      .catch((err) => {});
  };
  console.log(users);

  useEffect(() => {
    gitUser();
    postUser();
    getUserFollower();
  }, []);
  console.log(users);
  console.log(id, "iiiiid moo");
  return (
    <div className="profile_div">
      <div className="nav_bar">
        <Navbar />
      </div>
      <div className="main">
        <div className="user_info">
          <div className="user_info_img">
            {" "}
            <img className="pro_img" src={ProfilePicture} />{" "}
          </div>
          <div className="infoUsser">
            <div className="userNamee">
              <p className="nameUser">
                {firstName} {lastName}
              </p>
              <div>
                {users ? (
                  users.map((element, index) => {
                    {
                      console.log(
                        element.person_id == id && element.is_deleted == 1
                      );
                    }
                    return (
                      <div key={index}>
                        {element.person_id == id && element.is_deleted == 1 ? (
                          <button
                            className="editButton-flw"
                            onClick={() => {
                              followUser();
                              followingId();
                              followerId();
                            }}
                          >
                            {" "}
                            Follow{" "}
                          </button>
                        ) : (
                          <button
                            className="editButton-fle"
                            onClick={() => {
                              unFollow();
                              followingId();
                              followerId();
                            }}
                          >
                            {" "}
                            <svg aria-label="Following" class="_ab6-" color="#262626" fill="#262626" height="15" role="img" viewBox="0 0 95.28 70.03" width="20"><path d="M64.23 69.98c-8.66 0-17.32-.09-26 0-3.58.06-5.07-1.23-5.12-4.94-.16-11.7 8.31-20.83 20-21.06 7.32-.15 14.65-.14 22 0 11.75.22 20.24 9.28 20.1 21 0 3.63-1.38 5.08-5 5-8.62-.1-17.28 0-25.98 0zm19-50.8A19 19 0 1164.32 0a19.05 19.05 0 0118.91 19.18zM14.76 50.01a5 5 0 01-3.37-1.31L.81 39.09a2.5 2.5 0 01-.16-3.52l3.39-3.7a2.49 2.49 0 013.52-.16l7.07 6.38 15.73-15.51a2.48 2.48 0 013.52 0l3.53 3.58a2.49 2.49 0 010 3.52L18.23 48.57a5 5 0 01-3.47 1.44z"></path></svg>                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div>
                    {id == person_id && (
                      <button
                        className="editButton"
                        onClick={() => {
                          followUser();
                        }}
                      >
                        {" "}
                        Follow{" "}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="activeUser">
              <div>{`${post.length || 0} Posts`}</div>
              <div>{`${follower.length || 0} Followers`}</div>
              <div>{`${following.length || 0} Following`}</div>
            </div>
            <div className="bio">
              <div>
                <p className="pBio">Bio: We are ERROR 404 TEAM .. Join us</p>
              </div>
            </div>
          </div>
        </div>

        <div className="navBottom-pro">
          <button className="buttonNavB-pro">
            <svg
              aria-label=""
              className="_ab6-"
              color="#262626"
              fill="#262626"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <rect
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
            posts{" "}
          </button>
        </div>
        <div className="all_posts">
          {" "}
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
    </div>
  );
};

export default ProfileUser;
