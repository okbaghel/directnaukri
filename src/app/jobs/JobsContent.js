'use client';

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function JobsContent() {
  const searchParams = useSearchParams();
  const titleQuery = searchParams.get("title")?.toLowerCase() || "";
  const locationQuery = searchParams.get("location")?.toLowerCase() || "";
  const loginStatus = searchParams.get("login");

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (loginStatus === "success") {
      toast.success("Successfully Logged In!");
    }
  }, [loginStatus]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/jobs`, { cache: "no-store" });
        
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load jobs. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowerCaseQuery) ||
      job.company.toLowerCase().includes(lowerCaseQuery)
    );

    // Apply gender filter
    if (genderFilter !== "all") {
      filtered = filtered.filter((job) => 
        job.gender?.toLowerCase() === genderFilter || 
        job.genderPreference?.toLowerCase() === genderFilter
      );
    }

    setFilteredJobs(filtered);
  }, [searchQuery, jobs, genderFilter]);

  const LoadingSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded-lg mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-md mb-2 w-1/2"></div>
            </div>
            <div className="h-10 w-10 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <h2 className="text-2xl font-bold  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Discover Jobs
              </h2>
              <div className="absolute -bottom-1 left-0 h-0.5 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            {!isLoading && filteredJobs.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}
              </div>
            )}
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 transition-all duration-300 ${showFilters ? 'block' : 'hidden sm:block'}`}>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>

          {/* Gender Filter */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <div className="min-w-0 sm:min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender Preference</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">No Preference</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || genderFilter !== "all") && (
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setGenderFilter("all");
                  }}
                  className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 whitespace-nowrap"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading amazing opportunities...</span>
            </div>
          </div>
          <LoadingSkeleton />
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v6.5a1.5 1.5 0 001.5 1.5v0a1.5 1.5 0 001.5-1.5V6m-8 0H8"
                  />
                </svg>
              </div>
              <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              No opportunities found
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              {searchQuery || genderFilter !== "all" 
                ? "Try adjusting your search criteria or filters to discover more opportunities."
                : "New opportunities are added regularly. Check back soon!"
              }
            </p>
            {(searchQuery || genderFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setGenderFilter("all");
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}