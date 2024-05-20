"use client";

import MovieCard from "../movieCard";
import { useSearch } from "../hooks/useSearch";
import ParticlesComponent from "../particlesBackground";
import PageNavigation from "../navigation";

export default function SearchMovie() {
  const { value, setValue } = useSearch();

  const inputValue = document.querySelector("#search");
  const textInput = inputValue.value;

  const changePagePlusOne = () => {
    setValue((prevPage) => ({ ...prevPage, page: ++prevPage.page }));
  };

  const changePageLessOne = () => {
    if (value > 1) {
      setValue((prevPage) => ({ ...prevPage, page: --prevPage.page }));
    }
  };

  return (
    <>
      <div>
        <ParticlesComponent />
        <h1 className="text-white flex items-center justify-center my-10 text-[30px]">
          SHOWING RESULTS FOR "
          <strong className="text-[#d9d246]">{textInput}</strong>"
        </h1>
        <div className="w-full md:w-screen flex justify-center items-center pt-6">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-center gap-20">
            {value && value.results.length > 0 ? (
              value.results.map((element) => (
                <div key={element.id} className="">
                  <MovieCard element={element} />
                </div>
              ))
            ) : (
              <div className="fixed text-[40px] text-white">Loading ...</div>
            )}
          </div>
        </div>
      </div>
      <PageNavigation
        currentPage={value.page}
        changePagePlusOne={changePagePlusOne}
        changePageLessOne={changePageLessOne}
        total_pages={value.results}
      />
    </>
  );
}
