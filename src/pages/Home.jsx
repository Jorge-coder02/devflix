import "../index.css";
import MoviesList from "../components/MoviesList.jsx";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import { useState } from "react";

function Home() {
  const [filtro, setFiltro] = useState("");
  const handleChange = (value) => {
    setFiltro(value);
    console.log(value);
  };
  return (
    <div className="flex justify-center min-h-[100dvh] py-4">
      <span className="absolute top-0 right-0 pr-8 pt-4">
        <Link to="/login">Log In</Link> {/* Enlace a la ruta principal */}
      </span>
      <div className="flex flex-col items-center md:w-4/5 lg:w-3/5 py-10 gap-y-4 ">
        <h1 className="text-center text-4xl font-bold text-">DevFlix</h1>
        <SearchBar handleChange={handleChange}></SearchBar>
        <MoviesList filtro={filtro}></MoviesList>
      </div>
    </div>
  );
}

export default Home;
