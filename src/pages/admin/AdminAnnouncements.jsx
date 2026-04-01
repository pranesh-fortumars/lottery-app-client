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
  AlertCircle,
  FileText,
  Download,
  Filter,
  History,
  Layout
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const AdminAnnouncements = () => {
  const { purchasedTickets, addResult, declaredResults } = useCart();
  const [activeTab, setActiveTab] = useState('dispatch'); 
  
  // Workflow Navigation State
  const [workflowStep, setWorkflowStep] = useState('root'); 
  const [marketSelection, setMarketSelection] = useState(null); 
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Result History Date Filter
  const [historyDate, setHistoryDate] = useState(new Date().toISOString().split('T')[0]);

  // 4-Column Result Entry
  const [resultDigits, setResultDigits] = useState({ X: '', A: '', B: '', C: '' });

  // Prize Rewards Configuration
  const [prizeConfigs, setPrizeConfigs] = useState({
    '1D': { A: '100', B: '100', C: '100' },
    '2D': { AB: '500', BC: '500', AC: '500' },
    '3D': { ABC: '2000' },
    '4D': { XABC: '10000' }
  });

  const drawAssignments = {
    'DEAR': ['01:00 PM', '06:00 PM', '08:00 PM'],
    'KERALA': ['03:00 PM']
  };

  // --- Aggregate Market Analytics ---
  const marketSummary = useMemo(() => {
    const summary = {};
    Object.values(drawAssignments).flat().forEach(d => {
      const filtered = purchasedTickets.filter(t => t.title.includes(d));
      summary[d] = {
        totalQty: filtered.reduce((sum, t) => sum + t.qty, 0),
        totalValue: filtered.reduce((sum, t) => sum + (t.qty * t.price), 0)
      };
    });
    return summary;
  }, [purchasedTickets]);

  const filteredHistory = useMemo(() => {
    const targetDate = new Date(historyDate).toLocaleDateString();
    return declaredResults.filter(r => r.date === targetDate);
  }, [declaredResults, historyDate]);

  const handleDigitChange = (col, val) => {
    if (val.length <= 1) {
       setResultDigits({ ...resultDigits, [col]: val });
    }
  };

  const handleDeclareResult = () => {
    const { X, A, B, C } = resultDigits;
    if (!X || !A || !B || !C) return alert("Please enter all 4 result digits.");

    const resultData = {
      draw: selectedSlot,
      brand: marketSelection === 'DEAR' ? 'DEARLOT' : 'KERELALOT',
      digits: resultDigits,
      prizes: prizeConfigs,
      timestamp: new Date().toISOString()
    };

    addResult(resultData);
    alert(`RESULT ANNOUNCED: ${X}${A}${B}${C} for ${marketSelection} ${selectedSlot}`);
    
    // Reset to Root
    setWorkflowStep('root');
    setResultDigits({ X: '', A: '', B: '', C: '' });
  };

  const exportToPDF = () => {
    alert("System preparing PDF Export... (Simulation: PDF Generated and Downloaded)");
  };

  return (
    <div className="space-y-8 p-4 pb-24 h-full bg-[#f8fbff] overflow-y-auto scrollbar-hide">
      
      {/* Tab Switcher */}
      <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 sticky top-0 z-[100]">
        {[
          { id: 'dispatch', label: 'Dispatch', icon: Zap },
          { id: 'history', label: 'History', icon: History },
          { id: 'analysis', label: 'Monitor', icon: TrendingUp },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-[#ff0000] text-white shadow-xl shadow-[#ff0000]/20' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dispatch' && (
        <div className="space-y-6">
          {workflowStep === 'root' && (
            <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95 duration-300 h-[300px]">
               <button onClick={() => setWorkflowStep('market')} className="bg-white rounded-[2.5rem] shadow-2xl border-2 border-transparent hover:border-[#ff0000] transition-all flex flex-col items-center justify-center space-y-4 group">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-[#ff0000] group-hover:scale-110 transition-transform"><Trophy size={32} /></div>
                  <p className="text-xl font-black font-condensed tracking-tighter uppercase italic">Result</p>
               </button>
               <button className="bg-white rounded-[2.5rem] shadow-2xl border-2 border-transparent hover:border-[#ff0000] transition-all flex flex-col items-center justify-center space-y-4 group opacity-50 cursor-not-allowed">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500"><Layout size={32} /></div>
                  <p className="text-xl font-black font-condensed tracking-tighter uppercase italic">Scheme</p>
               </button>
            </div>
          )}

          {/* ... Other workflow steps (market, slot, declare) remain same but with Red #ff0000 ... */}
          {/* I'll use the same structure but updated with precise #ff0000 styling */}
          {workflowStep !== 'root' && workflowStep !== 'history' && (
             <div className="space-y-6">
                {workflowStep === 'market' && (
                    <div className="animate-in slide-in-from-right-4 duration-300 space-y-6 bg-white p-8 rounded-[2.5rem] shadow-2xl">
                    <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                        <h3 className="text-lg font-black font-condensed uppercase italic">Select Market Type</h3>
                        <button onClick={() => setWorkflowStep('root')} className="text-[10px] font-black uppercase text-gray-300 hover:text-red-500">Back</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {['DEAR', 'KERALA'].map(m => (
                            <button key={m} onClick={() => { setMarketSelection(m); setWorkflowStep('slot'); }} className="p-8 rounded-[1.5rem] bg-gray-50 border border-gray-100 hover:border-[#ff0000] transition-all text-center">
                            <p className="text-xl font-black font-condensed italic">{m}</p>
                            </button>
                        ))}
                    </div>
                    </div>
                )}

                {workflowStep === 'slot' && (
                    <div className="animate-in slide-in-from-right-4 duration-300 space-y-6 bg-white p-8 rounded-[2.5rem] shadow-2xl">
                    <div className="flex justify-between items-center pb-6 border-b border-gray-50">
                        <h3 className="text-lg font-black font-condensed uppercase italic">{marketSelection} - Draw Slots</h3>
                        <button onClick={() => setWorkflowStep('market')} className="text-[10px] font-black uppercase text-gray-300 hover:text-red-500">Back</button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {drawAssignments[marketSelection].map(slot => (
                            <button key={slot} onClick={() => { setSelectedSlot(slot); setWorkflowStep('declare'); }} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#ff0000] transition-all flex justify-between items-center">
                            <p className="text-lg font-black font-condensed italic">{slot}</p>
                            <div className="flex gap-4 opacity-40">
                                <p className="text-[8px] font-black uppercase">Tickets: {marketSummary[slot]?.totalQty || 0}</p>
                                <ChevronRight size={16} />
                            </div>
                            </button>
                        ))}
                    </div>
                    </div>
                )}

                {workflowStep === 'declare' && (
                    <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-6">
                    <div className="bg-gray-900 rounded-3xl p-6 text-white flex justify-between items-center shadow-2xl border-l-[10px] border-[#ff0000]">
                        <div>
                            <p className="text-[9px] font-black uppercase opacity-60 tracking-[.2em]">{marketSelection}</p>
                            <h2 className="text-2xl font-black font-condensed italic tracking-tighter">{selectedSlot}</h2>
                        </div>
                        <button onClick={() => setWorkflowStep('slot')} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-100 space-y-8">
                        {/* 4-Digit Matrix */}
                        <div className="grid grid-cols-4 gap-4">
                            {['X', 'A', 'B', 'C'].map(col => (
                            <div key={col} className="space-y-2 text-center">
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{col === 'X' ? 'X / D' : col}</label>
                                <input type="number" value={resultDigits[col]} onChange={(e) => handleDigitChange(col, e.target.value)} className="w-full h-20 bg-gray-50 border-2 border-gray-100 rounded-2xl text-center text-4xl font-black focus:border-[#ff0000] focus:bg-white outline-none" />
                            </div>
                            ))}
                        </div>

                        {/* Prize Configuration */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
                                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">1D Prizes</p>
                                {['A', 'B', 'C'].map(p => (
                                <div key={p} className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-black text-gray-400 italic">{p}</span>
                                    <input type="number" value={prizeConfigs['1D'][p]} onChange={(e) => setPrizeConfigs({...prizeConfigs, '1D': {...prizeConfigs['1D'], [p]: e.target.value}})} className="w-20 bg-white border border-gray-200 rounded-lg py-1 px-2 text-xs font-black" />
                                </div>
                                ))}
                            </div>
                            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 space-y-4">
                                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">2D Prizes</p>
                                {['AB', 'BC', 'AC'].map(p => (
                                <div key={p} className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-black text-gray-400 italic">{p}</span>
                                    <input type="number" value={prizeConfigs['2D'][p]} onChange={(e) => setPrizeConfigs({...prizeConfigs, '2D': {...prizeConfigs['2D'], [p]: e.target.value}})} className="w-20 bg-white border border-gray-200 rounded-lg py-1 px-2 text-xs font-black" />
                                </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleDeclareResult} className="w-full bg-[#ff0000] text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-[#ff0000]/20 active:scale-95 transition-all">DECLARE RESULT</button>
                    </div>
                    </div>
                )}
             </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="p-4 bg-white animate-in slide-in-from-bottom-4 duration-500">
           {/* Date Filter & Export Header (Refined styled) */}
           <div className="flex items-center justify-between mb-8 border-b-2 border-red-100 pb-6 px-2">
              <div className="flex flex-col gap-1">
                 <label className="text-[8px] font-black uppercase tracking-widest text-[#ff0000]">Select Record Date</label>
                 <input type="date" value={historyDate} onChange={(e) => setHistoryDate(e.target.value)} className="bg-transparent border-none font-black text-xl outline-none cursor-pointer focus:text-[#ff0000] transition-colors" />
              </div>
              <button onClick={exportToPDF} className="bg-[#ff0000] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-red-100"><Download size={14} /> Download</button>
           </div>

           {/* --- OFFICIAL RESULT CARDS (Matching Reference Image) --- */}
           <div className="space-y-6">
              {filteredHistory.length > 0 ? filteredHistory.map((res, i) => (
                <div key={i} className="official-result-card relative transition-all hover:scale-[1.01] animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                  <table cellPadding="10">
                    <tbody>
                      <tr>
                        <td>Date</td>
                        <td>{res.date}</td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td>{res.draw}</td>
                      </tr>
                      <tr>
                        <td>Lot Name</td>
                        <td>{res.brand}</td>
                      </tr>
                      <tr>
                        <td>Result Number</td>
                        <td>
                          <div className="flex items-center">
                            {res.number.split('').map((digit, idx) => (
                              <span key={idx} className="result-circle">{digit}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )) : (
                <div className="text-center py-20 opacity-30">
                   <Gamepad2 size={48} className="mx-auto mb-4" />
                   <p className="font-serif-official italic text-xl">No official records found.</p>
                </div>
              )}
           </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6 p-4">
           <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50">
             <div className="flex items-center gap-3 mb-8">
                <Activity className="text-[#ff0000]" size={20} />
                <h3 className="font-condensed font-black text-xl italic uppercase tracking-tighter">Market Pulse</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {Object.keys(marketSummary).map(d => (
                  <div key={d} className="p-6 rounded-[2rem] bg-gray-50 border border-gray-100 text-left">
                     <p className="text-[8px] font-black text-[#ff0000] uppercase tracking-[.2em] mb-1">INTAKE</p>
                     <p className="text-xl font-black font-condensed italic leading-none">{d}</p>
                     <div className="mt-4 flex justify-between items-end opacity-40">
                        <p className="text-[7px] font-black uppercase">Qty: {marketSummary[d].totalQty}</p>
                        <p className="text-xs font-black">₹ {marketSummary[d].totalValue}</p>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
