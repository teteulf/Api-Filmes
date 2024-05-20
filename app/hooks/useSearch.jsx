"use client";

import { createContext, useEffect, useContext, useState } from "react";
import useFetchMovies from "./hooks";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [value, setValue] = useState({ page: 1 });
  const [pageIntro, setPageIntro] = useState(true);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_SEARCH;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const searchUrl = `${apiUrl}/movie?query=${searchValue}&page=${value.page}&${apiKey}`;
        const data = await useFetchMovies(searchUrl);
        const movies = data.results;

        if (movies.length === 20) {
          const nextPageUrl = `${apiUrl}/movie?query=${searchValue}&page=${
            value.page + 1
          }&${apiKey}`;
          const nextPageMovies = await useFetchMovies(nextPageUrl);
          movies.push(nextPageMovies[0]);
        }

        setValue(data);
        console.log(value);
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useSearch = () => useContext(ThemeContext);
