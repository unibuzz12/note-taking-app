import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/images.png";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center py-4 px-6 shadow-lg bg-white border-b border-gray-200">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 mr-3 transition-transform duration-300 hover:scale-105"
        />
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300"
        >
          Notes App
        </Link>
      </div>
      {user && (
        <div className="flex items-center">
          <Link
            to="/notes"
            className="mr-6 text-gray-700 font-bold border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 transition duration-300"
          >
            Notes
          </Link>
          <button
            onClick={logoutUser}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition duration-300 transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
