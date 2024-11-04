import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../utils/config";

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [err, setErr] = useState(""); // State for client error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match validation
    if (formData.password !== formData.password2) {
      setErr("Passwords do not match."); // Set error message
      setTimeout(() => setErr(""), 3000); // Clear error message after 3 seconds
      return; // Prevent form submission
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setErr("Invalid email format."); // Set error message for invalid email
      setTimeout(() => setErr(""), 3000); // Clear error message after 3 seconds
      return; // Prevent form submission
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("password2", formData.password2);

    try {
      const response = await fetch(`${baseURL}/api/register/`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (data.username !== formData.username) {
        Object.entries(data).forEach(([key, msgArray]) => {
          let customMessage = msgArray[0]; // Default to the first message in the array
          if (key === "email" && msgArray[0] === "This field must be unique.") {
            customMessage = "Email must be unique.";
          }
          toast.error(customMessage);
        });
      } else {
        toast.success("Successfully registered");
        history.push("/login");
      }
    } catch (error) {
      toast.error("Check your network status.");
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-10 transition-transform transform hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Create an Account
        </h1>
        {/* Display error message */}
        {err && <p className="text-red-500 text-center mb-4">{err}</p>}{" "}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={(e) =>
                setFormData({ ...formData, password2: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition duration-150"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600">Already registered?</p>
          <Link to="/login">
            <button className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-150">
              Login
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
