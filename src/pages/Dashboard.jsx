// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import { useNavigate } from 'react-router-dom';
// import Profile from '../components/Profile';
// import UpdateProfile from '../components/UpdateProfile';
// import { getUserFromToken } from '../utils/jwtUtils';
// import Groups from './Groups';

// export default function Dashboard() {
//   const [groups, setGroups] = useState([]);
//   const navigate = useNavigate();
//    const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//   const userData = getUserFromToken();

//   useEffect(() => {
//     if (!userData?.id) {
//       setError('Invalid token or user not logged in');
//       setLoading(false);
//       return;
//     }
//     console.log(userData.id);
//     api.get(`/users/${userData.id}`)
//       .then(res => {
//         // Example: assuming res.data.groups is an array of group objects
//         setGroups(res.data.groups || []);
//       })
//       .catch(err => {
//         console.error('Failed to fetch user data:', err);
//       });
//   }, []);

//   const [activeSection, setActiveSection] = useState('groups');
//   const renderContent = () => {
//     switch (activeSection) {
//       case 'groups':
//         return <Groups />;
//       case 'profile':
//        return <Profile onBack={() => setActiveSection('groups')} />;
//       case 'update':
//         return <UpdateProfile onBack={() => setActiveSection('groups')} />;
//       default:
//         return null;
//     }
//   };
// return (
//   <div className="min-h-screen flex">
//     {/* Left Sidebar */}
//     <div className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-6">
//       <h2 className="text-2xl font-bold">Dashboard</h2>
//       <button
//         className="text-left w-full bg-transparent border-none p-2 rounded-md hover:bg-gray-700"
//         onClick={() => setActiveSection('profile')}
//       >
//         Profile
//       </button>
//       <button
//         className="text-left w-full bg-transparent border-none p-2 rounded-md hover:bg-gray-700"
//         onClick={() => setActiveSection('update')}
//       >
//         Update Details
//       </button>
//       <button
//         className="text-left w-full bg-red-500 border-none p-2 rounded-md hover:bg-red-600"
//         onClick={() => {
//           localStorage.removeItem('token');
//           window.location.href = '/login';
//         }}
//       >
//         Logout
//       </button>
//     </div>

//     {/* Main Section */}
//     <div className="flex-1 p-8">
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         {renderContent()}
//       </div>
//     </div>
//   </div>
// );

// }
import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import UpdateProfile from '../components/UpdateProfile';
import { getUserFromToken } from '../utils/jwtUtils';
import Groups from './Groups';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [activeSection, setActiveSection] = useState('groups');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userData = getUserFromToken();

  useEffect(() => {
    if (!userData?.id) {
      setError('Invalid token or user not logged in');
      return;
    }

    api.get(`/users/${userData.id}`)
      .then(res => {
        setGroups(res.data.groups || []);
      })
      .catch(err => {
        console.error('Failed to fetch user data:', err);
      });
  }, []);

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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            bgcolor: '#1e293b',
            color: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            <DashboardIcon sx={{ mr: 1, mb: -0.5 }} />
            Dashboard
          </Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveSection('profile')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setActiveSection('update')}>
              <ListItemIcon>
                <EditIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Update Details" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              sx={{ color: '#f87171' }}
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#f87171' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {renderContent()}
        </Paper>
      </Box>
    </Box>
  );
}
