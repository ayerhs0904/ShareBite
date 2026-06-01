import { Calendar, Package, Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const FoodCard = ({ listing, onClaim, userRole }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isExpiringSoon, setIsExpiringSoon] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            const expiry = new Date(listing.expiryDate).getTime();
            const now = new Date().getTime();
            const difference = expiry - now;

            if (difference > 0) {
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${hours}h ${minutes}m`);
                setIsExpiringSoon(difference < 2 * 60 * 60 * 1000); // Less than 2 hours
            } else {
                setTimeLeft('Expired');
                setIsExpiringSoon(true);
            }
        };

        updateTimer();
        const timerId = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(timerId);
    }, [listing.expiryDate]);

    // Simple heuristic to assign an emoji based on title (fallback to standard meal)
    const getEmoji = (title) => {
        const t = title.toLowerCase();
        if (t.includes('pizza') || t.includes('italian')) return '🍕';
        if (t.includes('bread') || t.includes('bakery') || t.includes('pastry')) return '🥐';
        if (t.includes('fruit') || t.includes('apple') || t.includes('banana')) return '🍎';
        if (t.includes('veg')) return '🥦';
        if (t.includes('meat') || t.includes('chicken')) return '🍗';
        return '🍱';
    };

    return (
        <div className="card overflow-hidden flex flex-col h-full bg-white">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl" role="img" aria-label="food category">
                            {getEmoji(listing.title)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                            listing.status === 'AVAILABLE' ? 'bg-terracotta/10 text-terracotta' :
                            listing.status === 'CLAIMED' ? 'bg-sand text-brown' :
                            'bg-red-100 text-red-600'
                        }`}>
                            {listing.status}
                        </span>
                    </div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-brown mb-2 leading-tight">{listing.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{listing.description}</p>
                
                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm font-medium text-brown bg-warmbeige p-2 rounded-lg">
                        <Package size={16} className="text-terracotta mr-2" />
                        <span>Quantity: {listing.quantity}</span>
                    </div>
                    <div className={`flex items-center text-sm font-medium p-2 rounded-lg ${isExpiringSoon && listing.status === 'AVAILABLE' ? 'bg-red-50 text-red-600' : 'bg-warmbeige text-brown'}`}>
                        <Clock size={16} className={`${isExpiringSoon && listing.status === 'AVAILABLE' ? 'text-red-500' : 'text-terracotta'} mr-2`} />
                        <span>Expires in: {timeLeft}</span>
                    </div>
                </div>
            </div>
            
            {userRole === 'NGO' && listing.status === 'AVAILABLE' && (
                <div className="p-5 pt-0 mt-auto">
                    <button 
                        onClick={() => onClaim(listing.id)}
                        className="btn-primary w-full py-2.5"
                    >
                        Claim Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default FoodCard;
