import "./App.css";
import { Route, Routes } from "react-router-dom";

// import all function
import Register from "./components/Register";
// import login function
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Bookmark from "./components/Bookmark";
import ProfileUser from "./components/ProfileUser";
//===========================

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/saved" element={<Bookmark />} />
        <Route path="/profile/saved" element={<Bookmark />} />
        <Route path="/profile/:id" element={<ProfileUser />} />
      </Routes>
    </div>
  );
}

export default App;
