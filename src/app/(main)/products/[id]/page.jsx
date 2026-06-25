"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  // ১. সেশন থেকে লগইন করা ইউজারের ডাটা নেওয়া
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // ইউজার ডাটা এলে ফর্মের ইনিশিয়াল ভ্যালু সেট করা
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  // ২. Update Information — better-auth updateUser দিয়ে নাম ও ছবি আপডেট
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setSaving(true);

    await authClient.updateUser(
      { name, image },
      {
        onSuccess: () => {
          setSaving(false);
          setIsEditing(false);
          setMessage("Profile updated successfully! 🎉");
        },
        onError: (ctx) => {
          setSaving(false);
          setMessage(ctx.error.message || "Update failed. Please try again.");
        },
      },
    );
  };

  // লোডিং অবস্থা
  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  // লগইন না থাকলে
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Please log in to view your profile.</h2>
        <Link
          href="/login?callbackUrl=/profile"
          className="btn bg-orange-500 hover:bg-orange-600 text-white border-none"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
        {/* হেডার ব্যানার */}
        <div className="bg-gradient-to-r from-orange-300 to-amber-500 h-32 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <img
              src={image || user.image || "https://i.pravatar.cc/150"}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="pt-16 pb-8 px-6 md:px-10 text-center">
          <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
          <p className="text-slate-500 text-sm mt-1">{user.email}</p>

          {/* সাকসেস/এরর মেসেজ */}
          {message && (
            <div className="alert bg-orange-50 text-orange-700 border border-orange-200 rounded-2xl mt-6 text-sm justify-center">
              <span>{message}</span>
            </div>
          )}

          {/* ডিটেইলস অথবা এডিট ফর্ম */}
          {!isEditing ? (
            <div className="mt-8 space-y-4 text-left">
              <div className="flex justify-between items-center border-b border-orange-50 pb-3">
                <span className="text-sm font-semibold text-slate-500">Name</span>
                <span className="font-medium text-slate-800">{user.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-orange-50 pb-3">
                <span className="text-sm font-semibold text-slate-500">Email</span>
                <span className="font-medium text-slate-800">{user.email}</span>
              </div>

              <button
                onClick={() => {
                  setMessage("");
                  setIsEditing(true);
                }}
                className="btn w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl border-none shadow-lg shadow-orange-500/20 mt-4"
              >
                Update Information ✏️
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="mt-8 space-y-5 text-left">
              <div>
                <label className="label">
                  <span className="label-text font-bold text-slate-600">Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input input-bordered w-full rounded-2xl border-amber-200 focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-bold text-slate-600">Photo URL</span>
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="input input-bordered w-full rounded-2xl border-amber-200 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl border-none shadow-lg shadow-orange-500/20"
                >
                  {saving ? <span className="loading loading-spinner"></span> : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setMessage("");
                  }}
                  className="btn btn-outline border-amber-200 text-slate-600 hover:bg-amber-50 rounded-2xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
