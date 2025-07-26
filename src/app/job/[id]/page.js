"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isPaidUser, setIsPaidUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) return notFound();
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Job not found");
      } finally {
        setLoading(false);
      }
    }

    async function checkUserSubscription() {
      try {
        const res = await fetch("/api/me");
        const data = await res.json();
        console.log(data);
        console.log(data.user?.subscribed);
       setIsPaidUser(data.user?.subscribed);
      // setIsPaidUser(true);
      } catch {
        setIsPaidUser(false);
      }
    }

    fetchJobDetails();
    checkUserSubscription();
  }, [id]);

  if (loading || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-lg sm:text-xl font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-blue-200 text-sm mb-6">
            <Link href="/jobs" className="hover:text-white transition-colors duration-200">
              Jobs
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium truncate">{job.title}</span>
          </nav>

          {/* Job Title & Meta */}
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {job.title}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m6 0v-5a2 2 0 114 0v5m-4 0v-5m0 5h4" />
                </svg>
                <span className="font-semibold">{job.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg> */}
                <span className="font-bold text-green-300">₹{job.salary}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{job.timing || "Full Time"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Requirements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Job Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {job.qualification && (
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Education</h3>
                        <p className="text-gray-700">{job.qualification}</p>
                      </div>
                    </div>
                  )}
                  
                  {job.experience && (
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Experience</h3>
                        <p className="text-gray-700">{job.experience}</p>
                      </div>
                    </div>
                  )}

                  {job.gender && (
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Gender</h3>
                        <p className="text-gray-700">{job.gender}</p>
                      </div>
                    </div>
                  )}

                  {job.timing && (
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                        <p className="text-gray-700">{job.timing}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Premium Features Preview */}
            {!isPaidUser && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-900">Unlock Premium Features</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Direct HR Contact</h4>
                      <p className="text-blue-700 text-sm">Get direct email and phone number of hiring manager</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Application Support</h4>
                      <p className="text-blue-700 text-sm">24/7 support to help with your application process</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">All Jobs Access</h4>
                      <p className="text-blue-700 text-sm">Access HR contacts for all available positions</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Priority Support</h4>
                      <p className="text-blue-700 text-sm">Get faster responses and priority assistance</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link
                      href={`/subscribe?job=${job._id}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                      Upgrade to Premium
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Job Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Job Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Salary</span>
                    <span className="font-bold text-gray-900">₹{job.salary}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Company</span>
                    <span className="font-semibold text-gray-900">{job.company}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Location</span>
                    <span className="font-semibold text-gray-900">{job.location}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Work Type</span>
                    <span className="font-semibold text-gray-900">{job.timing || "Full Time"}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Status</span>
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HR Contact / Subscription Card */}
            {isPaidUser ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">HR Contact</h4>
                  </div>
                  
                  {job.contact ? (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 font-medium break-all">
                        {job.contact}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-yellow-800 text-sm">
                        HR contact information will be updated soon. Please check back later.
                      </p>
                    </div>
                  )}
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-lg shadow-xl">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Premium Access</h3>
                    <p className="text-gray-300">Unlock all job opportunities</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    {[
                      "Direct HR Contact Info",
                      "All Jobs HR Details", 
                      "Application Support",
                      "Priority Assistance"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 mb-6 text-center">
                    <div className="text-2xl font-bold">₹99</div>
                    <div className="text-sm">per month</div>
                  </div>

                  <Link
                    href={`/subscribe?job=${job._id}`}
                    className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-bold text-center transition-all duration-200"
                  >
                    Unlock HR Access – ₹99
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Apply (for free users) */}
          
            {!isPaidUser && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">HR Contact</h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    Subscribe to get direct HR contact
                  </p>
                  <div className="bg-gray-100 rounded-lg p-3 mb-4">
                    <p className="text-gray-500 font-medium text-sm">
                      Contact: ████████<br />
                      Email: ████@company.com
                    </p>
                  </div>
                  <button className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed">
                    Upgrade to Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}