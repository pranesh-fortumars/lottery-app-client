import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Plus, Minus, Ticket } from 'lucide-react';

const BettingCard = ({ title, winText: initialWinText, price: initialPrice, digits = 1, gameName = "Dear Lottery", priceOptions = [] }) => {
  const { addToCart } = useCart();
  const [selectedTier, setSelectedTier] = useState(priceOptions.length > 0 ? priceOptions[0] : null);
  
  const currentPrice = selectedTier ? selectedTier.price : initialPrice;
  const currentWinText = selectedTier ? `Win ${selectedTier.win}` : initialWinText;

  const [rows, setRows] = useState([
    { id: 1, numbers: Array(digits).fill(''), qty: 1 },
    { id: 2, numbers: Array(digits).fill(''), qty: 1 },
    { id: 3, numbers: Array(digits).fill(''), qty: 1 },
  ]);

  const updateNumber = (rowIdx, digitIdx, val) => {
    if (val.length > 1 || !/^\d*$/.test(val)) return;
    const newRows = [...rows];
    newRows[rowIdx].numbers[digitIdx] = val;
    setRows(newRows);
    
    if (val && digitIdx < digits - 1) {
      const next = document.getElementById(`input-${title}-${rowIdx}-${digitIdx + 1}`);
      if (next) next.focus();
    }
  };

  const updateQty = (rowIdx, delta) => {
    const newRows = [...rows];
    newRows[rowIdx].qty = Math.max(1, newRows[rowIdx].qty + delta);
    setRows(newRows);
  };

  const handleAdd = (rowIdx) => {
    const row = rows[rowIdx];
    if (row.numbers.some(n => n === '')) {
      alert("Please enter all numbers");
      return;
    }
    
    addToCart({
      title: `${gameName} - ${title} (Price: ${currentPrice})`,
      num: row.numbers.join(''),
      qty: row.qty,
      price: parseFloat(currentPrice),
      board: digits === 1 ? 'A' : digits === 2 ? 'AB' : digits === 3 ? 'ABC' : 'XABC'
    });

    const newRows = [...rows];
    newRows[rowIdx].numbers = Array(digits).fill('');
    setRows(newRows);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 mb-8 shadow-sm border border-gray-100 relative overflow-hidden group">
      {/* Dynamic Glow Background */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#f42464]/5 rounded-full blur-3xl group-hover:bg-[#f42464]/10 transition-colors"></div>

      <div className="flex items-start gap-4 mb-6 relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-[#f42464] to-[#ff004d] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#f42464]/20 rotate-3 p-3">
           <Ticket size={32} strokeWidth={2.5} />
        </div>
        <div className="flex-grow">
          <h3 className="text-gray-900 font-black text-xl leading-tight uppercase tracking-tighter italic">
            {title}
          </h3>
          <p className="text-[#f42464] font-black text-[9px] uppercase tracking-[0.2em] mt-1 opacity-60">
            Win up to {(initialWinText || selectedTier?.win || "").replace('Win ', '')}
          </p>
          <div className="flex items-center gap-2 mt-2">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Starts at</span>
             <span className="text-emerald-600 font-black text-base italic">₹ {currentPrice}</span>
          </div>
        </div>
      </div>

      {priceOptions.length > 0 && (
        <div className="flex overflow-x-auto gap-3 mb-8 pb-1 scrollbar-hide">
          {priceOptions.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTier(opt)}
              className={`flex-shrink-0 px-5 py-3 rounded-2xl text-[10px] font-black uppercase transition-all flex flex-col items-center gap-1 ${
                selectedTier?.price === opt.price 
                  ? 'bg-gray-900 text-white shadow-lg scale-105 border-b-4 border-[#f42464]' 
                  : 'bg-gray-50 text-gray-400 border border-gray-100 hover:bg-white hover:border-gray-200'
              }`}
            >
              <span className="opacity-40 text-[8px]">PRICE</span>
              <span>₹ {opt.price}</span>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-center mb-2 px-1">
           <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Select Numbers</span>
           <button 
             onClick={() => {
                const newRows = rows.map(r => ({
                  ...r,
                  numbers: Array(digits).fill(0).map(() => Math.floor(Math.random() * 10).toString())
                }));
                setRows(newRows);
             }}
             className="text-[#f42464] text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity"
           >
             <Sparkles size={12} /> Auto Pick All
           </button>
        </div>

        {rows.map((row, rowIdx) => (
          <div key={row.id} className="bg-gray-50/50 rounded-2xl p-4 flex flex-col gap-4 border border-transparent hover:border-gray-100 hover:bg-white transition-all shadow-sm hover:shadow-md">
             <div className="flex items-center justify-between">
                <div className="flex gap-2">
                   {row.numbers.map((num, digIdx) => (
                     <div key={digIdx} className="relative group/input">
                        <input 
                          id={`input-${title}-${rowIdx}-${digIdx}`}
                          type="text" 
                          maxLength="1"
                          value={num}
                          onChange={(e) => updateNumber(rowIdx, digIdx, e.target.value)}
                          className="w-11 h-11 bg-white border-2 border-gray-200 rounded-xl text-center text-xl font-black text-gray-900 focus:border-[#f42464] focus:ring-4 focus:ring-[#f42464]/5 outline-none transition-all placeholder:text-gray-100" 
                          placeholder="0" 
                        />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-gray-300 opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none">
                           {['A','B','C','D'][digIdx]}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="flex items-center bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm h-11">
                   <button onClick={() => updateQty(rowIdx, -1)} className="px-3 text-gray-300 hover:text-red-500 transition-colors"><Minus size={16} strokeWidth={3} /></button>
                   <div className="w-8 text-center font-black text-sm text-gray-900 border-x border-gray-50">{row.qty}</div>
                   <button onClick={() => updateQty(rowIdx, 1)} className="px-3 text-gray-300 hover:text-emerald-500 transition-colors"><Plus size={16} strokeWidth={3} /></button>
                </div>
             </div>

             <button 
               onClick={() => handleAdd(rowIdx)}
               className="w-full bg-white border-2 border-dashed border-gray-200 text-gray-400 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#f42464] hover:text-[#f42464] hover:bg-[#fce4ec]/20 transition-all flex items-center justify-center gap-2 group/btn"
             >
                <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" /> Add to checkout
             </button>
          </div>
        ))}
      </div>

      {/* Security Badge */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 opacity-30 justify-center">
         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
         <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">End-to-End Encrypted Transaction</p>
      </div>
    </div>
  );
};

export default BettingCard;
