import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brown/90 backdrop-blur-md text-sand' : 'bg-brown text-sand'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Left - Logo */}
                    <div className="flex items-center flex-1">
                        <Link to="/" className={`text-3xl font-serif font-bold tracking-tight text-sand hover:text-terracotta flex items-center gap-2`}>
                            ShareBite <span className="text-2xl">🌾</span>
                        </Link>
                    </div>

                    {/* Center - Nav Links */}
                    <div className="hidden md:flex items-center justify-center flex-1 space-x-8 font-medium">
                        <Link to="/" className={`hover:text-terracotta transition text-sand`}>Home</Link>
                        <Link to="/listings" className={`hover:text-terracotta transition text-sand`}>Browse Food</Link>
                        <Link to="/about" className={`hover:text-terracotta transition text-sand`}>About</Link>
                    </div>

                    {/* Right - Auth / Contact Button */}
                    <div className="hidden md:flex items-center justify-end flex-1 space-x-6">
                        {user ? (
                            <>
                                {user.role === 'DONOR' && <Link to="/donor/dashboard" className={`hover:text-terracotta font-medium text-brown`}>Dashboard</Link>}
                                {user.role === 'NGO' && <Link to="/ngo/dashboard" className={`hover:text-terracotta font-medium text-brown`}>Dashboard</Link>}
                                {user.role === 'ADMIN' && <Link to="/admin/dashboard" className={`hover:text-terracotta font-medium text-brown`}>Admin</Link>}
                                <button onClick={handleLogout} className={`flex items-center space-x-1 hover:text-red-600 font-semibold transition text-brown`}>
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`hover:text-terracotta font-semibold transition text-brown`}>Log In</Link>
                                <Link to="/register" className="btn-primary whitespace-nowrap">
                                    Join Now
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className={`focus:outline-none text-brown`}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="md:hidden bg-brown shadow-xl absolute top-20 left-0 w-full text-sand border-t border-border flex flex-col px-4 py-6 space-y-4">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="block font-medium hover:text-terracotta">Home</Link>
                    <Link to="/listings" onClick={() => setIsMenuOpen(false)} className="block font-medium hover:text-terracotta">Browse Food</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block font-medium hover:text-terracotta">About</Link>

                    <div className="border-t border-[#D4C4B0] pt-4 mt-2 space-y-4">
                        {user ? (
                            <>
                                {user.role === 'DONOR' && <Link to="/donor/dashboard" onClick={() => setIsMenuOpen(false)} className="block font-medium hover:text-terracotta">Dashboard</Link>}
                                {user.role === 'NGO' && <Link to="/ngo/dashboard" onClick={() => setIsMenuOpen(false)} className="block font-medium hover:text-terracotta">Dashboard</Link>}
                                {user.role === 'ADMIN' && <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="block font-medium hover:text-terracotta">Admin</Link>}
                                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 font-semibold w-full text-left">
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-3">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn-secondary w-full text-center">Log In</Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary w-full text-center">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
