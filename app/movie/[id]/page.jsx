"use client";

import { IoTimeOutline } from "react-icons/io5";
import { GrFormSchedule } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import ParticlesComponent from "@/app/particlesBackground";
import Image from "next/image";
import useLocalStorage from "@/app/hooks/useLocalStorage";

export default function AboutMovie() {
  const { addItem } = useLocalStorage("movieList");
  const { id } = useParams();
  const [buttonText, setButtonText] = useState("");
  const [Movie, setMovie] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiImage = process.env.NEXT_PUBLIC_API_IMG;

  useEffect(() => {
    const movieUrl = `${apiUrl}${id}?${apiKey}`;
    const FetchMovieData = async () => {
      const res = await fetch(movieUrl);
      const data = await res.json();
      setMovie(data);
    };
    FetchMovieData();
  }, [id, apiKey, apiUrl]);

  const MovieExistsInList = useCallback(() => {
    const movieList = JSON.parse(localStorage.getItem("movieList")) || [];
    return movieList.some((movie) => movie.title === Movie?.title);
  }, [Movie]);

  useEffect(() => {
    if (Movie) {
      setButtonText(
        MovieExistsInList()
          ? "Movie added to movie list"
          : "Add movie to movie list"
      );
    }
  }, [Movie, MovieExistsInList]);

  return (
    <>
      <ParticlesComponent id="particles" />
      <main className="flex flex-col justify-center items-center md:min-w-[780px] ">
        <main
          className="flex rounded-xl bg-slate-950 bg-opacity-60 border-[1.5px] border-[#0cb7f2] 
            shadow-blue-shadow mt-[10%] md:mt-[2%] mb-[2%] md:max-w-[50%] md:min-w-[700px] min-w-[300px] w-[80%] md:w-auto"
        >
          <section className="flex flex-col w-full relative p-6 gap-10 justify-center items-center">
            <div className="flex flex-col md:flex-row w-full items-center justify-center gap-10 relative p-2 ">
              {Movie && (
                <Image
                  src={`${apiImage}${Movie.poster_path}`}
                  alt={Movie.title}
                  className="w-[350px] 2xl:w-[400px] rounded-xl"
                  width={350}
                  height={450}
                />
              )}
              <section className="flex flex-col text-center items-center 2xl:gap-10 gap-8 md:w-[50%]">
                <h1
                  className={`${
                    Movie && Movie.title.length > 20
                      ? "2xl:text-[18px] 2xl:w-[250px] md:text-[18px]"
                      : "2xl:text-[40px] && text-[30px]"
                  } text-white underline font-bold `}
                >
                  {Movie && Movie.title}
                </h1>
                <h2
                  className={`${
                    Movie && Movie.tagline.length > 30
                      ? "2xl:w-[250px] && 2xl:text-[15px] "
                      : ""
                  }text-white font-bold`}
                >
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
                <h6 className="flex text-white items-center gap-2">
                  {Movie && `US$ ${Movie.budget}`}
                </h6>
                <div className="flex flex-col gap-8 justify-center items-center">
                  <button
                    id="addButton"
                    onClick={() => {
                      addItem(Movie);
                      setButtonText("Movie added to movie list");
                    }}
                    className="flex items-center justify-center gap-2 text-white border 
                    py-2 font-bold hover:bg-[#0cb9f228] rounded-xl w-60 b-24
                    bg-slate-950 bg-opacity-60 border-[#0cb7f2] shadow-blue-shadow"
                  >
                    {buttonText}
                  </button>
                </div>
              </section>
            </div>
            <div className="flex mb-[1rem] text-center rounded-xl text-white text-[20px] w-[100%] max-w-[730px]">
              {Movie && Movie.overview}
            </div>
          </section>
        </main>
      </main>
    </>
  );
}
