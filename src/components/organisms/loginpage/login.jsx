import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    try {
      let storedValue = localStorage.getItem("myObject");
      storedValue = JSON.parse(storedValue);

      if (!storedValue) {
        setError("User not found. Please sign up first.");
        return;
      }

      if (email && password) {
        if (email === storedValue.email && password === storedValue.password) {
          navigate("/profile");
        } else {
          setError("Incorrect email,password or you haven't register!");
        }
      } else {
        setError("Please enter both email and password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="flex h-full max-w-md p-8 bg-white rounded-lg mb-8 mt-18 w-[50%]">
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-3xl bold font-normal mb-4 text-center">Log In</h2>

          {error && <p className="text-orange-600 mb-4">{error}</p>}

          <div className="mb-6">
            <label htmlFor="email" className="block font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block font-semibold mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg transition-colors bg-[#d63639] hover:bg-[#a55b5b]"
          >
            Log In
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#8A33FD] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
