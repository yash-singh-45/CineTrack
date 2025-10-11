import React from 'react'
import { useState, useEffect } from 'react'
import Section from './Section';
const IndianMovies = () => {
    const [indianMovies, setIndianMovies] = useState([]);
    const apikey = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        const fetchTopIndianMovies = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/discover/movie?api_key=${apikey}&with_origin_country=IN&sort_by=popularity.desc&page=1`
                );
                const data = await res.json();

                const moviesWithImdb = await Promise.all(
                    data.results.filter(movie => movie.backdrop_path).map(async(movie) => {
                        try{
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
                        }catch(err){
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
                setIndianMovies(moviesWithImdb);
            } catch (err) {
                console.log(err);
            }
        }
        fetchTopIndianMovies();
    }, []);
    return (
        <div>
            <Section title={"Popular Indian Movies"} data={indianMovies}/>
        </div>
    )
}

export default IndianMovies