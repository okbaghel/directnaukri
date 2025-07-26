"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

// Mock HeroSection component for demonstration
function HeroSection({ jobQuery, setJobQuery, locationQuery, setLocationQuery }) {
  const router = useRouter();
   const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [jobQuery, setJobQuery] = useState("");
  // const [locationQuery, setLocationQuery] = useState("");
  // const [jobQuery, setJobQuery] = useState("");
  // const [locationQuery, setLocationQuery] = useState("");

    // Fetch jobs once
  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
      setFilteredJobs(data); // initial full list
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

const handleSearch = (e) => {
    e.preventDefault();

    const title = jobQuery.trim();
    const location = locationQuery.trim();

    // Build query string
    const queryParams = new URLSearchParams();
    if (title) queryParams.append("title", title);
    if (location) queryParams.append("location", location);

    // Redirect to /jobs page with query
    router.push(`/jobs?${queryParams.toString()}`);
  };


  return (
    <section className="relative bg-white py-12 md:py-20 lg:py-24 px-4 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-600 rounded-full opacity-5 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-56 md:w-80 h-56 md:h-80 bg-orange-500 rounded-full opacity-5 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-3 md:px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-xs md:text-sm font-medium mb-6 md:mb-8 border border-blue-100">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
            1000+ Jobs Available
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight px-2">
            Find Your Dream Job
            <span className="block text-blue-600 mt-2">In Your City</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Connect with top employers across India. Start your career journey
            with trusted companies today.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 px-4">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2"
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={jobQuery}
                  onChange={(e) => setJobQuery(e.target.value)}
                  placeholder="Job title or keyword"
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-gray-700 bg-transparent border-0 focus:outline-none placeholder-gray-400 text-sm md:text-base"
                />
              </div>
              <div className="hidden md:block w-px bg-gray-200"></div>
              <div className="flex-1">
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="City or location"
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-gray-700 bg-transparent border-0 focus:outline-none placeholder-gray-400 text-sm md:text-base"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base"
              >
                Search
              </button>
            </div>
          </form>
          
        </div>


        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16 text-center px-4">
          <div className="group">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors duration-300">
              1000+
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Active Jobs</div>
          </div>
          <div className="group">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors duration-300">
              500+
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Companies</div>
          </div>
          <div className="group">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors duration-300">
              50K+
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Placements</div>
          </div>
          <div className="group">
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 md:mb-2 group-hover:text-orange-500 transition-colors duration-300">
              4.8★
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Rating</div>
          </div>
        </div>

        {/* Featured Companies */}
        <div className="text-center px-4">
          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 opacity-60">
            {["Swiggy", "Zomato", "Flipkart", "Amazon", "Blinkit", "Delhivery"].map(
              (company) => (
                <div
                  key={company}
                  className="text-sm md:text-lg lg:text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-default"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Mock JobCategories component
function JobCategories() {
  const categories = [
    { name: "Technology", count: 250, icon: "💻" },
    { name: "Marketing", count: 180, icon: "📈" },
    { name: "Finance", count: 120, icon: "💰" },
    { name: "Healthcare", count: 95, icon: "🏥" },
    { name: "Education", count: 75, icon: "📚" },
    { name: "Field", count: 60, icon: "🎨" },
  ];

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Explore opportunities across various industries and find your
            perfect match
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 text-center shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base lg:text-lg">
                {category.name}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm">
                {category.count} jobs
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Mock JobCard component
function JobCard({ job }) {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-6">
        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0">
          {job.company.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base md:text-lg lg:text-xl mb-1 line-clamp-2">
            {job.title}
          </h3>
          <p className="text-gray-600 text-sm md:text-base font-medium">
            {job.company}
          </p>
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        <div className="flex items-center text-gray-600 text-sm md:text-base">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm md:text-base">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
          <span className="font-semibold text-green-600">{job.salary}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm md:text-base">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"
            />
          </svg>
          <span className="capitalize">{job.type}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-2 md:px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs md:text-sm font-medium border border-blue-100"
          >
            {skill}
          </span>
        ))}
        {job.skills?.length > 3 && (
          <span className="px-2 md:px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs md:text-sm font-medium border border-gray-100">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 md:py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm md:text-base">
        Apply Now
      </button>
    </div>
  );
}

// Main HomePage Component
export default function HomePage() {
  const [jobQuery, setJobQuery] = useState("");
const [locationQuery, setLocationQuery] = useState("");
const [filteredJobs, setFilteredJobs] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
      setFilteredJobs(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  // ✅ DEFINE IT HERE
  const handleSearch = (e) => {
    e.preventDefault();
    const jobLower = jobQuery.toLowerCase();
    const locationLower = locationQuery.toLowerCase();

    const filtered = jobs.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(jobLower);
      const locationMatch = job.location.toLowerCase().includes(locationLower);
      return (
        (jobQuery ? titleMatch : true) &&
        (locationQuery ? locationMatch : true)
      );
    });

    setFilteredJobs(filtered);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none" />
        <HeroSection
          jobQuery={jobQuery}
        locationQuery={locationQuery}
        setJobQuery={setJobQuery}
        setLocationQuery={setLocationQuery}
        handleSearch={handleSearch}
        filteredJobs={filteredJobs}
        />
         {/* You can use filteredJobs here to show JobCards */}
     
      </div>

      {/* Job Categories */}
      <div className="relative bg-white/80 backdrop-blur-sm border-y border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent" />
        <JobCategories />
      </div>

      {/* Latest Jobs Section */}
      <section className="relative px-4 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 px-2">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl md:rounded-2xl mb-4 md:mb-6 shadow-lg">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3 md:mb-4">
              Latest Opportunities
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover premium career opportunities from top companies
              worldwide. Your next career milestone awaits.
            </p>
            {/* button view all jobs from the home page  */}
            <Link href="/jobs" passHref>
              <button className="group cursor-pointer mt-4 relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/30 active:scale-95 w-full sm:w-auto max-w-sm">
                <span className="relative   z-10 flex items-center gap-2">
                  View All Jobs
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden md:block absolute top-10 left-10 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl animate-pulse" />
        <div
          className="hidden md:block absolute bottom-10 right-10 w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced mobile responsiveness */
        @media (max-width: 640px) {
          .animate-pulse {
            animation-duration: 2s;
          }
        }

        /* Smooth transitions for better UX */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
      <Footer/>
    </main>
  );
}
