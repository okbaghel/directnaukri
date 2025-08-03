"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push('/');
        window.location.reload();
          router.refresh();
     
      } else {
        const data = await res.json();
        setError(data.message || "Login failed. Please check your email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col justify-center py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30 mt-11">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-indigo-100/50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mt-11">
        {/* Logo and Header */}
        <div className="text-center mt-5">
          <Link href="/" className="inline-block">
            <div className="mx-auto h-14 sm:h-18 w-auto bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 px-6 sm:px-8 border border-blue-200/20">
              <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">DirectNaukri</span>
            </div>
          </Link>
          
          {/* Trust Badge */}
         
          {/* Professional Message */}
          <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl shadow-lg">
            <div className="flex items-center justify-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="ml-3 text-center sm:text-left">
                <p className="text-sm font-semibold text-slate-800">
                  <span className="block sm:inline">Secure Authentication Required</span>
                  <span className="hidden sm:inline mx-2 text-slate-400">•</span>
                  <span className="block sm:inline text-slate-600">पहले लॉगिन करें</span>
                </p>
              </div>
            </div>
          </div>

          <h1 className="mt-6 text-center text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-center text-base text-slate-600">
            Sign in to your professional account
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-xl py-8 px-6 sm:px-8 shadow-2xl sm:rounded-3xl border border-white/50 relative overflow-hidden">
          {/* Subtle glass shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none rounded-3xl"></div>
          
          {/* Highlighted Google Sign In */}
          <div className="mb-8 relative z-10">
            {/* Premium Badge */}
           
            
            {/* Premium Google Button */}
            <button
              type="button"
              onClick={() => window.location.href = "/api/auth/google"}
              className="group relative w-full flex justify-center items-center gap-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-4 text-base font-semibold text-slate-700 shadow-lg hover:shadow-xl hover:bg-slate-50 hover:border-blue-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Google Logo */}
              <svg className="h-6 w-6" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.3H272v95.1h146.9c-6.4 34.6-25.7 63.9-54.8 83.5v69.4h88.6c51.8-47.7 81.8-118.1 81.8-197.7z"/>
                <path fill="#34a853" d="M272 544.3c73.8 0 135.6-24.5 180.8-66.6l-88.6-69.4c-24.6 16.5-56.3 26.1-92.2 26.1-70.9 0-131-47.9-152.5-112.1H27.1v70.5C72.7 475.2 166.8 544.3 272 544.3z"/>
                <path fill="#fbbc04" d="M119.5 322.3c-10.5-31.4-10.5-65.5 0-96.9V154.9H27.1c-38.9 77.9-38.9 168.6 0 246.5l92.4-70.5z"/>
                <path fill="#ea4335" d="M272 107.7c39.9 0 75.7 13.7 103.9 40.5l77.8-77.8C407.6 25.1 345.8 0 272 0 166.8 0 72.7 69.1 27.1 154.9l92.4 70.5C141 155.6 201.1 107.7 272 107.7z"/>
              </svg>
              <span className="text-slate-800 font-semibold">Continue with Google</span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 rounded-xl"></div>
            </button>
            
            <p className="mt-3 text-center text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                One-click secure access • No password required
              </span>
            </p>
          </div>

          {/* Elegant Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-6 text-slate-500">Or sign in with email</span>
            </div>
          </div>
          
          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-800 mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  disabled={isLoading}
                  className="block w-full rounded-xl border-0 py-3 px-4 text-slate-900 bg-slate-50/80 backdrop-blur-sm shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:bg-white sm:text-sm sm:leading-6 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all duration-200"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold leading-6 text-slate-800 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  disabled={isLoading}
                  className="block w-full rounded-xl border-0 py-3 px-4 pr-12 text-slate-900 bg-slate-50/80 backdrop-blur-sm shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:bg-white sm:text-sm sm:leading-6 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-slate-100 rounded-r-xl transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-slate-500 hover:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-slate-500 hover:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl bg-red-50/80 backdrop-blur-sm p-4 border border-red-200 shadow-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="flex w-full justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 text-base font-semibold leading-6 text-white shadow-lg hover:from-blue-700 hover:to-indigo-800 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in securely</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-8 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-slate-600">New to DirectNaukri?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 font-semibold leading-6 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline decoration-2 underline-offset-4"
              >
                <span>Create your professional account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd"/>
            </svg>
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8A8 8 0 11.01 8 8.01 8.01 0 0118 8zM9 12.93L13.71 8.2a1 1 0 111.41 1.42L10 14.75l-4.3-4.3a1 1 0 111.41-1.42L9 12.93z" clipRule="evenodd"/>
            </svg>
            <span>ISO 27001</span>
          </div>
        </div>

        {/* Terms and Privacy */}
        <p className="mt-4 text-center text-xs leading-5 text-slate-500 px-2">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="font-semibold text-slate-600 hover:text-slate-800 transition-colors duration-200 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-semibold text-slate-600 hover:text-slate-800 transition-colors duration-200 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}