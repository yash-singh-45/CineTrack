import React from 'react'
import { useState, useEffect } from 'react';
import Section from './Section';
const TopRatedIndianTV = () => {
    const [topRatedIndianTV, setTopRatedIndianTV] = useState([
        {
            "title": "TVF Pitchers",
            "image": "https://m.media-amazon.com/images/M/MV5BZDYxYTQxM2MtMDkxYi00ZjgzLTg0ODEtMWEzZjYzZTM5OGRiXkEyXkFqcGc@._V1_.jpg",
            "rating": "9.1",
            "imdbId": "tt4742876",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Kota Factory",
            "image": "https://m.media-amazon.com/images/M/MV5BY2U5MjY1NWEtZDI2MS00NTlhLWEyODQtYzE0MzY3NDUyNzE3XkEyXkFqcGc@._V1_.jpg",
            "rating": "9.0",
            "imdbId": "tt9432978",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Scam 1992: The Harshad Mehta Story",
            "image": "https://m.media-amazon.com/images/M/MV5BNGRkOTVjODgtNTBmZS00MDQ3LWE3ZjQtM2ZiNDQ3OWJkMjM2XkEyXkFqcGc@._V1_.jpg",
            "rating": "9.2",
            "imdbId": "tt12392504",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Sacred Games",
            "image": "https://resizing.flixster.com/j3Pk-1QBwBZ7_pn6rGObBhi4eoY=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjMxNTc1OC53ZWJw",
            "rating": "8.5",
            "imdbId": "tt6077448",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Panchayat",
            "image": "https://m.media-amazon.com/images/M/MV5BYjIxNDA2MjMtZWQ5ZS00ZjA5LTljMzYtYTBhODRkZDk0NGYyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "rating": "9.0",
            "imdbId": "tt12004706",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "The Family Man",
            "image": "https://m.media-amazon.com/images/M/MV5BMDc3NWMwNGMtYjc3Mi00NzU5LWFiYjgtMTJjZGE3ZmFiNzRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "rating": "8.7",
            "imdbId": "tt9544034",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Yeh Meri Family",
            "image": "https://m.media-amazon.com/images/S/pv-target-images/c7ed25d187470cedc6d996de1125005df254270907bb4056b1b3ee3a27fb9cd9.jpg",
            "rating": "8.9",
            "imdbId": "tt8595766",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Gullak",
            "image": "https://m.media-amazon.com/images/M/MV5BMzllMWE4YTgtODM3OS00MGEyLWEwMjktNWQzZjFjNWNhMGNmXkEyXkFqcGc@._V1_.jpg",
            "rating": "9.1",
            "imdbId": "tt10530900",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Mirzapur",
            "image": "https://images.plex.tv/photo?size=large-1920&scale=1&url=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2Fp0qM8hhlMF5DuxHBzl2EZR6TehX.jpg",
            "rating": "8.4",
            "imdbId": "tt6473300",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Special Ops",
            "image": "https://preview.redd.it/special-ops-season-2-has-been-postponed-by-a-week-the-v0-qa8rwm3tizbf1.png?auto=webp&s=a9ef0fcbe77767ced9a01dfbd48e0e888cbe9f8e",
            "rating": "8.6",
            "imdbId": "tt11854694",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "Pataal Lok",
            "image": "https://m.media-amazon.com/images/M/MV5BM2NlZDUwNzAtZTgyYi00YjhlLThhZTEtYTIxMzdjZjVkOTI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            "rating": "8.2",
            "imdbId": "tt9680440",
            "media_type": "tv",
            "language": "Hindi"
        },
        {
            "title": "The Bads of Bollywood",
            "image": "https://m.media-amazon.com/images/M/MV5BOGJlYjliMGMtYTAxOC00YWU4LWE1NTktM2NhMDdmZTcxOTk2XkEyXkFqcGc@._V1_.jpg",
            "rating": "7.6",
            "imdbId": "tt34683290",
            "media_type": "tv",
            "language": "Hindi"
        }
    ]
    );
    const apikey = import.meta.env.VITE_TMDB_API_KEY;
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        const fetchTopRatedIndianTV = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/discover/tv?api_key=${apikey}&with_origin_country=IN&page=1`
                );
                const data = await res.json();
                const moviesWithImdb = await Promise.all(
                    data.results.filter(movie => movie.backdrop_path).map(async (movie) => {
                        try {
                            const detailRes = await fetch(`${BASE_URL}/tv/${movie.id}/external_ids?api_key=${apikey}`);
                            const detailsData = await detailRes.json();

                            return {
                                title: movie.name,
                                image: movie.backdrop_path
                                    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                                    : "/fallback-image.jpg",
                                rating: movie.vote_average.toFixed(1),
                                imdbId: detailsData.imdb_id || null,
                                media_type: "tv",

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
                setTopRatedIndianTV(moviesWithImdb);

            } catch (err) {
            }
        }
        fetchTopRatedIndianTV();
    }, []);


    return (
        <Section title={"Top Rated Indian Shows"} data={topRatedIndianTV} />
    )
}

export default TopRatedIndianTV

