"use client";

import { IoTimeOutline } from "react-icons/io5";
import { GrFormSchedule } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ParticlesComponent from "@/app/particlesBackground";
import useFetchMovies from "@/app/hooks/hooks";

export default function AboutMovie() {
  const { id } = useParams();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [Movie, setMovie] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiImage = process.env.NEXT_PUBLIC_API_IMG;

  useEffect(() => {
    const movieUrl = `${apiUrl}${id}?${apiKey}`;
    const fetchMovieData = async () => {
      const data = await useFetchMovies(movieUrl);
      setMovie(data);
    };
    fetchMovieData();
  }, [id]);

  const movieExistsInList = () => {
    const movieList = JSON.parse(localStorage.getItem("movieList")) || [];
    return movieList.some((movie) => movie.title === Movie.title);
  };

  useEffect(() => {
    if (Movie) {
      setButtonText(
        movieExistsInList()
          ? "Movie added to movie list"
          : "Add movie to movie list"
      );
    }
  }, [Movie]);

  const addMovie = () => {
    if (!buttonClicked && Movie) {
      if (!movieExistsInList()) {
        const movieList = JSON.parse(localStorage.getItem("movieList")) || [];
        movieList.push(Movie);
        localStorage.setItem("movieList", JSON.stringify(movieList));
        setButtonText("Movie Added to movie list");
        setButtonClicked(true);
      }
    }
  };

  return (
    <>
      <ParticlesComponent id="particles" />
      <main className="flex flex-col justify-center items-center">
        <main
          className="flex flex-col rounded-xl bg-slate-950 bg-opacity-60 border-[1.5px] border-[#0cb7f2] 
            shadow-blue-shadow w-[90%] lg:w-[45%] mt-[2%] pt-8"
        >
          <section className="flex">
            <div className="flex flex-col w-full items-center gap-4 relative p-4">
              {Movie && (
                <img
                  src={`${apiImage}${Movie.poster_path}`}
                  alt={Movie.title}
                  className="w-[500px] rounded-xl"
                ></img>
              )}
              <section className="flex flex-col text-center items-center gap-[12px]">
                <h1 className="text-white text-[30px] underline font-bold">
                  {Movie && Movie.title}
                </h1>
                <h2 className="text-white font-bold">
                  {Movie && Movie.tagline}
                </h2>
                <h3 className="flex text-white items-center gap-2">
                  <GrFormSchedule />
                  {Movie && Movie.release_date}
                </h3>

                <h4 className="flex text-white items-center gap-2">
                  <IoTimeOutline />
                  {Movie && `duration: ${Movie.runtime}min`}
                </h4>
                <h5 className="flex text-white items-center gap-2">
                  <FaStar />
                  {Movie && Movie.vote_average}
                </h5>

                <p className="text-white text-[20px]">
                  {Movie && Movie.overview}
                </p>
              </section>
            </div>
          </section>
        </main>
        <div className="flex flex-col items-center xl:flex-row pb-8 justify-center gap-8 xl:gap-[2%] mt-8 xl:-ml-[15.5%]">
          <button
            id="addButton"
            onClick={addMovie}
            className="flex items-center justify-center gap-2 text-white border py-6 xl:py-2 font-bold hover:bg-[#0cb9f228] rounded-xl w-60 md:w-[19rem] xl:w-60 b-24 bg-slate-950 bg-opacity-60 border-[#0cb7f2] shadow-blue-shadow "
          >
            {buttonText}
          </button>
          <Link
            href={"/"}
            className="flex justify-center text-white py-6 xl:py-2 font-bold hover:bg-[#0cb9f228] rounded-xl w-40 b-24 bg-slate-950 bg-opacity-60 border-[1.5px] border-[#0cb7f2] shadow-blue-shadow "
          >
            Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
