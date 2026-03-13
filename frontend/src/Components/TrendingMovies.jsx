import React from 'react'
import { useState, useEffect } from 'react';
import Section from './Section';
const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([
        {
            "title": "Avatar: The Way of Water",
            "image": "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            "rating": "7.7",
            "imdbId": "tt1630029",
            "media_type": "movie"
        },
        {
            "title": "Black Panther: Wakanda Forever",
            "image": "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            "rating": "7.3",
            "imdbId": "tt9114286",
            "media_type": "movie"
        },
        {
            "title": "Kantara Chapter 1",
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRyNtQ_bFXIC83-dgByWXV5yZVJVDKgNXM8M1FF7FeVUF5sgdX3xv1zieGHKdPiGplSIhaazw",
            "rating": "8.5",
            "imdbId": "tt26439764",
            "media_type": "movie",
            "language": "Kannada/Hindi"
        },
        {
            "title": "Gangubai Kathiawadi",
            "image": "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p18058864_p_v8_ab.jpg",
            "rating": "7.2",
            "imdbId": "tt11354016",
            "media_type": "movie",
            "language": "Hindi"
        },
        {
            "title": "The Batman",
            "image": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
            "rating": "7.9",
            "imdbId": "tt1877830",
            "media_type": "movie"
        },
        {
            "title": "Top Gun: Maverick",
            "image": "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            "rating": "8.4",
            "imdbId": "tt1745960",
            "media_type": "movie"
        },
        {
            "title": "Spider-Man: No Way Home",
            "image": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
            "rating": "8.2",
            "imdbId": "tt10872600",
            "media_type": "movie"
        },
        {
            "title": "Doctor Strange in the Multiverse of Madness",
            "image": "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
            "rating": "7.0",
            "imdbId": "tt9419884",
            "media_type": "movie"
        },
        {
            "title": "Jurassic World Dominion",
            "image": "https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
            "rating": "6.5",
            "imdbId": "tt8041270",
            "media_type": "movie"
        },
        {
            "title": "The Flash",
            "image": "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
            "rating": "6.3",
            "imdbId": "tt0439572",
            "media_type": "movie"
        }
    ]);
    const apikey = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/trending/movie/day?api_key=${apikey}`
                );
                const data = await res.json();
                // console.log(data);
                const moviesWithImdb = await Promise.all(
                    data.results.filter(movie => movie.backdrop_path).map(async (movie) => {
                        try {
                            const detailRes = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${apikey}`);
                            const detailsData = await detailRes.json();
                            return {
                                title: movie.title || movie.name,
                                image: movie.backdrop_path
                                    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                                    : "/fallback-image.jpg",
                                rating: movie.vote_average.toFixed(1),
                                imdbId: detailsData.imdb_id || null,
                                media_type:"movie",

                            };
                        } catch (err) {
                            return {
                                title: movie.title || movie.name,
                                image: movie.backdrop_path
                                    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                                    : "/fallback-image.jpg",
                                rating: movie.vote_average.toFixed(1),
                                imdbId: null,
                            };
                        }
                    })
                );
                setTrendingMovies(moviesWithImdb);
            } catch (err) {
            }
        };
        fetchTrendingMovies();
    }, []);

    return (
        <Section title="Top Trending Movies" data={trendingMovies} />
    )
}


export default TrendingMovies

