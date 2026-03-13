import React, { useState } from 'react';
import theatrepic from '../assets/theatre.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CineTrackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);

export default function Signup() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [userKey, setUserKey] = useState("");
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem("users")) || [];

        if(confirmPass && userPass && userPass !== confirmPass){
            setConfirmPass(""); setUserPass("");
            toast.error("Confirm Password Mismatch");
            return;
        }

        if(userPass && userPass.length <8){
            setConfirmPass(""); setUserPass("");
            toast.error("Password is too short");
            return;
        }

        if (users.some((s) => s.userEmail === userEmail)) {
            setUserName(""); setConfirmPass(""); setUserEmail(""); setUserKey(""); setUserPass("");
            toast.error("An account with this email already exists!");
            return;
        }

        const user = { uid: uuidv4(), userName, userEmail, userPass, userKey };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        setUserName(""); setConfirmPass(""); setUserEmail(""); setUserKey(""); setUserPass("");
        toast.success("Account created successfully!");
        Navigate("/home");
    };

    return (
        <div className="h-screen w-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
            style={{ backgroundImage: `url(${theatrepic})`, opacity: 1 }}>

            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative w-full max-w-md md:max-w-130 backdrop-blur-lg rounded-2xl shadow-lg shadow-teal-900/30 p-8 border border-teal-400/30 overflow-hidden">

                <div className="absolute top-4 left-6 w-24 h-12 rounded-full bg-white opacity-10 blur-xl transform rotate-12 pointer-events-none"></div>

                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <CineTrackIcon />
                        <h1 className="text-2xl md:text-3xl lg:text-4xl  font-bold text-white">CineTrack</h1>
                    </div>
                    <h2 className="text-lg md:text-2xl lg:text-3xl text-gray-300">Create Your Account</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            id="name"
                            placeholder="First Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm  md:text-base lg:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm lg:text-lg md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className="relative mb-3">
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={userPass}
                            onChange={(e) => setUserPass(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm lg:text-lg md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className=' ml-1 -mt-1 mb-3'>
                        <label className='text-xs md:text-sm lg:text-base mb-2 text-white'>*Min. 8 characters needed</label>
                    </div>

                    <div className="relative mb-3">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm md:text-base lg:text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className="relative mb-3">
                        <input
                            type="text"
                            id="key"
                            placeholder="Your Fav Colour"
                            value={userKey}
                            onChange={(e) => setUserKey(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm lg:text-lg md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                            required
                        />
                    </div>
                    <div className='mb-3 -mt-1'>
                        <label className='text-xs md:text-sm lg:text-base mb-2 text-white'>*It will be asked during password reset</label>
                    </div>

                    <button type="submit" className="w-full py-3 cursor-pointer bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 text-sm md:text-base lg:text-lg transition-colors">
                        CREATE ACCOUNT
                    </button>
                </form>

                <p className="text-center text-xs md:text-sm lg:text-lg text-gray-400 mt-6">
                    Already have an account? <Link to={"/"} className="font-semibold text-teal-400 hover:underline">Log In</Link>
                </p>

            </div>
        </div>
    );
}
