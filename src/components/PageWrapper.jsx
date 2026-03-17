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
  Users
} from 'lucide-react';

export const Header = ({ title = "DIAMOND AGENCY" }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#f42464] to-[#ff5c8a] text-white flex items-center justify-between px-4 z-[1000] shadow-md w-full shrink-0" style={{ height: '60px' }}>
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-condensed font-black tracking-tighter uppercase whitespace-nowrap">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition-all font-bold"
          >
            Logout
          </button>
        )}
        <Download size={24} className="cursor-pointer hover:scale-110 active:scale-90 transition-transform" />
        <NavLink to="/profile" className="hover:scale-110 active:scale-90 transition-transform">
          <User size={28} />
        </NavLink>
      </div>
    </header>
  );
};

export const BottomNav = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="fixed bottom-0 w-full max-w-[480px] z-[1000] shadow-[0_-4px_15px_rgba(0,0,0,0.15)] bg-white shrink-0">
      <div className="bg-[#f42464] text-white py-2.5 text-center font-condensed font-black text-lg tracking-wide border-b border-white/10 uppercase">
        {isAdmin ? 'DIAMOND ADMIN CONTROL' : "INDIA'S LARGEST PRIZES AGENCY"}
      </div>
      
      <nav className="bg-[#f42464] flex justify-around items-center py-3.5 px-2">
        {!isAdmin ? (
          <>
            <NavLink to="/home" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <HomeIcon size={28} />
            </NavLink>
            <NavLink to="/rules" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <Gavel size={28} />
            </NavLink>
            <NavLink to="/results" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <ScrollText size={28} />
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <ShoppingCart size={28} />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/admin" end className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <LayoutDashboard size={28} />
            </NavLink>
            <NavLink to="/admin/announcements" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <Megaphone size={28} />
            </NavLink>
            <NavLink to="/admin/control" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <Settings2 size={28} />
            </NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}>
              <Users size={28} />
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

const PageWrapper = ({ children, title, showNav = true, showHeader = true }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#f9f9f9] overflow-hidden relative max-w-[480px] mx-auto shadow-2xl">
      {showHeader && <Header title={title} />}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex-grow overflow-y-auto ${showNav ? 'pb-[110px]' : ''} bg-[#f9f9f9]`}
      >
        {children}
      </motion.main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default PageWrapper;
