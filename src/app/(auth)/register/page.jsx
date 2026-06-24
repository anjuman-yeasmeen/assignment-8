"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client"; // আপনার প্রজেক্টের সঠিক BetterAuth ক্লায়েন্ট পাথ দিবেন

const RegisterPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const photoUrl = formData.get('photoUrl');
        const password = formData.get('password');

        // BetterAuth SignUp API Call
        await authClient.signUp.email({
            email,
            password,
            name,
            image: photoUrl, // BetterAuth-এ ছবির জন্য 'image' ফিল্ড ব্যবহার করা হয়
        }, {
            onRequest: () => setLoading(true),
            onSuccess: () => {
                setLoading(false);
                // রিকোয়ারমেন্ট অনুযায়ী সাকসেস হলে লগইন পেজে নিয়ে যাবে
                router.push('/login'); 
            },
            onError: (ctx) => {
                setLoading(false);
                // রিকোয়ারমেন্ট অনুযায়ী এরর মেসেজ ফর্মে শো করা হবে
                setErrorMessage(ctx.error.message || "Registration failed. Please try again.");
            }
        });
    };

    // Google Social Login Handler
    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/", // লগইন সাকসেস হলে হোম পেজে নিয়ে যাবে
        });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-orange-50">
                
                {/* Title */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Create Your Account 
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Join SunCart to explore premium summer essentials
                    </p>
                </div>

                {/* Error Alert Box */}
                {errorMessage && (
                    <div className="alert alert-error bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">
                        <span className="font-medium">⚠️ {errorMessage}</span>
                    </div>
                )}

                {/* Registration Form */}
                <form className="mt-6 space-y-4" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-gray-600">Full Name</span>
                        </label>
                        <input 
                            name="name"
                            type="text" 
                            placeholder="John Doe" 
                            className="input input-bordered w-full focus:border-orange-400" 
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-gray-600">Email Address</span>
                        </label>
                        <input 
                            name="email"
                            type="email" 
                            placeholder="example@mail.com" 
                            className="input input-bordered w-full focus:border-orange-400" 
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-gray-600">Photo URL</span>
                        </label>
                        <input 
                            name="photoUrl"
                            type="url" 
                            placeholder="https://example.com/avatar.jpg" 
                            className="input input-bordered w-full focus:border-orange-400" 
                            required 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text font-semibold text-gray-600">Password</span>
                        </label>
                        <input 
                            name="password"
                            type="password" 
                            placeholder="••••••••" 
                            className="input input-bordered w-full focus:border-orange-400" 
                            required 
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn bg-orange-500 hover:bg-orange-600 text-white w-full border-none font-bold text-base shadow-md shadow-orange-100 transition-all duration-200"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "Register Now"}
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="divider text-xs text-gray-400 uppercase tracking-wider my-6">Or Sign Up With</div>

                {/* Social Login Button (Google Only) */}
                <div>
                    <button 
                        onClick={handleGoogleLogin}
                        type="button"
                        className="btn btn-outline border-gray-300 hover:bg-gray-50 hover:text-gray-700 w-full flex items-center justify-center gap-3 font-semibold text-gray-600"
                    >
                        {/* Google Icon SVG */}
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.97 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.6 2.8C6.01 7.22 8.78 5.04 12 5.04z"/>
                            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.87c2.16-1.99 3.44-4.92 3.44-8.55z"/>
                            <path fill="#FBBC05" d="M5.1 14.7c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3L1.5 7.3C.54 9.22 0 11.35 0 13.6c0 2.25.54 4.38 1.5 6.3l3.6-2.8l-.01-.4z"/>
                            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.69-2.87c-1.02.68-2.33 1.09-3.96 1.09-3.22 0-5.99-2.18-6.91-5.26l-3.6 2.8C3.4 20.35 7.35 23 12 23z"/>
                        </svg>
                        Continue with Google
                    </button>
                </div>

                {/* Redirect to Login */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="font-bold text-orange-500 hover:text-orange-600 transition-colors">
                        Login Here
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default RegisterPage;