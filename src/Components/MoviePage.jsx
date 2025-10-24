import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MoviePage() {
  const apikey = import.meta.env.VITE_OMDB_API_KEY;
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const { media, imdbId } = useParams(); // get movie name from URL

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(""); // YouTube video key
  const [inWatchlist, setInWatchlist] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  async function getSimilarMoviesGemini(movieTitle, media) {
    const prompt = `Suggest 6 ${media === 'movie' ? 'movies' : 'web series'} similar to "${movieTitle}".
- They should match the genre of "${movieTitle}"
- Prefer movies from the same country/language (e.g., Indian movies if "${movieTitle}" is Indian)
Return only in JSON:
[
  { "title": "", "imdbId": "" }
]`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await res.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // Strip Markdown code fences if present
    text = text.replace(/```json\s*|```/g, "").trim();

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response:", text);
      return [];
    }
  }



  async function fetchMovieDetailsFromOMDb(title, media = 'movie') {
    const res = await fetch(`https://www.omdbapi.com/?t=${title}&type=${media}&apikey=${apikey}`);
    const data = await res.json();
    return data;
  }


  async function getDetailedSimilarMovies(movieTitle, media = 'movie') {
    const baseList = await getSimilarMoviesGemini(movieTitle, media);
    const detailed = await Promise.all(
      baseList.map(async (m) => {
        const title = m.title || m.Title;
        const details = await fetchMovieDetailsFromOMDb(title, media);

        return {
          Title: details.Title || title,
          Poster: details.Poster,
          imdbRating: details.imdbRating || "N/A",
          imdbId: m.imdbId || details.imdbID,
          Type: details.Type ? details.Type.toLowerCase() : 'movie',
        };
      })
    );

    return detailed;
  }



  useEffect(() => {
    setSimilarMovies([]);

    async function fetchMovie() {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${encodeURIComponent(imdbId)}&type=${media}&apikey=${apikey}`
      );
      const data = await res.json();
      console.log(data);
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
          imdbId: data.imdbId || data.imdbID,
          media_type: data.media || data.Type || data.Media,
        };
        setMovie(mappedMovie);

        async function loadMoreLikeThis() {

          try {
            const title = data.Title || data.title;
            const media = data.media || data.Type || data.Media;
            console.log(`Fetching similar ${media} for:`, title);
            const recs = await getDetailedSimilarMovies(title, media);
            console.log(`Similar Movies for ${title}:`, recs);
            setSimilarMovies(recs);
          } catch (e) {
            console.error("Error fetching similar movies:", e);
          }
        }
        loadMoreLikeThis();


      } else {
        setMovie({ Response: "False" });
      }
    }
    fetchMovie();


    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.find((m) => m.imdbId === imdbId);

    if (exists) {
      setInWatchlist(true);
    }



  }, [imdbId]);

  if (!movie) return <p className="text-white">Loading...</p>;
  if (movie.Response === "False") return <p className="text-red-500">Movie not found</p>;

  async function handleWatchTrailer(){
    console.log("Fetching trailer for:", movie.title, movie.media_type);
    const prompt = `Provide the **exact YouTube URL** of the **official trailer** of "Movie Name" from the official studio channel or verified source.
Return **only the URL**, do not add any extra text.
Movie Name: "${movie.title}"
Media Type: "${movie.media_type || 'movie'}"`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        })
      }
    );

     const data = await res.json();
  let url = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Clean the output
  url = url.trim().replace(/["']/g, "");
  console.log("Trailer URL from Gemini:", url);


  if (url.startsWith("https://")) {
    setTrailerKey(url.replace("watch?v=", "embed/")); // convert YouTube URL to embed
  } else {
    toast.error("Trailer not found");
  }

  };

  function handleAddToWatchlist() {
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

  function handleRemoveFromWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (watchlist.length === 0) {
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
                  <button onClick={handleWatchTrailer} className=" cursor-pointer md:px-4 md:py-2 px-3 py-2 bg-teal-500/95 rounded-full font-medium shadow-md hover:scale-[1.01] transition">
                    ▶ Watch Trailer
                  </button>

                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-3 text-sm md:text-sm lg:text-lg md:ml-5">
                  <button
                    onClick={inWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
                    className="md:px-4 md:py-2 px-3 py-2 bg-transparent border border-teal-400 text-teal-400 rounded-full font-medium shadow-md hover:bg-teal-500/20 transition"
                  >
                    {inWatchlist ? "❌ Remove from Watchlist" : "➕ Add to Watchlist"}
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
              <Section data={similarMovies} />
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

const Section = ({ data }) => {

  if (!data || data.length === 0) return (
    <div className="flex flex-col items-center justify-center m-4 p-4 min-h-[200px]">

      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-bounce mb-4"></div>

      <p className="text-center lg:text-2xl md:text-xl text-lg font-medium text-gray-700 animate-pulse">
        Loading Similar Movies...
      </p>

    </div>
  );



  return (
    <section className="md:px-8 md:py-6 px-2 py-4">
      <div className="flex justify-between items-center mb-4">
        {/* <button className="text-cyan-400">See All</button> */}
      </div>
      <div className="flex gap-5 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {data.filter(movie => movie.Poster && movie.Poster !== "N/A").map((item, index) => (
          <MovieCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};


const MovieCard = ({ Title, Poster, imdbRating, imdbId, Type }) => {
  const navigate = useNavigate();

  function handleViewDetails(e) {
    e.preventDefault();
    if (imdbId) {
      navigate(`/page/${Type}/${encodeURIComponent(imdbId)}`)
    }
    else
      navigate(`/page/${Type}/${encodeURIComponent(Title)}`);
  }

  return (
    <div onClick={handleViewDetails} className="cursor-pointer md:w-[180px] w-[110px] flex-shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gray-900 text-white">
      {/* Image with gradient overlay */}
      <div className="relative h-30 md:h-50 w-full">
        <img
          src={Poster}
          alt={Title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Rating badge */}
        <span className="absolute top-2 right-2 bg-yellow-400 text-black md:text-sm text-xs font-bold px-2 py-1 rounded-md shadow">
          ⭐ {imdbRating}
        </span>
      </div>

      {/* Title */}
      <div className="p-3">
        <h3 className="text-sm md:text-xl font-semibold truncate">{Title}</h3>
      </div>
    </div>
  );
};
