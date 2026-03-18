import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { User, Phone, Users, ChevronRight, LogIn } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    referral: ''
  });

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
  };

  return (
    <PageWrapper title="MEMBER REGISTRATION" showNav={false}>
      <div className="bg-white min-h-screen p-4 flex flex-col items-center pt-10">
        <form onSubmit={handleSignup} className="w-full space-y-4">
          {/* Name Input */}
          <div className="flex border border-gray-200 rounded-2xl overflow-hidden h-14 bg-gray-50/50 shadow-sm focus-within:border-[#f42464]/30 transition-all">
            <div className="bg-gray-100/50 px-5 flex items-center justify-center border-r border-gray-100 text-gray-400">
               <User size={18} />
            </div>
            <input 
              className="flex-grow px-4 outline-none border-none focus:ring-0 text-sm font-bold text-gray-700 bg-transparent placeholder:text-gray-300" 
              placeholder="Enter your name" 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Mobile Number Input */}
          <div className="flex border border-gray-200 rounded-2xl overflow-hidden h-14 bg-gray-50/50 shadow-sm focus-within:border-[#f42464]/30 transition-all">
            <div className="bg-gray-100/50 px-4 flex items-center justify-center border-r border-gray-100 text-gray-400 font-black text-[10px] uppercase tracking-widest">
              +91
            </div>
            <input 
              className="flex-grow px-4 outline-none border-none focus:ring-0 text-sm font-bold text-gray-700 bg-transparent placeholder:text-gray-300" 
              placeholder="Mobile Number" 
              type="tel"
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            />
          </div>

          {/* Referral Code Input */}
          <div className="flex border border-gray-200 rounded-2xl overflow-hidden h-14 bg-gray-50/50 shadow-sm focus-within:border-blue-200 transition-all">
            <div className="bg-gray-100/50 px-5 flex items-center justify-center border-r border-gray-100 text-gray-400">
               <Users size={18} />
            </div>
            <input 
              className="flex-grow px-4 outline-none border-none focus:ring-0 text-sm font-bold text-gray-700 bg-transparent placeholder:text-gray-300" 
              placeholder="Refferal code (Optional)" 
              type="text"
              value={formData.referral}
              onChange={(e) => setFormData({...formData, referral: e.target.value})}
            />
          </div>

          <div className="pt-6 space-y-4">
            <button className="w-full bg-[#ff0000] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2" type="submit">
               Get OTP <ChevronRight size={16} />
            </button>
            <div className="flex gap-4">
              <button 
                className="flex-1 bg-white border border-gray-100 text-gray-400 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:border-[#ff0000] hover:text-[#ff0000] transition-all" 
                type="button"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button 
                className="flex-[2] bg-white border border-gray-100 text-gray-400 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:border-[#ff0000] hover:text-[#ff0000] transition-all" 
                type="button"
                onClick={() => navigate('/reset-password')}
              >
                Reset Password
              </button>
            </div>
          </div>
        </form>

        <div className="mt-auto py-10 opacity-30 text-center">
           <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 italic">India's Largest Prizes Agency</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignupPage;
