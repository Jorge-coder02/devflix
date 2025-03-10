import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta por defecto */}
        <Route path="/movie/:id" element={<MovieDetail />} />{" "}
        {/* Ruta generada para cada película */}
        <Route path="/login" element={<Login />} /> {/* Ruta login */}
        <Route path="/logout" element={<Logout />} /> {/* Ruta login */}
      </Routes>
    </Router>
  );
};

export default App;
