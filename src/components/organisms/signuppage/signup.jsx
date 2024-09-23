import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Store user credentials
    const userObject = {
      username: username,
      email: email,
      password: password
    };
    localStorage.setItem("myObject", JSON.stringify(userObject));

    navigate('/login');
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full h-full max-w-md p-8 bg-white rounded-lg mb-8">
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-3xl bold font-normal mb-4 text-center">Sign Up</h2>

          {error && <p className="text-orange-600 mb-4">{error}</p>}

          <div className="mb-6">
            <label htmlFor="username" className="block font-semibold mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block font-semibold mb-2">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-sm text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-6">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg transition-colors bg-[#c1672f] hover:bg-[#a55b5b]"
          >
            Sign Up
          </button>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#e33a3a] hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
