import React, { useState } from "react";

export default function Trailer() {
  const [trailerKey, setTrailerKey] = useState("");

  const handleWatchTrailer = () => {
    setTrailerKey("dQw4w9WgXcQ"); // replace with actual key from TMDB
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <button
        className="bg-teal-400 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-teal-500 transition-colors"
        onClick={handleWatchTrailer}
      >
        Watch Trailer
      </button>

      {trailerKey && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-500"
              onClick={() => setTrailerKey("")}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
