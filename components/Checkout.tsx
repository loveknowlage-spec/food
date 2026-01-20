
import React, { useState } from 'react';
import { ShieldCheck, CreditCard, MapPin, ChevronLeft, CheckCircle2, Loader2, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onClearCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const delivery = items.length > 0 ? 5.00 : 0;
  const total = subtotal + tax + delivery;

  const handlePayment = () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onClearCart();
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center pt-32">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle2 size={64} className="text-green-500" />
        </div>
        <h2 className="text-5xl font-serif font-bold italic mb-4">Payment Successful!</h2>
        <p className="text-slate-500 mb-10 max-w-sm text-lg">Your order has been placed successfully and our chefs are already preparing your meal. See you soon!</p>
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            <Link to="/" className="w-full bg-slate-900 text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-orange-500 transition-all">
              Go to Home
            </Link>
            <Link to="/menu" className="w-full border-2 border-slate-900 text-slate-900 py-5 rounded-full font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
              Order More
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Link to="/cart" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest mb-12 transition-colors">
        <ChevronLeft size={16} />
        Back to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-12">
          {/* Section 1: Delivery Details */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-orange-100 text-orange-500 p-3.5 rounded-2xl shadow-sm">
                <MapPin size={24} />
              </div>
              <h2 className="text-4xl font-serif font-bold italic">Delivery Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Name</label>
                <input type="text" placeholder="John Doe" className="bg-white/40 border border-white/60 px-6 py-4 rounded-2xl outline-none focus:border-orange-200 focus:bg-white transition-all font-bold text-slate-900" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" className="bg-white/40 border border-white/60 px-6 py-4 rounded-2xl outline-none focus:border-orange-200 focus:bg-white transition-all font-bold text-slate-900" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Delivery Address</label>
                <input type="text" placeholder="123 Luxury Lane, Victoria, BC" className="bg-white/40 border border-white/60 px-6 py-4 rounded-2xl outline-none focus:border-orange-200 focus:bg-white transition-all font-bold text-slate-900" />
              </div>
            </div>
          </section>

          {/* Section 2: Payment Method */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-lg">
                <CreditCard size={24} />
              </div>
              <h2 className="text-4xl font-serif font-bold italic text-slate-900">Payment</h2>
            </div>
            
            <div className="bg-white p-10 rounded-[3rem] border border-white/80 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <CreditCard size={120} />
              </div>
              <div className="flex flex-col gap-8 relative z-10">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                  <span className="font-black text-slate-900 uppercase tracking-widest text-xs italic">Credit / Debit Card</span>
                  <div className="flex gap-2">
                    <div className="w-12 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-[8px] font-black">VISA</div>
                    <div className="w-12 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-[8px] font-black text-orange-500">MC</div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card Number</label>
                    <input type="text" placeholder="**** **** **** 4242" className="bg-slate-50/50 px-6 py-4 rounded-2xl outline-none font-mono font-bold text-slate-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="bg-slate-50/50 px-6 py-4 rounded-2xl outline-none font-mono font-bold text-slate-900" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CVV</label>
                      <input type="text" placeholder="***" className="bg-slate-50/50 px-6 py-4 rounded-2xl outline-none font-mono font-bold text-slate-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div>
          <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-white/80 sticky top-32 overflow-hidden">
            {/* Background elements for aesthetic */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
            
            <h3 className="text-3xl font-serif font-bold italic mb-10 relative z-10">Final Order</h3>
            <div className="flex flex-col gap-6 mb-12 relative z-10">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-[10px] font-black text-slate-900 group-hover:bg-orange-500 group-hover:text-white transition-colors border border-slate-100">
                      {item.quantity}x
                    </div>
                    <span className="font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="font-black text-slate-400 group-hover:text-slate-900 transition-colors">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {items.length === 0 && <p className="text-slate-400 italic">No items in order.</p>}
            </div>
            
            <div className="h-px bg-slate-50 my-8"></div>
            
            <div className="flex flex-col gap-4 mb-10 relative z-10">
               <div className="flex justify-between text-slate-400 font-black uppercase text-[10px] tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-slate-400 font-black uppercase text-[10px] tracking-widest">
                  <span>Delivery</span>
                  <span className="text-slate-900">${delivery.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-end mt-4">
                  <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Total Amount</span>
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">${total.toFixed(2)}</span>
               </div>
            </div>

            <button 
              disabled={isProcessing || items.length === 0}
              onClick={handlePayment}
              className="w-full relative bg-slate-900 text-white py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs transition-all hover:bg-orange-500 hover:shadow-2xl shadow-slate-900/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <PackageCheck size={20} className="group-hover:translate-y-[-2px] transition-transform" />
                  Pay & Complete Order
                </div>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 mt-8 text-slate-300">
               <ShieldCheck size={16} />
               <span className="text-[9px] font-black uppercase tracking-widest">SSL Secure & Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
