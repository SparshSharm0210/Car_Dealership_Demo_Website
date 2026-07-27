import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CARS } from '../data/cars';
import { TESTIMONIALS, FAQS } from '../data/testimonials';
import { CarCard } from '../components/CarCard';
import { 
  Search, ShieldCheck, Award, Clock, ArrowRight, CheckCircle2, 
  ChevronDown, Star, Sparkles, SlidersHorizontal, Calculator, PhoneCall, Zap, Trophy, Shield 
} from 'lucide-react';

export const Home = () => {
  const { navigateTo, openBookTestDrive, showToast } = useApp();
  
  // Quick Search Bar state in Hero
  const [heroMake, setHeroMake] = useState('All');
  const [heroBody, setHeroBody] = useState('All');
  const [heroMaxPrice, setHeroMaxPrice] = useState(150.00); // in Lakhs

  // FAQ Accordion active state
  const [activeFaq, setActiveFaq] = useState(0);

  const featuredCars = CARS.filter(c => c.featured).slice(0, 6);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigateTo('inventory');
  };

  return (
    <div className="space-y-24 font-sans pb-20">
      {/* 1. Full Screen Ultra-Luxury Hero Section with Shimmer & Floating Glow */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-20">
        {/* Background Dark Studio Supercar Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=90" 
            alt="Supreet Motors Luxury Supercar Studio" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-[#07080B]/70 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.15)_0%,transparent_60%)] pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center space-y-8 max-w-5xl">
          {/* Tagline Pill with Border Glow */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-yellow-500/40 text-yellow-300 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md shadow-2xl animate-fade-in animate-border-glow">
            <Trophy className="w-4 h-4 text-yellow-400 animate-pulse" /> Delhi NCR's Premier Certified Luxury Showroom
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Curated Perfection. <br />
            <span className="gold-text animate-shimmer">Uncompromised Power.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Certified pre-owned Porsche, Mercedes-AMG, BMW M, and exotic supercars in Delhi NCR. Passed through a 150-point perfection audit with white-glove doorstep delivery.
          </p>

          {/* Hero Search Box Widget */}
          <form 
            onSubmit={handleHeroSearch} 
            className="glass-panel rounded-3xl p-5 md:p-6 border border-yellow-500/30 shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 text-left animate-float"
          >
            <div>
              <label className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest block mb-1.5">Select Marque</label>
              <select 
                value={heroMake}
                onChange={(e) => setHeroMake(e.target.value)}
                className="w-full bg-[#0D0E12] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="All">All Luxury Makes</option>
                <option value="Porsche">Porsche Approved</option>
                <option value="Mercedes-Benz">Mercedes-AMG</option>
                <option value="BMW">BMW M Motorsport</option>
                <option value="Audi">Audi RS Performance</option>
                <option value="Toyota">Toyota Fortuner</option>
                <option value="Land Rover">Range Rover</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest block mb-1.5">Body Style</label>
              <select 
                value={heroBody}
                onChange={(e) => setHeroBody(e.target.value)}
                className="w-full bg-[#0D0E12] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="All">All Body Types</option>
                <option value="Coupe">Coupe & Supercar</option>
                <option value="SUV">Luxury SUV</option>
                <option value="Sedan">Sedan & GT</option>
                <option value="Electric">Electric & Hybrid</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest block mb-1.5">
                Max Price (₹{heroMaxPrice} Lakh)
              </label>
              <input 
                type="range"
                min="25.00"
                max="150.00"
                step="5.00"
                value={heroMaxPrice}
                onChange={(e) => setHeroMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400 mt-2"
              />
            </div>

            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full btn-gold text-xs py-3 uppercase tracking-wider font-bold shadow-lg"
              >
                <Search className="w-4 h-4" /> Search Inventory
              </button>
            </div>
          </form>

          {/* Quick Stats counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 max-w-4xl mx-auto">
            <div>
              <div className="font-serif text-3xl font-bold gold-text">500+</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Exotics Delivered</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold gold-text">150-Point</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Diagnostic Perfection</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold gold-text">4.6★</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Google Verified Dealer</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold gold-text">7 Days</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">Money-Back Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Inventory Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">Handpicked Excellence</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mt-1">Featured Showroom Inventory</h2>
          </div>
          <button 
            onClick={() => navigateTo('inventory')}
            className="btn-outline-gold text-xs py-2.5 px-5 flex items-center gap-2 self-start md:self-auto"
          >
            Browse All Inventory ({CARS.length}) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* 3. Why Choose Supreet Motors */}
      <section className="bg-gradient-to-b from-[#0D0E14] via-[#07080B] to-[#0D0E14] py-24 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">The Supreet Standard</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Why Discriminating Buyers Choose Us</h2>
            <p className="text-slate-400 text-sm font-light">
              Deals in all types of well-maintained and less-driven pre-owned luxury vehicles in Delhi NCR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">150-Point Master Audit</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Every vehicle undergoes multi-stage diagnostic testing including paint depth verification, engine compression scans, PDK clutch audits, and computer telemetry scans.
              </p>
              <div className="text-xs text-yellow-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Certified report included with every vehicle
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Bespoke Financing & Lease</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Competitive rates starting at 8.5% p.a. through HDFC Bank, ICICI Bank, Axis Bank, and SBI Auto Loans with flexible tenure up to 84 months.
              </p>
              <button 
                onClick={() => navigateTo('finance')} 
                className="text-xs text-yellow-400 font-semibold flex items-center gap-1 hover:underline"
              >
                Calculate your monthly EMI →
              </button>
            </div>

            <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">White-Glove Doorstep Transport</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Doorstep test drives and enclosed home vehicle delivery. We deliver your dream automobile directly to your residence anywhere across Delhi NCR.
              </p>
              <button 
                onClick={() => openBookTestDrive()} 
                className="text-xs text-yellow-400 font-semibold flex items-center gap-1 hover:underline"
              >
                Book doorstep test drive →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive EMI Calculator Teaser Banner */}
      <section className="container mx-auto px-4">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-yellow-500/30 bg-gradient-to-r from-[#11141E] via-[#161B29] to-[#0D1017] flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="badge-gold">Bespoke Finance Advisory</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Tailored Luxury Car Financing & EMI Calculator</h2>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Calculate your custom monthly installments in Indian Rupees with zero hidden fees and instant pre-qualification.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => navigateTo('finance')}
                className="btn-gold text-xs py-3 px-6"
              >
                <Calculator className="w-4 h-4" /> Open Full EMI Calculator
              </button>
              <button 
                onClick={() => navigateTo('finance')}
                className="btn-outline-gold text-xs py-3 px-6"
              >
                Check Loan Eligibility
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white flex justify-between items-center">
              <span>Quick Monthly Benchmark</span>
              <span className="text-yellow-400 text-xs font-mono">From 8.5% p.a.</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Mercedes-Benz E 220d</span>
                <span className="text-white font-mono font-semibold">₹84,500 / mo</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>BMW 530i M Sport</span>
                <span className="text-white font-mono font-semibold">₹92,800 / mo</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Audi Q7 45 TFSI</span>
                <span className="text-white font-mono font-semibold">₹1,05,000 / mo</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 text-center">
              <span className="text-[11px] text-slate-400">Pre-qualification takes &lt; 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">Google Verified Reviews</span>
          <h2 className="font-serif text-3xl font-bold text-white">Words From Elite Owners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-xs italic leading-relaxed font-light">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-yellow-500/30" />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400">{t.role}</p>
                  <span className="text-[10px] text-yellow-400 font-mono">Purchased: {t.carPurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Sell Your Car CTA Banner */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30 p-8 md:p-14 bg-gradient-to-r from-amber-950/70 via-[#101420] to-[#0A0D14]">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="badge-gold">Instant Cash Buyout</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight">
              Looking to Sell or Trade Your Luxury Vehicle in Delhi?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Get an instant algorithmic market valuation in 60 seconds. We offer same-day bank wire transfers, immediate NOC clearance, and free doorstep pickup.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => navigateTo('sell')}
                className="btn-gold text-xs py-3.5 px-8 font-bold uppercase tracking-wider shadow-xl"
              >
                Get Instant Vehicle Valuation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">Client Inquiries</span>
          <h2 className="font-serif text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-semibold text-sm text-white hover:text-yellow-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-yellow-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fade-in font-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
