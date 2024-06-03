"use client";
import ParticlesComponent from "../particlesBackground";
import MovieCard from "../movieCard";
import { IoIosCloseCircle } from "react-icons/io";
import useLocalStorage from "../hooks/useLocalStorage";

export default function MovieList() {
  const { removeItem, storage } = useLocalStorage("movieList");

  return (
    <>
      <ParticlesComponent id="particles" />
      <div className="w-full md:w-screen flex justify-center items-center mt-[3%]">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-20 pb-6 pt-6 text-center">
          {storage.map((element) => (
            <div className="flex flex-col group relative" key={element.id}>
              <div className="absolute -right-3 lg:-right-4 xl:-right-3 -top-3 invisible group-hover:visible cursor-pointer">
                <IoIosCloseCircle
                  size={30}
                  color="red"
                  onClick={() => removeItem(element.id)}
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
