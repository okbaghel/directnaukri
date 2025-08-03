import { Suspense } from "react";
import JobsContent from "./JobsContent";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-white shadow-sm border-b ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mt-11">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Find Your Next Opportunity
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing job opportunities from top companies around the world
            </p>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center">Loading jobs...</div>}>
        <JobsContent />
      </Suspense>
    </div>
  );
}
