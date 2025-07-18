import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import UpdateProfile from '../components/UpdateProfile';
import { getUserFromToken } from '../utils/jwtUtils';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
   const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const userData = getUserFromToken();

  useEffect(() => {
    if (!userData?.id) {
      setError('Invalid token or user not logged in');
      setLoading(false);
      return;
    }
    console.log(userData.id);
    api.get(`/users/${userData.id}`)
      .then(res => {
        // Example: assuming res.data.groups is an array of group objects
        setGroups(res.data.groups || []);
      })
      .catch(err => {
        console.error('Failed to fetch user data:', err);
      });
  }, []);

  const [activeSection, setActiveSection] = useState('groups');

   const renderContent = () => {
    switch (activeSection) {
      case 'groups':
        return <div>Your Groups Section</div>;
      case 'expense':
        return <div>Your Expenses Section</div>;
      case 'balance':
        return <div>Your Balance Section</div>;
      case 'settlement':
        return <div>Your Settlement Section</div>;
      case 'profile':
        return <Profile />;
      case 'update':
        return <UpdateProfile />;
      default:
        return null;
    }
  };

   return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button className="w-full text-left hover:bg-gray-700 p-2 rounded" onClick={() => setActiveSection('profile')}>
          Profile
        </button>
        <button className="w-full text-left hover:bg-gray-700 p-2 rounded" onClick={() => setActiveSection('update')}>
          Update Details
        </button>
        <button
          className="w-full text-left hover:bg-red-600 bg-red-500 p-2 rounded"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex gap-4 mb-6">
          {['groups', 'expense', 'balance', 'settlement'].map(section => (
            <button
              key={section}
              className={`px-4 py-2 rounded ${activeSection === section ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}