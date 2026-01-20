
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden px-6">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <h1 className="text-7xl lg:text-8xl font-serif font-bold leading-tight">
            Delicious Food <br />
            <span className="italic font-normal">is</span> Waiting <br />
            For You
          </h1>
          
          <p className="text-slate-500 max-w-lg mx-auto lg:mx-0 text-lg leading-relaxed">
            Experience authentic flavors with our curated seasonal menu. Every dish is a story of quality and passion.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
            <Link 
              to="/menu" 
              className="group flex items-center gap-4 bg-slate-900 text-white pl-8 pr-4 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-slate-800 hover:shadow-xl"
            >
              View Menu
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-orange-500 transition-colors">
                <ArrowRight size={20} />
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/40/40?random=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Customer" />
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex text-orange-500">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">5k+ reviews</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 justify-center lg:justify-start">
             <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
               <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Apple_logo_black.svg" className="w-6 h-6" alt="App Store" />
             </button>
             <button className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
               <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Play_Store_badge_EN.svg" className="h-6" alt="Play Store" />
             </button>
          </div>
        </div>

        <div className="relative">
          {/* Main Large Bowl */}
          <div className="relative z-10 w-full max-w-[500px] mx-auto transition-transform hover:scale-105 duration-700">
            <div className="absolute -top-10 -right-10 bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/50 z-20 hidden md:block">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fresh Salad</span>
               <div className="text-2xl font-bold mt-1">$25.89</div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-auto rounded-full shadow-2xl border-[12px] border-white/30"
              alt="Healthy Bowl"
            />
          </div>

          {/* Floating Mac & Cheese */}
          <div className="absolute -left-10 top-1/4 w-44 md:w-56 glass p-3 md:p-5 rounded-[2.5rem] shadow-2xl floating z-20">
            <img 
              src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=200" 
              className="w-full aspect-square object-cover rounded-[1.8rem]" 
              alt="Mac & Cheese"
            />
            <div className="mt-4 px-2">
              <h4 className="font-bold text-sm">Truffle Mac & Cheese</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-slate-400">$18.50</span>
                <button className="bg-slate-900 text-white p-2 rounded-xl text-xs font-bold">+</button>
              </div>
            </div>
          </div>

          {/* Floating Salmon */}
          <div className="absolute -right-6 bottom-10 w-44 md:w-56 glass p-3 md:p-5 rounded-[2.5rem] shadow-2xl floating-delayed z-20">
            <img 
              src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=200" 
              className="w-full aspect-square object-cover rounded-[1.8rem]" 
              alt="Salmon"
            />
            <div className="mt-4 px-2">
              <h4 className="font-bold text-sm">Grilled Salmon Fillet</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-slate-400">$24.00</span>
                <button className="bg-slate-900 text-white p-2 rounded-xl text-xs font-bold">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-1 h-12 bg-slate-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero;
