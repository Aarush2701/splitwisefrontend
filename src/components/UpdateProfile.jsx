import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { getUserFromToken } from '../utils/jwtUtils';

export default function UpdateProfile({ onBack }) {
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
  <div className="p-4 max-w-md bg-white rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4">Update Profile</h2>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
      >
        Update
      </button>
    </form>
    <div className="mt-4">
      <button
        onClick={onBack}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
      >
        Back to Home
      </button>
    </div>
  </div>
);
}
