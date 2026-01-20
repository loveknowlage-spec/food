
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingBag, Zap, Minus, Plus, ShieldCheck, Clock, Utensils } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';

interface ProductDetailProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const item = MENU_ITEMS.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32">
        <h2 className="text-4xl font-serif font-bold mb-4">Item Not Found</h2>
        <Link to="/menu" className="text-orange-500 font-bold uppercase tracking-widest underline">Back to Menu</Link>
      </div>
    );
  }

  const handleUpdateQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleCheckoutNow = () => {
    onAddToCart(item, quantity);
    navigate('/checkout');
  };

  const handleAddOnly = () => {
    onAddToCart(item, quantity);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Link to="/menu" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest mb-12 transition-colors inline-flex">
        <ChevronLeft size={16} />
        Back to Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Visual Section */}
        <div className="relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-orange-100/50 rounded-full blur-3xl opacity-40"></div>
          <div className="relative z-10 p-4 bg-white rounded-[4rem] shadow-2xl border border-white/80">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full aspect-square object-cover rounded-[3.5rem] shadow-inner transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 flex flex-col items-center gap-1">
               <Star size={24} fill="#f97316" className="text-orange-500" />
               <span className="text-lg font-black">{item.rating}</span>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-6">
             <div className="bg-white/40 p-6 rounded-3xl border border-white flex flex-col items-center gap-2 text-center">
                <Clock className="text-orange-500" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</span>
                <span className="text-sm font-bold">15-20 min</span>
             </div>
             <div className="bg-white/40 p-6 rounded-3xl border border-white flex flex-col items-center gap-2 text-center">
                <Utensils className="text-slate-900" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Serving</span>
                <span className="text-sm font-bold">1 Person</span>
             </div>
             <div className="bg-white/40 p-6 rounded-3xl border border-white flex flex-col items-center gap-2 text-center">
                <ShieldCheck className="text-green-500" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quality</span>
                <span className="text-sm font-bold">Chef's Pick</span>
             </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">{item.category}</span>
          <h1 className="text-6xl md:text-7xl font-serif font-bold italic mb-6 leading-tight">{item.name}</h1>
          <p className="text-slate-500 text-xl leading-relaxed mb-10 max-w-xl">
            {item.description} Our chefs prepare this dish with only the freshest locally sourced ingredients to ensure an authentic and memorable flavor profile.
          </p>

          <div className="flex items-center gap-8 mb-12">
            <span className="text-5xl font-black text-slate-900 tracking-tighter">${item.price.toFixed(2)}</span>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex items-center gap-4 bg-white/60 px-4 py-2 rounded-full border border-white shadow-sm">
               <button 
                 onClick={() => handleUpdateQuantity(-1)}
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white transition-all"
               >
                 <Minus size={16} />
               </button>
               <span className="w-8 text-center font-black text-xl">{quantity}</span>
               <button 
                 onClick={() => handleUpdateQuantity(1)}
                 className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white transition-all"
               >
                 <Plus size={16} />
               </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mb-8">
            <button 
              onClick={handleCheckoutNow}
              className="flex-1 bg-orange-500 text-white py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-orange-600 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-500/20"
            >
              <Zap size={20} fill="currentColor" />
              Checkout Now
            </button>
            <button 
              onClick={handleAddOnly}
              className="flex-1 bg-slate-900 text-white py-6 rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-slate-800 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
             <ShieldCheck size={18} />
             <span className="text-[10px] font-black uppercase tracking-widest">Guaranteed Fresh Delivery Within 45 Minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
