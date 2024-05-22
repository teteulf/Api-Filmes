"use client";
import ParticlesComponent from "../particlesBackground";
import MovieCard from "../movieCard";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";

export default function MovieList() {
  const [movieList, setMovieList] = useState(
    JSON.parse(localStorage.getItem("movieList")) || []
  );

  const deleteMovie = (id) => {
    const updatedMovieList = movieList.filter((movie) => movie.id !== id);
    setMovieList(updatedMovieList);
    localStorage.setItem("movieList", JSON.stringify(updatedMovieList));
  };

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="w-full md:w-screen flex justify-center items-center mt-[3%]">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-20 p-6 text-center">
          {movieList.map((element) => (
            <div className="flex flex-col group relative" key={element.id}>
              <div className="absolute -right-3 -top-3 invisible group-hover:visible cursor-pointer ">
                <IoIosCloseCircle
                  size={30}
                  color="red"
                  onClick={() => deleteMovie(element.id)}
                  className="bg-white rounded-full"
                />
              </div>
              <MovieCard element={element} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
