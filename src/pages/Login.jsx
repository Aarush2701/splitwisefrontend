import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', credentials);
      const token = res.data.accessToken || res.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard', { replace: true });
      } else {
        alert('Token not received');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Phone"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setCredentials({ ...credentials, identifier: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md text-base hover:bg-blue-700 transition"
          >
            Login
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Click here to register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
