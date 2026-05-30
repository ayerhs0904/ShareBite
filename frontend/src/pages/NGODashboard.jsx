import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { CheckSquare } from 'lucide-react';

const NGODashboard = () => {
    const { user } = useContext(AuthContext);
    const [claims, setClaims] = useState([]);

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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">NGO Dashboard</h1>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">My Claims</h2>
                    <p className="text-gray-500 text-sm mt-1">Track the status of food you have claimed.</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                    {claims.map(c => (
                        <div key={c.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 transition">
                            <div className="mb-4 sm:mb-0">
                                <h3 className="text-lg font-semibold text-gray-900">{c.foodListing?.title}</h3>
                                <p className="text-gray-600 text-sm">Donor ID: {c.foodListing?.donor?.id} • Quantity: {c.foodListing?.quantity}</p>
                                <p className="text-xs text-gray-500 mt-1">Claimed on: {new Date(c.timestamp).toLocaleString()}</p>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    c.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                    c.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {c.status}
                                </span>
                                
                                {c.status === 'CONFIRMED' && (
                                    <button 
                                        onClick={() => handleCompleteClaim(c.id)}
                                        className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700 transition"
                                    >
                                        <CheckSquare size={16} className="mr-2"/> Collected
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {claims.length === 0 && (
                        <div className="p-10 text-center text-gray-500">
                            You haven't claimed any food yet. Browse the public listings to find available surplus food.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NGODashboard;
