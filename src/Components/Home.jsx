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
   
    return (
        <div className="bg-[#0F1115] text-white min-h-screen font-sans">
            <Navbar />
            <HeroSection />
            <TrendingMovies />
            <IndianMovies />
            <Malayalam />
            <TopRatedTV />
            <TopRatedIndianTV />
        </div>
    );
};

export default Home;

