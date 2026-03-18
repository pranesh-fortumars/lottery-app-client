import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Users, Key, ChevronRight, LogIn } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    referral: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // Logic for signup
    console.log("Signup attempt:", formData);
  };

  return (
    <PageWrapper title="PLAYER REGISTRATION" showNav={false}>
      <div className="bg-white min-h-screen px-6 py-12 flex flex-col items-center">
        {/* Logo/Icon section */}
        <div className="mb-12 text-center">
           <div className="w-20 h-20 bg-gradient-to-br from-[#f42464] to-[#ff004d] rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-[#f42464]/30 rotate-6 mb-6 mx-auto">
              <User size={40} strokeWidth={2.5} />
           </div>
           <h2 className="text-3xl font-black text-gray-900 font-condensed uppercase tracking-tighter">Join the Agency</h2>
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 italic">Empowering your fortune every draw</p>
        </div>

        <form onSubmit={handleSignup} className="w-full space-y-6">
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f42464] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl pl-16 pr-6 outline-none font-bold text-gray-800 shadow-sm focus:bg-white focus:border-[#f42464]/20 transition-all text-sm placeholder:text-gray-300"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Mobile Input */}
            <div className="relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs uppercase">+91</span>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl pl-16 pr-6 outline-none font-bold text-gray-800 shadow-sm focus:bg-white focus:border-[#f42464]/20 transition-all text-sm placeholder:text-gray-300"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
            </div>

            {/* Referral Input */}
            <div className="relative group border-t border-gray-50 pt-4">
              <div className="mb-2 ml-1 text-[9px] font-black text-gray-400 uppercase tracking-widest">Optional</div>
              <Users className="absolute left-6 top-[72px] -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Referral Code (If any)" 
                className="w-full h-16 bg-blue-50/30 border-2 border-transparent rounded-2xl pl-16 pr-6 outline-none font-bold text-gray-600 shadow-sm focus:bg-white focus:border-blue-500/20 transition-all text-sm placeholder:text-gray-300"
                value={formData.referral}
                onChange={(e) => setFormData({...formData, referral: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <button 
              type="submit"
              className="w-full h-16 bg-gradient-to-r from-[#f42464] to-[#ff004d] rounded-2xl font-black text-[12px] text-white uppercase tracking-widest shadow-xl shadow-[#f42464]/20 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Get Secure OTP <ChevronRight size={20} />
            </button>

            <div className="flex items-center gap-3 py-2">
               <div className="h-px bg-gray-100 flex-grow"></div>
               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Already a member?</span>
               <div className="h-px bg-gray-100 flex-grow"></div>
            </div>

            <button 
              type="button"
              onClick={() => navigate('/login')}
              className="w-full h-16 bg-white border-2 border-gray-100 rounded-2xl font-black text-[12px] text-gray-700 uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-3 hover:bg-gray-50"
            >
              Sign In to Account <LogIn size={18} className="text-[#f42464]" />
            </button>
          </div>
        </form>

        <div className="mt-auto pt-12 text-center">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">India's Most Trusted Agency</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignupPage;
