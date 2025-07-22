import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { getUserFromToken } from '../utils/jwtUtils';

export default function Profile({ onBack }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const userData = getUserFromToken();

  useEffect(() => {
    if (!userData?.id) {
      setError('Invalid token or user not logged in');
      setLoading(false);
      return;
    }

    api.get(`/users/${userData.id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch user data');
        setLoading(false);
      });
  }, [userData?.id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.");
    if (!confirm) return;

    try {
      await api.delete(`/users/${userData.id}`);
      setDeleteSuccess('Account deleted successfully.');
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (err) {
    // Safely extract backend error message
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data ||
      'Failed to delete account';

      setDeleteError(message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  // return (
  //   <div className="profile-container">
  //     <h2 className="profile-title">User Profile</h2>
  //     <p><strong>Username:</strong> {user.username}</p>
  //     <p><strong>Email:</strong> {user.email}</p>
  //     <p><strong>Phone:</strong> {user.phone}</p>

  //     {deleteError && <p className="error-text mt-2">{deleteError}</p>}
  //     {deleteSuccess && <p className="text-green-600 mt-2">{deleteSuccess}</p>}

  //     <div className="mt-4 space-x-2">
  //       <button
  //         onClick={onBack}
  //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  //       >
  //         Back to Home
  //       </button>
  //       <button
  //         onClick={handleDelete}
  //         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
  //       >
  //         Delete Account
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
  <div className="p-4 bg-white rounded-lg shadow max-w-md">
    <h2 className="text-xl font-semibold mb-4">User Profile</h2>
    <p><strong>Username:</strong> {user.username}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Phone:</strong> {user.phone}</p>

    {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
    {deleteSuccess && <p className="text-green-600 mt-2">{deleteSuccess}</p>}

    <div className="mt-4 space-x-2">
      <button
        onClick={onBack}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Delete Account
      </button>
    </div>
  </div>
);

}
