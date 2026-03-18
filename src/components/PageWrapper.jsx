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
  ShieldAlert
} from 'lucide-react';

export const Header = ({ title = "DIAMOND AGENCY" }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#ff004d] to-[#ff4d8a] text-white flex items-center justify-between px-4 z-[1000] shadow-lg w-full shrink-0 border-b border-white/10" style={{ height: '70px' }}>
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
    { to: '/rules', icon: Gavel },
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
    <div className="w-full max-w-[480px] z-[1000] shadow-[0_-10px_30px_rgba(255,0,77,0.15)] rounded-t-[2.5rem] bg-white border-t border-gray-100 overflow-hidden mt-auto">
      <div className="bg-gray-950 text-white py-2 text-center font-black text-[9px] tracking-widest border-b border-white/5 uppercase">
        {isAdmin ? '🛡️ Diamond Secretariat Command' : "💎 Official Diamond Agency Node"}
      </div>
      
      <nav className="flex justify-around items-center py-5 px-4 bg-white">
        {links.map((link, idx) => (
          <NavLink 
            key={idx}
            to={link.to} 
            end={link.to === '/admin'}
            className={({ isActive }) => `transition-all duration-300 flex flex-col items-center gap-1 ${
              isActive 
                ? 'text-[#ff004d] scale-110 drop-shadow-[0_0_8px_rgba(255,0,77,0.3)]' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            {({ isActive }) => (
              <>
                <link.icon size={26} strokeWidth={2.5} />
                <div className={`w-1 h-1 rounded-full bg-[#ff004d] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const PageWrapper = ({ children, title, showNav = true, showHeader = true }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f9f9f9] relative max-w-[480px] mx-auto shadow-2xl overflow-x-hidden border-x border-gray-100">
      {showHeader && <Header title={title} />}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-grow bg-[#f9f9f9]"
      >
        {children}
      </motion.main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default PageWrapper;
