"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import {useUser} from '@/app/context/userContext';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser ] = useState(null);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch user info on load
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/");
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
            {/* <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg">
              <span className="text-white font-bold text-xs sm:text-sm">D</span>
            </div> */}
            <Image src="/directlogo.png" className="mx-0" width="55" height="55"/>
            <span className="text-gray-800 tracking-tight hidden xs:block">
              DirectNaukri
            </span>
            <span className="text-gray-800 tracking-tight xs:hidden text-base">
              DirectNaukri
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
             <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/jobs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
              Jobs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
           
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <div className="relative group">
                <Link
                  href="/dashboard"
                  className="text-gray-700 font-medium px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-150"
                >
                  {user.name?.split(" ")[0] || "Profile"}
                </Link>
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg hidden group-hover:block z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
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
                className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-b-lg shadow-lg border-t border-gray-200/60 mt-1">
            <Link href="/jobs" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg">
              Jobs
            </Link>
            <Link href="/companies" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg">
              Companies
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg">
              About
            </Link>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-gray-700 bg-gray-100 font-medium text-center rounded-lg"
                  >
                    {user.name?.split(" ")[0] || "Profile"}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 font-medium transition-all duration-200 rounded-lg text-center"
                  >
                    Logout
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
