import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Bell, HeartPulse, MapPin } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex-1 bg-gradient-to-b from-brand-50 via-white to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
            Save Lives with the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
              Smart Blood Network
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 mx-auto mb-10 leading-relaxed">
            A real-time, location-based emergency blood donation platform. Connecting hospitals in need with nearby donors instantly using advanced spatial matching and WebSocket technology.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 text-lg font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-2xl shadow-lg shadow-brand-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
              <HeartPulse size={24} />
              Become a Donor
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-lg font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-2xl shadow-sm hover:shadow transition-all duration-300 active:scale-95"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100">
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<MapPin size={32} className="text-brand-500" />}
            title="Location-Based Matching"
            description="Our spatial algorithm finds the absolute closest compatible donors when every minute counts."
          />
          <FeatureCard 
            icon={<Bell size={32} className="text-brand-500" />}
            title="Real-Time Alerts"
            description="Instant WebSocket notifications ensure donors are alerted the second an emergency request is created."
          />
          <FeatureCard 
            icon={<Activity size={32} className="text-brand-500" />}
            title="Hospital Dashboard"
            description="Hospitals can broadcast urgent requests and monitor incoming donor responses dynamically."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
