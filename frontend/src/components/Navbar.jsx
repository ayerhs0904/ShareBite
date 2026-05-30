import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-[#00A86B] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    
                    {/* Left - Logo */}
                    <div className="flex items-center flex-1">
                        <Link to="/" className="text-2xl font-black tracking-tight text-white hover:opacity-90">ShareBite.</Link>
                    </div>
                    
                    {/* Center - Nav Links */}
                    <div className="hidden md:flex items-center justify-center flex-1 space-x-8 font-medium">
                        <Link to="/" className="text-white hover:text-emerald-200 transition">Home</Link>
                        <Link to="/listings" className="text-white hover:text-emerald-200 transition">Browse Food</Link>
                        <Link to="/about" className="text-white hover:text-emerald-200 transition">About</Link>
                    </div>

                    {/* Right - Auth / Contact Button */}
                    <div className="flex items-center justify-end flex-1 space-x-6">
                        {user ? (
                            <>
                                {user.role === 'DONOR' && <Link to="/donor/dashboard" className="hidden sm:block text-white hover:text-emerald-200 font-medium">Dashboard</Link>}
                                {user.role === 'NGO' && <Link to="/ngo/dashboard" className="hidden sm:block text-white hover:text-emerald-200 font-medium">Dashboard</Link>}
                                {user.role === 'ADMIN' && <Link to="/admin/dashboard" className="hidden sm:block text-white hover:text-emerald-200 font-medium">Admin</Link>}
                                <button onClick={handleLogout} className="flex items-center space-x-1 text-white hover:text-emerald-200 font-semibold transition">
                                    <LogOut size={18} />
                                    <span className="hidden sm:block">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:text-emerald-200 font-semibold hidden sm:block transition">Log In</Link>
                                <Link to="/register" className="bg-[#E8943A] text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-600 transition shadow-md whitespace-nowrap">
                                    Contact Us
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
