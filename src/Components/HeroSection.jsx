import { useState, useEffect } from 'react'
import BlockCard from './BlockCard';
import rrr from '../assets/RRR.jpg';
import intersteller from "../assets/Intersteller.webp";
import oppenheimer from "../assets/Oppenheimer.jpg";
import thefamilyman from '../assets/The_Family_Man.webp';
import meiyazhagan from "../assets/meiyazhagan.jpg";
import dark from "../assets/dark.jpg";

export default function HeroSection() {
  const heroMovies = [
    {
      title: "Oppenheimer",
      image: oppenheimer,
      genre: "Biographical Thriller/Drama",
      imdbId: "tt15398776",
      media_type:"movie"
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
      title: "The Family Man",
      image: thefamilyman,
      genre: "Action Thriller Drama Spy",
      imdbId: "tt9544034",
      media_type: "tv"
    },
    {
      title: "RRR",
      image: rrr,
      genre: "Action Drama Historical",
      imdbId: "tt8178634",
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
