"use client";

import { createContext, useEffect, useContext, useState, useRef } from "react";
import useFetchMovies from "./hooks";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const inputText = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [value, setValue] = useState({ page: 1, results: [] });
  const [pageIntro, setPageIntro] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_SEARCH;

  useEffect(() => {
    setPrevSearchValue(searchValue);

    const fetchMovies = async () => {
      try {
        const searchUrl = `${apiUrl}/movie?query=${searchValue}&page=${value.page}&${apiKey}`;
        const data = await useFetchMovies(searchUrl);
        const movies = data.results;

        if (movies.length === 20) {
          const nextPageUrl = `${apiUrl}/movie?query=${searchValue}&page=${
            value.page + 1
          }&${apiKey}`;
          const nextPageData = await useFetchMovies(nextPageUrl);
          const nextPageMovies = nextPageData.results;

          if (nextPageMovies.length > 0) {
            movies.push(nextPageMovies[0]);
          }
        }

        if (searchValue !== prevSearchValue) {
          setValue({ page: 1, results: movies });
        } else {
          setValue({ ...data, results: movies });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, [searchValue, value.page]);
  return (
    <ThemeContext.Provider
      value={{
        searchValue,
        setSearchValue,
        value,
        setValue,
        pageIntro,
        setPageIntro,
        inputText,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useSearch = () => useContext(ThemeContext);
