import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const filters = [
  'Popularity (desc)',
  'Type: Movies',
  'Genre: Animation',
  'Rating 7+',
];

const apikey = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchSection = () => {

  const [movieResults, setMovieResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  const query = new URLSearchParams(location.search).get("query");
  useEffect(() => {
    setMovieResults([])
    async function fetchMovies() {
      try {
        const movieRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${query}`);
        const movieData = await movieRes.json();

        const tvRes = await fetch(`${BASE_URL}/search/tv?api_key=${apikey}&query=${query}`);
        const tvData = await tvRes.json();

        // console.log(data);
        const moviesWithImdb = await Promise.all(
          movieData.results.filter(movie => movie.backdrop_path && movie.vote_average != 0).map(async (movie) => {
            try {
              const detailRes = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${apikey}`);
              const detailsData = await detailRes.json();

              return {
                title: movie.title || movie.name,
                image: movie.backdrop_path
                  ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                  : "/fallback-image.jpg",
                rating: movie.vote_average.toFixed(1),
                imdbId: detailsData.imdb_id || null,
                media_type: "movie",
              };
            } catch (err) {
              console.error("Failed to fetch movie details for:", movie.title, err);
              return {
                title: movie.title || movie.name,
                image: movie.backdrop_path
                  ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                  : "/fallback-image.jpg",
                rating: movie.vote_average.toFixed(1),
                imdbId: null,
              };
            }
          }));

          const tvsWithImdb = await Promise.all(
          tvData.results.filter(movie => movie.backdrop_path && movie.vote_average != 0).map(async (movie) => {
            try {
              const detailRes = await fetch(`${BASE_URL}/tv/${movie.id}/external_ids?api_key=${apikey}`);
              const detailsData = await detailRes.json();

              return {
                title: movie.title || movie.name,
                image: movie.backdrop_path
                  ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                  : "/fallback-image.jpg",
                rating: movie.vote_average.toFixed(1),
                imdbId: detailsData.imdb_id || null,
                media_type: "tv",
              };
            } catch (err) {
              console.error("Failed to fetch movie details for:", movie.title, err);
              return {
                title: movie.title || movie.name,
                image: movie.backdrop_path
                  ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                  : "/fallback-image.jpg",
                rating: movie.vote_average.toFixed(1),
                imdbId: null,
              };
            }
          }));

        setMovieResults([...moviesWithImdb, ...tvsWithImdb]);
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
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-1 py-1 md:px-2 md:py-1 rounded-md text-xs text-yellow-400 font-semibold">
          ⭐ {movie.rating}
        </div>
      </div>
      <div className="md:p-3 p-1">
        <p className="md:text-sm text-xs font-semibold mb-1 truncate ">{movie.title}</p>
      </div>
    </div>
  );
}


