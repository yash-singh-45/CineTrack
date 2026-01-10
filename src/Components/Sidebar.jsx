import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-50 md:w-64 bg-[#111318] z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
            >
                <div className="p-5 text-white">
                    <h2 className="text-2xl font-bold mb-6">🎬 CineTrack</h2>

                    <nav className="flex flex-col gap-3 md:gap-4 ">
                        <button
                            onClick={() => {
                                navigate("/watchlist");
                                onClose();
                            }}
                            className=" cursor-pointer flex items-center gap-3 text-base md:text-lg hover:text-red-400"
                        >
                            Watchlist
                        </button>

                        <button
                            onClick={() => {
                                // navigate("/favorites");
                                onClose();
                            }}
                            className=" cursor-pointer flex items-center gap-3 text-base md:text-lg hover:text-yellow-400"
                        >
                            Favorites
                        </button>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
