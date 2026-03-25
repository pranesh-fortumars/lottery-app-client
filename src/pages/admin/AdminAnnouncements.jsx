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
  DollarSign
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const AdminAnnouncements = () => {
  const { purchasedTickets, addResult } = useCart();
  const [activeTab, setActiveTab] = useState('dispatch'); 
  const [selectedSlot, setSelectedSlot] = useState({ draw: '01:00 PM', brand: 'DEAR', type: '3D' });
  const [searchQuery, setSearchQuery] = useState('');
  
  const [winPositions, setWinPositions] = useState([
    { position: '1st Prize', amount: '50000', winners: 1, number: '' },
    { position: '2nd Prize', amount: '10000', winners: 5, number: '' },
    { position: '3rd Prize', amount: '1000', winners: 20, number: '' },
  ]);

  const draws = ['01:00 PM', '03:00 PM', '06:00 PM', '08:00 PM', '10:30 AM (JP)', '01:30 PM (JP)'];

  // --- Shared Intake Analytics for the Selected Slot ---
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

    const filteredCombinations = searchQuery 
      ? allCombinations.filter(c => c.num.includes(searchQuery))
      : allCombinations;

    return {
      totalTickets: filtered.reduce((sum, t) => sum + t.qty, 0),
      totalValue: filtered.reduce((sum, t) => sum + (t.qty * t.price), 0),
      uniqueCombinations: allCombinations.length,
      topCombinations: filteredCombinations.slice(0, 20),
      rawTickets: filtered
    };
  }, [purchasedTickets, selectedSlot, searchQuery]);

  // --- Market Summary (All Slots) ---
  const marketSummary = useMemo(() => {
    const summaryMap = {};
    draws.forEach(d => {
      const tickets = purchasedTickets.filter(t => t.title.includes(d));
      const totalQty = tickets.reduce((sum, t) => sum + t.qty, 0);
      summaryMap[d] = { totalQty };
    });
    return summaryMap;
  }, [purchasedTickets]);

  const handleAddPosition = () => {
    setWinPositions([...winPositions, { position: `Prize ${winPositions.length + 1}`, amount: '0', winners: 0, number: '' }]);
  };

  const handleUpdatePosition = (idx, field, val) => {
    const newPositions = [...winPositions];
    newPositions[idx][field] = val;
    setWinPositions(newPositions);
  };

  const handleDeclareResult = () => {
    if (winPositions.some(p => !p.number)) {
      return alert("Please enter winning numbers for all prize positions");
    }
    
    // Check if numbers match the lottery type
    const expectedLen = parseInt(selectedSlot.type.charAt(0));
    if (winPositions.some(p => p.number.length !== expectedLen)) {
       return alert(`All winning numbers must be exactly ${expectedLen} digits for ${selectedSlot.type} lottery.`);
    }

    // Prepare result data for the global context
    const resultData = {
      draw: selectedSlot.draw,
      brand: selectedSlot.brand,
      type: selectedSlot.type,
      winPositions: winPositions.map(p => ({
        position: p.position,
        number: p.number,
        amount: p.amount
      })),
      number: winPositions[0].number // Primary display number
    };
    
    addResult(resultData);
    
    // Reset winning numbers only, keep configuration
    setWinPositions(winPositions.map(p => ({ ...p, number: '' })));
    
    alert(`Results Declared for ${selectedSlot.type} Successfully! Winners have been allocated prizes.`);
    setActiveTab('analysis'); 
  };

  return (
    <div className="space-y-8 p-4 pb-24 h-full overflow-y-auto scrollbar-hide">
      {/* Header Tabs */}
      <div className="flex bg-white rounded-2xl p-2 shadow-lg border border-gray-100 mb-4 sticky top-0 z-[100]">
        {[
          { id: 'dispatch', label: 'Dispatch', icon: Zap },
          { id: 'analysis', label: 'Analytics', icon: TrendingUp },
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
          <div className="border-[1.5px] border-[#ff004d] rounded-[2.5rem] p-8 bg-white shadow-2xl relative overflow-hidden group">
            <div className="flex gap-4 mb-4 border-b border-gray-100 pb-6">
              <img src="https://img.icons8.com/color/64/000000/treasure-chest.png" alt="Chest" className="w-16 h-16 drop-shadow-xl" />
              <div className="flex-grow">
                <h2 className="text-2xl font-black text-gray-900 font-condensed uppercase tracking-tighter italic leading-none">Market Dispatcher</h2>
                <p className="text-[#ff004d] font-black text-[10px] uppercase tracking-widest leading-none mt-1">Official Prize Allocation</p>
              </div>
            </div>

            {/* Quick Stats Banner for the current slot */}
            <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                <div className="bg-gray-900 text-white px-4 py-3 rounded-xl flex items-center gap-2 shrink-0">
                    <Activity size={14} className="text-red-500" />
                    <span className="text-[10px] font-black uppercase tracking-tight italic">Total Qty: {currentSlotAnalysis.totalTickets}</span>
                </div>
                <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl flex items-center gap-2 shrink-0">
                    <DollarSign size={14} className="text-green-600" />
                    <span className="text-[10px] font-black uppercase tracking-tight text-gray-500">Intake: ₹ {currentSlotAnalysis.totalValue.toLocaleString()}</span>
                </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Draw Event</label>
                  <select 
                    value={selectedSlot.draw}
                    onChange={(e) => setSelectedSlot({...selectedSlot, draw: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 h-14 font-bold text-gray-700 outline-none focus:border-[#ff004d]"
                  >
                    {draws.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Market</label>
                  <select 
                    value={selectedSlot.brand}
                    onChange={(e) => setSelectedSlot({...selectedSlot, brand: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 h-14 font-bold text-gray-700 outline-none focus:border-[#ff004d]"
                  >
                    <option value="DEAR">DEAR LOTTERY</option>
                    <option value="KERALA">KERALA STATE</option>
                    <option value="JACKPOT">DIAMOND JP</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-pink-600 uppercase tracking-widest ml-1 flex items-center gap-1"><Layers size={10} /> Lottery Type</label>
                  <select 
                    value={selectedSlot.type}
                    onChange={(e) => setSelectedSlot({...selectedSlot, type: e.target.value})}
                    className="w-full bg-pink-50 border border-pink-100 rounded-xl px-4 h-14 font-black text-[#ff004d] outline-none focus:border-[#ff004d]"
                  >
                    <option value="1D">1D (SINGLE)</option>
                    <option value="2D">2D (DOUBLE)</option>
                    <option value="3D">3D (TRIPLE)</option>
                    <option value="4D">4D (XABC)</option>
                  </select>
                </div>
              </div>

              {/* Multi-Position Result Entry */}
              <div className="space-y-5">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#ff004d]">Winning Numbers & Prize Allocation</h3>
                  <button onClick={handleAddPosition} className="bg-gray-50 p-1.5 rounded-lg text-[#ff004d] hover:bg-red-50 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {winPositions.map((pos, i) => (
                    <div key={i} className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 space-y-4 shadow-sm group hover:border-[#ff004d]/20 transition-all">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={pos.position} 
                              onChange={(e) => handleUpdatePosition(i, 'position', e.target.value)}
                              className="bg-transparent font-black text-[10px] uppercase tracking-widest text-gray-400 outline-none focus:text-[#ff004d]"
                            />
                         </div>
                         <button onClick={() => setWinPositions(winPositions.filter((_, idx) => idx !== i))} className="text-gray-200 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                         </button>
                      </div>

                      <div className="flex gap-3">
                         <div className="flex-grow space-y-1.5">
                            <div className="relative">
                               <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 opacity-50" size={14} />
                               <input 
                                 type="text" 
                                 placeholder={`${selectedSlot.type} NO.`} 
                                 maxLength={parseInt(selectedSlot.type.charAt(0)) || 1}
                                 className="w-full h-12 bg-white border border-gray-100 rounded-xl pl-10 pr-4 outline-none font-black text-gray-800 text-sm focus:border-amber-500/30 shadow-inner"
                                 value={pos.number}
                                 onChange={(e) => handleUpdatePosition(i, 'number', e.target.value)}
                               />
                            </div>
                         </div>
                         <div className="w-24 space-y-1.5">
                            <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-[8px]">₹</span>
                               <input 
                                 type="number" 
                                 placeholder="AMT" 
                                 className="w-full h-12 bg-white border border-gray-100 rounded-xl pl-6 pr-3 outline-none font-black text-[#ff004d] text-sm shadow-inner"
                                 value={pos.amount}
                                 onChange={(e) => handleUpdatePosition(i, 'amount', e.target.value)}
                               />
                            </div>
                         </div>
                         <div className="w-16 space-y-1.5">
                            <input 
                              type="number" 
                              placeholder="WIN" 
                              className="w-full h-12 bg-white border border-gray-100 rounded-xl px-3 outline-none font-black text-gray-500 text-[10px] text-center shadow-inner"
                              value={pos.winners}
                              onChange={(e) => handleUpdatePosition(i, 'winners', e.target.value)}
                            />
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleDeclareResult}
                className="w-full h-16 bg-[#ff004d] text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-[#ff004d]/20 active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 border-b-4 border-black/20"
              >
                Sync & Declare Result <Trophy size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Market Overview Grid */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 overflow-hidden relative">
             <div className="flex items-center justify-between border-b border-gray-50 pb-6 mb-8">
                <div className="flex items-center gap-3">
                   <Activity size={24} className="text-red-500" />
                   <h3 className="font-condensed font-black text-xl italic uppercase tracking-tighter">Market Pulse</h3>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select to Analyze</p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {draws.map(d => (
                  <button 
                    key={d}
                    onClick={() => setSelectedSlot({...selectedSlot, draw: d})}
                    className={`group relative p-6 rounded-[2rem] border transition-all duration-300 text-left overflow-hidden ${
                      selectedSlot.draw === d 
                        ? 'bg-gray-950 border-gray-950 text-white shadow-2xl scale-105' 
                        : 'bg-gray-50 border-gray-100 text-gray-800'
                    }`}
                  >
                     <p className={`text-[10px] font-black uppercase tracking-[.2em] mb-4 ${selectedSlot.draw === d ? 'text-red-500' : 'text-gray-400'}`}>{d}</p>
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-2xl font-black font-condensed tracking-tighter italic leading-none">{marketSummary[d].totalQty}</p>
                           <p className="text-[8px] font-black uppercase opacity-60 mt-1">Total Quantity</p>
                        </div>
                        <ChevronRight size={18} className={`transition-transform duration-300 ${selectedSlot.draw === d ? 'translate-x-1 text-red-500' : 'text-gray-300'}`} />
                     </div>
                  </button>
                ))}
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6 opacity-80">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                <TrendingUp size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-black text-gray-900 font-condensed uppercase tracking-tighter italic leading-none">{selectedSlot.draw} DETAIL</h3>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">Slot-specific intake Audit</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                 <p className="text-[8px] font-black text-red-400 uppercase tracking-widest mb-1">Total Quantity</p>
                 <p className="text-3xl font-black italic tracking-tighter leading-none">{currentSlotAnalysis.totalTickets}</p>
                 <Activity className="absolute -bottom-2 -right-2 text-white/5" size={80} />
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 relative overflow-hidden group">
                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Revenue</p>
                 <p className="text-xl font-black text-gray-900 italic tracking-tighter leading-none">₹ {currentSlotAnalysis.totalValue.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff004d] ml-2 flex items-center gap-2">
                  <Search size={12} /> Live Combination Lookup
                </h4>
                <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                   <input 
                     type="text" 
                     placeholder="Search numbers..." 
                     className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 outline-none font-black text-gray-800 focus:border-[#ff004d]/20 shadow-inner"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
              </div>

              <div className="space-y-3">
                {currentSlotAnalysis.topCombinations.length === 0 ? (
                  <div className="flex flex-col items-center py-10 opacity-20">
                    <Search size={48} />
                    <p className="text-[10px] font-black uppercase tracking-widest mt-4">No activity</p>
                  </div>
                ) : (
                  currentSlotAnalysis.topCombinations.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm hover:border-[#ff004d]/20 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg italic border-b-4 ${
                            item.risk === 'High' ? 'bg-red-50 text-red-600 border-red-600' :
                            item.risk === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-600' :
                            'bg-gray-900 text-white border-gray-100'
                          }`}>
                             {item.num}
                          </div>
                          <div>
                             <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Quantity Sold</p>
                             <p className="text-lg font-black text-gray-800 leading-none">{item.totalQty}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                             item.risk === 'High' ? 'bg-red-100 text-red-600' :
                             item.risk === 'Medium' ? 'bg-orange-100 text-orange-600' :
                             'bg-green-100 text-green-600'
                          }`}>
                            {item.risk} Risk
                          </p>
                       </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
