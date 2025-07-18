import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { getUserFromToken } from '../utils/jwtUtils';
import './UpdateProfile.css';

export default function UpdateProfile() {
  const [form, setForm] = useState({ username: '', phone: '', email: '', password: '' });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = getUserFromToken(token);
    const id = decoded?.id;
    setUserId(id);

    if (id) {
      api.get(`/users/${id}`)
        .then(res => {
          setForm({
            username: res.data.username || '',
            phone: res.data.phone || '',
            email: res.data.email || '',
            password: ''
          });
        })
        .catch(err => console.error('Failed to fetch user details', err));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${userId}`, form);
      alert('Profile updated!');
    } catch (err) {
      console.error('Update failed', err);
      alert('Update failed!');
    }
  };

  return (
    <div className="update-profile-container">
      <h2 className="update-profile-title">Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="form-input"
          required
        />
        <button
          type="submit"
          className="form-button"
        >
          Update
        </button>
      </form>
    </div>
  );
}
