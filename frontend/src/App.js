import "./App.css";
import { Route, Routes } from "react-router-dom";

// import all function
import Register from "./components/Register";
// import login function
import Login from "./components/Login";

//===========================

function App() {
  return (
    <div className="App">
      Welcome APP
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
