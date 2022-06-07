import "./style.css";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toLogin } from "../../redux/reducers/auth";

const Login = () => {
  // instance
  const dispatch = useDispatch();
  const history = useNavigate();

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // request to server
  const accessUser = () => {
    axios
      .post(`http://localhost:5000/login`, { email, password })
      .then((result) => {
        if (result.data.success) {
          dispatch(toLogin(result.data.token));
          history("/home");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          return setMessage(err.response.data.message);
        }
        setMessage("Error happened while register, please try again");
      });
  };
  return (
    <div className="container co_login">
      <div className="login">
        <div className="leftSide">
          <img
            className="imglog"
            src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png"
          />
        </div>
        <div className="rightSide">
          <div className="insideRight">
          <div className="img_middle  zi">
          <img
            className="insta_img zi"
            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
          />
        </div>
        <div className="zi inRegister">
            <input className="inputRegister"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="inputRegister"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="inputRegister butto divpp logFb xi" onClick={() => accessUser()}>Login</button>
            </div>

            <div className="messagelook">  {message}  </div>

            <div className="threediv zi">
          <div className="fir">_______</div>
          <div className="sec">OR</div>
          <div className="fir">_______</div>
        </div>

        <div className="divll">
          <button className="logFB">log in with Facebook</button>
        </div>
        <div className="toLog xr"><p>Don't have an account?</p><button onClick={()=>{
          history("/register")
        }} className="chan">Sign up</button></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
