"use client";
import { useEffect, useState } from "react";
import {  useRouter } from "next/navigation";
import Link from "next/link";


export default function SubscribePage() {
  const router = useRouter();

    const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  function showSuccessAlert() {
  const alertHTML = `
    <div id="alertOverlay" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 opacity-0 transition-all duration-300 ease-out">
      <div class="bg-white rounded-2xl p-8 text-center max-w-md w-11/12 mx-4 transform scale-75 transition-all duration-300 ease-out shadow-2xl">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Payment Successful! 🎉</h2>
        <p class="text-gray-600 mb-2 text-lg font-medium">Congratulations! You now have premium access.</p>
        <p class="text-gray-500 mb-6 text-sm">You can now get all jobs HR contacts and apply directly!</p>
        <button 
          onclick="closeAlert()" 
          class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Access Jobs Now →
        </button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', alertHTML);
  const overlay = document.getElementById('alertOverlay');
  
  // Trigger animation
  setTimeout(() => {
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');
    overlay.querySelector('div').classList.remove('scale-75');
    overlay.querySelector('div').classList.add('scale-100');
  }, 10);
}

function showErrorAlert() {
  const alertHTML = `
    <div id="alertOverlay" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 opacity-0 transition-all duration-300 ease-out">
      <div class="bg-white rounded-2xl p-8 text-center max-w-md w-11/12 mx-4 transform scale-75 transition-all duration-300 ease-out shadow-2xl">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Payment Verification Failed</h2>
        <p class="text-gray-600 mb-6">There was an issue processing your payment. Please try again or contact support.</p>
        <div class="flex gap-3">
          <button 
            onclick="closeAlert()" 
            class="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
          >
            Close
          </button>
          <button 
            onclick="closeAlert(); location.reload();" 
            class="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', alertHTML);
  const overlay = document.getElementById('alertOverlay');
  
  // Trigger animation
  setTimeout(() => {
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');
    overlay.querySelector('div').classList.remove('scale-75');
    overlay.querySelector('div').classList.add('scale-100');
  }, 10);
}

function closeAlert() {
  const overlay = document.getElementById('alertOverlay');
  if (overlay) {
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    overlay.querySelector('div').classList.remove('scale-100');
    overlay.querySelector('div').classList.add('scale-75');
    
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

    useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
        // Redirect to login if not logged in
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

const handlePayment = async () => {
  const res = await fetch("/api/razorpay", { method: "POST" });
  const data = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Make sure this env var exists in `.env`
    amount: data.order.amount,
    currency: "INR",
    name: "DirectNaukri",
    description: "₹99 Subscription",
    order_id: data.order.id,
    handler: async function (response) {
      // Send details to backend to verify and update subscription
      const verifyRes = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

    const result = await verifyRes.json();
if (result.success) {
  showSuccessAlert();
  
  // Redirect after user closes alert or automatically after 3 seconds
  setTimeout(() => {
    if (document.getElementById('alertOverlay')) {
      closeAlert();
    }
    router.push("/jobs"); // Use Next.js router instead of location.href
  }, 6000);
} else {
  showErrorAlert();
}
    },
    prefill: {
      name: "DirectNaukri",
      
    },
    theme: { color: "#000" },
  };

  const razor = new window.Razorpay(options);
  razor.open();
};

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Header */}
     

      {/* Main Content */}
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Limited Time Offer
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Unlock Premium <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Job Access</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Get direct access to employer contacts, apply instantly, and accelerate your career growth
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Features Section - Hidden on mobile, shown on larger screens */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Why Choose Premium?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-1">Direct Contact Access</h4>
                    <p className="text-sm text-slate-600">Get verified phone numbers and email addresses</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-1">Instant Applications</h4>
                    <p className="text-sm text-slate-600">Apply directly without waiting periods</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0112 2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-1">Priority Support</h4>
                    <p className="text-sm text-slate-600">24/7 dedicated customer assistance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/60 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="relative">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Get HR Direct Contact</h2>
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">₹99</span>
                      <div className="ml-3 text-left">
                        <div className="text-slate-600 text-sm sm:text-base">/month</div>
                        <div className="text-green-600 text-xs sm:text-sm font-medium">Save 60%</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base">One-time payment • Full month access • No hidden fees</p>
                  </div>

                  {/* Features - Shown on mobile */}
                  <div className="lg:hidden mb-8">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Direct Contacts</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Instant Apply</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0112 2.25z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Priority Support</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Secure & Safe</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </span>
                    ) : (
                      "Get Premium Access - Pay ₹99"
                    )}
                  </button>

                  {/* Security Notice */}
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                    <div className="flex items-center justify-center space-x-2 text-slate-600 text-sm">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>256-bit SSL encrypted • Secured by Razorpay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-8">
              <p className="text-slate-500 text-sm sm:text-base">Trusted by thousands of job seekers</p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">15K+</div>
                <div className="text-slate-600 text-xs sm:text-sm">Active Users</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">800+</div>
                <div className="text-slate-600 text-xs sm:text-sm">Partner Companies</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">4.9★</div>
                <div className="text-slate-600 text-xs sm:text-sm">User Rating</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-4">
              By proceeding, you agree to our{" "}
              <Link href="/terms" className="text-slate-700 hover:text-slate-900 underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-slate-700 hover:text-slate-900 underline">Privacy Policy</Link>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-600">
              <Link href="/contact" className="hover:text-slate-900 transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Need Help?
              </Link>
              <Link href="/refund" className="hover:text-slate-900 transition-colors flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Money-back Guarantee
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}