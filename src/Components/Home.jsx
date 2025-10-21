import React from 'react';
import Navbar from './Navbar';
import Section from './Section';
import HeroSection from './HeroSection';
import { useEffect, useState } from 'react';
import TrendingMovies from './TrendingMovies';
import TopRatedTV from './TopRatedTV';
import TopRatedIndianTV from './TopRatedIndianTV';
import IndianMovies from './IndianMovies';
import Malayalam from './Malayalam';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [topRatedIndianTV, setTopRatedIndianTV] = useState([]);
    const apikey = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // or w780, w300 depending on size
    const BASE_URL = "https://api.themoviedb.org/3";
    const navigate = useNavigate();
    function handleViewWatchList() {
        navigate("/watchlist")
    }
    return (
        <div className="bg-[#0F1115] text-white min-h-screen font-sans">
            <Navbar />
            <HeroSection />
            <div className='md:px-10 px-2 my-3'>
                <button
                    onClick={handleViewWatchList}
                    className='
      px-4 md:px-6 py-2 text-sm md:text-2xl font-semibold text-white
      bg-gradient-to-r from-blue-500 to-purple-600 
      rounded-full 
      shadow-lg hover:shadow-xl 
      focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75
      transform transition-all duration-300 
      hover:scale-105 hover:-translate-y-1
      active:scale-95
      cursor-pointer
      flex items-center space-x-2
      content-center
    '
                >
                    <span>View WatchList</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
            <TrendingMovies />
            <IndianMovies />
            <Malayalam />
            <TopRatedTV />
            <TopRatedIndianTV />
        </div>
    );
};





export default Home;
