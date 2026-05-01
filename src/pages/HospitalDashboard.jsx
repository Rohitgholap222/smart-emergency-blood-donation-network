import React, { useState } from 'react';
import api from '../api/axiosConfig';
import { toast } from 'react-hot-toast';
import { AlertCircle, Search, MapPin, Phone, User, Loader2, Send } from 'lucide-react';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('request'); // 'request' or 'nearest'
  
  // Request Form State
  const [requestData, setRequestData] = useState({
    bloodGroup: '',
    unitsRequired: 1,
    urgency: 'HIGH',
    latitude: '',
    longitude: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Nearest Donors State
  const [searchParams, setSearchParams] = useState({
    bloodGroup: '',
    latitude: '',
    longitude: ''
  });
  const [donors, setDonors] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleRequestChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const getLocationForRequest = () => {
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setRequestData({
          ...requestData,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        toast.success('Location acquired!');
        setIsGettingLocation(false);
      },
      () => {
        toast.error('Failed to get location');
        setIsGettingLocation(false);
      }
    );
  };

  const getLocationForSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSearchParams({
          ...searchParams,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        toast.success('Location acquired!');
      },
      () => toast.error('Failed to get location')
    );
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    if (!requestData.bloodGroup || !requestData.latitude || !requestData.longitude) {
      toast.error('Please fill all required fields and get location');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/api/donations/request', requestData);
      toast.success('Urgent request dispatched successfully! Nearby donors notified.');
      setRequestData({ ...requestData, unitsRequired: 1 }); // Reset some form state
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to dispatch request');
    }
    setIsSubmitting(false);
  };

  const searchDonors = async (e) => {
    e.preventDefault();
    if (!searchParams.bloodGroup || !searchParams.latitude || !searchParams.longitude) {
      toast.error('Please select blood group and location');
      return;
    }

    setIsSearching(true);
    try {
      const res = await api.get('/api/donors/nearest', {
        params: {
          bloodGroup: searchParams.bloodGroup,
          latitude: searchParams.latitude,
          longitude: searchParams.longitude,
          limit: 10
        }
      });
      setDonors(res.data.data || []);
      if ((res.data.data || []).length === 0) {
        toast('No donors found matching criteria', { icon: 'ℹ️' });
      }
    } catch (error) {
      toast.error('Failed to fetch nearest donors');
    }
    setIsSearching(false);
  };

  return (
    <div className="flex-1 bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Hospital Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage blood requests and locate nearby donors.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('request')}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'request' 
                  ? 'bg-white text-brand-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Request
            </button>
            <button
              onClick={() => setActiveTab('nearest')}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'nearest' 
                  ? 'bg-white text-brand-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Find Donors
            </button>
          </div>
        </div>

        {activeTab === 'request' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-brand-50 border-b border-brand-100 p-6 flex items-center gap-3">
              <AlertCircle className="text-brand-600" />
              <h2 className="text-xl font-bold text-brand-900">Dispatch Emergency Request</h2>
            </div>
            
            <form onSubmit={submitRequest} className="p-6 sm:p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Required Blood Group</label>
                    <div className="grid grid-cols-4 gap-2">
                      {bloodGroups.map(bg => (
                        <button
                          key={bg}
                          type="button"
                          onClick={() => setRequestData({ ...requestData, bloodGroup: bg })}
                          className={`py-3 border rounded-xl font-bold transition-all ${
                            requestData.bloodGroup === bg 
                              ? 'bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-200' 
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {bg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Units Required</label>
                      <input
                        type="number"
                        name="unitsRequired"
                        min="1"
                        value={requestData.unitsRequired}
                        onChange={handleRequestChange}
                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all text-center font-bold text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Urgency</label>
                      <select
                        name="urgency"
                        value={requestData.urgency}
                        onChange={handleRequestChange}
                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all font-medium text-slate-700"
                      >
                        <option value="HIGH">High (Emergency)</option>
                        <option value="NORMAL">Normal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Hospital Location</label>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                      <div className="flex gap-4 mb-4">
                        <input
                          type="number"
                          readOnly
                          placeholder="Latitude"
                          value={requestData.latitude}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-500 text-sm"
                        />
                        <input
                          type="number"
                          readOnly
                          placeholder="Longitude"
                          value={requestData.longitude}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-500 text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={getLocationForRequest}
                        disabled={isGettingLocation}
                        className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:border-brand-300 hover:text-brand-600 rounded-xl font-medium text-slate-700 transition-colors"
                      >
                        {isGettingLocation ? <Loader2 className="animate-spin w-5 h-5" /> : <MapPin className="w-5 h-5 text-brand-500" />}
                        Use My Location
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-200 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <><Loader2 className="animate-spin w-5 h-5" /> Dispatching...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Broadcast Urgent Request</>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'nearest' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Search className="text-brand-500" /> Find Nearest Donors
              </h2>
              <form onSubmit={searchDonors} className="flex flex-col sm:flex-row gap-4">
                <select
                  name="bloodGroup"
                  value={searchParams.bloodGroup}
                  onChange={handleSearchChange}
                  className="px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none font-medium text-slate-700 min-w-[150px]"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                
                <button
                  type="button"
                  onClick={getLocationForSearch}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
                >
                  <MapPin className="w-5 h-5 text-brand-500" />
                  {searchParams.latitude ? 'Location Set' : 'Get Location'}
                </button>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="sm:ml-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSearching ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
                  Search
                </button>
              </form>
            </div>

            {donors.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Droplet size={64} className="text-brand-600" />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center font-bold text-lg">
                        <User size={24} />
                      </div>
                      <span className="px-3 py-1 bg-brand-50 text-brand-700 font-bold rounded-lg border border-brand-100">
                        {donor.bloodGroup}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 mb-1 truncate">{donor.name}</h3>
                    
                    <div className="space-y-2 mt-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-slate-400" />
                        <a href={`tel:${donor.phone}`} className="hover:text-brand-600">{donor.phone}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-slate-400" />
                        <span>{donor.distance.toFixed(2)} km away</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
