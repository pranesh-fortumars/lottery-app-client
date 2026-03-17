import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Gavel, ScrollText, ShoppingCart, User, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = ({ title = "DIAMOND AGENCY" }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-brand-pink text-white flex items-center justify-between px-4 sticky top-0 z-[1000] shadow-lg" style={{ height: '60px' }}>
      <div className="flex items-center gap-2">
        <HomeIcon size={28} onClick={() => navigate('/home')} className="cursor-pointer hover:scale-110 transition-transform" />
        <h1 className="text-xl font-condensed font-black italic tracking-tighter uppercase">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Download size={24} className="cursor-pointer hover:scale-110 transition-transform" />
        <NavLink to="/profile" className="hover:scale-110 transition-transform">
          <User size={28} />
        </NavLink>
      </div>
    </header>
  );
};

export const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full max-w-[480px] z-[1000] shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      {/* Slogan Bar */}
      <div className="bg-brand-pink text-white py-3 text-center font-condensed font-black text-lg tracking-wide border-b border-white/10 uppercase">
        INDIA'S LARGEST PRIZES AGENCY
      </div>
      
      {/* Navigation Icons */}
      <nav className="bg-brand-pink flex justify-around items-center py-4 px-2">
        <NavLink to="/home" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}>
          <HomeIcon size={32} />
        </NavLink>
        <NavLink to="/rules" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}>
          <Gavel size={32} />
        </NavLink>
        <NavLink to="/results" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}>
          <ScrollText size={32} />
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => `text-white transition-all ${isActive ? 'scale-125' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}>
          <ShoppingCart size={32} />
        </NavLink>
      </nav>
    </div>
  );
};

const PageWrapper = ({ children, title, showNav = true, showHeader = true }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-screen w-full bg-white relative"
    >
      {showHeader && <Header title={title} />}
      <main className={`flex-grow ${showNav ? 'pb-32' : ''}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </motion.div>
  );
};

export default PageWrapper;
