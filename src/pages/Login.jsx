// import React, { useState,useEffect } from 'react';
// import api from '../api/axios';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [credentials, setCredentials] = useState({ identifier: '', password: '' });
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post('/auth/login', credentials);
//       const token = res.data.accessToken || res.data.token;

//       if (token) {
//         localStorage.setItem('token', token);
//         navigate('/dashboard', { replace: true });
//       } else {
//         alert('Token not received');
//       }
//     } catch (err) {
//     const message =
//       err?.response?.data?.message ||     
//       err?.response?.data?.error ||       
//       err?.response?.data ||              
//       'Login failed. Please try again.'; 
//     alert(message);
//   };
//   }

//   useEffect(() => {
//       localStorage.removeItem('token');
//     }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Email or Phone"
//             className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) =>
//               setCredentials({ ...credentials, identifier: e.target.value })
//             }
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-md text-base hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <a href="/signup" className="text-blue-600 hover:underline">
//               Click here to register
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
//  }


// import React, { useState, useEffect } from 'react';
// import api from '../api/axios';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import LockIcon from '@mui/icons-material/Lock';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// export default function Login() {
//   const [credentials, setCredentials] = useState({ identifier: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await api.post('/auth/login', credentials);
//     const token = res.data.accessToken || res.data.token;

//     if (token) {
//       login(token); // This calls setToken, sets user, and sets auth
//       navigate('/dashboard', { replace: true });
//     } else {
//       setSnackbar({ open: true, message: 'Token not received', severity: 'error' });
//     }
//   } catch (err) {
//     const message =
//       err?.response?.data?.message ||
//       err?.response?.data?.error ||
//       err?.response?.data ||
//       'Login failed. Please try again.';
//     setSnackbar({ open: true, message, severity: 'error' });
//   }
// };


//   useEffect(() => {
//       localStorage.removeItem('token');
//     }, []);

  

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-green-100">
//       <style>
//         {`
//           @keyframes slideIn {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-slideIn {
//             animation: slideIn 0.6s ease-out forwards;
//           }
//         `}
//       </style>

//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 animate-slideIn">
//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide animate-pulse">
//           Welcome Back
//         </h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           {/* Identifier Input (Email or Phone) */}
//           <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200">
//             <EmailIcon className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Email or Phone"
//               className="w-full bg-transparent focus:outline-none"
//               onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200 relative">
//             <LockIcon className="text-gray-400 mr-2" />
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               className="w-full bg-transparent focus:outline-none pr-8"
//               onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//               required
//             />
//             <div
//               className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700"
//               onMouseDown={() => setShowPassword(true)}
//               onMouseUp={() => setShowPassword(false)}
//               onMouseLeave={() => setShowPassword(false)}
//             >
//               {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
//           >
//             <span className="tracking-wider">Login</span>
//           </button>

//           {/* Signup Link */}
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <a href="/signup" className="text-green-600 hover:underline font-medium">
//               Click here to register
//             </a>
//           </p>
//         </form>
//       </div>

//       {/* Snackbar */}
//       <Snackbar
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [shake, setShake] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', credentials);
      const token = res.data.accessToken || res.data.token;

      if (token) {
        login(token);
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
      } else {
        setShake(true);
        setSnackbar({ open: true, message: 'Token not received', severity: 'error' });
      }
    } catch (err) {
      setShake(true);
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        typeof err?.response?.data === 'string'
          ? err.response.data
          : 'Login failed. Please try again.';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-green-100">
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideIn {
            animation: slideIn 0.6s ease-out forwards;
          }

          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            50% { transform: translateX(8px); }
            75% { transform: translateX(-8px); }
            100% { transform: translateX(0); }
          }
          .shake {
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>

      <div
        className={`w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transition-all duration-500 animate-slideIn ${
          shake ? 'shake' : ''
        }`}
        onAnimationEnd={() => setShake(false)}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide animate-pulse">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Identifier Input */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200">
            <EmailIcon className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Email or Phone"
              className="w-full bg-transparent focus:outline-none"
              onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200 relative">
            <LockIcon className="text-gray-400 mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none pr-8"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
            <div
              className="absolute right-3 cursor-pointer text-gray-500 hover:text-gray-700"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span className="tracking-wider">Login</span>
          </button>

          {/* Signup Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-green-600 hover:underline font-medium">
              Click here to register
            </a>
          </p>
        </form>
      </div>

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
