"use client";
import Link from 'next/link';
import { useState } from "react";
import { Truck, ChefHat, Sparkles, Shield, Wrench, Calculator, Briefcase, Users } from "lucide-react";

const categories = [
  {
    name: "Delivery",
    icon: Truck,
    description: "Food delivery & courier services"
  },
  {
    name: "Kitchen",
    icon: ChefHat,
    description: "Restaurant & hotel jobs"
  },
  {
    name: "Housekeeping",
    icon: Sparkles,
    description: "Cleaning & maintenance"
  },
  {
    name: "Security",
    icon: Shield,
    description: "Guard & safety positions"
  },
  {
    name: "General Helper",
    icon: Wrench,
    description: "Assistance & labor work"
  },
  {
    name: "Retail",
    icon: Calculator,
    description: "Cashier & store jobs"
  },
  {
    name: "Sales",
    icon: Briefcase,
    description: "Business development"
  },
  {
    name: "Customer Care",
    icon: Users,
    description: "Support & service roles"
  }
];

export default function JobCategories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl text-blue-600 lg:text-6xl font-bold mb-6" >
            Browse by Category
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#2F2F2F' }}>
            Find opportunities in your preferred sector and kickstart your career journey
          </p>
          {/* Stats or badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#F4F4F4', color: '#2F2F2F' }}>
              1000+ Active Jobs
            </div>
            <div className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: '#F4F4F4', color: '#2F2F2F' }}>
              Quick Apply
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                {/* Background Card */}
                <div 
                  className={`relative overflow-hidden rounded-2xl p-6 h-48 transition-all duration-300 ${
                    isHovered ? 'shadow-lg' : 'shadow-md'
                  }`}
                  style={{ backgroundColor: '#F4F4F4' }}
                >
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                    {/* Icon Container */}
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                      style={{ backgroundColor: '#1A73E8' }}
                    >
                      <IconComponent 
                        className="w-8 h-8 text-white" 
                      />
                    </div>
                    
                    {/* Category Name */}
                    <h3 
                      className="text-xl font-semibold mb-2"
                      style={{ color: '#2F2F2F' }}
                    >
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    <p 
                      className="text-sm opacity-70"
                      style={{ color: '#2F2F2F' }}
                    >
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div 
            className="inline-block p-8 rounded-3xl mb-8 shadow-xl"
            style={{ backgroundColor: '#F4F4F4' }}
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: 'black' }}
            >
              Ready to find your perfect job?
            </h3>
            <p 
              className="text-lg mb-6 opacity-80"
              style={{ color: '#2F2F2F' }}
            >
              Explore thousands of opportunities waiting for you
            </p>
            
            <Link href="/jobs">
              <button 
                className="px-8 py-3 cursor-pointer text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#1A73E8' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FF6B00';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1A73E8';
                }}
              >
                View All Jobs
              </button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm opacity-100">
            <span style={{ color: '#2F2F2F' }}>✨ Updated daily</span>
            <span className="hidden sm:inline" style={{ color: '#2F2F2F' }}>•</span>
            <span style={{ color: '#2F2F2F' }}>🔒 Verified employers</span>
            <span className="hidden sm:inline" style={{ color: '#2F2F2F' }}>•</span>
            <span style={{ color: '#2F2F2F' }}>⚡ Instant notifications</span>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}