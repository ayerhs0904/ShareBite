import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, TrendingUp, ArrowRight, ShieldCheck, Clock, Recycle } from 'lucide-react';

const StatCounter = ({ end, label, icon: Icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start > end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [end]);

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-[#D4C4B0] transform transition duration-500 hover:-translate-y-2 hover:shadow-md">
            <div className="p-4 bg-terracotta/10 rounded-full mb-4 text-terracotta">
                <Icon size={32} />
            </div>
            <h3 className="text-4xl font-serif font-bold text-brown mb-2">{count.toLocaleString()}+</h3>
            <p className="text-gray-500 font-medium">{label}</p>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="font-sans min-h-screen bg-warmbeige flex flex-col">
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-sand">
                <div className="absolute inset-0 bg-gradient-to-br from-sand to-warmbeige z-0"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-terracotta/20 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-brown/10 rounded-full blur-[80px] opacity-60 pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta font-semibold text-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse"></span>
                        Join the Zero Waste Movement
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-brown tracking-tight mb-8 leading-tight">
                        Don't Throw. <br className="hidden md:block" />
                        <span className="text-terracotta">Share the Bite.</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-xl text-gray-700 mb-10 leading-relaxed">
                        Connect surplus food with those who need it most. Join our ecosystem of donors, NGOs, and volunteers making a real difference in your community.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register" className="btn-primary w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-2">
                            Start Sharing <ArrowRight size={20} />
                        </Link>
                        <Link to="/listings" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4 bg-white">
                            Browse Food
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-warmbeige">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-20">
                        <StatCounter end={12500} label="Meals Saved" icon={Heart} />
                        <StatCounter end={340} label="Active Donors" icon={Users} />
                        <StatCounter end={150} label="Partner NGOs" icon={ShieldCheck} />
                        <StatCounter end={45} label="Cities Covered" icon={MapPin} />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-warmbeige">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-brown mb-4">How It Works</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Three simple steps to make a huge impact on food waste and hunger in your community.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-sand -z-10"></div>
                        
                        <div className="card p-8 text-center bg-white z-10">
                            <div className="w-16 h-16 mx-auto bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
                            <div className="mx-auto w-20 h-20 bg-sand text-brown rounded-full flex items-center justify-center mb-6">
                                <Clock size={40} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brown mb-4">Post Surplus</h3>
                            <p className="text-gray-600">Restaurants and individuals list their fresh, excess food that would otherwise go to waste.</p>
                        </div>

                        <div className="card p-8 text-center bg-white z-10">
                            <div className="w-16 h-16 mx-auto bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
                            <div className="mx-auto w-20 h-20 bg-sand text-brown rounded-full flex items-center justify-center mb-6">
                                <ShieldCheck size={40} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brown mb-4">NGOs Claim</h3>
                            <p className="text-gray-600">Verified NGOs and charities get notified immediately and claim the food they need.</p>
                        </div>

                        <div className="card p-8 text-center bg-white z-10">
                            <div className="w-16 h-16 mx-auto bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
                            <div className="mx-auto w-20 h-20 bg-sand text-brown rounded-full flex items-center justify-center mb-6">
                                <Recycle size={40} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brown mb-4">Zero Waste</h3>
                            <p className="text-gray-600">Food is distributed to those in need, reducing environmental impact and fighting hunger.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-24 bg-terracotta relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -mr-40 -mt-40"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to make a difference?</h2>
                    <p className="text-sand text-xl mb-10">Join thousands of others who are actively reducing food waste every single day.</p>
                    <Link to="/register" className="btn-secondary bg-white text-terracotta border-none text-lg px-10 py-4 inline-block hover:scale-105">
                        Create Your Account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-brown text-sand py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <Link to="/" className="text-3xl font-serif font-bold tracking-tight text-white hover:text-terracotta transition flex items-center gap-2">
                                ShareBite <span className="text-2xl">🌾</span>
                            </Link>
                            <p className="text-sand/80 mt-2">Nourishing communities, together.</p>
                        </div>
                        <div className="flex gap-6">
                            <Link to="/about" className="hover:text-terracotta transition">About</Link>
                            <Link to="/contact" className="hover:text-terracotta transition">Contact</Link>
                            <Link to="/privacy" className="hover:text-terracotta transition">Privacy</Link>
                            <Link to="/terms" className="hover:text-terracotta transition">Terms</Link>
                        </div>
                    </div>
                    <div className="border-t border-sand/20 mt-8 pt-8 text-center text-sand/60 text-sm">
                        &copy; {new Date().getFullYear()} ShareBite. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Add simple animation CSS dynamically */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}} />
        </div>
    );
};

export default LandingPage;
