import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { Users, Utensils, CheckCircle, LayoutDashboard, Settings, Activity, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, activeListings: 0, completedClaims: 0 });
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setStats(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-warmbeige flex font-sans pt-20">
            {/* Sidebar */}
            <aside className="w-64 bg-brown border-r border-[#D4C4B0] hidden md:flex flex-col fixed h-[calc(100vh-5rem)]">
                <div className="p-6 border-b border-[#D4C4B0]/20">
                    <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                        <ShieldCheck size={24} className="text-terracotta" /> Admin Portal
                    </h2>
                    <p className="text-sm text-sand mt-1">System Overview</p>
                </div>
                
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-terracotta text-white font-semibold transition">
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sand hover:bg-white/10 transition">
                        <Users size={20} /> User Management
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sand hover:bg-white/10 transition">
                        <Activity size={20} /> Activity Logs
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sand hover:bg-white/10 transition mt-auto">
                        <Settings size={20} /> Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 lg:p-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-brown mb-2">Platform Statistics</h1>
                    <p className="text-gray-600">Overview of ShareBite system metrics and performance.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card bg-sand p-8 border-l-4 border-l-terracotta relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-white/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-white/50 text-terracotta flex items-center justify-center mb-4">
                                <Users size={28} />
                            </div>
                            <p className="text-brown text-sm font-semibold tracking-wider uppercase mb-1">Total Users</p>
                            <p className="text-4xl font-bold text-brown">{stats.totalUsers}</p>
                        </div>
                    </div>
                    
                    <div className="card bg-sand p-8 border-l-4 border-l-terracotta relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-white/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-white/50 text-terracotta flex items-center justify-center mb-4">
                                <Utensils size={28} />
                            </div>
                            <p className="text-brown text-sm font-semibold tracking-wider uppercase mb-1">Active Listings</p>
                            <p className="text-4xl font-bold text-brown">{stats.activeListings}</p>
                        </div>
                    </div>

                    <div className="card bg-sand p-8 border-l-4 border-l-terracotta relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-white/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-full bg-white/50 text-terracotta flex items-center justify-center mb-4">
                                <CheckCircle size={28} />
                            </div>
                            <p className="text-brown text-sm font-semibold tracking-wider uppercase mb-1">Completed Claims</p>
                            <p className="text-4xl font-bold text-brown">{stats.completedClaims}</p>
                        </div>
                    </div>
                </div>
                
                {/* Placeholder for Data Tables */}
                <div className="mt-12">
                    <h2 className="text-2xl font-serif font-bold text-brown mb-6">Recent Activity</h2>
                    <div className="card overflow-hidden bg-white">
                        <div className="p-12 text-center text-brown flex flex-col items-center">
                            <Activity size={48} className="text-terracotta/50 mb-4" />
                            <p className="text-lg font-medium">Activity logs will appear here</p>
                            <p className="text-sm">Connect to the audit service to view real-time events.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
