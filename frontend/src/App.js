import "./App.css";
import { Route, Routes } from "react-router-dom";

// import all function
import Register from "./components/Register";
// import login function
import Login from "./components/Login";
import Home from "./components/Home";


//===========================

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;
