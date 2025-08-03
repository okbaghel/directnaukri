"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from 'react-toastify';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Scroll effect for premium navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = async () => {
    if (!showProfileDropdown && user && !userDetails) {
      setLoading(true);
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUserDetails(data.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handlePayment = () => {
    router.push("/payment");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setUserDetails(null);
    setShowProfileDropdown(false);
    toast.success("Logged out");
    router.push("/");
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <>
      {/* Glass background overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 pt-2 sm:pt-3 md:pt-4">
        <nav className={`bg-white/80 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl transition-all duration-500 shadow-2xl ${
          scrolled 
            ? 'shadow-slate-900/10 bg-white/85 border-slate-200/30' 
            : 'shadow-slate-900/5 bg-white/80'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
              {/* Logo */}
              <Link
                href="/"
                className="group flex items-center space-x-2 sm:space-x-3 text-xl sm:text-2xl font-bold hover:opacity-90 transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src="/directlogo.png"
                    alt="DirectNaukri Logo"
                    className="rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                    width="40"
                    height="40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="text-slate-800 tracking-tight bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text  font-extrabold">
                  DirectNaukri
                </span>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center bg-white/40 backdrop-blur-xl rounded-2xl px-2 py-1.5 border border-white/30 shadow-lg">
                <Link
                  href="/"
                  className="text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-medium transition-all duration-300 relative group px-6 py-2.5 rounded-xl"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                </Link>
                <Link
                  href="/jobs"
                  className="text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-medium transition-all duration-300 relative group px-6 py-2.5 rounded-xl"
                >
                  <span className="relative z-10">Jobs</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                </Link>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-medium transition-all duration-300 relative group px-6 py-2.5 rounded-xl"
                >
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                </Link>
              </div>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleProfileDropdown}
                      className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-xl hover:bg-white/80 border border-white/40 hover:border-white/60 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                        {getUserInitials(user.name)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-800 font-semibold text-sm">
                          {user.name?.split(" ")[0] || "Profile"}
                        </span>
                        <svg
                          className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                            showProfileDropdown ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Premium Dropdown */}
                    {showProfileDropdown && (
                      <div className="absolute right-0 mt-4 w-80 bg-white/90 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-5 text-white relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                          <div className="relative flex items-center space-x-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white text-xl font-bold border border-white/30">
                              {getUserInitials(user?.name)}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">
                                {user?.name || "User"}
                              </h3>
                              <p className="text-blue-100 text-sm opacity-90">
                                {user?.email || "Welcome back!"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          {loading ? (
                            <div className="flex items-center justify-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                          ) : (
                            <>
                              {/* Email Section */}
                              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/40">
                                    <svg
                                      className="w-5 h-5 text-blue-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                      />
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                      Email Address
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800 mt-1">
                                      {user.email || "Not available"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Subscription Section */}
                              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-lg">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-xl ${
                                      userDetails?.subscribed || user.subscribed
                                        ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200/50"
                                        : "bg-gradient-to-br from-orange-100 to-red-100 border-orange-200/50"
                                    }`}
                                  >
                                    <svg
                                      className={`w-5 h-5 ${
                                        userDetails?.subscribed || user.subscribed
                                          ? "text-green-600"
                                          : "text-orange-600"
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={
                                          userDetails?.subscribed || user.subscribed
                                            ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                        }
                                      />
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                      Subscription Status
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span
                                        className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-xl ${
                                          userDetails?.subscribed || user.subscribed
                                            ? "bg-green-100/80 text-green-800 border-green-200/60"
                                            : "bg-orange-100/80 text-orange-800 border-orange-200/60"
                                        }`}
                                      >
                                        {userDetails?.subscribed || user.subscribed
                                          ? "✓ Active Premium"
                                          : "⚠ Upgrade Available"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-white/20 p-5 bg-white/40 backdrop-blur-xl">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center space-x-2 px-5 py-3 text-sm font-semibold text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-2xl transition-all duration-300 group border border-red-200/50 hover:border-transparent shadow-lg hover:shadow-xl backdrop-blur-xl"
                          >
                            <svg
                              className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            <span>Sign Out</span>
                          </button>
                             {(!user?.subscribed && !userDetails?.subscribed) && (
                           <button
                           
                            className="w-full flex items-center justify-center space-x-2 px-5 py-3 text-sm font-semibold text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 rounded-2xl transition-all duration-300 group border border-red-200/50 hover:border-transparent shadow-lg hover:shadow-xl backdrop-blur-xl"
                          >
                            
                            
                            <span>Pay Now</span>
                          </button>
                             )}

                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-slate-600 hover:text-blue-600 hover:bg-white/60 font-semibold px-6 py-2.5 rounded-2xl transition-all duration-300 backdrop-blur-xl border border-transparent hover:border-white/40 hover:shadow-lg"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg relative overflow-hidden group"
                    >
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                     {(!user?.subscribed && !userDetails?.subscribed) && (
                      <Link href="/subscribe">
                    <button
                     
                      className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 text-white font-semibold px-5 py-2.5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center space-x-2 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <svg
                        className="w-4 h-4 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <span className="relative z-10">Pay Now</span>
                    </button>
                    </Link>
                       )}
                  </>
                )}
              </div>

              {/* Mobile Right Side */}
              <div className="md:hidden flex items-center space-x-2">
                
                     {(!user?.subscribed && !userDetails?.subscribed) && (
                      <Link href="/subscribe">
                  <button
                  
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-3 py-2 rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg flex items-center space-x-1.5 group relative overflow-hidden text-xs"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg
                      className="w-3.5 h-3.5 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span className="relative z-10">Pay</span>
                  </button>
                  </Link>
                   )}
                

                {/* Hamburger Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="text-slate-600 hover:text-blue-600 hover:bg-white/60 focus:outline-none focus:text-blue-600 transition-all duration-300 p-2 rounded-xl border border-transparent hover:border-white/40 hover:shadow-lg backdrop-blur-xl"
                  aria-label="Toggle menu"
                >
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu - Enhanced with 80% height */}
            <div
              className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className={`transition-all duration-500 ${isOpen ? "pb-6" : "pb-0"}`}>
                <div className="px-4 pt-4 space-y-3 bg-white/60 backdrop-blur-2xl rounded-2xl mt-4 border border-white/30 shadow-xl max-h-[80vh] overflow-y-auto">
                  
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-semibold transition-all duration-300 rounded-xl group relative overflow-hidden"
                    >
                      <span className="relative z-10">Home</span>
                    </Link>
                    <Link
                      href="/jobs"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-semibold transition-all duration-300 rounded-xl group relative overflow-hidden"
                    >
                      <span className="relative z-10">Jobs</span>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className="block px-5 py-3.5 text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-semibold transition-all duration-300 rounded-xl group relative overflow-hidden"
                    >
                      <span className="relative z-10">About</span>
                    </Link>
                  </div>
                  
                  <div className="border-t border-white/30 pt-4 space-y-4">
                    {user ? (
                      <>
                        {/* Mobile Profile Card */}
                        <div className="bg-white/80 backdrop-blur-2xl rounded-2xl p-5 border border-white/40 shadow-lg">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                              {getUserInitials(user.name)}
                            </div>
                            <div>
                              <p className="text-slate-800 font-bold text-lg">
                                {user.name || "Profile"}
                              </p>
                              <p className="text-slate-600 text-sm">Welcome back!</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {/* Email */}
                            <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/40 shadow-sm">
                              <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
                                EMAIL ADDRESS
                              </p>
                              <p className="text-sm font-semibold text-slate-800 break-all">
                                {user.email || "Not available"}
                              </p>
                            </div>

                            {/* Subscription */}
                            <div className="bg-white/70 backdrop-blur-xl rounded-xl p-4 border border-white/40 shadow-sm">
                              <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                                SUBSCRIPTION STATUS
                              </p>
                              <span
                                className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold border backdrop-blur-xl ${
                                  user.subscribed
                                    ? "bg-green-100/80 text-green-800 border-green-200/60"
                                    : "bg-orange-100/80 text-orange-800 border-orange-200/60"
                                }`}
                              >
                                {user.subscribed ? "✓ Premium Active" : "⚠ Inactive"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Logout Button */}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                          className="w-full px-5 py-3.5 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 font-semibold transition-all duration-300 rounded-xl text-center border border-red-200/60 hover:border-transparent shadow-lg hover:shadow-xl backdrop-blur-xl bg-white/60"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Mobile Auth Buttons */}
                        <Link
                          href="/login"
                          onClick={() => setIsOpen(false)}
                          className="block px-5 py-3.5 text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-semibold transition-all duration-300 rounded-xl text-center backdrop-blur-xl border border-white/40 hover:border-transparent shadow-lg hover:shadow-xl bg-white/60"
                        >
                          Login
                        </Link>
                        
                        <Link
                          href="/register"
                          onClick={() => setIsOpen(false)}
                          className="block px-5 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 rounded-xl text-center shadow-lg hover:shadow-2xl transform hover:scale-[1.02] relative overflow-hidden group"
                        >
                          <span className="relative z-10">Get Started</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                         {(!user?.subscribed && !userDetails?.subscribed) && (
                            <Link  href="/subscribe">
                        <button
                         
                          className="w-full px-5 py-3.5 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 text-white font-semibold transition-all duration-300 rounded-xl text-center shadow-lg hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                          <svg
                            className="w-4 h-4 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          
                          <span className="relative z-10">Pay Now</span>
                        </button>
                        </Link>
                         )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}