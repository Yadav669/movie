import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [allMoviesData, setAllMoviesData] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchMovie}&apikey=5b87bc76`
      );

      const data = await res.json();

      // Check if data.Search is an array before updating state
      if (Array.isArray(data.Search)) {
        setAllMoviesData(data.Search);
        setLoading(false);
      } else {
        setAllMoviesData([]); // Set an empty array if no data is received
        setLoading(false);
      }

      console.log(data.Search);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [searchMovie]); // Trigger fetchMovieData when searchMovie changes

  return (
    <div>
      <Navbar />
      <div className="bg">
        <SearchBar
          searchMovie={searchMovie}
          setSearchMovie={setSearchMovie}
          fetchMovieData={fetchMovieData}
        />
        <MovieCard allMoviesData={allMoviesData} loading={loading} />
      </div>
    </div>
  );
}
