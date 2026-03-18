import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Ticket, Clock, Calendar, CheckCircle2 } from 'lucide-react';

const MyTickets = () => {
  const tickets = [
    { id: 'T9821', game: 'Dear Lottery', numbers: '5 2 7', time: '01:00 PM', date: '05/03/2026', qty: 10, status: 'Won', prize: '₹ 250' },
    { id: 'T9825', game: 'Jackpot', numbers: '6 1 0', time: '11:30 AM', date: '05/03/2026', qty: 5, status: 'Expired', prize: '₹ 0' },
    { id: 'T9840', game: 'Kerala State', numbers: '5 8 8 5', time: '03:00 PM', date: '04/03/2026', qty: 2, status: 'Active', prize: '-' },
  ];

  return (
    <PageWrapper title="MY TICKETS">
      <div className="bg-white min-h-screen p-4 pb-20">
        <div className="space-y-4">
          {tickets.map((t, idx) => (
            <div key={idx} className="border-[1.5px] border-[#ff0033] rounded-2xl p-4 bg-white shadow-lg relative overflow-hidden group">
               <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#ff0033] rounded-xl flex items-center justify-center text-white shadow-md">
                        <Ticket size={24} />
                     </div>
                     <div>
                        <h3 className="text-gray-900 font-black text-xs uppercase tracking-tight">{t.game}</h3>
                        <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest italic">{t.id}</p>
                     </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    t.status === 'Won' ? 'bg-emerald-50 text-emerald-500' :
                    t.status === 'Active' ? 'bg-blue-50 text-blue-500' :
                    'bg-gray-50 text-gray-400'
                  }`}>
                    {t.status}
                  </div>
               </div>

               <div className="flex justify-between items-end">
                  <div className="flex gap-2">
                     {t.numbers.split(' ').map((n, i) => (
                        <div key={i} className="w-9 h-9 border-[1.5px] border-gray-950 rounded-lg flex items-center justify-center font-black text-lg bg-gray-50 group-hover:bg-[#ff0033] group-hover:text-white transition-colors duration-300">
                           {n}
                        </div>
                     ))}
                  </div>
                  <div className="text-right">
                     <div className="flex items-center gap-1.5 justify-end mb-1 opacity-50">
                        <Calendar size={10} className="text-[#ff0033]" />
                        <span className="text-[8px] font-black text-gray-500">{t.date}</span>
                     </div>
                     <div className="flex items-center gap-1.5 justify-end opacity-50">
                        <Clock size={10} className="text-[#ff0033]" />
                        <span className="text-[8px] font-black text-gray-500">{t.time}</span>
                     </div>
                     <p className="text-[#ff0033] font-black text-xs mt-2 italic shadow-inner bg-red-50 px-2 py-0.5 rounded leading-none uppercase">Qnty: {t.qty}</p>
                  </div>
               </div>

               {t.prize !== '-' && t.prize !== '₹ 0' && (
                 <div className="absolute top-0 right-0 p-2 bg-emerald-500 text-white rounded-bl-xl flex items-center gap-1 shadow-md">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-black italic">{t.prize}</span>
                 </div>
               )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center opacity-30">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] font-serif italic">*** All Winning tickets verified by Board ***</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MyTickets;
