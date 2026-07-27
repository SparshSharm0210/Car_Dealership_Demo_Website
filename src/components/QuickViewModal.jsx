import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Heart, Scale, Calendar, ArrowRight, Zap, Gauge, Fuel } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickViewCar, setQuickViewCar, navigateTo, wishlist, toggleWishlist, openBookTestDrive } = useApp();
  const [activeImg, setActiveImg] = useState(0);

  if (!quickViewCar) return null;

  const isWishlisted = wishlist.includes(quickViewCar.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-4xl glass-panel rounded-3xl border border-yellow-500/30 overflow-hidden shadow-2xl relative flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewCar(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-slate-950/60 flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-4">
            <img 
              src={quickViewCar.images[activeImg] || quickViewCar.images[0]} 
              alt={quickViewCar.model} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="badge-certified flex items-center gap-1 shadow-lg">
                <ShieldCheck className="w-3 h-3" /> Certified 150-Point
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {quickViewCar.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                  activeImg === idx ? 'border-yellow-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Info */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs uppercase font-mono text-yellow-400 font-semibold tracking-wider">
              {quickViewCar.make} • {quickViewCar.year} • {quickViewCar.rtoReg}
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-1">
              {quickViewCar.model}
            </h2>
            <p className="text-xs text-slate-400 mb-4">{quickViewCar.variant}</p>

            <div className="font-mono text-3xl font-extrabold gold-text">
              {quickViewCar.priceFormatted}
            </div>
            <div className="text-xs text-slate-400 font-mono mb-4">
              Estimated financing: <span className="text-white font-semibold">{quickViewCar.emiStartingFormatted}</span>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-2 my-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <Gauge className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-500">DRIVEN</div>
                <div className="text-xs font-semibold text-white">{quickViewCar.mileageFormatted}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-500">ACCELERATION</div>
                <div className="text-xs font-semibold text-white">{quickViewCar.zeroToHundred}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <Fuel className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                <div className="text-[10px] text-slate-500">POWER</div>
                <div className="text-xs font-semibold text-white">{quickViewCar.hp} HP</div>
              </div>
            </div>

            {/* Features preview */}
            <div className="space-y-1 text-xs text-slate-300">
              <div className="font-semibold text-slate-400 text-[11px]">HIGHLIGHTED EQUIPMENT:</div>
              {quickViewCar.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-yellow-400">•</span> {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setQuickViewCar(null);
                  openBookTestDrive(quickViewCar);
                }}
                className="flex-1 btn-gold text-xs py-3 font-bold uppercase tracking-wider shadow-lg"
              >
                <Calendar className="w-4 h-4" /> Book VIP Test Drive
              </button>

              <button
                onClick={() => toggleWishlist(quickViewCar.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted 
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewCar(null);
                navigateTo('car-detail', quickViewCar.id);
              }}
              className="w-full btn-secondary text-xs py-2.5"
            >
              Full Vehicle Details & 360° View <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
