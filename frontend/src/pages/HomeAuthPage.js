import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function HomeAuth() {
  const { user } = useContext(AuthContext);

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-gray-300 p-6">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-lg text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to My App
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          This is a simple app for taking notes. You can create, edit, and
          delete notes to help you stay organized.
        </p>
        {user && (
          <p className="text-lg text-gray-700 mb-6">
            Welcome back, {user.username}!
          </p>
        )}
        <Link
          to="/notes"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
        >
          Go to Notes
        </Link>
      </div>
    </section>
  );
}

export default HomeAuth;
