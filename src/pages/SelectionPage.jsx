import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingCart, Info, RotateCcw, ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const SelectionPage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const isKerala = gameId === '4'; 
  const digitCount = isKerala ? 4 : 3;
  
  const [selectedBoard, setSelectedBoard] = useState('ALL');
  const [number, setNumber] = useState(Array(digitCount).fill(''));
  const [quantity, setQuantity] = useState(1);
  const [entries, setEntries] = useState([]);

  const handleNumberChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newNumber = [...number];
      newNumber[index] = value;
      setNumber(newNumber);
      
      if (value && index < digitCount - 1) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const addEntry = () => {
    if (number.some(n => n === '')) return;
    const entry = {
      id: Date.now(),
      num: number.join(''),
      board: selectedBoard,
      qty: quantity,
      price: selectedBoard === 'ALL' ? (isKerala ? 40 : 30) : 10
    };
    setEntries([...entries, entry]);
    setNumber(Array(digitCount).fill(''));
    const firstInput = document.getElementById('digit-0');
    if (firstInput) firstInput.focus();
  };

  const removeEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const generateRandom = () => {
    const randomNum = Array(digitCount).fill(0).map(() => Math.floor(Math.random() * 10).toString());
    setNumber(randomNum);
  };

  return (
    <PageWrapper title="Lottery Selection">
      {/* Game Info Summary Bar */}
      <div className="bg-[#fce4ec] px-4 py-2 flex justify-between items-center text-[10px] font-black text-[#d81b60] uppercase tracking-tighter">
        <span>Game: {isKerala ? 'Kerala 4D' : 'Dear 3D'}</span>
        <span>Booking Open</span>
      </div>

      <div className="p-4 space-y-6">
        {/* Selection Card */}
        <div className="jackpot-card !border-brand-red/30 shadow-xl overflow-hidden">
          <div className="bg-brand-red/5 -mx-3 -mt-3 p-3 mb-4 border-b border-brand-red/10 flex justify-between items-center">
            <h3 className="font-condensed font-black text-xl text-brand-red tracking-tight uppercase">Choose Numbers</h3>
            <button onClick={generateRandom} className="bg-brand-red text-white text-[10px] px-3 py-1 rounded-full font-black uppercase flex items-center gap-1">
               <RotateCcw size={10} /> Random
            </button>
          </div>
          
          {/* Board Selection Grid */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {['A', 'B', 'C', ...(isKerala ? ['D'] : []), 'ALL'].map(board => (
              <button 
                key={board}
                onClick={() => setSelectedBoard(board)}
                className={`py-3 rounded-xl font-black text-sm transition-all border-2 ${
                  selectedBoard === board 
                    ? 'bg-brand-pink border-brand-pink text-white shadow-md scale-105' 
                    : 'bg-white border-gray-100 text-gray-500'
                }`}
              >
                {board}
              </button>
            ))}
          </div>

          {/* Number Input Boxes */}
          <div className="flex gap-4 justify-center py-4">
            {number.map((digit, i) => (
              <input 
                key={i}
                id={`digit-${i}`}
                type="text"
                maxLength="1"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleNumberChange(i, e.target.value)}
                className="w-16 h-16 border-2 border-brand-red/20 rounded-2xl text-center text-3xl font-black focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 outline-none shadow-inner bg-gray-50 transition-all"
                placeholder="-"
              />
            ))}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2">
               <span className="text-xs font-black text-gray-400 uppercase">Quantity</span>
               <input 
                 type="number" 
                 min="1" 
                 value={quantity} 
                 onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                 className="w-20 bg-white border border-gray-200 rounded-lg p-2 font-black text-center text-lg outline-none" 
               />
            </div>
            <div className="text-right">
               <p className="text-[10px] text-gray-400 font-bold uppercase">Estimated Price</p>
               <p className="text-xl font-black text-brand-red">₹{(selectedBoard === 'ALL' ? (isKerala ? 40 : 30) : 10) * quantity}</p>
            </div>
          </div>

          <button 
            onClick={addEntry} 
            className="w-full mt-6 bg-brand-red text-white py-4 rounded-2xl font-black text-xl font-condensed tracking-widest uppercase shadow-[0_8px_20px_rgba(255,0,0,0.3)] active:scale-95 transition-all"
          >
            Add To Entry
          </button>
        </div>

        {/* Floating Entries Action Table */}
        {entries.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-brand-pink/30 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
              <h4 className="font-condensed font-black text-lg text-brand-pink uppercase tracking-tight">Your Current Entries</h4>
              <span className="bg-brand-pink text-white px-2 py-0.5 rounded-full text-[10px] font-black">{entries.length} ITEMS</span>
            </div>
            
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {entries.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                   <div className="flex items-center gap-3">
                     <div className="bg-brand-pink text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-sm">
                       {entry.num}
                     </div>
                     <div>
                       <p className="text-[10px] text-gray-400 font-bold uppercase">Board: {entry.board}</p>
                       <p className="text-xs font-black">Qty: {entry.qty}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="font-black text-brand-red">₹{entry.price * entry.qty}</span>
                      <button onClick={() => removeEntry(entry.id)} className="text-gray-300 hover:text-brand-red transition-colors">
                        <Trash2 size={18} />
                      </button>
                   </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/cart')}
              className="w-full mt-6 py-4 bg-black text-white rounded-2xl font-black text-xl font-condensed tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
            >
              PROCEED TO CART <ShoppingCart size={24} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Guest/Profile Summary - Like web */}
      <div className="fixed bottom-32 right-4 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm border border-brand-pink/20 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-brand-pink">GUEST LOGIN</span>
          </div>
      </div>
    </PageWrapper>
  );
};

export default SelectionPage;
