import React, { useState, useEffect } from 'react';
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
  ListFilter
} from 'lucide-react';

const AdminAnnouncements = () => {
  const [activeTab, setActiveTab] = useState('dispatch'); // 'dispatch', 'analysis', 'history'
  const [selectedSlot, setSelectedSlot] = useState({ draw: '01:00 PM', brand: 'DEAR' });
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'DEAR DRAW RESULT: 01:00 PM', content: 'Winning Number: 5271. Congratulations to 124 winners!', date: '2024-03-24 14:30', status: 'Active', priority: 'High', type: 'winner' },
  ]);

  const [newResult, setNewResult] = useState({ number: '' });
  
  // Custom Prize Allocation State
  const [prizes, setPrizes] = useState([
    { position: '1st Prize', amount: '50000', winners: 1 },
    { position: '2nd Prize', amount: '10000', winners: 5 },
    { position: '3rd Prize', amount: '1000', winners: 20 },
  ]);

  const draws = ['01:00 PM', '03:00 PM', '06:00 PM', '08:00 PM', '10:30 AM (JP)', '01:30 PM (JP)'];

  // Mock Data for Slot Analysis
  const [slotData, setSlotData] = useState({
    totalTickets: 3240,
    uniqueCombinations: 450,
    topCombinations: [
      { num: '5271', count: 124, risk: 'High' },
      { num: '1234', count: 85, risk: 'Medium' },
      { num: '0000', count: 72, risk: 'Medium' },
      { num: '9999', count: 45, risk: 'Low' },
      { num: '1111', count: 38, risk: 'Low' },
    ],
    tickets: [
      { id: 'TX101', user: 'Rajesh K', num: '5271', qty: 10, time: '12:45 PM' },
      { id: 'TX102', user: 'Amit S', num: '1234', qty: 5, time: '12:50 PM' },
      { id: 'TX103', user: 'Vijay V', num: '5271', qty: 20, time: '12:55 PM' },
    ]
  });

  const handleAddPrize = () => {
    setPrizes([...prizes, { position: `Prize ${prizes.length + 1}`, amount: '0', winners: 0 }]);
  };

  const handleUpdatePrize = (idx, field, val) => {
    const newPrizes = [...prizes];
    newPrizes[idx][field] = val;
    setPrizes(newPrizes);
  };

  const handleDeclareResult = () => {
    if (!newResult.number) return alert("Please enter winning number");
    
    // Check if result exists in slot (for info)
    const winners = slotData.topCombinations.find(c => c.num === newResult.number)?.count || 0;
    
    const msg = {
      id: Date.now(),
      title: `${selectedSlot.brand} RESULT: ${selectedSlot.draw}`,
      content: `Winning Number: ${newResult.number}. Total Winners: ${winners}. Prize Pool Distributed: ${prizes.reduce((acc, p) => acc + (parseInt(p.amount) * parseInt(p.winners)), 0).toLocaleString()}`,
      date: new Date().toLocaleString(),
      status: 'Active',
      priority: 'High',
      type: 'winner'
    };
    
    setAnnouncements([msg, ...announcements]);
    setNewResult({ number: '' });
    setActiveTab('history');
    alert("Result Declared Successfully!");
  };

  return (
    <div className="space-y-8 p-4 pb-24">
      {/* Header Tabs */}
      <div className="flex bg-white rounded-2xl p-2 shadow-lg border border-gray-100 mb-4">
        {[
          { id: 'dispatch', label: 'Dispatch', icon: Zap },
          { id: 'analysis', label: 'Intelligence', icon: TrendingUp },
          { id: 'history', label: 'History', icon: Clock }
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
          {/* Result Entry Module */}
          <div className="border-[1.5px] border-[#ff004d] rounded-[2.5rem] p-8 bg-white shadow-2xl relative overflow-hidden group">
            <div className="flex gap-4 mb-10 border-b border-gray-100 pb-6">
              <img src="https://img.icons8.com/color/64/000000/treasure-chest.png" alt="Chest" className="w-16 h-16 drop-shadow-xl" />
              <div className="flex-grow">
                <h2 className="text-2xl font-black text-gray-900 font-condensed uppercase tracking-tighter italic">Result Dispatcher</h2>
                <p className="text-[#ff004d] font-black text-[10px] uppercase tracking-widest leading-none mt-1">Official Prize Allocation</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Draw Event</label>
                  <select 
                    value={selectedSlot.draw}
                    onChange={(e) => setSelectedSlot({...selectedSlot, draw: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 h-14 font-bold text-gray-700 outline-none focus:border-[#ff004d]/30 text-xs"
                  >
                    {draws.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                  <select 
                    value={selectedSlot.brand}
                    onChange={(e) => setSelectedSlot({...selectedSlot, brand: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 h-14 font-bold text-gray-700 outline-none focus:border-[#ff004d]/30 text-xs"
                  >
                    <option value="DEAR">DEAR LOTTERY</option>
                    <option value="KERALA">KERALA STATE</option>
                    <option value="JACKPOT">DIAMOND JP</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Declare Winning Sequence</label>
                <div className="relative">
                  <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
                  <input 
                    type="text" 
                    placeholder="e.g. 5271" 
                    className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-6 outline-none font-black text-gray-800 shadow-sm focus:border-amber-500/30 transition-all text-sm placeholder:text-gray-300"
                    value={newResult.number}
                    onChange={(e) => setNewResult({...newResult, number: e.target.value})}
                  />
                </div>
              </div>

              {/* Prize Allocation Interface */}
              <div className="space-y-4 pt-6 mt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Prize Tier Allocation</h3>
                  <button onClick={handleAddPrize} className="text-[#ff004d] text-[10px] font-black flex items-center gap-1 uppercase hover:opacity-70 transition-opacity">
                    <Plus size={14} /> Add Position
                  </button>
                </div>
                
                <div className="space-y-3">
                  {prizes.map((p, i) => (
                    <div key={i} className="flex gap-2 items-center bg-gray-50 p-4 rounded-xl border border-gray-100 group">
                      <input 
                        type="text" 
                        value={p.position} 
                        onChange={(e) => handleUpdatePrize(i, 'position', e.target.value)}
                        className="w-24 bg-transparent font-bold text-[10px] uppercase outline-none text-gray-900"
                      />
                      <div className="flex-grow flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-[8px]">₹</span>
                          <input 
                            type="number" 
                            value={p.amount} 
                            onChange={(e) => handleUpdatePrize(i, 'amount', e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-lg px-5 py-2 text-[10px] font-black text-[#ff004d]"
                          />
                        </div>
                        <div className="relative w-16">
                          <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-[8px] uppercase">Win</span>
                          <input 
                            type="number" 
                            value={p.winners} 
                            onChange={(e) => handleUpdatePrize(i, 'winners', e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-lg px-6 py-2 text-[10px] font-black text-gray-700"
                          />
                        </div>
                      </div>
                      <button onClick={() => setPrizes(prizes.filter((_, idx) => idx !== i))} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleDeclareResult}
                className="w-full h-16 bg-[#ff004d] text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-[#ff004d]/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
              >
                Finalize & Distribute Prizes <Trophy size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {/* Slot Intel Module */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100">
                <TrendingUp size={28} />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-black text-gray-900 font-condensed uppercase tracking-tighter italic">{selectedSlot.draw} Analytics</h3>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">Data-driven combination insight</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 bg-[#ff004d] group-hover:scale-125 transition-transform"><Ticket size={32} /></div>
                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Submissions</p>
                 <p className="text-2xl font-black text-gray-900 italic tracking-tighter leading-none">{slotData.totalTickets.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 bg-blue-500 group-hover:scale-125 transition-transform"><LayoutGrid size={32} /></div>
                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Unique Codes</p>
                 <p className="text-2xl font-black text-gray-900 italic tracking-tighter leading-none">{slotData.uniqueCombinations}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between ml-2">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff004d]">Crowded Combinations</h4>
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#ff004d] animate-pulse"></div>
                   <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Real-time Load</span>
                </div>
              </div>

              <div className="space-y-2">
                {slotData.topCombinations.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#ff004d]/20 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-black text-xs italic border-b-2 border-red-600">
                           {item.num}
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Buy Count</p>
                           <p className="text-sm font-black text-gray-800">{item.count} Tickets</p>
                        </div>
                     </div>
                     <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${
                       item.risk === 'High' ? 'bg-red-50 text-red-500' : 
                       item.risk === 'Medium' ? 'bg-amber-50 text-amber-500' : 
                       'bg-emerald-50 text-emerald-500'
                     }`}>Risk: {item.risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Raw Ticket View */}
            <div className="pt-6 border-t border-gray-50">
              <div className="flex items-center justify-between mb-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Detailed Transaction Log</h4>
                 <button className="text-[8px] font-black text-[#ff004d] uppercase tracking-widest flex items-center gap-1 hover:underline">
                    <ListFilter size={10} /> Full export
                 </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
                {slotData.tickets.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-50">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center"><Ticket size={14} className="text-gray-300" /></div>
                        <div>
                           <p className="text-[9px] font-black text-gray-800 leading-none">{t.user}</p>
                           <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1">{t.id} • {t.time}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] font-black text-[#ff004d] leading-none mb-0.5">{t.num}</p>
                        <p className="text-[7px] font-bold text-gray-400 uppercase">Q: {t.qty}</p>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 ml-2">
             <Clock className="text-[#ff004d]" size={20} />
             <h3 className="text-xl font-black text-gray-800 font-condensed uppercase tracking-tighter">Broadcast History</h3>
          </div>

          <div className="space-y-4">
            {announcements.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-lg group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-[2rem] flex items-center justify-center text-emerald-600">
                    <Trophy size={20} />
                 </div>
                 
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-amber-500 text-white">
                       <Trophy size={20} />
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">ID: #{item.id}</span>
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight line-clamp-1">{item.title}</h4>
                    </div>
                 </div>

                 <p className="text-[11px] text-gray-600 font-medium leading-relaxed mb-6 border-l-2 border-gray-100 pl-4">
                    {item.content}
                 </p>

                 <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                       <Clock size={12} className="text-[#ff004d]" /> {item.date}
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"><Edit3 size={16} /></button>
                       <button className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-8 text-center opacity-30">
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Hardware Encrypted Authority Portal</p>
      </div>
    </div>
  );
};

const Plus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default AdminAnnouncements;
