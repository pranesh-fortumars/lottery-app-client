import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Calendar, Clock, Award, ChevronRight, TrendingUp } from 'lucide-react';

const ResultsPage = () => {
  const results = [
    { id: 1, date: 'Mar 17, 2026', time: '08:00 PM', name: 'DEARLOT', type: 'dear', nums: ['5', '2', '7'] },
    { id: 2, date: 'Mar 17, 2026', time: '06:00 PM', name: 'DEARLOT', type: 'dear', nums: ['6', '1', '0'] },
    { id: 3, date: 'Mar 17, 2026', time: '03:00 PM', name: 'KERELALOT', type: 'kerala', nums: ['5', '8', '8', '5'] },
    { id: 4, date: 'Mar 17, 2026', time: '01:00 PM', name: 'DEARLOT', type: 'dear', nums: ['3', '0', '9'] },
  ];

  return (
    <PageWrapper title="WINNING BOARD">
      <div className="bg-[#f8f9fa] min-h-screen p-5 pb-24">
        {/* Statistics Header */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
           <div>
              <p className="text-[#f42464] text-[10px] font-black uppercase tracking-widest mb-1">Live Updates</p>
              <h2 className="text-2xl font-black text-gray-900 font-condensed uppercase tracking-tighter">Draw Reports</h2>
           </div>
           <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
              <TrendingUp size={24} />
           </div>
        </div>

        <div className="space-y-6">
          {results.map((r, i) => (
            <div 
              key={r.id} 
              className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all active:scale-[0.98]"
            >
              {/* Decorative side element */}
              <div className={`absolute top-0 right-0 h-full w-2 ${
                r.type === 'dear' ? 'bg-amber-400' : 'bg-[#f42464]'
              }`}></div>

              <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <Calendar size={12} className="text-[#f42464]" /> {r.date}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <Clock size={12} className="text-amber-500" /> {r.time}
                    </div>
                 </div>
                 <div className="bg-gray-900 text-white px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {r.name}
                 </div>
              </div>

              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <Award size={16} className="text-[#f42464]" />
                    <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Win Confirmation</span>
                 </div>
                 
                 <div className="flex gap-3 items-center">
                   {r.nums.map((n, j) => (
                     <div 
                       key={j} 
                       className="w-14 h-14 bg-gradient-to-br from-[#f42464] to-[#ff004d] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-[#f42464]/20 group-hover:scale-110 transition-transform cursor-default"
                     >
                       {n}
                     </div>
                   ))}
                   <div className="ml-auto w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 group-hover:text-[#f42464] transition-colors">
                      <ChevronRight size={24} />
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">Official results verified by Diamond Agency Board</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResultsPage;
