import React from 'react';

const Profile = () => {
  return (
    <div className="bg-[#0F1117] min-h-screen text-white px-4 sm:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white text-black font-bold text-2xl w-16 h-16 flex items-center justify-center rounded-full border-4 border-[#00FFD1]">
            JD
          </div>
          <div>
            <h2 className="text-2xl font-semibold">John Doe</h2>
            <p className="text-gray-400">john.doe@example.com</p>
          </div>
        </div>
        <button className="mt-4 sm:mt-0 border border-[#00FFD1] text-[#00FFD1] px-4 py-2 rounded hover:bg-[#00FFD1] hover:text-black transition">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-8">
        <div className="bg-[#1A1C22] p-4 rounded">
          <p className="text-2xl font-bold">120</p>
          <p className="text-sm text-gray-400">Movies Watched</p>
        </div>
        <div className="bg-[#1A1C22] p-4 rounded">
          <p className="text-2xl font-bold">55</p>
          <p className="text-sm text-gray-400">TV Shows Watched</p>
        </div>
        <div className="bg-[#1A1C22] p-4 rounded">
          <p className="text-2xl font-bold">30</p>
          <p className="text-sm text-gray-400">Total Reviews</p>
        </div>
        <div className="bg-[#1A1C22] p-4 rounded">
          <p className="text-2xl font-bold">45</p>
          <p className="text-sm text-gray-400">Watchlist Items</p>
        </div>
      </div>

      {/* Your Activity */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Activity</h3>
          <button className="text-[#00FFD1] hover:underline text-sm">See All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {[
            { title: "The Mandorian", rating: 9.0, image: "https://via.placeholder.com/150" },
            { title: "Drama", rating: 9.9, image: "https://via.placeholder.com/150" },
            { title: "Action", rating: 8.9, image: "https://via.placeholder.com/150" },
            { title: "Panchyat", rating: 8.9, image: "https://via.placeholder.com/150" },
            { title: "Chenchyat", rating: 9.3, image: "https://via.placeholder.com/150" },
          ].map((item, idx) => (
            <div key={idx} className="min-w-[150px] bg-[#1A1C22] rounded-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-24 object-cover" />
              <div className="p-2">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-400">⭐ {item.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Watched */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Rently Watched</h3>
        <div className="flex flex-wrap gap-2">
          {["Sci-Fi", "Drama", "Action", "Comedy", "Thriller", "Fantasy"].map((genre, idx) => (
            <span
              key={idx}
              className="bg-[#00FFD1] text-black px-3 py-1 rounded-full text-sm font-medium"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
        <ul className="space-y-2">
          <li className="hover:underline cursor-pointer">Change Password</li>
          <li className="hover:underline cursor-pointer">Manage Subscriptions</li>
          <li className="hover:underline cursor-pointer">Privacy Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
