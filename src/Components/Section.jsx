import React from 'react'
import { Navigate, useNavigate } from "react-router-dom";

const Section = ({ title, data }) => {

    if (!data || data.length === 0) return null; 

    return (
        <section className="px-8 py-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="md:text-2xl text-1xl font-bold">{title}</h2>
                {/* <button className="text-cyan-400">See All</button> */}
            </div>
            <div className="flex gap-5 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {data.map((item, index) => (
                    <MovieCard key={index} {...item} />
                ))}
            </div>
        </section>
    );
};


const MovieCard = ({ title, image, rating , imdbId, media_type}) => {
    const navigate = useNavigate();

    function handleViewDetails(e) {
        e.preventDefault();
        if(imdbId){
            navigate(`/page/${media_type}/${encodeURIComponent(imdbId)}`)
        }
        else
        navigate(`/page/${media_type}/${encodeURIComponent(title)}`);
    }

    return (
        <div onClick={handleViewDetails} className="cursor-pointer md:w-[180px] w-[110px] flex-shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 bg-gray-900 text-white">
            {/* Image with gradient overlay */}
            <div className="relative h-30 md:h-50 w-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Rating badge */}
                <span className="absolute top-2 right-2 bg-yellow-400 text-black md:text-sm text-xs font-bold px-2 py-1 rounded-md shadow">
                    ⭐ {rating}
                </span>
            </div>

            {/* Title */}
            <div className="p-3">
                <h3 className="text-sm md:text-xl font-semibold truncate">{title}</h3>
            </div>
        </div>
    );
};

export default Section