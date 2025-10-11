import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [searchBox, setSearchBox] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    setSearchBox(e.target.value);
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (!searchBox) {
      return;
    }
    
    const timestamp = new Date().getTime();
    navigate(`/search?query=${encodeURIComponent(searchBox)}`);
  }
  return (
    <div className='sticky top-0 z-50 bg-[#0F1115] shadow-md'>
      <nav className=" flex items-center justify-between pt-2 md:pt-4 px-5 py-4 md:px-8 md:py-1 shadow-md">
        <h1 className="text-cyan-400 text-1xl md:text-3xl font-bold">🎬 CineTrack</h1>
        <form onSubmit={handleSubmit} className="relative w-1/2 md:w-1/3">
          <input
            type="search"
            placeholder="Search for movies..."
            value={searchBox}
            onChange={handleChange}
            className="w-full hover:border-2 text-1xl md:text-2xl  px-2 py-1 md:px-4 md:py-2 rounded-full bg-[#1C1F26] border border-cyan-500 text-white focus:outline-none"
          />
          {/* <span className="absolute top-1 right-1 md:right-4 md:top-2.5 text-gray-400">🔍</span> */}
        </form>
        {/* <Link to={"/profile"} className="text-white bg-white rounded-2xl text-1xl md:text-3xl">👤</Link> */}
      </nav>
    </div>
  )
}


export default Navbar
