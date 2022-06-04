import "./App.css";
import { Route, Routes } from "react-router-dom";

// import all function
import Register from "./components/Register";

//===========================

function App() {
  return <div className="App">
    Welcome APP

    <Routes>
    <Route path="/register" element={<Register />} />
    </Routes>

    </div>;
}

export default App;
