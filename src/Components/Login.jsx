import React, { useState } from 'react';
import theatrepic from '../assets/theatre.jpg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const CineTrackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem("users")) || [];

        if(users.some(user => user.userEmail === email && user.userPass === password)){
            toast.success("Logged in Successfully!");
            navigate("/home");
        }
        else{
            toast.error("Incorrect Email or Password!");
        }
    }

    return (
        <div className="h-screen  w-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4"
            style={{ backgroundImage: `url(${theatrepic})`, opacity: 1 }}>

            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative  w-full max-w-md md:max-w-120   backdrop-blur-lg rounded-2xl shadow-lg shadow-teal-900/30 p-8 border border-teal-400/30 overflow-hidden">
                <div className="absolute top-4 left-6 w-24 h-12 rounded-full bg-white opacity-10 blur-xl transform rotate-12 pointer-events-none"></div>

                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <CineTrackIcon />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">CineTrack</h1>
                    </div>
                    <h2 className="text-xl md:text-2xl text-gray-300">Sign In to CineTrack</h2>
                </div>
                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm md:text-xl font-semibold text-gray-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            className=" md:text-xl w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm md:text-xl font-semibold text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value.trim())}
                                className=" md:text-xl w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
                                required
                            />
                        </div>
                    </div>
                    {/* Forgot Password */}
                    <div className="flex justify-between items-center text-sm md:text-base mb-6">
                        <div className="flex items-center"></div>
                        <a href="#" className="font-semibold text-teal-400 hover:underline">Forgot Password?</a>
                    </div>

                    <button type="submit" className="w-full py-3 md:text-xl cursor-pointer bg-teal-400 text-gray-900 font-bold rounded-lg hover:bg-teal-500 transition-colors">
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm md:text-lg text-gray-400 mt-6">
                    Don't have an account? <Link to={"/signup"} className="font-semibold text-teal-400 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}