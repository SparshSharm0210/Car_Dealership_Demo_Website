import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Send, Award, CheckCircle2, Star } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to Supreet Motors VIP Private Insider');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#040507] border-t border-white/10 pt-16 pb-8 text-slate-400 font-sans">
      <div className="container mx-auto px-4">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">150-Point Certified</h4>
              <p className="text-xs text-slate-400">Rigorous diagnostic audit & original paint depth verification.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">1-Year Warranty Included</h4>
              <p className="text-xs text-slate-400">Comprehensive engine, transmission & roadside assistance.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Clean NOC & RTO Transfer</h4>
              <p className="text-xs text-slate-400">Hassle-free ownership transfer for DL, HR, UP & All India.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Doorstep Inspection</h4>
              <p className="text-xs text-slate-400">White-glove doorstep test drive & vehicle delivery across Delhi NCR.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 via-amber-600 to-yellow-700 p-0.5">
                <div className="w-full h-full bg-[#07080B] rounded-[7px] flex items-center justify-center font-serif text-lg font-bold text-yellow-400">
                  S
                </div>
              </div>
              <div>
                <div className="font-serif text-lg font-extrabold gold-text tracking-wider">
                  SUPREET MOTORS
                </div>
                <div className="text-[9px] text-yellow-400 font-mono flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400" /> 4.6★ Google Verified Used Car Dealer
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Deals in all types of well-maintained and less-driven pre-owned luxury cars. Comprehensive solutions for Sale, Purchase, Finance, Insurance & State RTO transfers.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Shop No. 7, DDA Market, Near Model Town, New Gupta Colony, Kalyan Vihar, Delhi, 110033</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <a href="tel:09811717372" className="hover:text-yellow-400 transition-colors">+91 98117 17372 / 098117 17372</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <a href="mailto:info@supreetmotors.com" className="hover:text-yellow-400 transition-colors">info@supreetmotors.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase mb-4 text-yellow-400">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Home Showcase</button></li>
              <li><button onClick={() => navigateTo('inventory')} className="hover:text-white transition-colors">Delhi Inventory</button></li>
              <li><button onClick={() => navigateTo('inventory')} className="hover:text-white transition-colors">Certified Pre-Owned Cars</button></li>
              <li><button onClick={() => navigateTo('sell')} className="hover:text-white transition-colors">Instant Valuation</button></li>
              <li><button onClick={() => navigateTo('finance')} className="hover:text-white transition-colors">EMI Calculator & Loan</button></li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase mb-4 text-yellow-400">Featured Brands</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigateTo('inventory')} className="hover:text-white transition-colors">Mercedes-Benz E-Class</button></li>
              <li><button onClick={() => navigateTo('inventory')} className="hover:text-white transition-colors">BMW 5 Series & M Sport</button></li>
              <li><button onClick={() => navigateTo('inventory')} className="hover:text-white transition-colors">Audi Q7 & RS Performance</button></li>
              <li><button onClick={() => navigateTo('inventory')} className="hover:text-white transition-colors">Porsche Macan & Taycan</button></li>
              <li><button onClick={() => navigateTo('inventory')} className="hover:text-white transition-colors">Toyota Fortuner Legender</button></li>
            </ul>
          </div>

          {/* Private Insider */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white tracking-wider uppercase mb-4 text-yellow-400">Delhi Insider Alert</h4>
            <p className="text-xs text-slate-400 mb-3">
              Get notified of less-driven luxury car arrivals in Delhi NCR before public listing.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-[#07080B] font-semibold rounded-lg text-xs flex items-center justify-center hover:brightness-110"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[10px] text-slate-500">100% Privacy. Zero spam.</span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Supreet Motors. All Rights Reserved. Model Town & Kalyan Vihar, Delhi 110033.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy'); }} className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service'); }} className="hover:text-slate-300">Terms & Conditions</a>
            <a href="#rto" onClick={(e) => { e.preventDefault(); showToast('RTO Transfer & Compliance'); }} className="hover:text-slate-300">RTO Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
