import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { CheckSquare, LayoutDashboard, Clock, CheckCircle, Search, MapPin, Building2, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const NGODashboard = () => {
    const { user } = useContext(AuthContext);
    const [claims, setClaims] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');

    const fetchClaims = async () => {
        try {
            const res = await api.get(`/claims/ngo/${user.id}`);
            setClaims(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(user?.id) fetchClaims();
    }, [user]);

    const handleCompleteClaim = async (claimId) => {
        try {
            await api.put(`/claims/${claimId}/complete`);
            toast.success("Food collection marked as completed!");
            fetchClaims();
        } catch (error) {
            toast.error("Failed to complete claim.");
        }
    };

    const pendingClaims = claims.filter(c => c.status === 'PENDING').length;
    const confirmedClaims = claims.filter(c => c.status === 'CONFIRMED').length;
    const completedClaims = claims.filter(c => c.status === 'COMPLETED').length;

    return (
        <div className="min-h-screen bg-warmbeige flex font-sans pt-20">
            {/* Sidebar */}
            <aside className="w-64 bg-brown border-r border-[#D4C4B0] hidden md:flex flex-col fixed h-[calc(100vh-5rem)]">
                <div className="p-6 border-b border-[#D4C4B0]/20">
                    <h2 className="text-xl font-serif font-bold text-white">NGO Portal</h2>
                    <p className="text-sm text-sand mt-1">Manage food collections</p>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'overview' ? 'bg-terracotta text-white font-semibold' : 'text-sand hover:bg-white/10'}`}
                    >
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <Link 
                        to="/listings"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sand hover:bg-white/10"
                    >
                        <Search size={20} /> Browse Food
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 lg:p-10">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="card p-6 flex items-center gap-4 border-l-4 border-l-terracotta bg-sand">
                        <div className="p-3 bg-white/50 text-terracotta rounded-xl">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-brown font-medium">Awaiting Confirmation</p>
                            <h3 className="text-2xl font-bold text-brown">{pendingClaims}</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-4 border-l-4 border-l-terracotta bg-sand">
                        <div className="p-3 bg-white/50 text-terracotta rounded-xl">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-brown font-medium">Ready for Pickup</p>
                            <h3 className="text-2xl font-bold text-brown">{confirmedClaims}</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-4 border-l-4 border-l-terracotta bg-sand">
                        <div className="p-3 bg-white/50 text-terracotta rounded-xl">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-brown font-medium">Total Collected</p>
                            <h3 className="text-2xl font-bold text-brown">{completedClaims}</h3>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-serif font-bold text-brown">My Claims</h2>
                            <Link to="/listings" className="btn-secondary text-sm">
                                Find More Food
                            </Link>
                        </div>
                        
                        <div className="space-y-4">
                            {claims.map(c => (
                                <div key={c.id} className="card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="p-3 bg-warmbeige text-terracotta rounded-xl hidden sm:block">
                                            <Package size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-brown">{c.foodListing?.title}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                                                <span className="flex items-center gap-1"><Building2 size={14} /> Donor ID: {c.foodListing?.donor?.id}</span>
                                                <span className="flex items-center gap-1"><Package size={14} /> {c.foodListing?.quantity}</span>
                                                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(c.timestamp).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase w-full sm:w-auto text-center ${
                                            c.status === 'PENDING' ? 'bg-sand text-brown' :
                                            c.status === 'CONFIRMED' ? 'bg-sand text-brown' :
                                            'bg-terracotta/10 text-terracotta'
                                        }`}>
                                            {c.status}
                                        </span>
                                        
                                        {c.status === 'CONFIRMED' && (
                                            <button 
                                                onClick={() => handleCompleteClaim(c.id)}
                                                className="btn-primary w-full sm:w-auto py-2 whitespace-nowrap flex items-center justify-center gap-2"
                                            >
                                                <CheckSquare size={16}/> Mark Collected
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            
                            {claims.length === 0 && (
                                <div className="card p-12 text-center flex flex-col items-center bg-white">
                                    <Package size={48} className="text-gray-400 mb-4" />
                                    <h3 className="text-xl font-bold text-brown mb-2">No active claims</h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                        You haven't claimed any food yet. Browse the public listings to find available surplus food in your area.
                                    </p>
                                    <Link to="/listings" className="btn-primary">
                                        Browse Food Listings
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default NGODashboard;
