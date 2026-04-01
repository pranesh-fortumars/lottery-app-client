import React, { useState, useEffect, useMemo } from 'react';
import { 
  Megaphone, 
  Trash2, 
  Edit3, 
  Trophy, 
  Clock, 
  Ticket,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Eye,
  ShieldCheck,
  Zap,
  LayoutGrid,
  ListFilter,
  Plus,
  Layers,
  Search,
  Activity,
  Calendar,
  DollarSign,
  Gamepad2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const AdminAnnouncements = () => {
  const { purchasedTickets, addResult } = useCart();
  const [activeTab, setActiveTab] = useState('dispatch'); 
  
  // Market Selection State
  const [marketSelection, setMarketSelection] = useState(null); // 'DEAR' or 'KERALA'
  const [selectedSlot, setSelectedSlot] = useState({ draw: '01:00 PM' });
  const [searchQuery, setSearchQuery] = useState('');

  // 4-Column Result Entry
  const [resultDigits, setResultDigits] = useState({ X: '', A: '', B: '', C: '' });

  // Prize Rewards Configuration
  const [prizeConfigs, setPrizeConfigs] = useState({
    '1D': { A: '100', B: '100', C: '100' },
    '2D': { AB: '500', BC: '500', AC: '500' },
    '3D': { ABC: '2000' },
    '4D': { XABC: '10000' }
  });

  // Slot Assignments from User Request
  const drawAssignments = {
    '01:00 PM': 'DEAR',
    '03:00 PM': 'KERALA',
    '06:00 PM': 'DEAR',
    '08:00 PM': 'DEAR'
  };

  const draws = Object.keys(drawAssignments);

  // --- Aggregate Market Analytics ---
  const marketSummary = useMemo(() => {
    const summary = {};
    draws.forEach(d => {
      const filtered = purchasedTickets.filter(t => t.title.includes(d));
      summary[d] = {
        totalQty: filtered.reduce((sum, t) => sum + t.qty, 0),
        totalValue: filtered.reduce((sum, t) => sum + (t.qty * t.price), 0)
      };
    });
    return summary;
  }, [purchasedTickets, draws]);

  // --- Detailed Slot Analysis ---
  const currentSlotAnalysis = useMemo(() => {
    const filtered = purchasedTickets.filter(t => t.title.includes(selectedSlot.draw));
    const combinationMap = {};
    
    filtered.forEach(t => {
      combinationMap[t.num] = (combinationMap[t.num] || 0) + t.qty;
    });

    const allCombinations = Object.entries(combinationMap)
      .map(([num, totalQty]) => ({
        num,
        totalQty,
        risk: totalQty > 100 ? 'High' : totalQty > 50 ? 'Medium' : 'Low'
      }))
      .sort((a, b) => b.totalQty - a.totalQty);

    return {
      totalTickets: filtered.reduce((sum, t) => sum + t.qty, 0),
      totalValue: filtered.reduce((sum, t) => sum + (t.qty * t.price), 0),
      uniqueCombinations: allCombinations.length,
      topCombinations: allCombinations.slice(0, 10),
      rawTickets: filtered
    };
  }, [purchasedTickets, selectedSlot]);

  const handleDigitChange = (col, val) => {
    if (val.length <= 1) {
       setResultDigits({ ...resultDigits, [col]: val });
    }
  };

  const handlePrizeChange = (type, key, val) => {
    setPrizeConfigs({
      ...prizeConfigs,
      [type]: { ...prizeConfigs[type], [key]: val }
    });
  };

  const handleDeclareResult = () => {
    const { X, A, B, C } = resultDigits;
    if (!X || !A || !B || !C) {
      return alert("Please enter all four result digits (X/D, A, B, C)");
    }

    const fullResult = `${X}${A}${B}${C}`;
    
    // Prepare result data that context will use to find winners
    const resultData = {
      draw: selectedSlot.draw,
      brand: marketSelection,
      digits: resultDigits, // {X, A, B, C}
      prizes: prizeConfigs,
      timestamp: new Date().toISOString()
    };

    addResult(resultData);
    
    alert(`RESULT ANNOUNCED: ${fullResult} for ${marketSelection} ${selectedSlot.draw}`);
    
    // Reset
    setResultDigits({ X: '', A: '', B: '', C: '' });
    setMarketSelection(null);
  };

  return (
    <div className="space-y-8 p-4 pb-24 h-full bg-[#f8fbff] overflow-y-auto scrollbar-hide">
      
      {/* Header Tabs */}
      <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-4 sticky top-0 z-[100]">
        {[
          { id: 'dispatch', label: 'Dispatcher', icon: Zap },
          { id: 'analysis', label: 'Monitor', icon: TrendingUp },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-[#ff004d] text-white shadow-xl shadow-[#ff004d]/20' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dispatch' && (
        <div className="space-y-6">
          {!marketSelection ? (
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-50 flex flex-col items-center text-center space-y-8">
               <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-[#ff004d] shadow-inner border border-red-100">
                  <Gamepad2 size={40} />
               </div>
               <div>
                  <h2 className="text-2xl font-black text-gray-900 font-condensed uppercase tracking-tighter leading-none mb-2">Initialize Draw</h2>
                  <p className="text-gray-400 text-xs font-bold px-4 leading-relaxed">Select the market category to start the result declaration workflow.</p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 w-full">
                  <button 
                    onClick={() => setMarketSelection('DEAR')}
                    className="group relative overflow-hidden bg-white border-2 border-gray-100 p-8 rounded-[2rem] hover:border-[#ff004d] transition-all hover:scale-[1.02] active:scale-95"
                  >
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-[#ff004d]">Market A</p>
                     <p className="text-xl font-black text-gray-900 font-condensed tracking-tighter italic leading-none">DEAR LOTTERY</p>
                  </button>
                  <button 
                    onClick={() => setMarketSelection('KERALA')}
                    className="group relative overflow-hidden bg-white border-2 border-gray-100 p-8 rounded-[2rem] hover:border-[#ff004d] transition-all hover:scale-[1.02] active:scale-95"
                  >
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-[#ff004d]">Market B</p>
                     <p className="text-xl font-black text-gray-900 font-condensed tracking-tighter italic leading-none">KERALA STATE</p>
                  </button>
               </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Active Selection Banner */}
              <div className="bg-gray-900 rounded-[2rem] p-6 text-white flex justify-between items-center shadow-xl border-b-4 border-red-600">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-red-500 border border-white/10">
                     <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-red-500 tracking-[.2em]">{marketSelection}</p>
                    <select 
                      value={selectedSlot.draw}
                      onChange={(e) => setSelectedSlot({ draw: e.target.value })}
                      className="bg-transparent text-xl font-black font-condensed italic outline-none cursor-pointer"
                    >
                      {draws.filter(d => drawAssignments[d] === marketSelection).map(d => (
                        <option key={d} value={d} className="bg-gray-900">{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button onClick={() => setMarketSelection(null)} className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">Cancel</button>
              </div>

              {/* 4-Column Declaration Box */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 space-y-8">
                 <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                    <Trophy className="text-amber-500" size={24} />
                    <h3 className="text-lg font-black font-condensed uppercase italic tracking-tighter">Result Entry Matrix</h3>
                 </div>

                 <div className="grid grid-cols-4 gap-4">
                    {['X', 'A', 'B', 'C'].map((col) => (
                      <div key={col} className="space-y-2">
                        <label className={`block text-center text-[10px] font-black uppercase tracking-widest ${col === 'X' ? 'text-[#ff004d]' : 'text-gray-400'}`}>
                          {col === 'X' ? 'X / D' : col}
                        </label>
                        <input 
                          type="number"
                          value={resultDigits[col]}
                          onChange={(e) => handleDigitChange(col, e.target.value)}
                          className={`w-full h-20 bg-gray-50 border-2 rounded-2xl text-center text-4xl font-black outline-none transition-all shadow-inner ${
                            resultDigits[col] ? 'border-[#ff004d] bg-white text-[#ff004d]' : 'border-gray-100 focus:border-gray-300'
                          }`}
                          placeholder="0"
                        />
                      </div>
                    ))}
                 </div>

                 {/* Prize Reward Configuration Section */}
                 <div className="pt-6 border-t border-gray-50 space-y-6">
                    <div className="flex items-center gap-2">
                        <DollarSign className="text-emerald-500" size={18} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Prize Reward Configuration (₹)</h4>
                    </div>

                    <div className="space-y-4">
                        {/* 1D Rewards */}
                        <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                           <p className="text-[9px] font-black text-[#ff004d] uppercase mb-4 tracking-widest">1D Rewards (Single Position)</p>
                           <div className="grid grid-cols-3 gap-3">
                              {['A', 'B', 'C'].map(pos => (
                                <div key={pos} className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300">{pos}</span>
                                  <input 
                                    type="number" 
                                    value={prizeConfigs['1D'][pos]}
                                    onChange={(e) => handlePrizeChange('1D', pos, e.target.value)}
                                    className="w-full bg-white border border-gray-100 rounded-xl py-3 pl-8 px-3 text-sm font-black text-gray-700 outline-none focus:border-[#ff004d]/30"
                                  />
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* 2D Rewards */}
                        <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                           <p className="text-[9px] font-black text-[#ff004d] uppercase mb-4 tracking-widest">2D Rewards (Double Combination)</p>
                           <div className="grid grid-cols-3 gap-3">
                              {['AB', 'BC', 'AC'].map(pair => (
                                <div key={pair} className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[8px] font-black text-gray-300">{pair}</span>
                                  <input 
                                    type="number" 
                                    value={prizeConfigs['2D'][pair]}
                                    onChange={(e) => handlePrizeChange('2D', pair, e.target.value)}
                                    className="w-full bg-white border border-gray-100 rounded-xl py-3 pl-10 px-3 text-sm font-black text-gray-700 outline-none focus:border-[#ff004d]/30"
                                  />
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* 3D & 4D Rewards */}
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                              <p className="text-[9px] font-black text-[#ff004d] uppercase mb-3 tracking-widest">3D (ABC)</p>
                              <input 
                                type="number" 
                                value={prizeConfigs['3D'].ABC}
                                onChange={(e) => handlePrizeChange('3D', 'ABC', e.target.value)}
                                className="w-full bg-white border border-gray-100 rounded-xl py-4 px-4 text-sm font-black text-gray-700 outline-none focus:border-[#ff004d]/30"
                              />
                           </div>
                           <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                              <p className="text-[9px] font-black text-[#ff004d] uppercase mb-3 tracking-widest">4D (XABC)</p>
                              <input 
                                type="number" 
                                value={prizeConfigs['4D'].XABC}
                                onChange={(e) => handlePrizeChange('4D', 'XABC', e.target.value)}
                                className="w-full bg-white border border-gray-100 rounded-xl py-4 px-4 text-sm font-black text-gray-700 outline-none focus:border-[#ff004d]/30"
                              />
                           </div>
                        </div>
                    </div>
                 </div>

                 <button 
                   onClick={handleDeclareResult}
                   className="w-full bg-[#ff004d] text-white py-5 rounded-[1.5rem] font-black text-[12px] uppercase tracking-widest shadow-xl shadow-[#ff004d]/20 active:scale-95 transition-all flex items-center justify-center gap-3 border-b-4 border-black/20"
                 >
                   ANNOUNCE RESULT & DISPATCH PRIZES <CheckCircle2 size={20} />
                 </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
           {/* Section: Market Overvew */}
           <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50">
             <div className="flex items-center gap-3 mb-8">
                <Activity className="text-[#ff004d]" size={20} />
                <h3 className="font-condensed font-black text-xl italic uppercase tracking-tighter">Market Pulse</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                {draws.map(d => (
                  <button 
                    key={d}
                    onClick={() => {
                        setSelectedSlot({ draw: d });
                        setMarketSelection(drawAssignments[d]);
                        setActiveTab('dispatch');
                    }}
                    className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 text-left hover:border-[#ff004d] transition-all"
                  >
                     <p className="text-[8px] font-black text-[#ff004d] uppercase tracking-[.2em] mb-3">{drawAssignments[d]}</p>
                     <p className="text-xl font-black font-condensed italic leading-none">{d}</p>
                     <div className="mt-4 flex justify-between items-end opacity-40">
                        <p className="text-[7px] font-black uppercase">Tickets</p>
                        <p className="text-xs font-black">{marketSummary[d]?.totalQty || 0}</p>
                     </div>
                  </button>
                ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
