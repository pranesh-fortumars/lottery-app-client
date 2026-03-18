import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit3, 
  Trophy, 
  Clock, 
  Ticket,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Mega Jackpot Result Out!', content: 'The results for today\'s 01:00 PM draw are now available...', date: '2024-03-17 14:30', status: 'Active', priority: 'High', type: 'winner' },
    { id: 2, title: 'System Maintenance', content: 'Application will be down for 30 minutes tonight at 11 PM...', date: '2024-03-16 10:00', status: 'Draft', priority: 'Medium', type: 'system' },
  ]);

  const [newWinner, setNewWinner] = useState({ draw: '01:00 PM', brand: 'DEAR', number: '' });

  const draws = ['01:00 PM', '03:00 PM', '06:00 PM', '08:00 PM', '10:30 AM (JP)', '01:30 PM (JP)'];

  const handleAnnounce = () => {
    if (!newWinner.number) return alert("Please enter winning number");
    const msg = {
      id: Date.now(),
      title: `${newWinner.brand} DRAW RESULT: ${newWinner.draw}`,
      content: `Winning Number for the ${newWinner.draw} draw is: ${newWinner.number}. Congratulations to all winners!`,
      date: new Date().toLocaleString(),
      status: 'Active',
      priority: 'High',
      type: 'winner'
    };
    setAnnouncements([msg, ...announcements]);
    setNewWinner({ ...newWinner, number: '' });
  };

  return (
    <div className="space-y-10 p-4 pb-20">
      {/* WINNER ANNOUNCEMENT MODULE - Premium Treasure Design */}
      <div className="border-[1.5px] border-[#ff004d] rounded-[2.5rem] p-6 bg-white shadow-2xl relative overflow-hidden group">
         {/* Decorative Glow */}
         <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ff004d]/5 rounded-full blur-3xl"></div>
         
         <div className="flex gap-4 mb-8 border-b border-gray-100 pb-5">
            <img src="https://img.icons8.com/color/64/000000/treasure-chest.png" alt="Chest" className="w-16 h-16 drop-shadow-xl group-hover:scale-110 transition-transform" />
            <div className="flex-grow">
               <h2 className="text-2xl font-black text-gray-900 font-condensed uppercase tracking-tighter italic">Draw Results</h2>
               <p className="text-[#ff004d] font-black text-[10px] uppercase tracking-widest leading-none mt-1">Winning Number Dispatcher</p>
            </div>
         </div>

         <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
               <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Draw Event</label>
                  <select 
                    value={newWinner.draw}
                    onChange={(e) => setNewWinner({...newWinner, draw: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 h-12 font-bold text-gray-700 outline-none focus:border-[#ff004d]/30 text-xs"
                  >
                     {draws.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
               </div>
               <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Brand</label>
                  <select 
                    value={newWinner.brand}
                    onChange={(e) => setNewWinner({...newWinner, brand: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 h-12 font-bold text-gray-700 outline-none focus:border-[#ff004d]/30 text-xs"
                  >
                     <option value="DEAR">DEAR LOTTERY</option>
                     <option value="KERALA">KERALA STATE</option>
                     <option value="JACKPOT">DIAMOND JP</option>
                  </select>
               </div>
            </div>

            <div className="space-y-1.5">
               <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Enter Winning Number</label>
               <div className="relative">
                  <Sparkles className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g. 5271" 
                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-6 outline-none font-black text-gray-800 shadow-sm focus:border-amber-500/30 transition-all text-sm placeholder:text-gray-300"
                    value={newWinner.number}
                    onChange={(e) => setNewWinner({...newWinner, number: e.target.value})}
                  />
               </div>
            </div>

            <button 
              onClick={handleAnnounce}
              className="w-full h-14 bg-[#ff004d] text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-[#ff004d]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
               Announce Winner Now <Trophy size={18} />
            </button>
         </div>
      </div>

      {/* RECENT BROADCASTS */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 ml-2">
           <Megaphone className="text-[#ff004d]" size={20} />
           <h3 className="text-xl font-black text-gray-800 font-condensed uppercase tracking-tighter">Recent Alerts</h3>
        </div>

        <div className="space-y-4">
          {announcements.map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-lg group relative overflow-hidden">
               {item.type === 'winner' && (
                 <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-[2rem] flex items-center justify-center text-emerald-600">
                    <Trophy size={20} />
                 </div>
               )}
               
               <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                    item.type === 'winner' ? 'bg-amber-500 text-white' : 'bg-[#ff004d] text-white'
                  }`}>
                     {item.type === 'winner' ? <Trophy size={20} /> : <Megaphone size={20} />}
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Status: {item.status}</span>
                    <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight line-clamp-1">{item.title}</h4>
                  </div>
               </div>

               <p className="text-[11px] text-gray-600 font-medium leading-relaxed mb-6 border-l-2 border-gray-100 pl-4">
                  {item.content}
               </p>

               <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                     <Clock size={12} className="text-[#ff004d]" /> {item.date.split(',')[0]}
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
    </div>
  );
};

export default AdminAnnouncements;
