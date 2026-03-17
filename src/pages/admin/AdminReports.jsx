import React from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  PieChart, 
  Activity,
  ArrowRight
} from 'lucide-react';

const AdminReports = () => {
  const reports = [
    { title: 'Daily Revenue Report', desc: 'Detailed breakdown of sales and prize payouts.', date: 'Daily', icon: Activity, color: 'emerald' },
    { title: 'User Growth Analytics', desc: 'Tracking new registrations and user retention.', date: 'Weekly', icon: PieChart, color: 'blue' },
    { title: 'Lottery Accuracy Audit', desc: 'Verifying random number generation and results.', date: 'Monthly', icon: FileText, color: 'orange' },
    { title: 'Wallet Transaction Log', desc: 'Complete history of all deposits and winnings.', date: 'Real-time', icon: Calendar, color: 'pink' },
  ];

  return (
    <div className="space-y-6 pb-20 p-4">
      {/* Top Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
         <div>
            <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest">Intelligence</p>
            <h2 className="text-sm font-black text-gray-800 font-condensed uppercase tracking-tight">System Reports</h2>
         </div>
         <button className="bg-[#f42464] text-white p-3 rounded-2xl flex items-center justify-center shadow-md active:scale-95">
            <Download size={18} />
         </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
         {reports.map((report, idx) => (
           <div key={idx} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
              <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                report.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                report.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                report.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                'bg-red-50 text-[#f42464]'
              }`}>
                 <report.icon size={24} />
              </div>
              
              <div className="flex-grow">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-gray-800 tracking-tight">{report.title}</h3>
                    <span className="text-[6px] font-black text-gray-300 uppercase tracking-widest border border-gray-100 px-2 py-0.5 rounded-full">{report.date}</span>
                 </div>
                 <p className="text-[10px] text-gray-400 font-medium leading-tight mt-1 line-clamp-1">
                    {report.desc}
                 </p>
                 <div className="flex gap-2 mt-3">
                    <button className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm active:bg-[#f42464] active:text-white transition-all">
                       <FileText size={10} /> PDF
                    </button>
                    <button className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm active:bg-gray-900 active:text-white transition-all">
                       <Download size={10} /> CSV
                    </button>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Mini Insight */}
      <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
         <span className="bg-[#f42464] px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Insight</span>
         <h2 className="text-lg font-black font-condensed tracking-tighter uppercase leading-none">Annual Projection</h2>
         <p className="text-gray-400 text-[10px] font-medium leading-relaxed">
           Analysis of spending patterns and winning ratios for 2024.
         </p>
         <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
            Access <ArrowRight size={14} />
         </button>
      </div>
    </div>
  );
};

export default AdminReports;
