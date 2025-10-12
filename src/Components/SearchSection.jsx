import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const apikey = import.meta.env.VITE_OMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchSection = () => {

  const [movieResults, setMovieResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  const query = new URLSearchParams(location.search).get("query");
  useEffect(() => {
    setMovieResults([]);

    if (!query)
      return;


    async function fetchMovies() {
      try {
        const movieRes = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apikey}`);
        const movieData = await movieRes.json();
        // console.log(movieData);

        const tvRes = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=series&apikey=${apikey}`);
        const tvData = await tvRes.json();
        // console.log(tvData);

        const formatData = (data, type) => {
          if (!data || data.Response === "False") return [];
          return data.Search.map(item => ({
            title: item.Title,
            image: item.Poster !== "N/A" ? item.Poster : "/fallback-image.jpg",
            rating: "N/A", // Optional: fetch details if you want IMDb rating
            imdbId: item.imdbID,
            media_type: type,
          }));
        };

        setMovieResults([
          ...formatData(movieData, "movie"),
          ...formatData(tvData, "tv")
        ]);
      }
      catch (e) {
        console.log(e);
      }
    }
    fetchMovies();
  }, [query])


  return (
    <div className="bg-[#0F1117] min-h-screen px-4 sm:px-10 py-8 text-white">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Results for <span className="text-[#00FFD1]">{query}</span>
        </h2>
        <p className="text-gray-400">Showing {movieResults.length} results</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movieResults.filter(movie => movie.rating != 0).map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

export default SearchSection;

function MovieCard({ movie, navigate }) {

  function handleClick(e) {
    e.preventDefault();
    navigate(`/page/${movie.media_type}/${encodeURIComponent(movie.imdbId)}`);

  }

  return (
    <div
      onClick={handleClick}
      className="bg-[#1A1C22] border border-cyan-500 rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 hover:border-2 md:hover:border-3 hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full aspect-square   object-cover"
        />
      </div>
      <div className="md:p-3 p-1">
        <p className="md:text-sm text-xs font-semibold mb-1 truncate ">{movie.title}</p>
      </div>
    </div>
  );
}


