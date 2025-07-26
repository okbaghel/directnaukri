"use client";
import Link from "next/link";

export default function JobCard({ job }) {
  // Format salary professionally
  const formatSalary = (salary) => {
    if (!salary) return "Salary negotiable";
    const cleanSalary = salary.includes("₹") ? salary : `₹${salary}`;
    return `${cleanSalary}/month`;
  };

  // Format job timing
  const formatTiming = (timing) => {
    if (!timing) return "Full Time";

    const timingLower = timing.toLowerCase();
    if (timingLower.includes("full")) return "Full Time";
    if (timingLower.includes("part")) return "Part Time";
    if (timingLower.includes("contract")) return "Contract";
    if (timingLower.includes("internship")) return "Internship";
    return timing;
  };

  // Format date to show exact posting date
  const formatDate = (dateString) => {
    if (!dateString)
      return {
        text: "Recently Posted",
        badge: "new",
        color: "bg-green-100 text-green-700",
      };

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Always show exact date instead of relative time
    const exactDate = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });

    // Determine badge color based on freshness
    if (diffDays === 0)
      return {
        text: `Posted Today (${exactDate})`,
        badge: "hot",
        color: "bg-red-100 text-red-700",
      };
    if (diffDays <= 7)
      return {
        text: `Posted on ${exactDate}`,
        badge: "fresh",
        color: "bg-blue-100 text-blue-700",
      };

    return {
      text: `Posted on ${exactDate}`,
      badge: "older",
      color: "bg-gray-100 text-gray-600",
    };
  };

  // Check if job is in high demand (mock logic)
  const isHighDemand = Math.random() > 0.6;

  const dateInfo = formatDate(job.createdAt);

  return (
    <Link href={`/job/${job._id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 p-4 sm:p-6 group cursor-pointer h-full flex flex-col">
        {/* Header with Job Title and Arrow */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
              {job.title || "Delivery Boy"}
            </h2>
            <div className="text-base sm:text-lg font-medium text-gray-800 mb-2">
              {formatSalary(job.salary)}
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="ml-3 sm:ml-4 mt-1 flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 group-hover:text-teal-600 transition-colors"
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
          </div>
        </div>

        {/* Company Information */}
        <div className="flex items-center text-gray-600 mb-2">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="text-xs sm:text-sm font-medium truncate">
            {job.company || "Company Name"}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-xs sm:text-sm truncate">
            {job.location || "Location not specified"}
          </span>
        </div>

        {/* Badges Section */}
        <div className="flex items-start gap-1 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
          {/* New/Date Badge */}
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${dateInfo.color} flex-shrink-0`}
          >
            <span className="hidden sm:inline">{dateInfo.text}</span>
            <span className="sm:hidden">
              {dateInfo.badge === "hot"
                ? "Today"
                : dateInfo.badge === "fresh"
                ? "This Week"
                : "Posted"}
            </span>
          </span>

          {/* High Demand Badge */}
          {isHighDemand && (
            <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-xs font-medium border border-orange-100 flex items-center flex-shrink-0">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="hidden xs:inline">High Demand</span>
              <span className="xs:hidden">Hot</span>
            </span>
          )}
        </div>

        {/* Job Type */}
        <div className="text-gray-700 font-medium text-xs sm:text-sm mb-3 sm:mb-4">
          {formatTiming(job.timing)}
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-grow"></div>

        {/* Trust Indicators */}
        <div className="pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between gap-2">
            {/* Verification Badge */}
            <div className="flex items-center text-green-600 flex-shrink-0">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.282.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium">
                <span className="hidden sm:inline">Verified Employer</span>
                <span className="sm:hidden">Verified</span>
              </span>
            </div>

            {/* Apply Now Link */}
            <Link
              href={`/job/${job._id}`}
              className="inline-flex items-center text-xs sm:text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors flex-shrink-0"
            >
              <span className="inline-flex items-center text-xs sm:text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors flex-shrink-0">
                <span className="hidden xs:inline">Apply Now</span>
                <span className="xs:hidden">Apply</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-3 p-2 sm:p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="min-w-0">
              <p className="text-xs font-medium text-yellow-800 mb-1">
                <span className="hidden sm:inline">
                  Stay Safe While Job Hunting
                </span>
                <span className="sm:hidden">Stay Safe</span>
              </p>
              <p className="text-xs text-yellow-700 leading-relaxed">
                <span className="hidden sm:inline">
                  Never pay fees or share sensitive personal information during
                  the application process.
                </span>
                <span className="sm:hidden">
                  Never pay fees or share sensitive info when applying.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
