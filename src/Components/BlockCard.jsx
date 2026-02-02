import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BlockCard = ({ heroMovies }) => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    const intervalRef = React.useRef(null);
    const startX = React.useRef(0);
    const isSwiping = React.useRef(false);


    const startAutoPlay = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % heroMovies.length);
        }, 5000);
    };

    useEffect(() => {
        if (!heroMovies?.length) return;
        startAutoPlay();
        return () => clearInterval(intervalRef.current);
    }, [heroMovies]);



    const nextSlide = () => {
        setCurrent(prev => (prev + 1) % heroMovies.length);
    };

    const prevSlide = () => {
        setCurrent(prev =>
            prev === 0 ? heroMovies.length - 1 : prev - 1
        );
    };


    const pause = () => clearInterval(intervalRef.current);

    const resume = () => {
        startAutoPlay();
    }


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

    const handleTouchStart = (e) => {
        pause();
        startX.current = e.touches[0].clientX;
        isSwiping.current = false;
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX.current - endX;

        if (Math.abs(diff) < 50) {
            resume();
            return;
        }
        isSwiping.current = true;


        if (diff > 0) nextSlide();
        else prevSlide();

        resume();
    };

    return (
        <section className="relative md:px-8 md:py-8 px-2 py-2" >
            <div
                className="rounded-lg overflow-hidden relative cursor-pointer"
                onMouseEnter={pause}
                onMouseLeave={resume}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}

                onClick={() => {
                    if (isSwiping.current) {
                        isSwiping.current = false;
                        return;
                    }
                    handleViewDetails();
                }}>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                    }}
                    className="absolute left-0.5 md:left-2 top-1/2 -translate-y-1/2 z-10
             h-12 w-8 md:h-14 md:w-10 rounded-full bg-black/40 backdrop-blur-md
             flex items-center justify-center text-white
             hover:bg-black/70 transition cursor-pointer "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 opacity-90" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                    }}
                    className="absolute right-0.5 md:right-2 top-1/2 -translate-y-1/2 z-10
             h-12 w-8 md:h-14 md:w-10 rounded-full bg-black/40 backdrop-blur-md
             flex items-center justify-center text-white
             hover:bg-black/70 transition cursor-pointer "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-5 w-5 md:h-6 md:w-6 opacity-90" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>


                <img src={heroMovies[current].image}
                    alt={heroMovies[current].title} className="w-full  overflow-hidden min-h-50 max-h-200 aspect-video object-cover opacity-70" />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-0.5 md:gap-1.5 justify-end p-8 bg-gradient-to-t from-black via-transparent">
                    <h2 className="md:text-5xl text-2xl font-bold md:mb-2 mb-1">{heroMovies[current].title}</h2>
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-3">
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroMovies.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrent(i);
                                startAutoPlay();
                            }}
                            className={` w-1 h-1 md:w-2 md:h-2 rounded-full ${i === current ? 'bg-white' : 'bg-white/40'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section >
    )
}

export default BlockCard
