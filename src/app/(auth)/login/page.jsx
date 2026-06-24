"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
// BetterAuth ক্লায়েন্ট ইমপোর্ট করা হলো (আপনার প্রজেক্টের পাথ অনুযায়ী প্রয়োজনে পরিবর্তন করুন)
import { authClient } from "@/lib/auth-client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // ১. ইউআরএল থেকে callbackUrl খুঁজে বের করুন, না থাকলে ডিফল্ট হোম পেজে (/) যাবে
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setToastMessage("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields! ☀️");
      setLoading(false);
      return;
    }

    try {
      // BetterAuth দিয়ে ক্রেডেনশিয়াল সাইন-ইন
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password. Please try again! ❄️");
        setLoading(false);
        return;
      }

      // সফল লগইন মেসেজ দেখানো ও রিডাইরেকশন
      setToastMessage("Welcome back to SunCart! 🏖️");
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again later!");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      // BetterAuth সোশ্যাল লগইন
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl, // গুগল লগইন শেষে কাঙ্ক্ষিত পেজে রিডাইরেক্ট করবে
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again!");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-white/85 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-100 overflow-hidden transition-all duration-300 hover:shadow-orange-200/50">
        {/* ব্র্যান্ড ব্যানার এবং টাইটেল */}
        <div className="bg-gradient-to-r from-orange-300 to-amber-500 p-8 text-center text-white relative">
        
          <h1 className="text-3xl font-black tracking-tight mb-2">SunCart</h1>
          <p className="text-orange-50 text-sm font-medium">Your Gateway to Summer Essentials </p>
        </div>

        {/* ফর্ম কনটেন্ট এরিয়া */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">
            Welcome Back! Login 
          </h2>

          {/* সাকসেস টোস্ট/মেসেজ */}
          {toastMessage && (
            <div className="alert alert-success shadow-lg mb-6 border-none bg-emerald-100 text-emerald-800 flex items-center gap-2 rounded-2xl animate-pulse">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* এরর মেসেজ */}
          {error && (
            <div className="alert alert-error shadow-lg mb-6 border-none bg-rose-100 text-rose-800 flex items-center gap-2 rounded-2xl">
              <span>{error}</span>
            </div>
          )}

          {/* ইমেইল ও পাসওয়ার্ড ফর্ম */}
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-bold text-slate-600">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-400">
                  ✉️
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full pl-10 rounded-2xl border-amber-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-bold text-slate-600">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-400">
                  🔒
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 rounded-2xl border-amber-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-2xl border-none shadow-lg shadow-orange-500/20 transition-all uppercase tracking-wider disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
            </button>
          </form>

          {/* ডিভাইডার */}
          <div className="divider my-6 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            OR SIGN IN WITH
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full btn btn-outline border-amber-200 hover:bg-amber-50 text-slate-700 hover:text-slate-800 rounded-2xl flex items-center justify-center gap-3 transition-colors bg-white font-semibold"
          >
            {/* গুগল ব্র্যান্ড আইকন */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.258-3.133C18.337 1.808 15.534.9 12.24.9 6.033.9 1 5.933 1 12.1s5.033 11.2 11.24 11.2c6.478 0 10.793-4.537 10.793-10.99 0-.743-.08-1.3-.176-1.825H12.24z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* রেজিস্টার লিংক */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              New to SunCart?{" "}
              <Link
                href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Register Here 🏝️
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
