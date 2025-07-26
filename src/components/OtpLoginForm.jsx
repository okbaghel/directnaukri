"use client";
import { useState } from "react";

export default function OtpLoginForm() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      
      if (data.success) {
        setStep(2);
        setMessage("OTP sent successfully to your phone number.");
      } else {
        setMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setMessage("Invalid OTP. Please check and try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setOtp("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {step === 1 ? "Welcome Back" : "Verify Your Number"}
          </h1>
          <p className="text-slate-600">
            {step === 1 
              ? "Enter your phone number to continue" 
              : `We've sent a 6-digit code to ${phone}`
            }
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:outline-none transition-colors duration-200 text-lg"
                  disabled={isLoading}
                />
              </div>
              
              <button
                onClick={sendOtp}
                disabled={!phone || isLoading}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-800 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-400 focus:outline-none transition-colors duration-200 text-lg text-center tracking-widest"
                  maxLength={6}
                  disabled={isLoading}
                />
              </div>
              
              <button
                onClick={verifyOtp}
                disabled={!otp || isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
              
              <button
                onClick={handleBack}
                className="w-full text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200"
              >
                ← Back to phone number
              </button>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
              message.includes("successful") || message.includes("sent successfully")
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}