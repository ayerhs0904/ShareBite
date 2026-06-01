import { useState, useEffect, useContext } from 'react';
import api from '../api';
import FoodCard from '../components/FoodCard';
import { Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PublicListings = () => {
    const [listings, setListings] = useState([]);
    const [query, setQuery] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchListings = async (searchQuery = '') => {
        try {
            const endpoint = searchQuery ? `/listings/search?query=${searchQuery}` : '/listings/public';
            const res = await api.get(endpoint);
            setListings(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchListings(query);
    };

    const handleClaim = async (listingId) => {
        if (!user) {
            toast.info("Please login as an NGO to claim food.");
            navigate('/login');
            return;
        }
        try {
            await api.post(`/claims/request?ngoId=${user.id}&listingId=${listingId}`);
            toast.success("Food claimed successfully!");
            fetchListings(); // Refresh list
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to claim food.");
        }
    };

    return (
        <div className="min-h-screen pt-28 pb-10 bg-warmbeige">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-brown mb-4 md:mb-0">Available Food</h1>
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <input 
                            type="text" 
                            placeholder="Search food listings..." 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-[#D4C4B0] rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta bg-white text-brown"
                        />
                        <Search className="absolute left-3 top-2.5 text-terracotta" size={20} />
                    </form>
                </div>

                {listings.length === 0 ? (
                    <div className="text-center py-20 bg-sand rounded-lg shadow-sm border border-[#D4C4B0]">
                        <p className="text-xl text-brown">No available food listings right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map(listing => (
                            <FoodCard key={listing.id} listing={listing} onClaim={handleClaim} userRole={user?.role} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicListings;
