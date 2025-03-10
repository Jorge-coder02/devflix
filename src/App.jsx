import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Asegúrate de importar el componente Home
import Login from "./pages/Login"; // Asegúrate de importar el componente Home
import MovieDetail from "./components/MovieDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta por defecto */}
        <Route path="/movie/:id" element={<MovieDetail />} />{" "}
        {/* Ruta generada para cada película */}
        <Route path="/login" element={<Login />} /> {/* Ruta login */}
      </Routes>
    </Router>
  );
};

export default App;
