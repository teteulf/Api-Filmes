"use client";

import { createContext, useEffect, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIntro, setPageIntro] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_SEARCH;

  const getSearchMovie = async (url) => {
    const getMovie = await fetch(url);
    const data = await getMovie.json();
    return data.results;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const searchUrl = `${apiUrl}/movie?query=${searchValue}&page=${currentPage}&${apiKey}`;
        let movies = await getSearchMovie(searchUrl);

        if (movies.length === 20) {
          const nextPageUrl = `${apiUrl}/movie?query=${searchValue}&page=${
            currentPage + 1
          }&${apiKey}`;
          const nextPageMovies = await getSearchMovie(nextPageUrl);
          movies = [...movies, ...nextPageMovies.slice(0, 1)];
        }

        setValue(movies);
        setHasNextPage(movies.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [searchValue, currentPage]);

  return (
    <ThemeContext.Provider
      value={{
        searchValue,
        setSearchValue,
        value,
        currentPage,
        setCurrentPage,
        pageIntro,
        setPageIntro,
        hasNextPage,
        setHasNextPage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useSearch = () => useContext(ThemeContext);
