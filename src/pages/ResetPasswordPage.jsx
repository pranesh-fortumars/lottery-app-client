import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Lock, ChevronRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const handleReset = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      alert("Password has been reset successfully!");
      navigate('/login');
    }
  };

  return (
    <PageWrapper title="ACCOUNT RECOVERY" showNav={false}>
      <div className="bg-white min-h-screen px-6 py-12 flex flex-col items-center">
        {/* Back Link */}
        <button 
          onClick={() => navigate('/login')} 
          className="self-start flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest mb-10 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft size={16} /> Back to login
        </button>

        {/* Header section */}
        <div className="mb-12 text-center">
           <div className="w-20 h-20 bg-gradient-to-br from-[#f42464] to-[#ff004d] rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-[#f42464]/30 rotate-6 mb-6 mx-auto">
              <Lock size={40} strokeWidth={2.5} />
           </div>
           <h2 className="text-3xl font-black text-gray-900 font-condensed uppercase tracking-tighter">Security Check</h2>
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 italic">Verify your primary mobile number</p>
        </div>

        <form onSubmit={handleReset} className="w-full space-y-6">
          <div className="space-y-4">
            {step === 1 ? (
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs uppercase">+91</span>
                <input 
                  required
                  type="tel" 
                  placeholder="Linked Mobile Number" 
                  className="w-full h-16 bg-gray-50 border-2 border-transparent rounded-2xl pl-16 pr-6 outline-none font-bold text-gray-800 shadow-sm focus:bg-white focus:border-[#f42464]/20 transition-all text-sm placeholder:text-gray-300"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                <div className="mb-2 ml-1 text-[9px] font-black text-gray-400 uppercase tracking-widest">OTP SENT TO {mobile}</div>
                <Lock className="absolute left-6 top-[72px] -translate-y-1/2 text-gray-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input 
                  required
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  className="w-full h-16 bg-emerald-50/20 border-2 border-transparent rounded-2xl pl-16 pr-6 outline-none font-bold text-gray-800 shadow-sm focus:bg-white focus:border-emerald-500/20 transition-all text-sm placeholder:text-gray-300"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </motion.div>
            )}
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className={`w-full h-16 rounded-2xl font-black text-[12px] text-white uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${
                step === 1 ? 'bg-gradient-to-r from-[#f42464] to-[#ff004d] shadow-[#f42464]/20' : 'bg-emerald-600 shadow-emerald-500/20'
              }`}
            >
              {step === 1 ? (
                <>Request OTP <ChevronRight size={20} /></>
              ) : (
                <>Verify Account <CheckCircle2 size={20} /></>
              )}
            </button>
            
            {step === 2 && (
               <button 
                 type="button"
                 onClick={() => setStep(1)}
                 className="w-full bg-white text-gray-300 font-black text-[9px] uppercase tracking-widest py-4 hover:text-gray-600 transition-colors"
               >
                 Change Number?
               </button>
            )}
          </div>
        </form>

        <div className="mt-auto pt-16 text-center">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] opacity-30">Account Recovery Module</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResetPasswordPage;
