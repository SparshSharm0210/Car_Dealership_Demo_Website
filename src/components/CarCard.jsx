import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Scale, Eye, Calendar, Gauge, Zap, Fuel, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';

export const CarCard = ({ car, viewMode = 'grid' }) => {
  const { 
    navigateTo, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare, 
    openQuickView,
    openBookTestDrive 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isWishlisted = wishlist.includes(car.id);
  const isCompared = compareList.some(c => c.id === car.id);

  if (viewMode === 'list') {
    return (
      <div className="glass-card rounded-2xl overflow-hidden p-4 flex flex-col md:flex-row gap-6 border border-white/10 hover:border-yellow-500/40 transition-all group">
        {/* Left Thumbnail Image */}
        <div className="w-full md:w-80 h-56 relative rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
          <img 
            src={car.images[activeImageIndex] || car.images[0]} 
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            <span className="badge-certified flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3" /> Certified
            </span>
            {car.badge && (
              <span className="badge-gold shadow-md">
                {car.badge}
              </span>
            )}
          </div>
          
          {/* Image Thumbnails selector */}
          {car.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-1.5 z-10">
              {car.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeImageIndex === idx ? 'bg-yellow-400 w-5' : 'bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Info */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-yellow-400 font-semibold">{car.make} • {car.rtoReg}</span>
                <h3 
                  onClick={() => navigateTo('car-detail', car.id)}
                  className="font-serif text-xl font-bold text-white hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  {car.model} <span className="text-sm font-normal text-slate-400 font-sans">{car.variant}</span>
                </h3>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold gold-text">{car.priceFormatted}</div>
                <div className="text-[11px] text-slate-400 font-mono">EMI from {car.emiStartingFormatted}</div>
              </div>
            </div>

            {/* Spec Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
              <div className="bg-white/5 rounded-xl p-2.5 text-xs flex items-center gap-2 border border-white/5">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-slate-300 font-medium">{car.year} ({car.owners})</span>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 text-xs flex items-center gap-2 border border-white/5">
                <Gauge className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-slate-300 font-medium">{car.mileageFormatted}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 text-xs flex items-center gap-2 border border-white/5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-slate-300 font-medium">{car.hp} HP ({car.zeroToHundred})</span>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 text-xs flex items-center gap-2 border border-white/5">
                <Fuel className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-slate-300 font-medium">{car.fuelType}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10 gap-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toggleWishlist(car.id)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isWishlisted 
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
              </button>
              <button 
                onClick={() => toggleCompare(car)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isCompared 
                    ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Compare"
              >
                <Scale className="w-4 h-4" />
              </button>
              <button 
                onClick={() => openQuickView(car)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openBookTestDrive(car)}
                className="btn-outline-gold text-xs py-2.5 px-4"
              >
                Test Drive
              </button>
              <button
                onClick={() => navigateTo('car-detail', car.id)}
                className="btn-gold text-xs py-2.5 px-4"
              >
                View Vehicle <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Default)
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-500/40 transition-all flex flex-col justify-between group">
      {/* Image Container */}
      <div className="relative h-60 w-full bg-slate-950 overflow-hidden cursor-pointer" onClick={() => navigateTo('car-detail', car.id)}>
        <img 
          src={car.images[activeImageIndex] || car.images[0]} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="badge-certified shadow-lg flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Certified
          </span>
          {car.badge && (
            <span className="badge-gold shadow-lg">
              {car.badge}
            </span>
          )}
        </div>

        {/* Top Right Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(car.id); }}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isWishlisted 
                ? 'bg-rose-500/30 border-rose-400 text-rose-400' 
                : 'bg-black/40 border-white/20 text-white hover:bg-black/70'
            }`}
            title="Save Vehicle"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); toggleCompare(car); }}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              isCompared 
                ? 'bg-yellow-500/30 border-yellow-400 text-yellow-400' 
                : 'bg-black/40 border-white/20 text-white hover:bg-black/70'
            }`}
            title="Compare Vehicle"
          >
            <Scale className="w-4 h-4" />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); openQuickView(car); }}
            className="p-2 rounded-full backdrop-blur-md bg-black/40 border border-white/20 text-white hover:bg-black/70 transition-all"
            title="Quick Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Image pagination dots */}
        {car.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {car.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'bg-yellow-400 w-6' : 'bg-white/40 w-1.5'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono text-yellow-400 tracking-wider uppercase font-semibold">{car.make}</span>
            <span className="font-mono text-slate-400">{car.year} • {car.rtoReg}</span>
          </div>

          <h3 
            onClick={() => navigateTo('car-detail', car.id)}
            className="font-serif text-lg font-bold text-white hover:text-yellow-400 transition-colors cursor-pointer line-clamp-1"
          >
            {car.model} <span className="text-xs font-sans text-slate-400 font-normal">{car.variant}</span>
          </h3>

          {/* Key specs row */}
          <div className="grid grid-cols-3 gap-2 my-3 py-2 px-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-300 text-center">
            <div>
              <div className="text-slate-500 text-[10px]">DRIVEN</div>
              <div className="font-semibold text-white">{car.mileageFormatted}</div>
            </div>
            <div className="border-x border-white/10">
              <div className="text-slate-500 text-[10px]">POWER</div>
              <div className="font-semibold text-white">{car.hp} HP</div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px]">FUEL</div>
              <div className="font-semibold text-white">{car.fuelType}</div>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">CERTIFIED PRICE</div>
            <div className="font-mono text-xl font-bold gold-text">{car.priceFormatted}</div>
            <div className="text-[10px] text-slate-400 font-mono">{car.emiStartingFormatted}</div>
          </div>

          <button
            onClick={() => openBookTestDrive(car)}
            className="btn-gold text-xs py-2 px-3.5"
          >
            Book Test Drive
          </button>
        </div>
      </div>
    </div>
  );
};
