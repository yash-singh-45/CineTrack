import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
export default function MoviePage() {
  const [userRating, setUserRating] = useState(0);
  const { media, imdbId } = useParams(); // get movie name from URL
  console.log(`media is ${media}`);

  const [movie, setMovie] = useState(null);
  const apikey = import.meta.env.VITE_OMDB_API_KEY;
  const [trailerKey, setTrailerKey] = useState(""); // YouTube video key
  const [inWatchlist, setInWatchlist] = useState(false);


  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&type=${media}&apikey=${apikey}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        const mappedMovie = {
          title: data.Title,
          poster: data.Poster,
          year: data.Year,
          runtime: data.Runtime,
          genres: data.Genre.split(", "),
          synopsis: data.Plot,
          rating: data.imdbRating,
          cast: data.Actors.split(", ").map((name) => ({
            name,
            img: "/placeholder.jpg", // OMDb has no actor images
          })),
          gallery: [data.Poster],
          details: {
            director: data.Director,
            writers: data.Writer,
            budget: "N/A", // OMDb does not provide
            
          },
          imdbId:imdbId,
          media_type: media,
        };
        setMovie(mappedMovie);
      } else {
        setMovie({ Response: "False" });
      }
    }
    fetchMovie();


    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [] ;
    
    const exists  = watchlist.find((m) => m.imdbId === imdbId);

    if(exists){
      setInWatchlist(true);
    }

  }, [imdbId]);

  if (!movie) return <p className="text-white">Loading...</p>;
  if (movie.Response === "False") return <p className="text-red-500">Movie not found</p>;

  const handleWatchTrailer = () => {
    toast.error("Failed to fetch trailer");
  };

  function handleAddToWatchlist(){
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.find((m) => m.imdbId === movie.imdbId);
    if (exists) {
      toast.error("Movie already in Watchlist");
      return;
    }

    localStorage.setItem("watchlist", JSON.stringify([...watchlist, movie]));

    setInWatchlist(true);
    toast.success("Added to Watchlist 🎬");
  }

  function handleRemoveFromWatchlist(){
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if(watchlist.length === 0){
      toast.error("Watchlist is empty");
      return;
    }

    const newWatchlist = watchlist.filter((m) => m.imdbId !== movie.imdbId);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));

    setInWatchlist(false);
    toast.success("Removed from Watchlist");
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-7xl">
        {/* TOP CARD */}
        <div className="relative bg-[#141518] rounded-2xl p-5 md:p-8 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 rounded-2xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-6 z-10">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-44 hover:scale-110 transition duration-300 md:w-52 lg:w-56 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover  block"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">{movie.title}</h1>
              <p className="text-gray-300 mt-1">{movie.tagline}</p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="text-sm md:text-base lg:text-lg text-gray-400">{movie.year}</span>
                <span className="text-sm md:text-base lg:text-lg text-gray-400">•</span>
                <span className="text-sm md:text-base lg:text-lg text-gray-400">{movie.runtime}</span>

                <div className="flex gap-2 ml-2">
                  {movie.genres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 rounded-full bg-green-500/80 text-xs md:text-sm lg:text-base font-medium"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-3 text-sm md:text-sm lg:text-lg md:ml-5">
                  <button onClick={handleWatchTrailer} className=" md:px-4 md:py-2 px-3 py-2 bg-teal-500/95 rounded-full font-medium shadow-md hover:scale-[1.01] transition">
                    ▶ Watch Trailer
                  </button>
                
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-3 text-sm md:text-sm lg:text-lg md:ml-5">
                  <button
                    onClick={inWatchlist?handleRemoveFromWatchlist :handleAddToWatchlist}
                    className="md:px-4 md:py-2 px-3 py-2 bg-transparent border border-teal-400 text-teal-400 rounded-full font-medium shadow-md hover:bg-teal-500/20 transition"
                  >
                    { inWatchlist? "❌ Remove from Watchlist" : "➕ Add to Watchlist"}
                  </button>
                </div>
              </div>


              {/* Controls */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0D0D0F] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm md:text-base lg:text-xl font-semibold text-gray-200">Synopsis</h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-400 mt-2">{movie.synopsis}</p>
                </div>

                {/* <div className="bg-[#0D0D0F] rounded-lg p-4 border border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-200">Your Rating</h3>

                   <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={() => setUserRating(s)}
                        className={`p-1 rounded ${userRating >= s ? "text-yellow-400" : "text-gray-600"}`}
                        aria-label={`Rate ${s}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <button className="mt-3 px-3 py-2 bg-teal-500/95 rounded-full text-sm">
                    Write a Review
                  </button> 
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* CAST, REVIEWS, DETAILS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {/* CAST */}
            <div className="bg-[#141518] rounded-xl p-4 border border-gray-800">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-3">Cast</h3>
              <div className="flex gap-5 md:gap-10 overflow-x-auto pb-2">
                {movie.cast.map((c) => (
                  <div key={c.name} className="flex-shrink-0 w-20 text-center">
                    <p className="text-xs md:text-sm lg:text-base mt-2 text-gray-300">{c.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div className="bg-[#141518] rounded-xl p-4 border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">User Reviews & Ratings</h3>
              <div className="flex items-center gap-4">
                <div className="flex flex-row gap-4 items-center ">
                  <div className="text-4xl font-bold text-yellow-400">{movie.rating}</div>
                  <div className="text-sm md:text-xl -ml-3">⭐</div>
                  <div className="text-xs md:text-sm lg:text-lg text-gray-400">Average Rating</div>
                </div>
                {/* <div className="text-sm text-gray-400">
                  <p>Snapshots of user reviews will appear here. Add the review component or list as needed.</p>
                </div> */}
              </div>
            </div>

            {/* MORE LIKE THIS */}
            <div className="bg-[#141518] rounded-xl p-4 border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">More Like This</h3>
              <div className="flex gap-3 overflow-x-auto">
                {movie.gallery.map((g, i) => (
                  <div key={i} className="w-36 h-20 rounded-lg overflow-hidden">
                    <img src={g} alt={`gallery-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-4">
            <div className="bg-[#141518] rounded-xl p-4 border border-gray-800">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Details</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-300">Director: {movie.details.director}</p>
              <p className="text-sm md:text-base lg:text-lg text-gray-300">Writers: {movie.details.writers}</p>
              <p className="text-sm md:text-base lg:text-lg text-gray-300">Budget: {movie.details.budget}</p>
            </div>

            {/* <div className="bg-[#141518] rounded-xl p-4 border border-gray-800 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="/user.jpg" alt="user" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-sm text-gray-300">
                <div className="font-medium">No rating yet</div>
                <div className="text-xs text-gray-500">Sign in to add your rating and review</div>
              </div>
            </div> */}
          </aside>
        </div>

        <div className="h-12" />
      </div>
      {trailerKey && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-3xl bg-gray-900 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="400"
              src={trailerKey}
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
