
import React from 'react';
import { Search, Star, ShoppingBag, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS } from '../constants';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = React.useState<Category>('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories: Category[] = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const goToDetail = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">From & Tasty</span>
        <h2 className="text-6xl font-serif font-bold italic mb-12">Our Menu</h2>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 p-1.5 bg-white/30 backdrop-blur-md rounded-full overflow-x-auto max-w-full no-scrollbar border border-white/50 shadow-sm">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-slate-900 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/40 backdrop-blur-md pl-16 pr-6 py-4 rounded-full outline-none border border-transparent focus:border-white focus:bg-white transition-all text-sm font-medium shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredItems.map(item => (
          <div key={item.id} className="group relative flex flex-col pt-16">
             {/* Circular Image Header */}
             <div 
               onClick={() => goToDetail(item.id)}
               className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-44 h-44 transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2 cursor-pointer"
             >
                <div className="relative w-full h-full p-2 bg-white rounded-full shadow-2xl border border-white/50">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover rounded-full"
                    alt={item.name} 
                  />
                  <div className="absolute top-4 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow-xl border border-slate-50">
                     <Star size={10} fill="#f97316" className="text-orange-500" />
                     <span className="text-[10px] font-black text-slate-900">{item.rating}</span>
                  </div>
                </div>
             </div>

             {/* Content Card */}
             <div className="bg-white/40 hover:bg-white/70 backdrop-blur-sm transition-all p-8 rounded-[3rem] mt-12 pt-28 flex flex-col h-full border border-white/60 shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500">
                <h3 className="text-center font-extrabold text-xl text-slate-900 mb-2 leading-tight">{item.name}</h3>
                <p className="text-center text-slate-400 text-[11px] mb-6 flex-grow leading-relaxed line-clamp-2 px-2">
                  {item.description}
                </p>
                
                <div className="flex flex-col items-center gap-4 w-full">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">${item.price.toFixed(2)}</span>
                  
                  <div className="flex flex-col gap-2.5 w-full">
                    <button 
                      onClick={() => goToDetail(item.id)}
                      className="w-full bg-orange-500 text-white py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all hover:bg-orange-600 hover:shadow-lg active:scale-95"
                    >
                      <Zap size={14} fill="currentColor" />
                      Buy Now
                    </button>
                    
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="w-full bg-slate-900 text-white py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
                    >
                      Add to Cart
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-medium">
          No delicious dishes found...
        </div>
      )}
    </section>
  );
};

export default Menu;
