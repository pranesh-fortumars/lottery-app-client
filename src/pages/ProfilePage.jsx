import React from 'react';
import { User, LogOut, ChevronRight, History, Ticket, Landmark, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: <History size={20} />, label: 'Transaction History', color: 'text-blue-500' },
    { icon: <Ticket size={20} />, label: 'My Tickets', color: 'text-green-500' },
    { icon: <Landmark size={20} />, label: 'Bank Details', color: 'text-purple-500' },
    { icon: <Settings size={20} />, label: 'Settings', color: 'text-gray-500' },
  ];

  return (
    <PageWrapper title="MY PROFILE" showNav={true}>
      <div className="bg-white min-h-screen">
        {/* Profile Header Card */}
        <div className="p-6 bg-[#ff1a66] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
           <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white p-1 rounded-full shadow-2xl mb-4 group relative">
                 <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                 </div>
                 <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-lg border border-[#ff1a66]/20">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                 </div>
              </div>
              <h2 className="text-white text-2xl font-black uppercase tracking-tight font-condensed italic">{user?.name || 'Pranesh'}</h2>
              <p className="text-white/80 font-bold text-sm tracking-widest">{user?.phone || '+91 9876543210'}</p>
           </div>
        </div>

        {/* Menu Items */}
        <div className="p-4 py-8 space-y-3">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              className="group flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 active:bg-[#ff1a66]/5 active:border-[#ff1a66]/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                 <div className={`${item.color} bg-white p-2 rounded-xl shadow-sm border border-gray-50 group-active:scale-110 transition-transform`}>
                    {item.icon}
                 </div>
                 <span className="font-black text-gray-700 uppercase tracking-tight text-sm">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}

          <div 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100 mt-8 active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
               <div className="text-red-600 bg-white p-2 rounded-xl shadow-sm border border-red-100">
                  <LogOut size={20} />
               </div>
               <span className="font-black text-red-600 uppercase tracking-tight text-sm">Logout Account</span>
            </div>
            <ChevronRight size={20} className="text-red-300" />
          </div>
        </div>

        <div className="p-8 text-center border-t border-gray-50 mt-4">
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] italic">Diamond Jackpot Lottery v4.1.0</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
