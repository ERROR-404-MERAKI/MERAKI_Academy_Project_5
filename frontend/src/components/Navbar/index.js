import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { toLogout } from "../../redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  // instance
  const dispatch = useDispatch();
  const history = useNavigate();

  // useState
  const [firstName, setFirstName] = useState("");
  const [names, setNames] = useState("");
  const [avatar, setAvatar] = useState("");

  //request to server
  const searchBox = () => {
    axios
      .post(`http://localhost:5000/register/search`, { firstName })
      .then((result) => {
        console.log(result.data.users);
        setNames(result.data.users);
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

  // logout function
  const logout = () => {
    dispatch(toLogout());
    history("/");
  };

  return (
    <div>
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

            <Link className="Link" to="/home">
              Home
            </Link>
            <div>
              <div className="search_bar">
                <input
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
                  search
                </button>
              </div>
            </div>

            <div className="add_post">
              <button>+</button>
            </div>

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
      <div className="search_popup">
        {names ? (
          <>
            {names.map((user, index) => {
              return (
                <div key={index} className="search_user">
                  {" "}
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
