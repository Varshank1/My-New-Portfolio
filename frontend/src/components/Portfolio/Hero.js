import React from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const Hero = ({ personalInfo, onViewWork, onGetInTouch }) => {
  if (!personalInfo) return <div className="min-h-screen bg-gray-900 animate-pulse"></div>;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-yellow-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-40 w-24 h-24 bg-yellow-400/10 transform rotate-45 animate-bounce"></div>
      <div className="absolute top-40 right-60 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-lg animate-pulse"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Location & Status */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm font-medium tracking-wide">
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>{personalInfo.location}</span>
            </div>

            {/* Name */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">{personalInfo.name}</span>
                <br />
                <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  {personalInfo.surname}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 font-medium leading-relaxed">
                {personalInfo.title}
              </p>
              
              <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                {personalInfo.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onViewWork}
                className="group px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onGetInTouch}
                className="group px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-gray-800">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">{personalInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">{personalInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Right side - Abstract visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-yellow-400/30 to-yellow-300/10 rounded-full animate-pulse"></div>
              <div className="absolute top-32 left-32 w-16 h-16 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;