
import React from 'react';
import { ShoppingCart, Menu as MenuIcon, X, UserCircle, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, isAdmin }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        className={`uppercase text-[10px] font-extrabold tracking-[0.2em] transition-colors px-4 py-2 rounded-full ${isActive('/') ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'}`}
      >
        Home
      </Link>
      <Link 
        to="/menu" 
        className={`uppercase text-[10px] font-extrabold tracking-[0.2em] transition-colors px-4 py-2 rounded-full ${isActive('/menu') ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'}`}
      >
        Menu
      </Link>
      <Link 
        to="/cart" 
        className={`uppercase text-[10px] font-extrabold tracking-[0.2em] transition-colors px-4 py-2 rounded-full ${isActive('/cart') ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'}`}
      >
        Cart
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
      {/* Logo Area */}
      <div className="pointer-events-auto">
        <Link to="/" className="flex flex-col group">
          <div className="bg-gradient-to-br from-[#E139B3] to-[#69298C] px-3 py-1 rounded-sm shadow-lg">
            <span className="text-white text-xl font-black tracking-tighter leading-none italic">DIPTO</span>
          </div>
        </Link>
      </div>

      {/* Center Nav Pill */}
      <div className="hidden md:flex items-center gap-2 bg-white/40 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/40 pointer-events-auto shadow-sm">
        <NavLinks />
      </div>

      {/* Right Area: Login & Cart */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {isAdmin ? (
          <Link 
            to="/admin" 
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full transition-all border border-orange-400 shadow-xl shadow-orange-500/20 hover:scale-105"
          >
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Admin Portal</span>
          </Link>
        ) : (
          <Link 
            to="/login" 
            className="hidden sm:flex items-center gap-2 bg-white/60 hover:bg-white text-slate-900 px-5 py-2.5 rounded-full transition-all border border-white shadow-sm group"
          >
            <UserCircle size={20} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest">Login</span>
          </Link>
        )}

        {!isAdmin && (
          <Link 
            to="/cart" 
            className="relative bg-slate-900 text-white p-3.5 rounded-full hover:bg-slate-800 transition-all hover:scale-110 active:scale-90 shadow-xl"
          >
            <ShoppingCart size={22} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#E8E6E1] animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </Link>
        )}
        
        <button 
          className="md:hidden bg-white/60 p-3 rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center gap-8 pointer-events-auto">
          <button 
            className="absolute top-8 right-8 p-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center gap-10" onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/" className="text-4xl font-serif font-bold italic">Home</Link>
            <Link to="/menu" className="text-4xl font-serif font-bold italic">Menu</Link>
            <Link to="/cart" className="text-4xl font-serif font-bold italic">Cart</Link>
            {isAdmin ? (
              <Link to="/admin" className="text-2xl font-black uppercase tracking-widest text-orange-500">Admin Portal</Link>
            ) : (
              <Link to="/login" className="text-2xl font-black uppercase tracking-widest text-orange-500">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
