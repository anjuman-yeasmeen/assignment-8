"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  
  const user = null; 
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-10 sticky top-0 z-50">
      {/* 1. Logo Section */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/profile">My Profile</Link></li>
          </ul>
        </div>
        
        {/* Iconic Logo */}
        <Link href="/" className="flex items-center gap-2">
          
          <span className="text-xl font-bold tracking-tighter text-orange-600 hidden sm:block">HEATWAVE</span>
        </Link>
      </div>

      {/* 2. Links: Center Section (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
          <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
          <li><Link href="/products" className="hover:text-orange-500">Products</Link></li>
          <li><Link href="/profile" className="hover:text-orange-500">My Profile</Link></li>
        </ul>
      </div>

      {/* 3. Right Section: Auth Logic */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-orange-400">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src="https://i.pravatar.cc/150?u=fake@pravatar.com" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li className="px-4 py-2 font-bold text-orange-500">User Name</li>
              <li><Link href="/profile">Dashboard</Link></li>
              <li><button className="text-red-500 font-bold">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-ghost btn-sm md:btn-md">Login</Link>
            <Link href="/register" className="btn bg-orange-500 hover:bg-orange-600 text-white btn-sm md:btn-md border-none">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;