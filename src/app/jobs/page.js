// app/jobs/page.jsx
'use client';

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { useSearchParams } from "next/navigation";


export default function JobsPage() {
    const searchParams = useSearchParams();
  const titleQuery = searchParams.get("title")?.toLowerCase() || "";
  const locationQuery = searchParams.get("location")?.toLowerCase() || "";
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //  const [loading, setLoading] = useState(true);

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
        
        setFilteredJobs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJobs();
  }, []);

  // Handle search
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowerCaseQuery) ||
      job.company.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredJobs(filtered);
  }, [searchQuery, jobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Find Your Next Opportunity
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing job opportunities from top companies around the world
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">All Jobs</h2>
            {filteredJobs.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
              </span>
            )}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-black border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-24 w-24 text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-500 mb-6">
                Try a different keyword or check back later.
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Get Notified
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Load More Section (can be improved with real pagination) */}
     
    </div>
  );
}
