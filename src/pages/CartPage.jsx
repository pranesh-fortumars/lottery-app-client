import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper title="DIAMOND CART">
      <div className="bg-white min-h-screen p-4 flex flex-col items-center">
        {/* Your Cart Header Button - Exactly Red like screenshot */}
        <div className="w-full max-w-[420px] mb-5">
          <button className="w-full bg-[#ff004d] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-black text-2xl shadow-[0_4px_10px_rgba(255,0,77,0.3)]">
            <ShoppingCart size={28} /> Your Cart
          </button>
        </div>

        {/* Invoice Table Style - Exact matching borders */}
        <div className="w-full max-w-[420px] border-[1.5px] border-red-600 text-left overflow-hidden bg-white">
          {/* Header Info */}
          <div className="flex border-b-[1.5px] border-red-600">
             <div className="flex-grow p-1.5 border-r-[1.5px] border-red-600 font-serif text-[1.1rem]">Name: Guest</div>
             <div className="w-[30%] p-1.5 font-serif text-[1.1rem] text-right">Date:</div>
          </div>
          
          {/* Column Headers */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_0.5fr_1.2fr] border-b-[1.5px] border-red-600 text-center font-serif text-[1.05rem]">
             <div className="py-2 border-r-[1.5px] border-red-600">Lot Details</div>
             <div className="py-2 border-r-[1.5px] border-red-600">Number</div>
             <div className="py-2 border-r-[1.5px] border-red-600">Unit</div>
             <div className="py-2 border-r-[1.5px] border-red-600">₹</div>
             <div className="py-2">Amount ₹</div>
          </div>

          {/* Empty Space for Entries */}
          <div className="h-10 border-b-[1.5px] border-red-600 bg-gray-50/10"></div>

          {/* Total Row */}
          <div className="grid grid-cols-[3.5fr_1.2fr] border-b-[1.5px] border-red-600 font-serif text-[1.1rem] font-bold">
             <div className="py-2 text-center border-r-[1.5px] border-red-600 tracking-tight">Total Amount:</div>
             <div className="py-2 pr-3 text-right">0.00</div>
          </div>

          {/* Footer Note */}
          <div className="p-2 text-[0.85rem] font-serif italic text-gray-900 bg-white">
             ** Some items are remove automatically if draw time expired.
          </div>
        </div>

        {/* Bottom Actions - Specific Red shade and text */}
        <div className="w-full max-w-[420px] grid grid-cols-2 gap-3 mt-10">
           <button className="bg-[#ff004d] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xl shadow-lg active:scale-95 transition-all">
              <ShoppingCart size={22} strokeWidth={3} /> Confirm Pay
           </button>
           <button className="bg-[#ff004d] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xl shadow-lg active:scale-95 transition-all">
              <ShoppingCart size={22} strokeWidth={3} /> Clear Cart
           </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CartPage;
