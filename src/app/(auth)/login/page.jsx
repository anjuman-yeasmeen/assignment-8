"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // npm install react-hot-toast করে নিন

const authClient = createAuthClient();

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ১. Email/Password লগইন ফাংশন
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/", // সফল হলে হোম পেজে যাবে
    }, {
      onSuccess: () => {
        toast.success("Login Successful!");
        router.push("/");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Login failed!");
      }
    });
    setLoading(false);
  };

  // ২. Google সোশ্যাল লগইন ফাংশন
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Login</h2>
          <p className="text-center text-gray-500 mb-6">Welcome back! Please enter your details.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered focus:border-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered focus:border-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className={`btn bg-orange-600 hover:bg-orange-700 text-white w-full border-none mt-4 ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider text-gray-400 text-sm">OR</div>

          {/* Social Login Button */}
          <button 
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center gap-2 hover:bg-gray-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-orange-600 font-bold hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;