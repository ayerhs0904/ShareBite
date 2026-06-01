import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { ArrowRight, Leaf, HeartHandshake, Building2 } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'DONOR', phone: '', address: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/auth/register', formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed.');
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
                        Join the community. Save food.
                    </h1>
                    <p className="text-sand text-xl leading-relaxed">
                        Whether you have extra food to share or you represent an organization that can distribute it, your contribution matters.
                    </p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 overflow-y-auto max-h-screen py-20">
                <div className="w-full max-w-lg my-auto">
                    <div className="lg:hidden mb-10 text-center mt-10">
                        <Link to="/" className="text-3xl font-serif font-bold text-terracotta flex items-center justify-center gap-2">
                            ShareBite <span className="text-2xl">🌾</span>
                        </Link>
                    </div>
                    
                    <div className="card p-8 sm:p-10">
                        <h2 className="text-3xl font-serif font-bold text-brown mb-2">Create Account</h2>
                        <p className="text-gray-500 mb-8">Join thousands making a difference today.</p>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            
                            {/* Role Selection Toggle */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">I am signing up as a...</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div 
                                        onClick={() => handleRoleSelect('DONOR')}
                                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition duration-200 ${formData.role === 'DONOR' ? 'border-terracotta bg-terracotta/10 text-terracotta' : 'border-gray-200 hover:border-terracotta/30 bg-white text-brown'}`}
                                    >
                                        <HeartHandshake size={28} className="mb-2" />
                                        <span className="font-bold text-sm">Donor</span>
                                        <span className="text-xs text-gray-500 mt-1">Restaurant / Individual</span>
                                    </div>
                                    <div 
                                        onClick={() => handleRoleSelect('NGO')}
                                        className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition duration-200 ${formData.role === 'NGO' ? 'border-terracotta bg-terracotta/10 text-terracotta' : 'border-gray-200 hover:border-terracotta/30 bg-white text-brown'}`}
                                    >
                                        <Building2 size={28} className="mb-2" />
                                        <span className="font-bold text-sm">NGO</span>
                                        <span className="text-xs text-gray-500 mt-1">Food Bank / Charity</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <input name="name" type="text" required className="input-field" placeholder={formData.role === 'DONOR' ? "Restaurant / Your Name" : "Organization Name"} onChange={handleChange} value={formData.name} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input name="email" type="email" required className="input-field" placeholder="Email Address" onChange={handleChange} value={formData.email} />
                                    <input name="phone" type="text" className="input-field" placeholder="Phone Number" onChange={handleChange} value={formData.phone} />
                                </div>
                                <div>
                                    <input name="password" type="password" required className="input-field" placeholder="Password" onChange={handleChange} value={formData.password} />
                                </div>
                                <div>
                                    <input name="address" type="text" className="input-field" placeholder="Full Physical Address" onChange={handleChange} value={formData.address} />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="btn-primary w-full py-3 flex justify-center items-center gap-2 text-lg mt-8"
                            >
                                {isLoading ? 'Creating Account...' : 'Register'} <ArrowRight size={20} />
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <span className="text-gray-500">Already have an account? </span>
                            <Link to="/login" className="font-semibold text-terracotta hover:text-terracotta-dark transition">Sign in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
