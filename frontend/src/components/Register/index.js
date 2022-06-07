import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

import { useSelector } from "react-redux";
// =================================================================

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [ProfilePicture, setProfilePicture] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const roleId = "1";
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const history = useNavigate();

  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  // =================================================================

  const addUserToBackend = () => {
    axios
      .post("http://localhost:5000/register", {
        firstName,
        lastName,
        email,
        password,
        roleId,
        age,
        ProfilePicture: image,
      })
      .then((result) => {
        setMessage(result.data.message);
        //console.log(result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
  };
  //console.log(image);
  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", ProfilePicture);
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
        setImage(data.url);
      })
      .catch((err) => console.log(err));
  };

  // =================================================================

  return (
    <div className="container">
      <div className="mainRejister">
        <div className="img_middle">
          <img
            className="insta_img"
            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
          />
        </div>
        <div>
          <p className="pp">
            Sign up to see photos and videos <tr/> from your friends.
          </p>
        </div>

        <div className="divpp">
          <button className="logFB">log in with Facebook</button>
        </div>
        <div className="threediv">
          <div className="fir">_______</div>
          <div className="sec">OR</div>
          <div className="fir">_______</div>
        </div>
        <div className="classinput inRegister">
          <input
            className="inputRegister"
            placeholder="First Name .."
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></input>{" "}
          <input
            className="inputRegister"
            placeholder="Last Name .. "
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></input>{" "}
          <input
            className="inputRegister"
            placeholder="Age.. "
            type="number"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          ></input>{" "}
          <input
            className="inputRegister"
            placeholder="Email .. "
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>{" "}
          <input
            className="inputRegister"
            placeholder="Password .."
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>{" "}
          
          <div>
            <label>
              <svg className="svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
              </svg>
              <input
                id="inputTag"
                className="choosePic"
                type="file"
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setProfilePicture(e.target.files[0]);
                }}
              ></input>
            </label>{" "}
            <button className="bb" onClick={uploadImage}>
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                <path d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z" />
              </svg>{" "}
            </button>
          </div>
          <div><p className="pp rr">People who use our service may have uploaded your contact information to Instagram. Learn More</p></div>
          <div>
            <button className="inputRegister butto divpp logFb" onClick={addUserToBackend}>Sign up</button>
          </div>
        </div>
        <div className="toLog"><p>Have an account? </p><button onClick={()=>{
          history("/")
        }} className="chan">Log in</button></div>
      </div>
    </div>
  );
};

export default Register;
