import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { Gavel, Info } from 'lucide-react';

const RulesPage = () => {
  return (
    <PageWrapper title="RULES">
      <div className="p-4">
        <div className="jackpot-card !border-brand-red/30 shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-red/10 pb-4">
            <div className="bg-brand-red/10 p-2 rounded-lg">
                <Gavel className="text-brand-red" size={24} />
            </div>
            <h2 className="text-2xl font-black text-brand-red font-condensed tracking-tight uppercase">Game Rules</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 font-medium">
            <div className="flex gap-4 items-start">
               <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0">1</span>
               <p>Select your preferred lottery category from the dashboard (Dear 3D or Kerala 4D).</p>
            </div>
            <div className="flex gap-4 items-start">
               <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0">2</span>
               <p>Enter your lucky numbers manually or use the <span className="text-brand-red font-bold underline">Random</span> button.</p>
            </div>
            <div className="flex gap-4 items-start">
               <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0">3</span>
               <p>Choose your Board (A, B, C or ALL) and specify the quantity of tickets.</p>
            </div>
            <div className="flex gap-4 items-start">
               <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0">4</span>
               <p>Add your selections to the entry list and proceed to checkout.</p>
            </div>
            <div className="flex gap-4 items-start">
               <span className="bg-brand-red text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0">5</span>
               <p>Confirm your payment for the selected tickets to participate.</p>
            </div>
          </div>

          <div className="mt-8 bg-brand-red/5 border border-brand-red/20 rounded-xl p-4 flex gap-3">
             <Info className="text-brand-red shrink-0" size={20} />
             <p className="text-sm font-black text-brand-red italic">
               CRITICAL NOTE: Booking closes strictly 15 minutes before the official result time. Any entries after this window will be rejected.
             </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RulesPage;
