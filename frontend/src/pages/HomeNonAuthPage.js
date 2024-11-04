import React from "react";
import { Link } from "react-router-dom";

function HomeNonAuth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to My App
        </h1>
        <p className="text-gray-700 mb-4 text-lg">
          A simple, elegant note-taking app to help you stay organized.
        </p>
        <p className="text-gray-700 mb-8 text-lg">
          Log in or create an account to get started.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeNonAuth;
