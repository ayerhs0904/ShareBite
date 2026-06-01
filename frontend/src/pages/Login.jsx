import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { toast } from 'react-toastify';
import { ArrowRight, Leaf } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.token, res.data.id, res.data.role);
            toast.success('Logged in successfully!');
            
            if (res.data.role === 'DONOR') navigate('/donor/dashboard');
            else if (res.data.role === 'NGO') navigate('/ngo/dashboard');
            else if (res.data.role === 'ADMIN') navigate('/admin/dashboard');
            else navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please check credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-sans bg-warmbeige">
            {/* Left Panel - Brand Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-terracotta flex-col justify-center px-16 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10" 
                     style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
                </div>
                
                <div className="relative z-10 text-white max-w-xl">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-12 transition">
                        <ArrowRight className="rotate-180" size={20} /> Back to Home
                    </Link>
                    
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                        <Leaf size={32} className="text-white" />
                    </div>
                    
                    <h1 className="text-5xl font-serif font-bold leading-tight mb-6">
                        Welcome back to the movement.
                    </h1>
                    <p className="text-sand text-xl leading-relaxed">
                        Sign in to continue making a difference. Every meal shared brings us one step closer to a zero-waste world.
                    </p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-10 text-center">
                        <Link to="/" className="text-3xl font-serif font-bold text-terracotta flex items-center justify-center gap-2">
                            ShareBite <span className="text-2xl">🌾</span>
                        </Link>
                    </div>
                    
                    <div className="card p-8 sm:p-10">
                        <h2 className="text-3xl font-serif font-bold text-brown mb-2">Sign In</h2>
                        <p className="text-gray-500 mb-8">Enter your credentials to access your account.</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        required 
                                        className="input-field" 
                                        placeholder="you@example.com" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1 ml-1">
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                    </div>
                                    <input 
                                        type="password" 
                                        required 
                                        className="input-field" 
                                        placeholder="••••••••" 
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="btn-primary w-full py-3 flex justify-center items-center gap-2 text-lg mt-8"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight size={20} />
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <span className="text-gray-500">Don't have an account? </span>
                            <Link to="/register" className="font-semibold text-terracotta hover:text-terracotta-dark transition">Create one</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
