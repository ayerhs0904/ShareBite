import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { CheckCircle } from 'lucide-react';

const DonorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [claims, setClaims] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', quantity: '', expiryDate: '' });

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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Donor Dashboard</h1>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100 h-fit">
                    <h2 className="text-xl font-bold mb-4">Post Surplus Food</h2>
                    <form onSubmit={handleCreateListing} className="space-y-4">
                        <input type="text" placeholder="Title" required className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        <textarea placeholder="Description" required className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                        <input type="text" placeholder="Quantity (e.g., 50 meals, 10kg)" required className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Expiry Date & Time</label>
                            <input type="datetime-local" required className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
                        </div>
                        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded font-semibold hover:bg-emerald-700 transition">Create Listing</button>
                    </form>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-xl font-bold mb-4">My Listings</h2>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {listings.map(l => (
                                        <tr key={l.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{l.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{l.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${l.status==='AVAILABLE'?'bg-green-100 text-green-800':l.status==='CLAIMED'?'bg-yellow-100 text-yellow-800':'bg-red-100 text-red-800'}`}>
                                                    {l.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {listings.length === 0 && <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No listings yet.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Pending Claims (Action Required)</h2>
                        <div className="space-y-4">
                            {claims.filter(c => c.status === 'PENDING').map(c => (
                                <div key={c.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center border-l-4 border-yellow-400">
                                    <div>
                                        <p className="font-semibold text-gray-800">{c.foodListing.title}</p>
                                        <p className="text-sm text-gray-600">Requested by NGO ID: {c.ngo.id} ({c.ngo.name})</p>
                                    </div>
                                    <button onClick={() => handleConfirmClaim(c.id)} className="flex items-center text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-3 py-1 rounded">
                                        <CheckCircle size={16} className="mr-1" /> Confirm
                                    </button>
                                </div>
                            ))}
                            {claims.filter(c => c.status === 'PENDING').length === 0 && <p className="text-gray-500">No pending claims.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;
