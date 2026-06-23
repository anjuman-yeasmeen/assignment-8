import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col justify-center items-center px-4">
            <div className="text-center max-w-md space-y-6">
                
                {/* 404 Large Text */}
                <h1 className="text-9xl font-black text-orange-500 tracking-widest animate-bounce">
                    404
                </h1>
                
                {/* Error Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Illustration / Icon */}
                <div className="text-6xl py-4">
                    🔍
                </div>

                {/* Back to Home Button */}
                <div>
                    <Link 
                        href="/" 
                        className="btn bg-orange-500 hover:bg-orange-600 text-white border-none font-bold px-8 shadow-lg shadow-orange-200 transition-all duration-200"
                    >
                        Back to Homepage
                    </Link>
                </div>
                
            </div>
        </div>
    );
};

export default NotFoundPage;