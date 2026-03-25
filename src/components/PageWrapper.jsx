import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home as HomeIcon, 
  Gavel, 
  ScrollText, 
  ShoppingCart, 
  User, 
  Download,
  LayoutDashboard,
  Megaphone,
  Settings2,
  Users,
  BarChart3,
  Settings,
  ShieldAlert,
  Ticket
} from 'lucide-react';

export const Header = ({ title = "DIAMOND AGENCY" }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#ff0033] to-[#ff4d6a] text-white flex items-center justify-between px-4 z-[1000] shadow-lg w-full shrink-0 border-b border-white/10" style={{ height: '70px' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
           <img src="https://img.icons8.com/color/48/000000/treasure-chest.png" alt="Logo" className="w-7 h-7" />
        </div>
        <h1 className="text-lg font-condensed font-black tracking-tighter uppercase italic leading-none">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="text-[9px] font-black uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-black/30 transition-all"
          >
            Logout
          </button>
        )}
        <NavLink to="/profile" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all border border-white/5">
          <User size={22} strokeWidth={2.5} />
        </NavLink>
      </div>
    </header>
  );
};

export const BottomNav = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const userLinks = [
    { to: '/home', icon: HomeIcon },
    { to: '/tickets', icon: Ticket },
    { to: '/results', icon: ScrollText },
    { to: '/cart', icon: ShoppingCart },
  ];

  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard },
    { to: '/admin/announcements', icon: Megaphone },
    { to: '/admin/control', icon: ShieldAlert },
    { to: '/admin/users', icon: Users },
    { to: '/admin/reports', icon: BarChart3 },
    { to: '/admin/settings', icon: Settings },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="w-full shadow-[0_-8px_30px_rgba(255,0,51,0.2)] rounded-t-[2.5rem] bg-[#ff0033] overflow-hidden">
      <div className="bg-black/10 text-white/80 py-2 text-center font-black text-[8px] tracking-[0.2em] border-b border-white/5 uppercase">
        {isAdmin ? '🛡️ Admin Command Center' : "💎 Diamond Agency Network"}
      </div>
      
      <nav className="flex justify-around items-center py-5 px-4 bg-[#ff0033]">
        {links.map((link, idx) => (
          <NavLink 
            key={idx}
            to={link.to} 
            end={link.to === '/admin'}
            className={({ isActive }) => `transition-all duration-300 flex flex-col items-center gap-1 ${
              isActive 
                ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' 
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {({ isActive }) => (
              <>
                <link.icon size={26} strokeWidth={2.5} />
                <div className={`w-1 h-1 rounded-full bg-white transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const PageWrapper = ({ children, title, showNav = true, showHeader = true, footerAction = null }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#f9f9f9] relative max-w-[480px] mx-auto shadow-2xl overflow-hidden border-x border-gray-100">
      {showHeader && <Header title={title} />}
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-grow bg-[#f9f9f9] overflow-y-auto scrollbar-hide pb-10"
      >
        {children}
      </motion.main>
      
      {/* Footer Area: Actions above BottomNav */}
      <div className="shrink-0 w-full bg-transparent pointer-events-none z-50">
         {footerAction && (
           <div className="px-4 pb-4 pointer-events-auto">
             {footerAction}
           </div>
         )}
         {showNav && <BottomNav />}
      </div>
    </div>
  );
};

export default PageWrapper;
