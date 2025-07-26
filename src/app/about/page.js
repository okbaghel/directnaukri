import React from "react";
import {
  Target,
  Users,
  Zap,
  ArrowRight,
  Linkedin,
  Twitter,
  Globe,
  ChevronDown,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-gray-900/40 to-zinc-900/40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
              <Zap className="w-5 h-5 mr-2 text-blue-400" />
              <span className="text-sm font-semibold text-gray-200 tracking-wide">
                REVOLUTIONIZING CAREER CONNECTIONS
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DirectNaukri
              </span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300 font-light">
              Connecting exceptional talent directly with{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text font-medium">
                HR decision-makers
              </span>{" "}
              at premium companies
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/jobs">
                <button className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center">
                  Explore Opportunities
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/">
                <button className="px-10 py-4 border border-gray-600 rounded-xl font-semibold text-gray-300 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </Link>
            </div>

            <div className="mt-20 animate-bounce">
              <ChevronDown className="w-6 h-6 text-gray-500 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative z-10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 mb-8 backdrop-blur-sm">
                <Target className="w-5 h-5 mr-2 text-indigo-400" />
                <span className="text-sm font-semibold text-gray-200 tracking-wide">
                  OUR MISSION
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
                <span className="text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text">
                  Redefining
                </span>
                <br />
                <span className="text-white">Career Discovery</span>
              </h2>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We eliminate traditional barriers in job searching by providing
                direct access to HR professionals at top-tier companies. No
                intermediaries, no delays—just meaningful connections that
                accelerate your career growth.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Direct Access
                    </h3>
                    <p className="text-gray-400">
                      Connect directly with hiring managers and skip traditional
                      application processes
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Premium Network
                    </h3>
                    <p className="text-gray-400">
                      Curated contacts from Fortune 500 companies and industry
                      leaders worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-gray-700/30 shadow-xl">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Premium Experience
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Experience job searching redefined with our enterprise-grade
                    platform designed for ambitious professionals seeking
                    exceptional opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 mb-8 backdrop-blur-sm">
              <Users className="w-5 h-5 mr-2 text-purple-400" />
              <span className="text-sm font-semibold text-gray-200 tracking-wide">
                LEADERSHIP TEAM
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text">
                Visionary Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the innovators reshaping how talent connects with opportunity
              in the modern workplace
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Founder Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-60 group-hover:opacity-80"></div>

              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/30 group-hover:border-blue-500/40 transition-all duration-500 shadow-xl">
                {/* Header with floating elements */}
                <div className="relative p-6 sm:p-8 pb-0">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-2 h-2 bg-indigo-400/40 rounded-full animate-pulse delay-1000"></div>
                </div>

                {/* Circular Profile Image */}
                <div className="flex justify-center px-6 sm:px-8">
                  <div className="relative">
                    {/* Animated Ring */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-md opacity-75 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>

                    {/* Inner Ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-80"></div>

                    {/* Image Container */}
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-4 border-white shadow-2xl ring-4 ring-blue-400/20 group-hover:ring-blue-400/40 transition-all duration-500 group-hover:scale-105">
                      <Image
                        src="/foundernew.png"
                        alt="Mr. Karan Jeet Singh Juneja - Founder"
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        priority
                      />

                      {/* Professional Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-white/5 rounded-full"></div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                      Mr. Karan Jeet Singh Juneja
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                      <p className="text-blue-400 font-semibold text-lg sm:text-xl tracking-wide">
                        Founder
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-md mx-auto">
                    Founder with 12+ years of experience in manpower solutions,
                    specializing in providing skilled and reliable workforce to
                    companies across various sectors.
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    <div className="flex items-center justify-center text-sm sm:text-base text-gray-400 bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-gray-700/30">
                      <MapPin className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                      <span>New Delhi, India</span>
                    </div>
                    
                  </div>

                  {/* Social Links */}
                </div>
              </div>
            </div>

            {/* Co-Founder Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-60 group-hover:opacity-80"></div>

              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/30 group-hover:border-blue-500/40 transition-all duration-500 shadow-xl">
                {/* Header with floating elements */}
                <div className="relative p-6 sm:p-8 pb-0">
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-2 h-2 bg-indigo-400/40 rounded-full animate-pulse delay-1000"></div>
                </div>

                {/* Circular Profile Image */}
                <div className="flex justify-center px-6 sm:px-8">
                  <div className="relative">
                    {/* Animated Ring */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-md opacity-75 group-hover:opacity-100 animate-pulse transition-all duration-500"></div>

                    {/* Inner Ring */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-80"></div>

                    {/* Image Container */}
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-4 border-white shadow-2xl ring-4 ring-blue-400/20 group-hover:ring-blue-400/40 transition-all duration-500 group-hover:scale-105">
                      <Image
                        src="/cofounder1.png"
                        alt="Mr. Yogesh Baghel - Co-Founder"
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        priority
                      />

                      {/* Professional Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-white/5 rounded-full"></div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 pt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                      Mr. Yogesh Baghel
                    </h3>
                    <div className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                      <p className="text-blue-400 font-semibold text-lg sm:text-xl tracking-wide">
                        Co-Founder
                      </p>
                     
                    </div>
                  </div>

                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 text-center max-w-md mx-auto">
                    Co-Founder with expertise in managing both technical and
                    non-technical operations, driving efficiency across all
                    departments. Focused on strategic growth.
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    <div className="flex items-center justify-center text-sm sm:text-base text-gray-400 bg-white/5 rounded-xl p-3 backdrop-blur-sm border border-gray-700/30">
                      <MapPin className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                      <span>New Delhi, India</span>
                    </div>
                   
                  </div>

                  {/* Social Links */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-12 sm:p-16 border border-gray-700/30 shadow-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
                Ready to{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text">
                  Transform
                </span>{" "}
                Your Career?
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who've discovered exceptional
                opportunities through direct connections with industry leaders
              </p>
              <Link href="/jobs">
                <button className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-lg sm:text-xl text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                  Explore Opportunities
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
