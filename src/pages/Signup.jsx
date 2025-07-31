// import React, { useState } from 'react';
// import api from '../api/axios';
// import { useNavigate } from 'react-router-dom';

// export default function Signup() {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//   });
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/auth/signup', form);
//       alert('User created. Now login.');
//       navigate("/login");
//     } catch (err) {
//        const message =
//       err?.response?.data?.message ||     // Common Spring Boot error field
//       err?.response?.data?.error ||       // Sometimes it's under 'error'
//       err?.response?.data ||  'Signup failed. Please try again.'; 
//       alert(message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full p-3 mb-4 border border-gray-300 rounded"
//             onChange={(e) =>
//               setForm({ ...form, username: e.target.value })
//             }
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 mb-4 border border-gray-300 rounded"
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             className="w-full p-3 mb-4 border border-gray-300 rounded"
//             onChange={(e) =>
//               setForm({ ...form, phone: e.target.value })
//             }
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 mb-6 border border-gray-300 rounded"
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
//           >
//             Register
//           </button>
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <a href="/login" className="text-blue-600 hover:underline">
//              Click here to Login
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/auth/signup', form);

    const token = res.data.token; // make sure your backend returns this
    localStorage.setItem('token', token); // or call your AuthContext's login method

    setSnackbar({ open: true, message: 'User created successfully.', severity: 'success' });
    login(token);

    setTimeout(() => {
      navigate('/dashboard'); // Redirect to dashboard
    }, 1000);
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.response?.data ||
      'Signup failed. Please try again.';
    setSnackbar({ open: true, message, severity: 'error' });
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }
};


  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // allow only digits
    setForm({ ...form, phone: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-blue-100">
      {/* CSS Animations */}
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.6s ease-out forwards;
          }

          @keyframes shake {
            0% { transform: translateX(0); }
            20% { transform: translateX(-10px); }
            40% { transform: translateX(10px); }
            60% { transform: translateX(-10px); }
            80% { transform: translateX(10px); }
            100% { transform: translateX(0); }
          }
          .shake {
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>

      <div className={`w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 animate-slideIn ${shake ? 'shake' : ''}`}>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide animate-pulse">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
            <PersonIcon className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent focus:outline-none"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
            <EmailIcon className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent focus:outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
            <PhoneAndroidIcon className="text-gray-400 mr-2" />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full bg-transparent focus:outline-none"
              onChange={handlePhoneChange}
              value={form.phone}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-green-400 relative">
            <LockIcon className="text-gray-400 mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none pr-8"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span className="tracking-wider">Register</span>
          </button>

          {/* Login Redirect */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Click here to Login
            </a>
          </p>
        </form>
      </div>

      {/* Snackbar Notification */}
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
