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
    <div className="login">
      <p className="Title">Login:</p>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => accessUser()}>Login</button>

      <div className="error">{message}</div>
    </div>
  );
};

export default Login;
