import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import UpdateProfile from '../components/UpdateProfile';
import { getUserFromToken } from '../utils/jwtUtils';
// import './dashboard.css';
import Groups from './Groups';

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
        return <Groups />;
      case 'profile':
       return <Profile onBack={() => setActiveSection('groups')} />;
      case 'update':
        return <UpdateProfile onBack={() => setActiveSection('groups')} />;
      default:
        return null;
    }
  };
return (
  <div className="min-h-screen flex">
    {/* Left Sidebar */}
    <div className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <button
        className="text-left w-full bg-transparent border-none p-2 rounded-md hover:bg-gray-700"
        onClick={() => setActiveSection('profile')}
      >
        Profile
      </button>
      <button
        className="text-left w-full bg-transparent border-none p-2 rounded-md hover:bg-gray-700"
        onClick={() => setActiveSection('update')}
      >
        Update Details
      </button>
      <button
        className="text-left w-full bg-red-500 border-none p-2 rounded-md hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>

    {/* Main Section */}
    <div className="flex-1 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  </div>
);

}
