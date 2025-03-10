import React from "react";
import { useState, useEffect } from "react";
import { fetchMovies } from "../api.js";
import { Link } from "react-router-dom";

function MoviesList({}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 px-4 md:px-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-4">
      {movies.slice(0, 14).map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className="bg-base-300 p-4 rounded-lg flex flex-col items-center cursor-pointer">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="text-white mt-2 text-center">{movie.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MoviesList;
