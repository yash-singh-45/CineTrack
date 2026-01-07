import React from 'react'
import { useState, useEffect } from 'react';
import Section from './Section';

const Malayalam = () => {
    const [malayalamMovies, setMalayalamMovies] = useState([
        {
            "title": "Drishyam",
            "image": "https://m.media-amazon.com/images/M/MV5BM2MwMjNlNjctYjA2ZS00ZDA4LWJmNTYtODg5NDY1YzQzZDg2XkEyXkFqcGc@._V1_.jpg",
            "rating": "8.4",
            "imdbId": "tt3417422",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Kumbalangi Nights",
            "image": "https://m.media-amazon.com/images/M/MV5BOTQxNzcyOTEtNDViNy00MGQ3LTliMjktYmVjOGE4NTM4ODJiXkEyXkFqcGc@._V1_.jpg",
            "rating": "8.5",
            "imdbId": "tt8413338",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Bangalore Days",
            "image": "https://miro.medium.com/0*9MgPgvwHgqV-3A86",
            "rating": "8.3",
            "imdbId": "tt3668162",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Drishyam 2",
            "image": "https://m.media-amazon.com/images/M/MV5BM2Q2YTczM2QtNDBkNC00M2I5LTkyMzgtOTMwNzQ0N2UyYWQ0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "rating": "8.4",
            "imdbId": "tt12361178",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "2018",
            "image": "https://m.media-amazon.com/images/M/MV5BMjBjYzVmOTAtMWI2NC00ODhiLTk4NDYtYmY3YmQxYmU2NTI5XkEyXkFqcGc@._V1_.jpg",
            "rating": "8.3",
            "imdbId": "tt9006564",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Manjummel Boys",
            "image": "https://reviewpuram.in/wp-content/uploads/2024/02/Manjummel-Boys-Poster.jpg",
            "rating": "8.2",
            "imdbId": "tt26458038",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Iratta",
            "image": "https://m.media-amazon.com/images/M/MV5BYmI1ZGMyYzUtOWE0NC00MThjLTgyMzEtYzY3MGI4ZWNlMzNlXkEyXkFqcGc@._V1_.jpg",
            "rating": "7.7",
            "imdbId": "tt25406500",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Premalu",
            "image": "https://m.media-amazon.com/images/M/MV5BNWMwZTYyYzgtOTMzYy00NDQzLTkzODAtMDc2NTcwZWZmMjNhXkEyXkFqcGc@._V1_.jpg",
            "rating": "7.8",
            "imdbId": "tt28288786",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Anjaam Pathira",
            "image": "https://m.media-amazon.com/images/M/MV5BNjQ2NzBkMTMtNTdmMi00Y2E3LTg3NjQtMGNmZDE1OTQ4YzYwXkEyXkFqcGc@._V1_.jpg",
            "rating": "7.9",
            "imdbId": "tt10717738",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Joji",
            "image": "https://m.media-amazon.com/images/M/MV5BODc4MTNjOWMtNzZjNS00NDVlLWE4NWItMTZiNzZjMDdjYmM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "rating": "7.7",
            "imdbId": "tt13206926",
            "media_type": "movie",
            "language": "Malayalam"
        },
        {
            "title": "Charlie",
            "image": "https://m.media-amazon.com/images/M/MV5BNzdkNTNjNjQtNWZmYi00NjRjLThkZDctMmJmOWFjNjZhOWY4XkEyXkFqcGc@._V1_.jpg",
            "rating": "8.1",
            "imdbId": "tt5082014",
            "media_type": "movie",
            "language": "Malayalam"
        }

    ]
    );
    const apikey = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        const fetchMalayalamMovies = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/discover/movie?api_key=${apikey}&with_original_language=ml&sort_by=popularity.desc&page=1`
                );
                const data = await res.json();

                const moviesWithImdb = await Promise.all(
                    data.results.filter(movie => movie.backdrop_path && movie.vote_count != 0).map(async (movie) => {
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
                                media_type: "movie",
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

                setMalayalamMovies(moviesWithImdb);
            } catch (err) {
            }
        }
        fetchMalayalamMovies();
    }, []);
    return (
        <Section title={"Popular Malayalam Movies"} data={malayalamMovies} />
    )
}

export default Malayalam

