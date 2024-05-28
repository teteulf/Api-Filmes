"use client";

import MovieCard from "../movieCard";
import { useSearch } from "../hooks/useSearch";
import ParticlesComponent from "../particlesBackground";
import PageNavigation from "../navigation";

export default function SearchMovie() {
  const { value, setValue, inputText } = useSearch();

  const changePagePlusOne = () => {
    setValue((prevPage) => ({ ...prevPage, page: prevPage.page + 1 }));
    window.scrollTo(0, 0);
  };

  const changePageLessOne = () => {
    if (value.page > 1) {
      setValue((prevPage) => ({ ...prevPage, page: prevPage.page - 1 }));
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div>
        <ParticlesComponent />

        <h1 className="text-white flex items-center justify-center my-10 text-[15px] md:text-[30px]">
          {value && value.results.length > 0 ? (
            <>
              &quot;SHOWING RESULTS FOR &quot;
              <strong className="text-[#d9d246]">
                {inputText.current.value}
              </strong>
              &quot;&quot;
            </>
          ) : (
            "NO RESULTS FOUND..."
          )}
        </h1>

        <div className="w-full md:w-screen flex justify-center items-center pt-6">
          <div className="grid xl:grid-cols-3 md:grid-cols-2 text-center gap-20">
            {value && value.results.length > 0
              ? value.results.map((element) =>
                  element ? (
                    <div key={element.id}>
                      <MovieCard element={element} />
                    </div>
                  ) : null
                )
              : null}
          </div>
        </div>

        {value && value.results.length > 0 && (
          <PageNavigation
            currentPage={value.page}
            changePagePlusOne={changePagePlusOne}
            changePageLessOne={changePageLessOne}
            total_pages={value.total_pages}
          />
        )}
      </div>
    </>
  );
}
