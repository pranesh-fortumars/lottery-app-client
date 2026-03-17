import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Eye,
  MoreVertical
} from 'lucide-react';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Mega Jackpot Result Out!', content: 'The results for today\'s 01:00 PM draw are now available...', date: '2024-03-17 14:30', status: 'Active', priority: 'High' },
    { id: 2, title: 'System Maintenance', content: 'Application will be down for 30 minutes tonight at 11 PM...', date: '2024-03-16 10:00', status: 'Draft', priority: 'Medium' },
    { id: 3, title: 'New Kerala Lottery Schedule', content: 'Check out the updated timings for Kerala State lotteries...', date: '2024-03-15 09:00', status: 'Active', priority: 'Low' },
  ]);

  return (
    <div className="space-y-6 p-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <div>
           <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest">Broadcasts</p>
           <h2 className="text-sm font-black text-gray-800 font-condensed uppercase tracking-tight">System Alerts</h2>
        </div>
        <button className="bg-[#f42464] text-white p-3 rounded-2xl flex items-center justify-center shadow-md active:scale-95">
          <Plus size={20} />
        </button>
      </div>

      {/* List of Announcements */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                 item.status === 'Active' ? 'bg-[#f42464] text-white' : 'bg-gray-100 text-gray-400'
               }`}>
                 <Megaphone size={20} />
               </div>
               <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest ${
                 item.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
               }`}>
                 {item.priority}
               </span>
            </div>

            <div>
               <h3 className="text-sm font-black text-gray-800 tracking-tight">{item.title}</h3>
               <p className="text-[10px] text-gray-500 font-medium leading-relaxed mt-1 line-clamp-2">
                 {item.content}
               </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
               <div className="flex items-center gap-1.5 text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                  <Clock size={12} /> {item.date.split(' ')[0]}
               </div>
               <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-gray-50 text-gray-400 active:bg-gray-100"><Edit3 size={14} /></button>
                  <button className="p-2 rounded-lg bg-red-50 text-red-400 active:bg-red-100"><Trash2 size={14} /></button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
