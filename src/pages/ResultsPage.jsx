import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Trophy, Calendar } from 'lucide-react';

const ResultsPage = () => {
  const results = [
    { date: '16/03/2026', time: '08:00 PM', name: 'DEARLOT', nums: ['8', '4', '2'] },
    { date: '16/03/2026', time: '06:00 PM', name: 'DEARLOT', nums: ['9', '5', '3'] },
    { date: '16/03/2026', time: '03:00 PM', name: 'KERELALOT', nums: ['6', '6', '9', '7'] },
    { date: '15/03/2026', time: '08:00 PM', name: 'DEARLOT', nums: ['5', '0', '3'] },
  ];

  return (
    <PageWrapper title="DAILY RESULTS">
      <div className="bg-white min-h-screen">
        <div className="px-4 pt-4 pb-2">
           <p className="text-brand-red font-black text-sm flex items-center gap-1 uppercase tracking-tighter">
             👤 Guest Account View
           </p>
        </div>

        <div className="p-4 space-y-6">
          {results.map((r, i) => (
            <div key={i} className="border-2 border-brand-red/30 rounded-2xl overflow-hidden shadow-md">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-brand-red/10">
                    <td className="w-1/3 bg-gray-50 p-3 text-xs font-black text-gray-500 uppercase tracking-tight">Date</td>
                    <td className="p-3 text-sm font-bold text-gray-800">{r.date}</td>
                  </tr>
                  <tr className="border-b border-brand-red/10">
                    <td className="w-1/3 bg-gray-50 p-3 text-xs font-black text-gray-500 uppercase tracking-tight">Time</td>
                    <td className="p-3 text-sm font-bold text-gray-800">{r.time}</td>
                  </tr>
                  <tr className="border-b border-brand-red/10">
                    <td className="w-1/3 bg-gray-50 p-3 text-xs font-black text-gray-500 uppercase tracking-tight">Lot Name</td>
                    <td className="p-3 text-sm font-black text-brand-red uppercase">{r.name}</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 bg-gray-50 p-3 text-xs font-black text-gray-500 uppercase tracking-tight">Result</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {r.nums.map((n, j) => (
                          <div key={j} className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white font-black shadow-sm">
                            {n}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResultsPage;
