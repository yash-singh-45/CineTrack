import React from 'react'
import Section from './Section';
import rrr from '../assets/RRR.jpg';


const EditorsPick = () => {
    const editorsPick = [
  {
    "title": "Kohraa",
    "image": "https://m.media-amazon.com/images/M/MV5BZjQyODlhNTMtYjY1OS00MmRlLTg1Y2EtNjdjNGIwYzAzMTM4XkEyXkFqcGc@._V1_.jpg",
    "rating": "7.5",
    "imdbId": "tt27853283",
    "media_type": "tv",
    "language": "Punjabi/Hindi"
  },
  {
    "title": "F1: The Movie",
    "image": "https://m.media-amazon.com/images/M/MV5BNGI0MDI4NjEtOWU3ZS00ODQyLWFhYTgtNGYxM2ZkM2Q2YjE3XkEyXkFqcGc@._V1_.jpg",
    "rating": "7.6",
    "imdbId": "tt16311594",
    "media_type": "movie",
    "language": "English"
  },
  {
    "title": "Dead Poets Society",
    "image": "https://m.media-amazon.com/images/M/MV5BMDYwNGVlY2ItMWYxMS00YjZiLWE5MTAtYWM5NWQ2ZWJjY2Q3XkEyXkFqcGc@._V1_.jpg",
    "rating": "8.1",
    "imdbId": "tt0097165",
    "media_type": "movie",
    "language": "English"
  },
   {
    "title": "Three Of Us",
    "image": "https://m.media-amazon.com/images/M/MV5BMWM3ZDUwYjMtMmEyZS00YmZiLTk0NWItOWViM2U2ZGRmOTIzXkEyXkFqcGc@._V1_.jpg",
    "rating": "7.5",
    "imdbId": "tt23804378",
    "media_type": "movie",
    "language": "Hindi"
  },
  {
    "title": "The LunchBox",
    "image": "https://m.media-amazon.com/images/M/MV5BODkyM2FkZmQtYTQyNC00MGVlLTgxNjctNWRjMjQ5ZDZjZDQ3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    "rating": "7.8",
    "imdbId": "tt2350496",
    "media_type": "movie",
    "language": "Hindi"
  },
  {
    "title": "Asur",
    "image": "https://m.media-amazon.com/images/M/MV5BMDZkOGQzMjItNTliOC00NTIxLTg4ODEtNTMxZWY1OTk5ZWM0XkEyXkFqcGc@._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "8.5",
    "imdbId": "tt11912196",
    "media_type": "tv",
    "language": "Hindi"
  },
  {
    "title": "Sapne vs Everyone",
    "image": "https://m.media-amazon.com/images/M/MV5BODI2OTA5MjYtNDg3OS00ODAzLThlNDQtMzRmNDNlMTlhZDk3XkEyXkFqcGc@._V1_.jpg",
    "rating": "9.2",
    "imdbId": "tt30263074",
    "media_type": "tv",
    "language": "Hindi"
  },
  {
    "title": "Good Will Hunting",
    "image": "https://m.media-amazon.com/images/M/MV5BNDdjZGQ5YzEtNTc2My00Mjc0LWFlMTctYzkwMzZlNzdiZWYzXkEyXkFqcGc@._V1_.jpg",
    "rating": "8.4",
    "imdbId": "tt0119217",
    "media_type": "tv",
    "language": "English"
  },
  {
    "title": "Kumbalangi Nights",
    "image": "https://m.media-amazon.com/images/S/pv-target-images/f3c135410e0a08b3ba24a544d9a8c7dc017cb2c78a6e87790ab62f2db278626b.jpg",
    "rating": "8.5",
    "imdbId": "tt8413338",
    "media_type": "movie",
    "language": "Malayalam"
  },
  {
    "title": "Home",
    "image": "https://m.media-amazon.com/images/M/MV5BYzYxYjQ2NjUtZTdiNS00Y2MxLThkYWEtYjkxMTkzMGM1ZTAwXkEyXkFqcGc@._V1_.jpg",
    "rating": "8.7",
    "imdbId": "tt10534500",
    "media_type": "movie",
    "language": "Malayalam"
  },
  {
    "title": "Superboys of Malegaon",
    "image": "https://m.media-amazon.com/images/M/MV5BNTllODgyODEtMTk4Zi00YzRlLWEzNDUtMjAwYmZiMDk2MTkxXkEyXkFqcGc@._V1_.jpg",
    "rating": "7.7",
    "imdbId": "tt28007064",
    "media_type": "movie",
    "language": "Hindi"
  }
];

    return (
        <div>
            <Section title={"Editors Pick"} data={editorsPick}/>
        </div>
    )
}


export default EditorsPick


