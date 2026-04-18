import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <h1 className="text-white text-lg sm:text-3xl font-bold tracking-wide truncate">
          🚀 Task Manager
        </h1>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 text-xs sm:text-base font-semibold px-3 sm:px-5 py-2 rounded-xl shadow hover:bg-gray-100 transition duration-300 whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;