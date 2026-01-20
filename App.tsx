
import React, { useState, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { MenuItem, CartItem } from './types';

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Internal wrapper to use navigate
const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const addToCart = useCallback((item: MenuItem, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleAdminLogin = () => setIsAdmin(true);
  const handleAdminLogout = () => setIsAdmin(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-500 selection:text-white">
      <ScrollToTop />
      {!isLoginPage && !isAdminPage && <Navbar cartCount={cartCount} isAdmin={isAdmin} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Menu onAddToCart={(item) => addToCart(item, 1)} />
              
              {/* Reservation Section */}
              <div className="py-32 bg-white/40 text-center px-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-100 to-transparent"></div>
                <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Experience Luxury</span>
                <h2 className="text-7xl font-serif font-bold italic mb-12 text-slate-900 leading-tight">Want to Reserve <br /> <span className="text-orange-500">a table?</span></h2>
                <button className="bg-slate-900 text-white px-14 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all transform hover:scale-110 shadow-2xl active:scale-95">
                  Contact us Now
                </button>
              </div>

              {/* Catering Section */}
              <section className="py-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20 overflow-hidden">
                 <div className="relative w-full max-w-lg group">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-orange-100 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600" 
                      className="relative z-10 w-full rounded-[4rem] border-[12px] border-white shadow-2xl transition-transform duration-700 group-hover:rotate-2 group-hover:scale-105" 
                      alt="Catering Service" 
                    />
                    <div className="absolute -bottom-10 -right-10 bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white z-20 hidden md:block group-hover:-translate-y-2 transition-transform duration-500">
                       <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">Professional</span>
                       <div className="text-3xl font-serif font-bold italic">In-home Catering</div>
                    </div>
                 </div>
                 <div className="flex-1 max-w-xl text-center lg:text-left">
                    <h2 className="text-6xl font-serif font-bold italic mb-10 leading-[1.1] text-slate-900">
                      Our experts & passionate chefs provide in-home <span className="text-orange-500">catering.</span>
                    </h2>
                    <p className="text-slate-500 mb-12 text-xl leading-relaxed">
                      Bring the restaurant experience to your dining room. Our chefs use the finest seasonal ingredients to create unforgettable memories for your private events.
                    </p>
                    <button className="group relative border-2 border-slate-900 text-slate-900 px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 hover:text-white transition-all overflow-hidden">
                      <span className="relative z-10">Learn More</span>
                    </button>
                 </div>
              </section>
            </>
          } />
          <Route path="/menu" element={<Menu onAddToCart={(item) => addToCart(item, 1)} />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart items={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout items={cart} onClearCart={clearCart} />} />
          <Route path="/login" element={<Login onAdminLogin={handleAdminLogin} />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel onLogout={handleAdminLogout} /> : <Login onAdminLogin={handleAdminLogin} />} />
        </Routes>
      </main>
      
      {!isLoginPage && !isAdminPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
