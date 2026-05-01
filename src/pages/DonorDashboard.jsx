import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuth } from '../context/AuthContext';
import { Bell, MapPin, Droplet, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user || !user.token) return;

    const socketUrl = 'http://localhost:8080/ws';
    const stompClient = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      connectHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      debug: function (str) {
        console.log('STOMP: ' + str);
      },
      onConnect: () => {
        console.log('Connected to WebSocket');
        // The queue might be unique to the user, like /user/queue/notifications
        stompClient.subscribe('/user/queue/notifications', (message) => {
          if (message.body) {
            const notification = JSON.parse(message.body);
            setNotifications((prev) => [notification, ...prev]);
            
            // Show toast notification
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="h-10 w-10 bg-brand-100 rounded-full flex items-center justify-center">
                        <Droplet className="h-6 w-6 text-brand-600" />
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-bold text-slate-900">
                        Urgent! {notification.bloodGroup} Blood Required
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {notification.hospitalName} is requesting {notification.unitsRequired} units.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-slate-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-brand-600 hover:text-brand-500 focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            ), { duration: 10000 });
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [user]);

  return (
    <div className="flex-1 bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center">
            <Droplet size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Donor Dashboard</h1>
            <p className="text-slate-500 mt-1">Ready to save lives. We will notify you of nearby emergencies.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Bell className="text-brand-500" /> Recent Alerts
          </h2>

          {notifications.length === 0 ? (
            <div className="bg-white/60 border border-slate-200 border-dashed rounded-3xl p-12 text-center text-slate-500 flex flex-col items-center">
              <Bell size={48} className="text-slate-300 mb-4" />
              <p className="text-lg font-medium">No urgent requests nearby</p>
              <p className="text-sm mt-1">We'll alert you instantly when a hospital needs your blood group.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notif, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-500"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-md">
                          URGENT
                        </span>
                        <span className="text-slate-500 text-sm flex items-center gap-1">
                          <Clock size={14} /> Just now
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-2">
                        {notif.hospitalName} needs {notif.bloodGroup} Blood
                      </h3>
                      <p className="text-slate-600 mt-1 text-sm">
                        Units required: <span className="font-semibold text-slate-900">{notif.unitsRequired}</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                      <MapPin size={16} className="mr-1 text-brand-500" />
                      {notif.distance ? `${notif.distance.toFixed(1)} km away` : 'Nearby'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DonorDashboard;
