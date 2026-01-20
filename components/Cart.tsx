
import React from 'react';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { Link } from 'react-router-dom';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const delivery = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + tax + delivery;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mb-8">
          <Trash2 size={48} className="text-slate-400" />
        </div>
        <h2 className="text-4xl font-serif font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Let's explore our delicious menu!</p>
        <Link to="/menu" className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-5xl font-serif font-bold mb-12 italic">Your Cart <span className="text-slate-300 font-normal">({items.length})</span></h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white/60 p-6 rounded-[2.5rem] flex items-center gap-6 shadow-sm border border-white/50">
              <img src={item.image} className="w-24 h-24 object-cover rounded-2xl shadow-md" alt={item.name} />
              <div className="flex-grow">
                <h4 className="font-bold text-lg">{item.name}</h4>
                <p className="text-slate-400 text-sm">{item.category}</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1 border border-slate-200">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1.5 hover:bg-white rounded-full transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1.5 hover:bg-white rounded-full transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                 </div>
                 <div className="w-24 text-right font-bold text-xl">
                    ${(item.price * item.quantity).toFixed(2)}
                 </div>
                 <button 
                   onClick={() => onRemove(item.id)}
                   className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                 >
                   <Trash2 size={20} />
                 </button>
              </div>
            </div>
          ))}

          <div className="mt-8 flex items-center justify-between p-8 bg-white/30 rounded-[2.5rem] border border-dashed border-slate-300">
             <div className="flex flex-col">
               <span className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Promo Code</span>
               <input type="text" placeholder="Enter coupon code" className="bg-transparent outline-none font-bold text-lg" />
             </div>
             <button className="bg-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Apply</button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-white sticky top-32">
            <h3 className="text-2xl font-bold mb-8">Order Summary</h3>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Tax (10%)</span>
                <span className="text-slate-900">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Delivery Fee</span>
                <span className="text-slate-900">${delivery.toFixed(2)}</span>
              </div>
              <div className="h-px bg-slate-100 my-2"></div>
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="w-full bg-slate-900 text-white py-5 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:bg-orange-500 hover:shadow-lg shadow-slate-900/20 active:scale-[0.98]"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </Link>
            
            <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">Free delivery on orders over $100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
