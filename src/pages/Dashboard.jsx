import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ChevronRight, Diamond } from 'lucide-react';

const CountdownTimer = ({ drawTime }) => {
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const parts = drawTime.match(/(\d+):(\d+)\s*(AM|PM)/);
      if (!parts) return;
      
      let hours = parseInt(parts[1]);
      const minutes = parseInt(parts[2]);
      const ampm = parts[3];
      
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      
      const drawDate = new Date();
      drawDate.setHours(hours, minutes, 0, 0);
      
      let diff = drawDate - now;
      if (diff < 0) {
        setTimeLeft({ h: '00', m: '00', s: '00' });
        return;
      }

      const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const m = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const s = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeLeft({ h, m, s });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [drawTime]);

  return (
    <div className="flex gap-1">
      <div className="bg-white text-black px-1.5 py-1 rounded text-sm font-bold shadow-sm">{timeLeft.h}</div>
      <div className="bg-white text-black px-1.5 py-1 rounded text-sm font-bold shadow-sm">{timeLeft.m}</div>
      <div className="bg-white text-black px-1.5 py-1 rounded text-sm font-bold shadow-sm">{timeLeft.s}</div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const games = [
    { time: '01:00 PM', logo: 'DEAR', type: 'dear' },
    { time: '06:00 PM', logo: 'DEAR', type: 'dear' },
    { time: '08:00 PM', logo: 'DEAR', type: 'dear' },
    { time: '03:00 PM', logo: 'Kerala Lottery', type: 'kerala' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner Area */}
      <div className="p-3">
        <div className="rounded-3xl overflow-hidden shadow-xl">
           <img 
            src="https://diamondjackpotlottery.com/banner-home.png" 
            alt="Hero Banner" 
            className="w-full h-auto object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/450x200?text=DIAMOND+LOTTERY+BANNER'; }}
          />
        </div>
      </div>

      {/* Red Promo Bar - Exactly like web */}
      <div className="bg-brand-red p-2 flex justify-between items-center px-4">
        <div className="animate-pulse flex items-center gap-2">
           <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
           <span className="text-[10px] text-white font-bold tracking-widest uppercase">Hot jackpot alert!</span>
        </div>
        <Mail size={20} className="text-white" />
      </div>

      {/* 3 & 4 Digits Game Title */}
      <div className="p-4 py-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-red/10 rounded-full flex items-center justify-center">
            <Diamond className="text-brand-red" size={20} />
        </div>
        <h2 className="text-2xl font-black text-brand-red font-condensed tracking-tight uppercase">3 & 4 Digits Game</h2>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-8">
        {games.map((game, idx) => (
          <div 
            key={idx} 
            className="game-card-gradient p-3 rounded-2xl relative overflow-hidden h-[130px] shadow-lg cursor-pointer active:scale-95 transition-all"
            onClick={() => navigate(`/select/${idx + 1}`)}
          >
            {/* Geometric Lines Overlay */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 border-t-2 border-r-2 border-yellow-400 w-1/2 h-1/2 transform skew-x-[-20deg]"></div>
            </div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <p className="text-[10px] text-white/70 font-bold uppercase mb-1">Lottery Booking Time</p>
                <CountdownTimer drawTime={game.time} />
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-white">
                   <p className="text-[10px] font-black opacity-80">{game.time}</p>
                </div>
                {game.type === 'dear' ? (
                  <div className="flex flex-col items-end leading-none">
                    <span className="text-yellow-400 font-black text-xs">DEAR</span>
                    <span className="text-cyan-400 text-[8px] font-black">LOTTERY</span>
                  </div>
                ) : (
                  <div className="bg-green-500/20 px-1.5 py-0.5 rounded-full border border-green-500/50 flex items-center gap-1">
                     <div className="w-3 h-3 bg-green-500 rounded-full text-[8px] flex items-center justify-center font-bold text-black">K</div>
                     <span className="text-green-500 text-[8px] font-bold">Kerala</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jackpot Title */}
      <div className="p-4 py-2 flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-red/10 rounded-full flex items-center justify-center">
            <Diamond className="text-brand-red" size={20} />
        </div>
        <h2 className="text-2xl font-black text-brand-red font-condensed tracking-tight uppercase">Jackpot</h2>
      </div>

      {/* Jackpot Banner */}
      <div className="px-4 py-4">
        <div 
           className="rounded-2xl overflow-hidden shadow-lg border-2 border-brand-red/20"
           onClick={() => navigate('/jackpot')}
        >
          <img 
            src="https://www.jackpotin.com/play-banner.png" 
            alt="Jackpot Banner" 
            className="w-full h-auto"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/450x150?text=JACKPOT+PLAY+NOW'; }}
          />
        </div>
      </div>

      {/* Jackpot Choice Buttons - Premium Style */}
      <div className="grid grid-cols-2 gap-4 px-8 pb-12">
        <button 
          className="bg-brand-pink text-white py-3 rounded-xl font-black text-lg shadow-lg active:scale-95 transition-all font-condensed"
          onClick={() => navigate('/jackpot')}
        >
          WINS WINS
        </button>
        <button 
          className="bg-brand-pink text-white py-3 rounded-xl font-black text-lg shadow-lg active:scale-95 transition-all font-condensed"
          onClick={() => navigate('/jackpot')}
        >
          JACKPOT
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
