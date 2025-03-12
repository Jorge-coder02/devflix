import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<Home />} />
        {/* Ruta generada para cada película */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        {/* Usuarios */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
