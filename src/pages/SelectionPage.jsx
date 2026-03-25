import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { ScrollText, Gavel, ShoppingCart, Lock, LayoutGrid, Zap } from 'lucide-react';
import BettingCard from '../components/BettingCard';
import { useCart } from '../context/CartContext';

const SelectionPage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const { cart } = useCart();
  
  const isKerala = gameId === '4';
  const getGameName = () => isKerala ? 'KERALA STATE' : 'DEAR LOTTERY';
  
  const gameTimes = {
    '1': '01:00 PM',
    '2': '06:00 PM',
    '3': '08:00 PM',
    '4': '03:00 PM'
  };

  const isClosed = (drawTime) => {
    if (!drawTime) return false;
    const now = new Date();
    const parts = drawTime.match(/(\d+)[.:](\d+)\s*(AM|PM)/);
    if (!parts) return true;
    
    let hours = parseInt(parts[1]);
    const minutes = parseInt(parts[2]);
    const ampm = parts[3];
    
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    const drawDate = new Date();
    drawDate.setHours(hours, minutes, 0, 0);
    
    const diffInMinutes = (drawDate - now) / (1000 * 60);
    return diffInMinutes <= 15;
  };

  const closed = isClosed(gameTimes[gameId]);

  const abcTiers = [
    { price: "12.00", win: "₹ 6250, 250, 25" },
    { price: "28.00", win: "₹ 15000, 500, 50" },
    { price: "30.00", win: "₹ 17500, 500, 50" },
    { price: "55.00", win: "₹ 30000, 1000, 100" },
    { price: "60.00", win: "₹ 35000, 1000, 100" },
  ];

  const xabcTiers = [
    { price: "20.00", win: "₹ 100000" },
    { price: "50.00", win: "₹ 250000, 5000, 500, 50" },
    { price: "100.00", win: "₹ 500000, 10000, 1000, 100" },
  ];

  return (
    <PageWrapper title={getGameName()} showNav={true}>
      <div className="bg-white min-h-screen pb-32">
        {/* Draw Status Banner */}
        <div className={`py-4 px-6 text-center mb-6 relative overflow-hidden transition-all duration-500 ${closed ? 'bg-red-600' : 'bg-[#ff004d]/5'}`}>
           {!closed && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
           <p className={`font-black uppercase tracking-widest text-[10px] relative z-10 ${closed ? 'text-white' : 'text-[#ff004d]'}`}>
             {closed ? 'BOOKING CLOSED FOR THIS DRAW' : `LIVE: Booking ends at ${new Date(new Date().setMinutes(new Date().getMinutes() + 15)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
           </p>
        </div>

        <div className={`p-4 ${closed ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
          {/* Quick Actions */}
          <div className="flex gap-3 mb-10">
             <button onClick={() => navigate('/results')} className="flex-1 bg-gray-900 text-white h-14 rounded-2xl flex items-center justify-center gap-2 font-black shadow-xl uppercase tracking-widest text-[10px] active:scale-95 transition-all">
                <ScrollText size={18} /> Market Results
             </button>
             <button className="flex-1 bg-white border-2 border-gray-900 text-gray-900 h-14 rounded-2xl flex items-center justify-center gap-2 font-black shadow-md uppercase tracking-widest text-[10px] active:scale-95 transition-all">
                <Zap size={18} className="text-[#ff004d]" /> Hot Numbers
             </button>
          </div>

          {/* 1D FORMATS */}
          <div className="mb-10">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-2 border-l-4 border-[#ff004d] pl-3">1D Format Slots</h4>
            <div className="grid grid-cols-1 gap-1">
              <BettingCard title="1D Slot A" winText="₹ 100" price="11.00" digits={1} gameName={getGameName()} board="A" />
              <BettingCard title="1D Slot B" winText="₹ 100" price="11.00" digits={1} gameName={getGameName()} board="B" />
              <BettingCard title="1D Slot C" winText="₹ 100" price="11.00" digits={1} gameName={getGameName()} board="C" />
            </div>
          </div>

          {/* 2D FORMATS */}
          <div className="mb-10">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-2 border-l-4 border-amber-500 pl-3">2D Format Slots</h4>
            <div className="grid grid-cols-1 gap-1">
              <BettingCard title="2D Slot AB" winText="₹ 1000" price="11.00" digits={2} gameName={getGameName()} board="AB" />
              <BettingCard title="2D Slot BC" winText="₹ 1000" price="11.00" digits={2} gameName={getGameName()} board="BC" />
              <BettingCard title="2D Slot AC" winText="₹ 1000" price="11.00" digits={2} gameName={getGameName()} board="AC" />
            </div>
          </div>

          {/* 3D FORMAT */}
          <div className="mb-10">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-2 border-l-4 border-emerald-500 pl-3">3D Format Slots</h4>
            <BettingCard 
              title="3D Slot ABC" 
              digits={3} 
              gameName={getGameName()} 
              priceOptions={abcTiers}
              board="ABC"
            />
          </div>

          {/* 4D FORMAT */}
          <div className="mb-6">
            <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-2 border-l-4 border-purple-500 pl-3">4D Format Slots</h4>
            <BettingCard 
              title="4D Slot XABC" 
              digits={4} 
              gameName={getGameName()} 
              priceOptions={xabcTiers}
              board="XABC"
            />
          </div>
        </div>

        {/* Floating Cart Button */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-50">
           <button 
             onClick={() => navigate('/cart')}
             disabled={closed || cart.length === 0}
             className={`w-full h-16 rounded-2xl flex items-center justify-between px-8 font-black shadow-2xl transition-all active:scale-95 ${
               closed || cart.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#ff004d] text-white'
             }`}
           >
             <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-[#ff004d] w-5 h-5 rounded-full text-[9px] flex items-center justify-center border border-current font-black animate-bounce">{cart.length}</span>
                  )}
                </div>
                <span className="uppercase tracking-widest text-[11px]">Review Cart</span>
             </div>
             <div className="text-[11px] uppercase tracking-tighter">
                Proceed to Pay <ShoppingCart size={14} className="inline ml-1" />
             </div>
           </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SelectionPage;
