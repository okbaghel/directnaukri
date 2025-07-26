"use client";
import { useState } from "react";

export default function HeroSection() {
  const [jobQuery, setJobQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (jobQuery.trim() || locationQuery.trim()) {
      console.log("Searching for:", { job: jobQuery, location: locationQuery });
    }
  };

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-32 px-4 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-5 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full opacity-5 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8 border border-blue-100">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
            1000+ Jobs Available
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Find Your Dream Job
            <span className="block text-blue-600 mt-2">
              In Your City
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with top employers across India. Start your career journey with trusted companies today.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  placeholder="Job title or keyword"
                  className="w-full px-6 py-4 text-gray-700 bg-transparent border-0 focus:outline-none placeholder-gray-400 text-base"
                />
              </div>
              <div className="hidden md:block w-px bg-gray-200"></div>
              <div className="flex-1">
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City or location"
                  className="w-full px-6 py-4 text-gray-700 bg-transparent border-0 focus:outline-none placeholder-gray-400 text-base"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">1000+</div>
            <div className="text-gray-500 text-sm">Active Jobs</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">500+</div>
            <div className="text-gray-500 text-sm">Companies</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">50K+</div>
            <div className="text-gray-500 text-sm">Placements</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">4.8★</div>
            <div className="text-gray-500 text-sm">Rating</div>
          </div>
        </div>

        {/* Featured Companies */}
        <div className="text-center">
          <p className="text-gray-500 mb-8">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {["Swiggy", "Zomato", "Flipkart", "Amazon", "TCS", "Infosys"].map((company) => (
              <div 
                key={company}
                className="text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-default"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}