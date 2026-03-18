import React from 'react';
import { User, LogOut, ChevronRight, History, Ticket, Landmark, Settings, Wallet, Bell, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: <Wallet size={20} />, label: 'My Wallet balance', value: '₹ 14,500', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: <History size={20} />, label: 'Transaction History', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: <Ticket size={20} />, label: 'My Lottery Tickets', color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: <Landmark size={20} />, label: 'Bank Account Details', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: <Bell size={20} />, label: 'Notification Settings', color: 'text-[#f42464]', bg: 'bg-[#fce4ec]' },
    { icon: <ShieldCheck size={20} />, label: 'Security & Privacy', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageWrapper title="PLAYER PROFILE" showNav={true}>
      <div className="bg-[#f8f9fa] min-h-screen p-5 pb-32">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden mb-10 group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-[#f42464]/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-[#f42464]/30 transition-colors"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
           
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-white p-1 rounded-3xl rotate-3 shadow-lg group-hover:rotate-6 transition-transform">
                 <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                    <User size={40} className="text-[#f42464]" />
                 </div>
              </div>
              <div className="space-y-1">
                 <h2 className="text-2xl font-black font-condensed tracking-tighter uppercase italic">{user?.name || 'Pranesh'}</h2>
                 <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">{user?.phone || '+91 98765 43210'}</p>
                 <div className="flex items-center gap-2 pt-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Verified Player</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Menu Grid */}
        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2">Account Management</p>
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer group hover:border-[#f42464]/20"
            >
               <div className="flex items-center gap-5">
                  <div className={`${item.bg} ${item.color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                     {item.icon}
                  </div>
                  <div>
                    <span className="font-black text-gray-800 uppercase tracking-tight text-xs block">{item.label}</span>
                    {item.value && <span className="text-[10px] font-bold text-gray-400 mt-1 block">{item.value}</span>}
                  </div>
               </div>
               <div className="bg-gray-50 p-2 rounded-full text-gray-200 group-hover:text-[#f42464] group-hover:bg-[#fce4ec] transition-all">
                  <ChevronRight size={18} />
               </div>
            </div>
          ))}

          <button 
            onClick={handleLogout}
            className="w-full h-18 bg-white border-2 border-red-50 text-red-500 rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 mt-10 active:scale-95 transition-all shadow-sm hover:bg-red-50"
          >
             <LogOut size={20} /> Terminate Session
          </button>
        </div>

        <div className="mt-12 text-center pb-8 border-t border-gray-100 pt-8 opacity-40">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Diamond Jackpot Lottery v4.1.2</p>
           <p className="text-[9px] font-bold text-gray-300 mt-1">Official Mobile Application of India</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
