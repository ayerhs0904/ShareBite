import { useState, useEffect } from 'react';
import api from '../api';
import { Users, Utensils, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, activeListings: 0, completedClaims: 0 });

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <Users size={32} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-semibold uppercase">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-emerald-500 flex items-center">
                    <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 mr-4">
                        <Utensils size={32} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-semibold uppercase">Active Listings</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.activeListings}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                        <CheckCircle size={32} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm font-semibold uppercase">Completed Claims</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.completedClaims}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
