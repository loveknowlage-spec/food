
import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="flex flex-col gap-8">
          <Link to="/" className="flex flex-col">
            <span className="dipto-logo text-3xl tracking-tighter leading-none">DIPTO</span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed pr-8">
            Experience culinary excellence in the heart of the city since 1993. Authentic flavors, modern twist.
          </p>
          <div className="flex gap-4">
             {[Instagram, Facebook, Twitter].map((Icon, i) => (
               <a key={i} href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                 <Icon size={20} />
               </a>
             ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Our Services</h4>
          <nav className="flex flex-col gap-4">
            {['Pricing', 'Tracking', 'Resource Bug', 'Terms of services'].map(link => (
              <a key={link} href="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">{link}</a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Our Company</h4>
          <nav className="flex flex-col gap-4">
            {['Reporting', 'Get in Touch', 'Management'].map(link => (
              <a key={link} href="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">{link}</a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-8">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Address</h4>
          <div className="flex flex-col gap-4 text-sm text-slate-500 font-medium">
            <p>123 King St, Victoria, BC</p>
            <p>888-123-45679</p>
            <p>info@example.com</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <p>&copy; 2026 DIPTO RESTAURANT & BAR. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">License</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
