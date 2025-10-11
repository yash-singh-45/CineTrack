import React from 'react'
import { useState, useEffect } from 'react';
import Section from './Section';
const TopRatedTV = () => {
    const [topRatedTV, setTopRatedTV] = useState([]);
    const apikey = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {

        const fetchTopRatedTV = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/tv/top_rated?api_key=${apikey}&language=en-US&page=1`
                );
                const data = await res.json();
                const moviesWithImdb = await Promise.all(
                    data.results.filter(movie => movie.backdrop_path && movie.vote_count != 0).map(async (movie) => {
                        try {
                            const detailRes = await fetch(`${BASE_URL}/tv/${movie.id}/external_ids?api_key=${apikey}`);
                            const detailsData = await detailRes.json();
                            return {
                                title: movie.title || movie.name,
                                image: movie.backdrop_path
                                    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                                    : "/fallback-image.jpg",
                                rating: movie.vote_average.toFixed(1),
                                imdbId: detailsData.imdb_id || null,
                                media_type: "tv",

                            };
                        } catch (err) {
                            console.error("Failed to fetch movie details for:", movie.title, err);
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

                setTopRatedTV(moviesWithImdb);
            } catch (err) {
                console.log(err);
            }
        };

        fetchTopRatedTV();
    }, []);

    return (
        <Section title="International Shows" data={topRatedTV} />
    )
}

export default TopRatedTV