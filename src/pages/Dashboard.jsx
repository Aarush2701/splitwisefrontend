import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import UpdateProfile from '../components/UpdateProfile';
import { getUserFromToken } from '../utils/jwtUtils';
import './dashboard.css';

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
  <div className="dashboard-container">
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <button className="sidebar-button" onClick={() => setActiveSection('profile')}>
        Profile
      </button>
      <button className="sidebar-button" onClick={() => setActiveSection('update')}>
        Update Details
      </button>
      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>

    {/* Main Content */}
    <div className="main-content">
      <div className="section-buttons">
        {['groups', 'expense', 'balance', 'settlement'].map((section) => (
          <button
            key={section}
            className={`section-button ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
      <div className="content-box">
        {renderContent()}
      </div>
    </div>
  </div>
);
}