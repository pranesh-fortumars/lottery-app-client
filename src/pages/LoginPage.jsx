import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Lock, ChevronRight, LogIn, UserPlus, HelpCircle } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(mobile, password);
    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <PageWrapper title="SECURE ACCESS" showNav={false}>
      <div className="bg-white min-h-screen px-6 py-12 flex flex-col items-center">
        {/* Animated Brand Pulse */}
        <div className="mb-12 text-center">
           <div className="w-24 h-24 bg-gradient-to-br from-[#f42464] to-[#ff004d] rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-[#f42464]/30 rotate-12 mb-8 mx-auto group">
              <LogIn size={48} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
           </div>
           <h2 className="text-4xl font-black text-gray-900 font-condensed uppercase tracking-tighter italic">Player Login</h2>
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-3 italic">Authorized Access Only</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-red-50 border border-red-100 p-4 rounded-2xl mb-6 flex items-center gap-3"
          >
             <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
             <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="space-y-4">
            {/* ID Input */}
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f42464] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Member ID / Phone" 
                className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl pl-16 pr-6 outline-none font-bold text-gray-800 shadow-sm focus:bg-white focus:border-[#f42464]/20 transition-all text-sm placeholder:text-gray-300"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f42464] transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Access Password" 
                className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl pl-16 pr-6 outline-none font-bold text-gray-800 shadow-sm focus:bg-white focus:border-[#f42464]/20 transition-all text-sm placeholder:text-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 space-y-5">
            <button 
              type="submit"
              className="w-full h-18 bg-gray-900 rounded-2xl font-black text-[12px] text-white uppercase tracking-widest shadow-xl shadow-black/10 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Confirm Identity <ChevronRight size={20} className="text-[#f42464]" />
            </button>

            <div className="grid grid-cols-2 gap-4 pt-4">
               <button 
                 type="button"
                 onClick={() => navigate('/signup')}
                 className="h-14 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] text-gray-700 uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
               >
                 <UserPlus size={16} className="text-[#f42464]" /> Register
               </button>
               <button 
                 type="button"
                 onClick={() => navigate('/reset-password')}
                 className="h-14 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] text-gray-700 uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm"
               >
                 <HelpCircle size={16} className="text-amber-500" /> Recovery
               </button>
            </div>
          </div>
        </form>

        <div className="mt-auto pt-16 text-center">
           <div className="h-px bg-gray-50 w-24 mx-auto mb-6"></div>
           <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Licensed & Regulated Draw System</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
