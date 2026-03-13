import { useState, useEffect } from 'react'
import BlockCard from './BlockCard';
import onebattle from '../assets/onebattle.jpg';
import intersteller from "../assets/Intersteller.webp";
import oppenheimer from "../assets/Oppenheimer.jpg";
import dhurandhar from '../assets/dhurandhar.jpg';
import meiyazhagan from "../assets/meiyazhagan.jpg";
import dark from "../assets/dark.jpg";

export default function HeroSection() {
  const heroMovies = [
    {
      title: "Dhurandhar",
      image: dhurandhar,
      genre: "Action Drama Spy",
      imdbId: "tt33014583",
      media_type: "movie"
    },
    {
      title: "One Battle After Another",
      image: onebattle,
      genre: "Action Crime Drama",
      imdbId: "tt30144839",
      media_type: "movie"
    },
    {
      title: "Oppenheimer",
      image: oppenheimer,
      genre: "Biographical Thriller/Drama",
      imdbId: "tt15398776",
      media_type: "movie"
    },
    {
      title: "Interstellar",
      image: intersteller,
      genre: "Science Fiction",
      imdbId: "tt0816692",
      media_type: "movie"
    },
    {
      title: "Meiyazhagan",
      image: meiyazhagan,
      genre: "Drama Family Slice-of-life",
      imdbId: "tt26758372",
      media_type: "movie"
    },
    {
      title: "Dark",
      image: dark,
      genre: "Thriller Suspense Mystery",
      imdbId: "tt5753856",
      media_type: "tv"
    }
  ]
  return (
    <BlockCard heroMovies={heroMovies} />
  );
}
