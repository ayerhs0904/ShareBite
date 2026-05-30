import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicListings from './pages/PublicListings';
import DonorDashboard from './pages/DonorDashboard';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/listings" element={<PublicListings />} />
              
              <Route path="/donor/dashboard" element={
                <ProtectedRoute allowedRoles={['DONOR']}>
                  <DonorDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/ngo/dashboard" element={
                <ProtectedRoute allowedRoles={['NGO']}>
                  <NGODashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white text-center py-4">
            <p>&copy; {new Date().getFullYear()} ShareBite. All rights reserved.</p>
          </footer>
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
