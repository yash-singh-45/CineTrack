import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlockCard = ({ heroMovies }) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!heroMovies || heroMovies.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroMovies.length);
        }, 5000);

        return () => clearInterval(interval); // cleanup on unmount
    }, [heroMovies]);
    if (!heroMovies || heroMovies.length === 0) {
        return (
            <section className="relative px-8 py-8">
                <p className="text-white text-center">Loading movies...</p>
            </section>
        );
    }

    function handleViewDetails() {
        const currentMovie = heroMovies[current];
        navigate(`/page/${currentMovie.media_type}/${encodeURIComponent(currentMovie.imdbId)}`);
    }

    return (
        <section className="relative px-8 py-8" >
            <div className="rounded-lg overflow-hidden relative">
                <img src={heroMovies[current].image}
                    alt={heroMovies[current].title} className="w-full  overflow-hidden min-h-50 max-h-200 aspect-video object-cover opacity-70" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-0.5 md:gap-1.5 justify-end p-8 bg-gradient-to-t from-black via-transparent">
                    <h2 className="md:text-5xl text-2xl font-bold md:mb-2 mb-1">{heroMovies[current].title}</h2>
                    {/* <p className="text-lg mb-4">{heroMovies[current].desc}</p> */}
                    {/* <div className="flex flex-wrap items-center gap-1.5 md:gap-3"> */}
                        {/* <button className="bg-cyan-500 cursor-pointer text-sm md:text-2xl px-2 py-1 md:px-4 md:py-2 rounded-full font-semibold">▶ Watch Trailer</button> */}
                        {/* <button onClick={handleViewDetails}
                            className="bg-white cursor-pointer text-black md:text-2xl text-sm px-2 py-1 md:px-4 md:py-2 rounded-full font-semibold">View Details</button>
                        <span className="bg-cyan-700 cursor-pointer md:px-3 md:py-2  px-2 py-1 font-semibold rounded-full md:text-2xl text-sm">{heroMovies[current].genre}</span> */}
                        {/* <a  className="bg-yellow-400 cursor-pointer text-black px-2 py-1 md:px-3 md:py-2 rounded-full text-sm">IMDb</a> */}
                    {/* </div> */}
                </div>
            </div>
        </section >
    )
}


export default BlockCard
