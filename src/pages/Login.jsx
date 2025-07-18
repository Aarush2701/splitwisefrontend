
import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './login.css'; // 👈 Make sure this file exists

export default function Login() {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/auth/login', credentials);
    const token = res.data.accessToken || res.data.token; // depends on your backend key

    if (token) {
      localStorage.setItem('token', token);
      // alert('Login successful');
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
    <div className="page-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Phone"
            className="input-field"
            onChange={(e) =>
              setCredentials({ ...credentials, identifier: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="register-text">
            Don't have an account?{' '}
            <a href="/signup" className="register-link">
              Click here to register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

