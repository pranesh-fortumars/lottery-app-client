import React from 'react';
import PageWrapper from '../components/PageWrapper';

const ResultsPage = () => {
  const results = [
    { date: '05/03/2026', time: '08:00 PM', name: 'DEARLOT', nums: ['5', '2', '7'] },
    { date: '05/03/2026', time: '06:00 PM', name: 'DEARLOT', nums: ['6', '1', '0'] },
    { date: '05/03/2026', time: '03:00 PM', name: 'KERELALOT', nums: ['5', '8', '8', '5'] },
    { date: '05/03/2026', time: '01:00 PM', name: 'DEARLOT', nums: ['3', '0', '9'] },
  ];

  return (
    <PageWrapper title="DAILY RESULTS">
      <div className="bg-white min-h-screen p-4 flex flex-col items-center">
        {results.map((r, i) => (
          <div key={i} className="mb-4 w-full max-w-sm">
            <table className="w-full border-collapse border border-red-600 text-left">
              <tbody>
                <tr className="border border-red-600">
                  <td className="w-[35%] p-1.5 border border-red-600 font-serif text-[1.1rem]">Date</td>
                  <td className="p-1.5 border border-red-600 font-serif text-[1.1rem]">{r.date}</td>
                </tr>
                <tr className="border border-red-600">
                  <td className="p-1.5 border border-red-600 font-serif text-[1.1rem]">Time</td>
                  <td className="p-1.5 border border-red-600 font-serif text-[1.1rem]">{r.time}</td>
                </tr>
                <tr className="border border-red-600">
                  <td className="p-1.5 border border-red-600 font-serif text-[1.1rem]">Lot Name</td>
                  <td className="p-1.5 border border-red-600 font-serif text-[1.1rem] uppercase">{r.name}</td>
                </tr>
                <tr className="border border-red-600">
                  <td className="p-1.5 border border-red-600 font-serif text-[1.1rem]">Result Number</td>
                  <td className="p-1.5 border border-red-600">
                    <div className="flex gap-2.5">
                      {r.nums.map((n, j) => (
                        <div key={j} className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
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
        <div className="mt-8 text-center opacity-30">
           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 italic">Results verified by board</p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ResultsPage;
