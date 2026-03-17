import React from 'react';
import { ShoppingCart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper title="My Cart">
      <div className="flex flex-col items-center justify-center p-8 text-center mt-20">
        <div className="w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <ShoppingCart size={48} className="text-brand-red" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight font-condensed mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-[250px]">
          Looks like you haven't added any lucky tickets yet. Start playing now to win big!
        </p>
        <button 
          onClick={() => navigate('/home')}
          className="bg-brand-red text-white px-8 py-4 rounded-2xl font-black text-xl font-condensed tracking-widest uppercase shadow-xl active:scale-95 transition-all"
        >
          Browse Games
        </button>
      </div>
    </PageWrapper>
  );
};

export default CartPage;
