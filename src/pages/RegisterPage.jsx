import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, UserPlus, Loader2, User, Mail, Lock, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'DONOR',
    bloodGroup: '',
    latitude: '',
    longitude: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }
    
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
        toast.success('Location acquired!');
        setIsGettingLocation(false);
      },
      (error) => {
        toast.error('Failed to get location. Please allow access.');
        setIsGettingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate Blood Group if role is DONOR
    if (formData.role === 'DONOR' && !formData.bloodGroup) {
      toast.error('Please select a blood group');
      setIsLoading(false);
      return;
    }

    const payload = { ...formData };
    if (payload.role !== 'DONOR') {
      delete payload.bloodGroup;
    }
    
    const result = await register(payload);
    
    if (result.success) {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } else {
      toast.error(result.message);
    }
    
    setIsLoading(false);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-100 rounded-full blur-3xl opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="w-full max-w-xl relative">
        <div className="glass p-8 sm:p-10 rounded-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex bg-brand-100 p-3 rounded-2xl mb-4">
              <UserPlus className="text-brand-600 w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
            <p className="mt-2 text-slate-600">Join the Smart Blood Network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name / Hospital Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">I am registering as a</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="DONOR"
                    checked={formData.role === 'DONOR'}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="text-center py-3 border border-slate-200 rounded-xl peer-checked:bg-brand-50 peer-checked:border-brand-500 peer-checked:text-brand-700 font-medium transition-all">
                    Donor
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="HOSPITAL"
                    checked={formData.role === 'HOSPITAL'}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="text-center py-3 border border-slate-200 rounded-xl peer-checked:bg-brand-50 peer-checked:border-brand-500 peer-checked:text-brand-700 font-medium transition-all">
                    Hospital
                  </div>
                </label>
              </div>
            </div>

            {formData.role === 'DONOR' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-medium text-slate-700 mb-2">Blood Group</label>
                <div className="grid grid-cols-4 gap-2">
                  {bloodGroups.map(bg => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                      className={`py-2 border rounded-lg font-bold transition-all ${
                        formData.bloodGroup === bg 
                          ? 'bg-brand-600 border-brand-600 text-white' 
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <label className="block text-sm font-medium text-slate-700 mb-3">Location Information</label>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input
                  type="number"
                  name="latitude"
                  readOnly
                  placeholder="Latitude"
                  value={formData.latitude}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-100/50 text-slate-500 text-sm"
                />
                <input
                  type="number"
                  name="longitude"
                  readOnly
                  placeholder="Longitude"
                  value={formData.longitude}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-100/50 text-slate-500 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={getLocation}
                disabled={isGettingLocation}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors focus:ring-2 focus:ring-brand-500 outline-none"
              >
                {isGettingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin text-brand-600" />
                ) : (
                  <MapPin className="h-4 w-4 text-brand-600" />
                )}
                {formData.latitude ? 'Update Location' : 'Get Current Location'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.latitude}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">Already have an account? </span>
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
