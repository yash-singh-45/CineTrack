import React from 'react'
import { useState, useEffect } from 'react'
import Section from './Section';
import rrr from '../assets/RRR.jpg';


const IndianMovies = () => {
    const [indianMovies, setIndianMovies] = useState([
  {
    "title": "Kantara Chapter 1",
    "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRyNtQ_bFXIC83-dgByWXV5yZVJVDKgNXM8M1FF7FeVUF5sgdX3xv1zieGHKdPiGplSIhaazw",
    "rating": "8.5",
    "imdbId": "tt26439764",
    "media_type": "movie",
    "language": "Kannada/Hindi"
  },
  {
    "title": "RRR",
    "image": rrr,
    "rating": "8.0",
    "imdbId": "tt8178634",
    "media_type": "movie",
    "language": "Telugu/Hindi"
  },
  {
    "title": "Drishyam 2",
    "image": "https://m.media-amazon.com/images/M/MV5BNGYyY2I5MzktMDg2MC00Nzc4LWIwNmYtMjg3NzE1ODQyMDllXkEyXkFqcGc@._V1_.jpg",
    "rating": "8.2",
    "imdbId": "tt15501640",
    "media_type": "movie",
    "language": "Hindi"
  },
  {
    "title": "Jawan",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSMEiUhSqYVO3GvRIqiDmMKT7K40rFNKL9vg&s",
    "rating": "7.5",
    "imdbId": "tt15354916",
    "media_type": "movie",
    "language": "Hindi"
  },
  {
    "title": "Gangubai Kathiawadi",
    "image": "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p18058864_p_v8_ab.jpg",
    "rating": "7.2",
    "imdbId": "tt10083340",
    "media_type": "movie",
    "language": "Hindi"
  },
  {
    "title": "Baahubali: The Beginning",
    "image": "https://m.media-amazon.com/images/M/MV5BM2YxZThhZmEtYzM0Yi00OWYxLWI4NGYtM2Y2ZDNmOGE0ZWQzXkEyXkFqcGc@._V1_.jpg",
    "rating": "8.0",
    "imdbId": "tt2631186",
    "media_type": "movie",
    "language": "Telugu/Hindi"
  },
  {
    "title": "Baahubali: The Conclusion",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsINxdiwdubjXsuJfUfgx2AFMc4DVwF8DVMA&s",
    "rating": "8.2",
    "imdbId": "tt4849438",
    "media_type": "movie",
    "language": "Telugu/Hindi"
  },
  {
    "title": "KGF Chapter 2",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfXPInTg99_wKQ48ZWh43RFh-CEsUHJrjN7A&s",
    "rating": "8.0",
    "imdbId": "tt10698680",
    "media_type": "movie",
    "language": "Kannada/Hindi"
  },
  {
    "title": "Pushpa: The Rise",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8L3SfFQHWkA20mlFSq-FsQ5GJsTG0Cr0ibg&s",
    "rating": "7.6",
    "imdbId": "tt9389998",
    "media_type": "movie",
    "language": "Telugu/Hindi"
  },
  {
    "title": "Sita Ramam",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEI1A4SWgVzKZE1YEnKTYeOlwIVlbHfRI0OA&s",
    "rating": "7.5",
    "imdbId": "tt14100198",
    "media_type": "movie",
    "language": "Telugu/Hindi"
  }
]);
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


