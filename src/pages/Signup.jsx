import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      alert('User created. Now login.');
      navigate("/login");
    } catch (err) {
       const message =
      err?.response?.data?.message ||     // Common Spring Boot error field
      err?.response?.data?.error ||       // Sometimes it's under 'error'
      err?.response?.data ||  'Signup failed. Please try again.'; 
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-gray-300 rounded"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
             Click here to Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}