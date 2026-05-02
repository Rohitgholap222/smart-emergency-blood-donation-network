import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { 
  Users, 
  Hospital, 
  Droplet, 
  Activity, 
  Settings, 
  Search, 
  MoreVertical,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalHospitals: 0,
    activeRequests: 0,
    successfulDonations: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch these from an admin stats endpoint
    // For now, we'll simulate or fetch what's available
    const fetchStats = async () => {
      try {
        // Example: api.get('/api/admin/stats')
        // Simulating data for now to show features
        setStats({
          totalDonors: 124,
          totalHospitals: 18,
          activeRequests: 5,
          successfulDonations: 89
        });
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch admin stats');
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex-1 bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-md flex items-center gap-1">
                <ShieldCheck size={14} /> ADMIN SYSTEM
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
            <p className="text-slate-500 mt-1">Global management of donors, hospitals, and emergency requests.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Settings size={18} />
              Config
            </button>
            <button className="px-5 py-2.5 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors flex items-center gap-2 shadow-lg shadow-brand-200">
              <Activity size={18} />
              Live Monitor
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Users className="text-blue-600" />} 
            label="Total Donors" 
            value={stats.totalDonors} 
            color="bg-blue-50" 
          />
          <StatCard 
            icon={<Hospital className="text-indigo-600" />} 
            label="Hospitals" 
            value={stats.totalHospitals} 
            color="bg-indigo-50" 
          />
          <StatCard 
            icon={<AlertCircle className="text-amber-600" />} 
            label="Active Requests" 
            value={stats.activeRequests} 
            color="bg-amber-50" 
          />
          <StatCard 
            icon={<Droplet className="text-brand-600" />} 
            label="Lives Saved" 
            value={stats.successfulDonations} 
            color="bg-brand-50" 
          />
        </div>

        {/* Management Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">User Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none w-64"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Joined</th>
                    <th className="px-6 py-4 font-semibold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <UserRow 
                    name="City Hospital Central" 
                    email="city@hospital.com" 
                    role="HOSPITAL" 
                    status="Active" 
                    date="May 12, 2024"
                  />
                  <UserRow 
                    name="Sarah Wilson" 
                    email="sarah.w@gmail.com" 
                    role="DONOR" 
                    status="Active" 
                    date="May 14, 2024"
                  />
                  <UserRow 
                    name="John Thompson" 
                    email="jt88@yahoo.com" 
                    role="DONOR" 
                    status="Active" 
                    date="May 15, 2024"
                  />
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 text-center">
              <button className="text-sm font-medium text-brand-600 hover:text-brand-700">View All Users</button>
            </div>
          </div>

          {/* Emergency Requests */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h2 className="text-xl font-bold text-slate-900">Active Emergencies</h2>
            </div>
            <div className="p-6 space-y-4">
              <EmergencyItem 
                hospital="St. Mary's Hospital" 
                bloodGroup="O-" 
                units={3} 
                time="12 mins ago" 
              />
              <EmergencyItem 
                hospital="Red Cross Clinic" 
                bloodGroup="AB+" 
                units={1} 
                time="45 mins ago" 
              />
            </div>
            <div className="p-6 pt-0">
              <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition-colors">
                Open Global Map
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
    <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
  </div>
);

const UserRow = ({ name, email, role, status, date }) => (
  <tr className="hover:bg-slate-50 transition-colors group">
    <td className="px-6 py-4">
      <div className="font-medium text-slate-900">{name}</div>
      <div className="text-xs text-slate-500">{email}</div>
    </td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
        role === 'HOSPITAL' ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'
      }`}>
        {role}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
        {status}
      </div>
    </td>
    <td className="px-6 py-4 text-xs text-slate-500">
      {date}
    </td>
    <td className="px-6 py-4 text-right">
      <button className="text-slate-400 hover:text-slate-600">
        <MoreVertical size={18} />
      </button>
    </td>
  </tr>
);

const EmergencyItem = ({ hospital, bloodGroup, units, time }) => (
  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl">
    <div className="flex justify-between items-start mb-2">
      <div className="font-bold text-slate-900 text-sm">{hospital}</div>
      <span className="text-[10px] text-rose-600 font-bold px-2 py-0.5 bg-white rounded-md border border-rose-200">URGENT</span>
    </div>
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 font-bold text-brand-700">
          <Droplet size={14} /> {bloodGroup}
        </div>
        <div className="text-slate-500">{units} Units</div>
      </div>
      <div className="text-slate-400 flex items-center gap-1">
        <Activity size={12} /> {time}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
