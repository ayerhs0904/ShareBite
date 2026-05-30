import { Calendar, Package } from 'lucide-react';

const FoodCard = ({ listing, onClaim, userRole }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{listing.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        listing.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' :
                        listing.status === 'CLAIMED' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {listing.status}
                    </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Package size={16} className="mr-2" />
                    <span>Quantity: {listing.quantity}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>Expires: {new Date(listing.expiryDate).toLocaleString()}</span>
                </div>
                
                {userRole === 'NGO' && listing.status === 'AVAILABLE' && (
                    <button 
                        onClick={() => onClaim(listing.id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                    >
                        Claim Food
                    </button>
                )}
            </div>
        </div>
    );
};

export default FoodCard;
