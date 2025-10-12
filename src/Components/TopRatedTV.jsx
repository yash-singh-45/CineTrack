import React from 'react'
import { useState, useEffect } from 'react';
import Section from './Section';
const TopRatedTV = () => {
    const [topRatedTV, setTopRatedTV] = useState([
    {
        "title": "Dark",
        "image": "https://m.media-amazon.com/images/M/MV5BOWJjMGViY2UtNTAzNS00ZGFjLWFkNTMtMDBiMDMyZTM1NTY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "8.8",
        "imdbId": "tt5753856",
        "media_type": "tv",
        "language": "German"
    },
    {
        "title": "Breaking Bad",
        "image": "https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "9.5",
        "imdbId": "tt0903747",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "True Detective",
        "image": "https://m.media-amazon.com/images/M/MV5BYjgwYzA1NWMtNDYyZi00ZGQyLWI5NTktMDYwZjE2OTIwZWEwXkEyXkFqcGc@._V1_.jpg",
        "rating": "9.0",
        "imdbId": "tt2356777",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "Stranger Things",
        "image": "https://m.media-amazon.com/images/M/MV5BMjg2NmM0MTEtYWY2Yy00NmFlLTllNTMtMjVkZjEwMGVlNzdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "8.8",
        "imdbId": "tt4574334",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "Game of Thrones",
        "image": "https://m.media-amazon.com/images/M/MV5BMTNhMDJmNmYtNDQ5OS00ODdlLWE0ZDAtZTgyYTIwNDY3OTU3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "9.3",
        "imdbId": "tt0944947",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "Harry Potter",
        "image": "https://m.media-amazon.com/images/M/MV5BNTU1MzgyMDMtMzBlZS00YzczLThmYWEtMjU3YmFlOWEyMjE1XkEyXkFqcGc@._V1_.jpg",
        "rating": "7.6",
        "imdbId": "tt0241527",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "Squid Game",
        "image": "https://m.media-amazon.com/images/M/MV5BYTU3ZDVhNmMtMDVlNC00MDc0LTgwNDMtYWE5MTI2ZGI4YWIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "8.0",
        "imdbId": "tt10919420",
        "media_type": "tv",
        "language": "Korean"
    },
    {
        "title": "Money Heist",
        "image": "https://m.media-amazon.com/images/M/MV5BZjkxZWJiNTUtYjQwYS00MTBlLTgwODQtM2FkNWMyMjMwOGZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "8.3",
        "imdbId": "tt6468322",
        "media_type": "tv",
        "language": "Spanish"
    },
    {
        "title": "The Office",
        "image": "https://m.media-amazon.com/images/M/MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_.jpg",
        "rating": "8.9",
        "imdbId": "tt0386676",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "The Boys",
        "image": "https://m.media-amazon.com/images/M/MV5BMWJlN2U5MzItNjU4My00NTM2LWFjOWUtOWFiNjg3ZTMxZDY1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "8.6",
        "imdbId": "tt1190634",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "Peaky Blinders",
        "image": "https://m.media-amazon.com/images/M/MV5BOGM0NGY3ZmItOGE2ZC00OWIxLTk0N2EtZWY4Yzg3ZDlhNGI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "8.7",
        "imdbId": "tt2442560",
        "media_type": "tv",
        "language": "English"
    },
    {
        "title": "Wednesday",
        "image": "https://m.media-amazon.com/images/M/MV5BMDE1NjNmZjgtZTg0OC00NjkxLWEzYzItMDNkMTc3YjgxZWQyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        "rating": "8.0",
        "imdbId": "tt13443470",
        "media_type": "tv",
        "language": "English"
    }
]
);
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
