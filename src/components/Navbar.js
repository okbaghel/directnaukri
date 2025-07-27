"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import {useUser} from '@/app/context/userContext';
import Image from "next/image";
import { toast } from 'react-toastify';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

useEffect(() => {
  async function fetchUser() {
    try {
      const res = await fetch("/api/me", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);  // ✅ data.user, not full data
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
        setUserDetails(data.user); // ✅ set only user data
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  }
  setShowProfileDropdown(!showProfileDropdown);
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

  // Fetch user info on load
 
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
    <nav className="bg-white backdrop-blur-md shadow-xl border-b border-gray-200/60 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-2 sm:space-x-3 text-xl sm:text-2xl font-bold hover:opacity-90 transition-all duration-200"
          >
            <Image
              src="/directlogo.png"
              alt="logo"
              className="mx-0"
              width="55"
              height="55"
            />
            <span className="text-gray-800 tracking-tight hidden xs:block">
              DirectNaukri
            </span>
            <span className="text-gray-800 tracking-tight xs:hidden text-base">
              DirectNaukri
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Jobs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/50 hover:border-blue-300/50 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-inner">
                    {getUserInitials(user.name)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-800 font-medium text-sm">
                      {user.name?.split(" ")[0] || "Profile"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
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

                {/* Modern Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-lg font-bold backdrop-blur-sm">
                          {getUserInitials(user?.name)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
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
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
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
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Email Address
                                </p>
                                <p className="text-sm font-semibold text-gray-800 mt-1">
                                  {user.email || "Not available"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Subscription Section */}
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  userDetails?.subscribed || user.subscribed
                                    ? "bg-green-100"
                                    : "bg-orange-100"
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
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Subscription Status
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                      userDetails?.subscribed || user.subscribed
                                        ? "bg-green-100 text-green-800 border border-green-200"
                                        : "bg-orange-100 text-orange-800 border border-orange-200"
                                    }`}
                                  >
                                    {userDetails?.subscribed || user.subscribed
                                      ? "✓ Active"
                                      : "⚠ Inactive"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 p-4">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                      >
                        <svg
                          className="w-4 h-4 group-hover:scale-110 transition-transform"
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
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm lg:text-base"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-orange-500 text-white font-medium px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg text-sm lg:text-base"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200 p-2"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-1 pb-2 space-y-1 bg-white/95 backdrop-blur-sm rounded-b-lg shadow-lg border-t border-gray-200/60 mt-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg"
            >
              Jobs
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg"
            >
              About
            </Link>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              {user ? (
                <>
                  {/* Mobile Profile Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 border border-blue-200/50">
                    <div className="flex items-center space-x-3 mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                        {getUserInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {user.name?.split(" ")[0] || "Profile"}
                        </p>
                        <p className="text-gray-600 text-sm">Welcome back!</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Email */}
                      <div className="bg-white/70 rounded-lg p-1 border border-blue-100">
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          EMAIL
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {user.email || "Not available"}
                        </p>
                      </div>

                      {/* Subscription */}
                      <div className="bg-white/70 rounded-lg p-1 border border-blue-100">
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          SUBSCRIPTION
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.subscribed
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {user.subscribed ? "✓ Active" : "⚠ Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full px-2 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 font-medium transition-all duration-200 rounded-lg text-center border border-red-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg text-center"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 bg-blue-600 hover:bg-orange-500 text-white font-medium transition-all duration-200 rounded-lg text-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
