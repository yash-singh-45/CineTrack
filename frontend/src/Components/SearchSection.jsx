import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const apikey = import.meta.env.VITE_OMDB_API_KEY;

const SearchSection = () => {

  const [movieResults, setMovieResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const storage_key = 'search_history';
  const max_items = 7;
  const query = new URLSearchParams(location.search).get("query");

  const normalizedQuery = query ? query.trim().toLowerCase() : "";


  const getSearchHistory = () => {
    const data = localStorage.getItem(storage_key);
    return data ? JSON.parse(data) : [];
  };

  const saveSearch = (query, results) => {
    let history = getSearchHistory();

    history = history.filter(item => item.query != query);

    history.unshift({
      query,
      results,
      timestamp: Date.now() / 1000
    });

    history = history.slice(0, max_items);

    localStorage.setItem(storage_key, JSON.stringify(history));
  }

  const getCacheSearched = (query) => {
    const history = getSearchHistory();
    const data = history.find(item => item.query === query)
    if (!data) return null;

    const currTime = Date.now() / 1000;
    if (currTime - data.timestamp <= 21600) return data;
    else return null;
  }


  useEffect(() => {

    if (!query)
      return;

    const cached = getCacheSearched(normalizedQuery);
    if (cached) {
      setMovieResults(cached.results);
      return;
    }

    async function fetchMovies() {

      try {
        setLoading(true);
        const movieRes = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apikey}`);
        const movieData = await movieRes.json();

        const tvRes = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=series&apikey=${apikey}`);
        const tvData = await tvRes.json();

        const formatData = (data, type) => {
          if (!data || data.Response === "False") return [];
          return data.Search.filter(item => item.Poster && item.Poster != "N/A").map(item => ({
            title: item.Title,
            image: item.Poster !== "N/A" ? item.Poster : "/fallback-image.jpg",
            rating: "N/A", // Optional: fetch details if you want IMDb rating
            imdbId: item.imdbID,
            media_type: type,
          }));
        };

        const finalResults = [
          ...formatData(movieData, "movie"),
          ...formatData(tvData, "tv"),
        ];

        setMovieResults(finalResults);
        saveSearch(normalizedQuery, finalResults);
      }
      catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [normalizedQuery])


  return (
    <div className="bg-[#0F1117] min-h-screen px-4 sm:px-10 py-8 text-white">
      {loading ? <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Searching for <span className="text-[#00FFD1]">{query}</span>
        </h2>
      </div> :
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Results for <span className="text-[#00FFD1]">{query}</span>
            </h2>
            <p className="text-gray-400"> {movieResults.length == 0 ? "No Results" : `Showing ${movieResults.length} results`} </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
            {movieResults.filter(movie => movie.rating != 0).map((movie) => (
              <MovieCard key={movie.imdbId} movie={movie} navigate={navigate} />
            ))}
          </div>
        </>
      }
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



