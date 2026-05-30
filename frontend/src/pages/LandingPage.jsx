import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-[#00A86B] min-h-[calc(100vh-5rem)] flex items-center font-sans overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    
                    {/* Left Content */}
                    <div className="lg:w-1/2 pt-12 pb-24 lg:pt-0 lg:pb-0 z-10 text-white">
                        <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-6">
                            <span className="text-sm font-semibold tracking-wide text-white">🔥 surplus food rescue</span>
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                            Don't throw,<br />
                            <span className="text-white">Send it to us.</span>
                        </h1>
                        
                        <p className="text-emerald-50 text-lg sm:text-xl mb-10 max-w-lg leading-relaxed font-medium opacity-90">
                            Connect your surplus food with those who need it most. Join our ecosystem of donors, NGOs, and volunteers creating a zero-waste community.
                        </p>
                        
                        <div className="flex items-center space-x-4">
                            <Link to="/register" className="bg-[#E8943A] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d68532] hover:shadow-xl transition transform hover:-translate-y-1">
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Isometric Illustration */}
                    <div className="lg:w-1/2 relative w-full h-[400px] sm:h-[500px] lg:h-[700px] flex justify-end items-center">
                        {/* Decorative Background Blob/Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-emerald-400/30 rounded-full blur-[100px]"></div>
                        
                        {/* Custom Isometric SVG Layout */}
                        <div className="relative w-full h-full max-w-[700px] lg:mr-[-15%] drop-shadow-2xl flex justify-center items-center">
                            <svg viewBox="0 0 800 600" className="w-full h-full" xmlns="http://www.w3.org/2001/XMLSchema-instance">
                                {/* Base Platform */}
                                <g transform="translate(400, 350) scale(1.6)">
                                    {/* Floor */}
                                    <path d="M 0 0 L 160 -80 L 0 -160 L -160 -80 Z" fill="#008a57" />
                                    <path d="M -160 -80 L 0 0 L 0 20 L -160 -60 Z" fill="#006b43" />
                                    <path d="M 160 -80 L 0 0 L 0 20 L 160 -60 Z" fill="#005233" />
                                    
                                    {/* Main Market Stall */}
                                    <path d="M -60 -80 L 60 -140 L 0 -170 L -120 -110 Z" fill="#ffffff" />
                                    <path d="M -120 -110 L -60 -80 L -60 -20 L -120 -50 Z" fill="#e5e7eb" />
                                    <path d="M 60 -140 L -60 -80 L -60 -20 L 60 -80 Z" fill="#d1d5db" />
                                    
                                    {/* Orange Awning/Roof */}
                                    <path d="M -70 -140 L 50 -200 L -10 -230 L -130 -170 Z" fill="#E8943A" />
                                    <path d="M -130 -170 L -70 -140 L -70 -130 L -130 -160 Z" fill="#c2772b" />
                                    <path d="M 50 -200 L -70 -140 L -70 -130 L 50 -190 Z" fill="#a66524" />

                                    {/* Vendor Counter */}
                                    <path d="M -40 -70 L 40 -110 L 10 -125 L -70 -85 Z" fill="#E8943A" />
                                    <path d="M -70 -85 L -40 -70 L -40 -40 L -70 -55 Z" fill="#c2772b" />
                                    <path d="M 40 -110 L -40 -70 L -40 -40 L 40 -80 Z" fill="#a66524" />

                                    {/* Chef Isometric Character */}
                                    <g transform="translate(0, -95)">
                                        <path d="M 0 0 L 12 -6 L 0 -12 L -12 -6 Z" fill="#ffffff" />
                                        <path d="M -12 -6 L 0 0 L 0 25 L -12 19 Z" fill="#f3f4f6" />
                                        <path d="M 12 -6 L 0 0 L 0 25 L 12 19 Z" fill="#e5e7eb" />
                                        <path d="M 0 -25 L 10 -30 L 0 -35 L -10 -30 Z" fill="#ffffff" />
                                        <path d="M -10 -30 L 0 -25 L 0 -12 L -10 -17 Z" fill="#e5e7eb" />
                                        <path d="M 10 -30 L 0 -25 L 0 -12 L 10 -17 Z" fill="#d1d5db" />
                                    </g>

                                    {/* Food Boxes/Crates */}
                                    <g transform="translate(-90, -40)">
                                        <path d="M 0 0 L 25 -12.5 L 0 -25 L -25 -12.5 Z" fill="#FCD34D" />
                                        <path d="M -25 -12.5 L 0 0 L 0 20 L -25 7.5 Z" fill="#FBBF24" />
                                        <path d="M 25 -12.5 L 0 0 L 0 20 L 25 7.5 Z" fill="#F59E0B" />
                                    </g>
                                    <g transform="translate(-50, -20)">
                                        <path d="M 0 0 L 25 -12.5 L 0 -25 L -25 -12.5 Z" fill="#10B981" />
                                        <path d="M -25 -12.5 L 0 0 L 0 20 L -25 7.5 Z" fill="#059669" />
                                        <path d="M 25 -12.5 L 0 0 L 0 20 L 25 7.5 Z" fill="#047857" />
                                    </g>

                                    {/* Customer / NGO Person */}
                                    <g transform="translate(-30, -30)">
                                        <path d="M 0 0 L 10 -5 L 0 -10 L -10 -5 Z" fill="#E8943A" />
                                        <path d="M -10 -5 L 0 0 L 0 25 L -10 20 Z" fill="#c2772b" />
                                        <path d="M 10 -5 L 0 0 L 0 25 L 10 20 Z" fill="#a66524" />
                                        <path d="M 0 -20 L 7 -23 L 0 -27 L -7 -23 Z" fill="#FCA5A5" />
                                        <path d="M -7 -23 L 0 -20 L 0 -10 L -7 -13 Z" fill="#F87171" />
                                        <path d="M 7 -23 L 0 -20 L 0 -10 L 7 -13 Z" fill="#EF4444" />
                                    </g>
                                    
                                    {/* Decorative Plants */}
                                    <g transform="translate(90, -50)">
                                        <path d="M 0 0 L 15 -7.5 L 0 -15 L -15 -7.5 Z" fill="#ffffff" />
                                        <path d="M -15 -7.5 L 0 0 L 0 15 L -15 7.5 Z" fill="#e5e7eb" />
                                        <path d="M 15 -7.5 L 0 0 L 0 15 L 15 7.5 Z" fill="#d1d5db" />
                                        <path d="M 0 -15 C -20 -30, -10 -40, 0 -50 C 10 -40, 20 -30, 0 -15" fill="#4ade80" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
