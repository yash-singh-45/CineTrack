import React from "react";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Home from "./Components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Profile from "./Components/Profile";
import SearchSection from "./Components/SearchSection";
import Navbar from "./Components/Navbar";
import MoviePage from "./Components/MoviePage";
import WatchList from "./Components/WatchList";
import Actors from "./Components/Actors";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Login />,
  // },
  // {
  //   path: "/signup",
  //   element: <Signup />,
  // },
  {
    path: "/",
    element: <Home />
  },
  // {
  //   path: "/profile",
  //   element: <Profile />
  // },
  {
    path: "search",
    element:
      <div  className="bg-[#0F1117] min-h-screen text-white">
        <Navbar />
        <SearchSection />
      </div>
  },
  {
    path: "page/:type/:imdbId",
    element: <MoviePage />
  },
  {
    path: "/watchlist",
    element: <WatchList />
  },
  {
    path: "/actor/:name",
    element: <Actors />
  }
]);

function App() {
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
