import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Minus, Plus, ShoppingCart, Clock, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const CountdownTimer = ({ drawTime, onStatusChange }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isClosed, setIsClosed] = useState(false);

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

      const diff = drawDate - now;
      
      if (diff <= 10 * 60 * 1000) {
        setIsClosed(true);
        setTimeLeft('Closed');
        onStatusChange && onStatusChange(true);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
      setIsClosed(false);
      onStatusChange && onStatusChange(false);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [drawTime, onStatusChange]);

  return (
    <div className="text-[0.65rem] font-black text-brand-red">
      {timeLeft}
    </div>
  );
};

const JackpotPage = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState('01:00 PM');
  const [slotStatus, setSlotStatus] = useState({});

  const timeSlots = [
    { time: '01:00 PM', label: 'DEAR LOTTERY' },
    { time: '06:00 PM', label: 'DEAR LOTTERY' },
    { time: '08:00 PM', label: 'DEAR LOTTERY' }
  ];

  const handleQtyChange = (board, delta) => {
    // Basic qty state logic removed for brevity, keeping UI structure
  };

  return (
    <PageWrapper title="DIAMOND JACKPOT LOTTERY">
      {/* Draw info bar */}
      <div className="bg-[#fce4ec] text-[#d81b60] font-bold text-center py-2 text-xs uppercase tracking-tighter">
        Draw before 10 minutes of draw/result.
      </div>

      {/* Rules/Results Sidebar Buttons */}
      <div className="flex gap-4 p-4">
        <button 
          className="flex-1 bg-brand-pink text-white font-black py-2 rounded-lg flex items-center justify-center gap-2 font-condensed uppercase tracking-wider text-sm shadow-md"
          onClick={() => navigate('/rules')}
        >
          <Clock size={16} /> Rules
        </button>
        <button 
          className="flex-1 bg-brand-pink text-white font-black py-2 rounded-lg flex items-center justify-center gap-2 font-condensed uppercase tracking-wider text-sm shadow-md"
          onClick={() => navigate('/results')}
        >
          <Trophy size={16} /> Results
        </button>
      </div>

      {/* Slots Selection */}
      <div className="flex justify-between px-4 mb-4 gap-2">
        {timeSlots.map((slot, idx) => (
          <div 
            key={idx} 
            className={`slot-card cursor-pointer ${selectedSlot === slot.time ? 'bg-pink-50' : 'bg-white'}`}
            onClick={() => !slotStatus[slot.time] && setSelectedSlot(slot.time)}
            style={{ 
              borderColor: slotStatus[slot.time] ? '#ccc' : (selectedSlot === slot.time ? '#f42464' : '#ff0000'),
              borderWidth: selectedSlot === slot.time ? '2px' : '1px',
              opacity: slotStatus[slot.time] ? 0.6 : 1
            }}
          >
            <div className="slot-time">{slot.time}</div>
            <div className="slot-label">{slot.label}</div>
            <CountdownTimer 
              drawTime={slot.time} 
              onStatusChange={(closed) => setSlotStatus(prev => ({...prev, [slot.time]: closed}))} 
            />
          </div>
        ))}
      </div>

      {/* Game Selection Area */}
      <div className="px-4 space-y-4 pb-32">
        {/* Single Digit Section */}
        <div className="jackpot-card">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl">💰</div>
              <div>
                <h3 className="font-bold text-sm">Single Digit <span className="text-brand-red">Win ₹100</span></h3>
                <p className="text-xs text-brand-red font-black">₹11.00</p>
              </div>
            </div>
            <button className="bg-gray-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter">Random</button>
          </div>
          
          {['A', 'B', 'C'].map(board => (
            <div key={board} className="flex items-center justify-between mb-3 last:mb-0">
              <div className="jackpot-board-circle">{board}</div>
              <input type="text" className="jackpot-input" maxLength="1" />
              <div className="jackpot-qty-control">
                <button className="bg-gray-600 text-white px-2 py-1"><Minus size={14}/></button>
                <span className="px-3 font-black">1</span>
                <button className="bg-gray-600 text-white px-2 py-1"><Plus size={14}/></button>
              </div>
              <button className="jackpot-btn-red">ADD</button>
            </div>
          ))}
        </div>

        {/* Double Digits Section */}
        <div className="jackpot-card">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl">💰</div>
              <div>
                <h3 className="font-bold text-sm">Double Digits <span className="text-brand-red">Win ₹1000</span></h3>
                <p className="text-xs text-brand-red font-black">₹11.00</p>
              </div>
            </div>
            <button className="bg-gray-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Random</button>
          </div>
          
          {['AB', 'BC', 'AC'].map(board => (
            <div key={board} className="flex items-center justify-between mb-3 last:mb-0">
              <div className="flex gap-1">
                <div className="jackpot-board-circle">{board[0]}</div>
                <div className="jackpot-board-circle">{board[1]}</div>
              </div>
              <div className="flex gap-1">
                 <input type="text" className="jackpot-input !w-[35px] !h-[35px] !text-base" maxLength="1" />
                 <input type="text" className="jackpot-input !w-[35px] !h-[35px] !text-base" maxLength="1" />
              </div>
              <div className="jackpot-qty-control">
                <button className="bg-gray-600 text-white px-2 py-1"><Minus size={14}/></button>
                <span className="px-2 font-black">1</span>
                <button className="bg-gray-600 text-white px-2 py-1"><Plus size={14}/></button>
              </div>
              <button className="jackpot-btn-red">ADD</button>
            </div>
          ))}
        </div>

        {/* Three Digits Examples */}
        {[10000, 15000].map((win, idx) => (
          <div key={win} className="jackpot-card">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="text-3xl">💰</div>
                <div>
                  <h3 className="font-bold text-sm">Three Digits <span className="text-brand-red">Win ₹{win.toLocaleString()}</span></h3>
                  <p className="text-xs text-brand-red font-black">₹{11 + idx * 5}.00</p>
                </div>
              </div>
              <button className="bg-gray-500 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Random</button>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                <div className="jackpot-board-circle">A</div>
                <div className="jackpot-board-circle">B</div>
                <div className="jackpot-board-circle">C</div>
              </div>
              <div className="flex gap-1">
                 <input type="text" className="jackpot-input !w-[35px] !h-[35px] !text-base" maxLength="1" />
                 <input type="text" className="jackpot-input !w-[35px] !h-[35px] !text-base" maxLength="1" />
                 <input type="text" className="jackpot-input !w-[35px] !h-[35px] !text-base" maxLength="1" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="jackpot-qty-control">
                <button className="bg-gray-600 text-white px-2 py-1"><Minus size={14}/></button>
                <span className="px-4 font-black">1</span>
                <button className="bg-gray-600 text-white px-2 py-1"><Plus size={14}/></button>
              </div>
              <div className="flex gap-2">
                <button className="bg-brand-pink text-white font-black px-4 py-2 rounded-lg text-xs uppercase shadow-md">BOX</button>
                <button className="bg-brand-pink text-white font-black px-4 py-2 rounded-lg text-xs uppercase shadow-md">ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Pay Now Button */}
      <div className="fixed bottom-32 left-0 right-0 px-8 flex justify-center pointer-events-none">
        <button 
          onClick={() => navigate('/cart')}
          className="pointer-events-auto bg-brand-red text-white w-full max-w-[400px] py-4 rounded-xl font-black text-xl uppercase tracking-widest shadow-[0_8px_25px_rgba(255,0,0,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <ShoppingCart size={24} /> Pay Now
        </button>
      </div>

    </PageWrapper>
  );
};

export default JackpotPage;
