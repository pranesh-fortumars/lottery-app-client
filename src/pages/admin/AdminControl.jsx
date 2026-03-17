import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  Settings2, 
  RefreshCcw, 
  AlertCircle,
  Clock,
  Zap,
  ShieldCheck
} from 'lucide-react';

const AdminControl = () => {
  const [activeLotteries, setActiveLotteries] = useState([
    { id: 1, name: 'Dear Lottery (01:00 PM)', status: 'Running', entries: 1245 },
    { id: 2, name: 'Dear Lottery (06:00 PM)', status: 'Scheduled', entries: 0 },
    { id: 3, name: 'Kerala State (03:00 PM)', status: 'Paused', entries: 450 },
  ]);

  return (
    <div className="space-y-6 pb-20 p-4">
      {/* Global Status Banner */}
      <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl">
         <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#f42464] flex items-center justify-center shadow-[0_0_20px_rgba(244,36,100,0.4)]">
               <Zap size={24} fill="white" />
            </div>
            <div>
               <h2 className="text-lg font-black uppercase tracking-tight font-condensed">Engine Active</h2>
               <p className="text-[8px] font-bold text-[#f42464] uppercase tracking-widest">Processing Live Slots</p>
            </div>
         </div>
         
         <div className="flex gap-2">
            <button className="flex-1 bg-white/10 p-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Restart</button>
            <button className="flex-1 bg-red-600 p-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Stop</button>
         </div>
      </div>

      <div className="space-y-8">
        {/* Slot Controls */}
        <div className="space-y-4">
           <h3 className="text-sm font-black text-gray-800 font-condensed uppercase tracking-tight flex items-center gap-2">
              <Settings2 className="text-[#f42464]" size={20} /> Slot Management
           </h3>
           
           <div className="space-y-3">
              {activeLotteries.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'Running' ? 'bg-emerald-500 animate-ping' : 
                        item.status === 'Paused' ? 'bg-orange-500' : 'bg-blue-500'
                      }`} />
                      <div>
                         <h4 className="font-black text-gray-800 text-xs tracking-tight">{item.name}</h4>
                         <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">{item.status} • {item.entries}</p>
                      </div>
                   </div>
                   
                   <div className="flex gap-1.5">
                      <button className="p-2 rounded-lg bg-gray-50 text-gray-400 active:bg-gray-100"><Play size={14} /></button>
                      <button className="p-2 rounded-lg bg-gray-50 text-gray-400 active:bg-gray-100"><RefreshCcw size={14} /></button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Global Parameters */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
           <h3 className="text-sm font-black text-gray-800 font-condensed uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="text-[#f42464]" size={20} /> Game Settings
           </h3>
           
           <div className="space-y-4">
              {[
                { label: 'Ticket Price', value: '11', unit: '₹' },
                { label: 'Max Tickets', value: '5000', unit: '#' },
                { label: 'Deadline (min)', value: '15', unit: '⏰' },
              ].map((param, idx) => (
                <div key={idx} className="space-y-1">
                   <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">{param.label}</label>
                   <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 h-12">
                      <span className="font-black text-gray-400 text-xs mr-2">{param.unit}</span>
                      <input type="number" defaultValue={param.value} className="bg-transparent border-none outline-none font-black text-gray-800 text-sm w-full" />
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full bg-[#f42464] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-md active:scale-95">
              Apply Changes
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminControl;
