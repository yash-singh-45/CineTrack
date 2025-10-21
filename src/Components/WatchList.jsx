import React from 'react'
import { useNavigate } from 'react-router-dom';
const WatchList = () => {

    const navigate = useNavigate();
    const watchList = JSON.parse(localStorage.getItem("watchlist")) || [] ;

    if (watchList.length===0) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F1117] text-white px-4">
      <svg
        className="w-24 h-24 text-gray-500 mb-6 animate-bounce"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h18v18H3V3z M9 9h6v6H9V9z"
        />
      </svg>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">Your WatchList is Empty</h2>
      <p className="text-gray-400 mb-6 text-center text-lg md:text-xl lg:text-2xl">
        Add movies to your WatchList and they’ll show up here. 🎬
      </p>
      <button
        onClick={() => window.location.href = '/'} // navigate to home or movies page
        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white text-base md:text-lg lg-text-xl rounded-full font-medium shadow-md transition"
      >
        Browse Movies
      </button>
    </div>
  );
}



  return (
   <div className="bg-[#0F1117] min-h-screen px-4 sm:px-10 py-8 text-white">

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
         WatchList
        </h2>
        <p className="text-gray-400">Showing {watchList.length} movies</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
        {watchList.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} navigate={navigate} />
        ))}
      </div>
    </div>
  )
}

export default WatchList

function MovieCard({ movie, navigate }) {

  function handleClick(e) {
    e.preventDefault();
    console.log(movie);
    navigate(`/page/${movie.media_type}/${encodeURIComponent(movie.imdbId)}`);

  }

  return (
    <div
      onClick={handleClick}
      className="bg-[#1A1C22] border border-cyan-500 rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-105 hover:border-2 md:hover:border-3 hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-square   object-cover"
        />
      </div>
      <div className="md:p-3 p-1">
        <p className="md:text-sm lg:text-lg text-xs font-semibold mb-1 truncate ">{movie.title}</p>
      </div>
    </div>
  );
}