import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* <Route path="" element={<Login />} /> */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
           <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
           <Route path="update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
