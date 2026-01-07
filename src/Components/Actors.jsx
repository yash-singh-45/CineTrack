import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Actors = () => {
    const navigate = useNavigate();

    const omdbapi = import.meta.env.VITE_OMDB_API_KEY;
    const [overview, setOverview] = useState({});
    const [filmData, setFilmData] = useState([]);
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [totalFilms, setTotalFilms] = useState(0);
    const [sortBy, setSortBy] = useState("");

    const { name } = useParams();
    const aName = name;

    console.log("Name", aName)
    async function getOverview(name) {
        const encodeName = name;
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeName}`)
        const data = await res.json();

        console.log("data", data)

        const wikidataId = data.wikibase_item

        setOverview(data);

        if (!wikidataId || wikidataId.length == 0) return;

        const query = `
    SELECT ?filmLabel WHERE {
      ?film wdt:P161 wd:${wikidataId}.
      ?film wikibase:sitelinks ?sitelinks.
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    ORDER BY DESC(?sitelinks)
    LIMIT 60
    `;

        const wdUrl = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`;


        const wdRes = await fetch(wdUrl, {
            headers: {
                "Accept": "application/sparql+json"
            }
        });

        const wdData = await wdRes.json();

        setTotalFilms(wdData.results.bindings.length);
        const films = await Promise.all(
            wdData.results.bindings.slice(0, visibleCount).map(async (item) => {
                const title = item.filmLabel.value;

                try {
                    const omdbRes = await fetch(
                        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${omdbapi}`
                    );

                    const omdbData = await omdbRes.json();

                    return {
                        title: omdbData.Title || title,
                        actor: omdbData.Actors,
                        director: omdbData.Director,
                        genre: omdbData.Genre,
                        image: omdbData.Poster,
                        rating: omdbData.imdbRating,
                        imdbId: omdbData.imdbID || omdbData.imdbId,
                        votes: omdbData.imdbVotes
                            ? Number(omdbData.imdbVotes.replace(/,/g, ""))
                            : 0,
                        media_type: omdbData.Type,
                        year: omdbData.Year || omdbData.year
                    };
                }
                catch {
                    return {
                        title,
                        data: null
                    }
                }
            })
        )
        setFilmData(films);
    }

    const visibleCount = showAll ? totalFilms : 12;

    useEffect(() => {
        getOverview(aName);
    }, [aName, visibleCount])

    useEffect(() => {

        if (!filmData.length) return;

        const filtered = filmData.filter(movie => {
            if (!movie.actor || movie.actor === "N/A") return false;

            return movie.actor
                .split(',')
                .map(a => a.trim().toLowerCase())
                .includes(aName.toLowerCase());
        });

        setData(filtered);

    }, [filmData])


    function handleSortChange(e) {
        if (!data || data.length === 0) return;

        const value = e.target.value;
        setSortBy(value);

        let sorted = [...data];

        if (value === "rating") {
            sorted.sort((a, b) => b.rating - a.rating);
        }
        else if (value === "year") {
            sorted.sort((a, b) => b.year - a.year);
        }
        else if (value === "popularity") {
            sorted.sort((a, b) => b.votes - a.votes);
        }

        setData(sorted);
    }

    if (!overview || !data) return <p className=''>Loading Actors info.....</p>
    return (
        <div className='bg-[#0F1115] min-h-screen font-sans sm:p-2 lg:p-5 text-white overflow-hidden'>

            <div className='flex flex-col md:flex-row px-4 py-4 md:px-4 lg:px-10 md:py-5 mt-1 md:mt-2 gap-6 '>
                <div className='w-full md:w-1/3 flex justify-center md:justify-start'>
                    {
                        overview?.thumbnail?.source && (
                            <img src={overview.thumbnail.source} alt={overview.title} className=' border-2 rounded-full w-50 h-50 md:w-60 md:h-60 lg:w-80 lg:h-80 lg:border-3 ' />
                        )
                    }
                </div>

                <div className="w-full md:w-2/3 bg-[#1E1E23] shadow-2xl rounded-2xl p-3  md:px-8 flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {overview.title}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                        {overview.extract}
                    </p>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black opacity-20 pointer-events-none"></div>
                </div>
            </div>

            {/* 2nd Container */}
            <div className='mx-4 mt-5 md:mx-4 md:mt-15 lg:mx-10 lg:mt-20 bg-[#1E1E23] shadow-2xl rounded-2xl p-1.5 md:px-5 md:py-2'>
                <div className=' my-1 md:my-2 flex justify-between align-middle'>
                    <label className='text-2xl md:text-4xl font-bold' htmlFor="">Filmography</label>
                    <select value={sortBy} onChange={handleSortChange} className='pl-2 md:px-3 mr-1 md:mr-5 rounded-2xl text-sm md:text-base border-amber-50 border-1 bg-[#1E1E23] text-white hover:bg-[#0F1115]
    active:scale-95 cursor-pointer '>
                        <option value="" disabled >↑↓ Sort By </option>
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="year">Released Year</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 my-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                    {data.filter(movie => movie.rating != 0 && movie.image && movie.image != null).slice(0, visibleCount).map((movie) => (
                        <MovieCard key={movie.imdbId} movie={movie} navigate={navigate} />
                    ))}
                </div>

                {totalFilms >= visibleCount && (
                    <div className="flex justify-center mt-5 md:mt-8">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className=" px-4 py-1 text-sm md:text-base md:px-6 md:py-2 rounded-full  bg-cyan-500 text-black  font-semibold hover:bg-cyan-400 transition cursor-pointer"
                        >
                            {showAll && showAll == true ? "Show Less" : "Show More"}
                        </button>
                    </div>
                )
                }

            </div>

        </div>
    )
}

export default Actors


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
                    className="w-full aspect-square object-cover"
                />
            </div>
            <div className="md:p-3 p-1">
                <p className="md:text-sm text-xs font-semibold mb-1 truncate ">{movie.title}</p>
            </div>
        </div>
    );

}
