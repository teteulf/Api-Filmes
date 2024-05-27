"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import MovieCard from "./movieCard";
import ParticlesComponent from "./particlesBackground";
import PageNavigation from "./navigation";
import { useSearch } from "./hooks/useSearch";

export default function Home() {
  const [hypeMovies, setHypeMovies] = useState({ page: 1 });
  const { pageIntro, setPageIntro } = useSearch();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const FetchMovies = useCallback(async () => {
    try {
      const fetchPage = `${apiUrl}now_playing?page=${hypeMovies.page}&${apiKey}`;
      const res = await fetch(fetchPage);
      const data = await res.json();

      if (window.innerWidth > 768) {
        if (data.results.length === 20) {
          const nextPage = `${apiUrl}now_playing?page=${
            hypeMovies.page + 1
          }&${apiKey}`;
          const res = await fetch(nextPage);
          const nextPageData = await res.json();
          data.results.push(nextPageData.results[0]);
        }
      }

      setHypeMovies(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [hypeMovies.page, apiUrl, apiKey]);

  useEffect(() => {
    FetchMovies();
  }, [FetchMovies]);

  const handleIntroDismiss = () => {
    setPageIntro(false);
  };

  const changePagePlusOne = () => {
    setHypeMovies((prevPage) => ({ ...prevPage, page: prevPage.page + 1 }));
  };

  const changePageLessOne = () => {
    if (hypeMovies.page > 1) {
      setHypeMovies((prevPage) => ({ ...prevPage, page: prevPage.page - 1 }));
    }
  };

  return (
    <>
      <ParticlesComponent />
      {pageIntro ? (
        <main className="w-full h-screen flex items-center justify-center md:-mt-[3%] text-white">
          <div
            className="relative flex items-center justify-center bg-gray-950 w-[90%] 
           md:w-[50%] h-[70%] md:h-[70%] rounded-[10px] p-6 border border-[#0cb7f2]"
          >
            <div className=" flex flex-col justify-center items-center -top-16">
              <div className="flex flex-col justify-center items-center gap-0 md:gap-4">
                <div className="absolute right-0 top-0 transform transition-transform duration-300 hover:rotate-90 cursor-pointer">
                  <IoMdClose size={30} onClick={handleIntroDismiss} />
                </div>
                <h1 className="absolute top-0 text-[30px] font-bold">
                  Welcome to my APP
                </h1>
                <div className="absolute top-10 min-h-500:top-16 flex items-center gap-6">
                  <a
                    href="https://wa.me/5511975231490"
                    className="cursor-pointer hover:animate-bounce"
                    target="blank"
                  >
                    <FaWhatsapp />
                  </a>
                  <a className="cursor-pointer hover:animate-bounce">
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="https://github.com/teteulf"
                    className="cursor-pointer hover:animate-bounce"
                    target="blank"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
              <p className=" h-full text-center ">
                &quot;This is a website created by Theo Vargas Lefèvre, web
                developer. The purpose of creating this App is to put into
                practice the knowledge adquired from my studies. Here I used the
                MovieDB API&quot;
                <a
                  className="text-blue-500 underline hover:text-blue-700 ml-2"
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.themoviedb.org/
                </a>
                . <br />
                You can check the code used to create this app on my github, by
                clicking on the icons up there&apos;
              </p>
            </div>
            <button
              className="absolute w-[200px] hover:bg-[#88842e] transition duration-500 bottom-4 p-2 rounded-xl bg-[#d9d246] text-black invisible min-h-500:visible"
              onClick={handleIntroDismiss}
            >
              <strong>Got it</strong>
            </button>
          </div>
        </main>
      ) : (
        <>
          <h1 className="text-white flex items-center justify-center my-10 text-[15px] md:text-[30px]">
            SHOWING &quot;
            <strong className="text-[rgb(217,210,70)]">
              CURRENTLY MOVIES ON STREAM
            </strong>
            &quot;
          </h1>
          <div className="flex justify-center items-center pt-6">
            <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-20 text-center">
              {!hypeMovies?.results ? (
                <div className="w-screen h-screen flex justify-center items-center -mt-[45px]">
                  <AiOutlineLoading3Quarters
                    size={150}
                    color="white"
                    className="animate-spin"
                  />
                </div>
              ) : (
                hypeMovies.results.map((element) => (
                  <div key={element.id}>
                    <MovieCard element={element} />
                  </div>
                ))
              )}
            </div>
          </div>
          <PageNavigation
            currentPage={hypeMovies.page}
            changePagePlusOne={changePagePlusOne}
            changePageLessOne={changePageLessOne}
            total_pages={hypeMovies.total_pages}
          />
        </>
      )}
    </>
  );
}
