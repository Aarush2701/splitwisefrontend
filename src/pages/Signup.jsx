import React, { useState } from 'react';
import api from '../api/axios';
import './signup.css';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      alert('User created. Now login.');
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed. Please try again.');
    }
  };

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
return (
  <div className="signup-container">
    <div className="signup-box">
      <h2 className="signup-title">Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          className="signup-input"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Phone"
          className="signup-input"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="signup-input"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        <button type="submit" className="signup-button">
          Register
        </button>
        <p className="signup-footer">
          Already have an account?{' '}
          <a href="/login" className="signup-link">
            Click here to Login
          </a>
        </p>
      </form>
    </div>
  </div>
);
}