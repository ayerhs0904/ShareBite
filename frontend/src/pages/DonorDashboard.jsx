import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { CheckCircle, LayoutDashboard, PlusCircle, List, Bell, LogOut, Package, Heart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [claims, setClaims] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', quantity: '', expiryDate: '' });
    const [activeTab, setActiveTab] = useState('overview'); // overview, create, requests

    const fetchData = async () => {
        try {
            const listRes = await api.get(`/listings/donor/${user.id}`);
            setListings(listRes.data);
            const claimsRes = await api.get(`/claims/donor/${user.id}`);
            setClaims(claimsRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(user?.id) fetchData();
    }, [user]);

    const handleCreateListing = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/listings/donor/${user.id}`, formData);
            toast.success("Listing created!");
            setFormData({ title: '', description: '', quantity: '', expiryDate: '' });
            setActiveTab('overview');
            fetchData();
        } catch (error) {
            toast.error("Failed to create listing.");
        }
    };

    const handleConfirmClaim = async (claimId) => {
        try {
            await api.put(`/claims/${claimId}/confirm`);
            toast.success("Claim confirmed!");
            fetchData();
        } catch (error) {
            toast.error("Failed to confirm claim.");
        }
    };

    const pendingClaims = claims.filter(c => c.status === 'PENDING');
    const availableListings = listings.filter(l => l.status === 'AVAILABLE').length;
    const totalDonations = listings.filter(l => l.status === 'CLAIMED' || l.status === 'COMPLETED').length;

    return (
        <div className="min-h-screen bg-warmbeige flex font-sans pt-20">
            {/* Sidebar */}
            <aside className="w-64 bg-brown border-r border-[#D4C4B0] hidden md:flex flex-col fixed h-[calc(100vh-5rem)]">
                <div className="p-6 border-b border-[#D4C4B0]/20">
                    <h2 className="text-xl font-serif font-bold text-white">Donor Portal</h2>
                    <p className="text-sm text-sand mt-1">Manage your food donations</p>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'overview' ? 'bg-terracotta text-white font-semibold' : 'text-sand hover:bg-white/10'}`}
                    >
                        <LayoutDashboard size={20} /> Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('create')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'create' ? 'bg-terracotta text-white font-semibold' : 'text-sand hover:bg-white/10'}`}
                    >
                        <PlusCircle size={20} /> New Donation
                    </button>
                    <button 
                        onClick={() => setActiveTab('requests')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${activeTab === 'requests' ? 'bg-terracotta text-white font-semibold' : 'text-sand hover:bg-white/10'}`}
                    >
                        <div className="flex items-center gap-3">
                            <Bell size={20} /> Requests
                        </div>
                        {pendingClaims.length > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{pendingClaims.length}</span>
                        )}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 lg:p-10">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="card p-6 flex items-center gap-4 border-l-4 border-l-terracotta bg-sand">
                        <div className="p-3 bg-white/50 text-terracotta rounded-xl">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-brown font-medium">Active Listings</p>
                            <h3 className="text-2xl font-bold text-brown">{availableListings}</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-4 border-l-4 border-l-terracotta bg-sand">
                        <div className="p-3 bg-white/50 text-terracotta rounded-xl">
                            <Bell size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-brown font-medium">Pending Requests</p>
                            <h3 className="text-2xl font-bold text-brown">{pendingClaims.length}</h3>
                        </div>
                    </div>
                    <div className="card p-6 flex items-center gap-4 border-l-4 border-l-terracotta bg-sand">
                        <div className="p-3 bg-white/50 text-terracotta rounded-xl">
                            <Heart size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-brown font-medium">Total Donations</p>
                            <h3 className="text-2xl font-bold text-brown">{totalDonations}</h3>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-serif font-bold text-brown">My Listings</h2>
                            <button onClick={() => setActiveTab('create')} className="btn-secondary text-sm">
                                <PlusCircle size={16} className="inline mr-2" /> Add New
                            </button>
                        </div>
                        
                        <div className="card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-sand/30 border-b border-[#D4C4B0]">
                                            <th className="px-6 py-4 font-semibold text-brown text-sm">Item Details</th>
                                            <th className="px-6 py-4 font-semibold text-brown text-sm">Quantity</th>
                                            <th className="px-6 py-4 font-semibold text-brown text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#D4C4B0]/50">
                                        {listings.map(l => (
                                            <tr key={l.id} className="hover:bg-sand/10 transition">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-brown">{l.title}</p>
                                                    <p className="text-sm text-gray-600 line-clamp-1">{l.description}</p>
                                                </td>
                                                <td className="px-6 py-4 text-brown">{l.quantity}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${l.status==='AVAILABLE'?'bg-terracotta/10 text-terracotta':l.status==='CLAIMED'?'bg-sand text-brown':'bg-red-100 text-red-600'}`}>
                                                        {l.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {listings.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center text-gray-400">
                                                        <Package size={48} className="mb-4 opacity-50 text-brown" />
                                                        <p className="text-brown">You haven't posted any food yet.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'create' && (
                    <div className="animate-fade-in-up max-w-2xl">
                        <h2 className="text-2xl font-serif font-bold text-brown mb-6">Post Surplus Food</h2>
                        <div className="card p-8">
                            <form onSubmit={handleCreateListing} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-brown mb-1 ml-1">Title</label>
                                    <input type="text" placeholder="e.g., 50 Boxes of Sandwiches" required className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-brown mb-1 ml-1">Description</label>
                                    <textarea placeholder="Provide details about the food, condition, dietary info, etc." required className="input-field min-h-[100px] resize-y" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-brown mb-1 ml-1">Quantity</label>
                                    <input type="text" placeholder="e.g., 50 meals, 10kg, 2 trays" required className="input-field" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-brown mb-1 ml-1">Expiry Date & Time</label>
                                    <input type="datetime-local" required className="input-field" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
                                </div>
                                <button type="submit" className="btn-primary w-full py-3 mt-4 text-lg">Post Listing</button>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="animate-fade-in-up">
                        <h2 className="text-2xl font-serif font-bold text-brown mb-6">Pending Requests</h2>
                        
                        <div className="space-y-4">
                            {pendingClaims.map(c => (
                                <div key={c.id} className="card p-6 border-l-4 border-l-terracotta flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-terracotta/10 text-terracotta rounded-full hidden sm:block">
                                            <AlertCircle size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-brown">{c.foodListing.title}</h4>
                                            <p className="text-brown mt-1">
                                                Requested by <span className="font-semibold">{c.ngo.name}</span>
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">Requested at {new Date(c.createdAt || Date.now()).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleConfirmClaim(c.id)} className="btn-primary whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2">
                                        <CheckCircle size={18} /> Confirm Handover
                                    </button>
                                </div>
                            ))}
                            {pendingClaims.length === 0 && (
                                <div className="card p-12 text-center text-brown flex flex-col items-center">
                                    <CheckCircle size={48} className="text-terracotta mb-4" />
                                    <p className="text-lg font-bold">You're all caught up!</p>
                                    <p className="text-sm mt-1">No pending requests at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DonorDashboard;
