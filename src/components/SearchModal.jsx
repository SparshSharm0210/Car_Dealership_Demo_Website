import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CARS } from '../data/cars';
import { Search, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const results = CARS.filter(car => {
    const q = query.toLowerCase();
    return (
      car.make.toLowerCase().includes(q) ||
      car.model.toLowerCase().includes(q) ||
      car.variant.toLowerCase().includes(q) ||
      car.bodyType.toLowerCase().includes(q) ||
      car.fuelType.toLowerCase().includes(q) ||
      car.rtoReg.toLowerCase().includes(q) ||
      car.year.toString().includes(q)
    );
  });

  const handleSelectCar = (carId) => {
    setIsSearchOpen(false);
    navigateTo('car-detail', carId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-fade-in">
      <div className="w-full max-w-3xl glass-panel rounded-3xl border border-yellow-500/30 overflow-hidden shadow-2xl">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-yellow-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search inventory by Make, Model, RTO (e.g. E-Class, 530i, DL-01, Fortuner)..."
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-white/5 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-mono">QUICK:</span>
          {['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Fortuner', 'Diesel', 'DL-01'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-yellow-500/20 text-slate-300 hover:text-yellow-400 border border-white/10 transition-colors whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {results.length > 0 ? (
            results.map((car) => (
              <div
                key={car.id}
                onClick={() => handleSelectCar(car.id)}
                className="p-3 rounded-xl bg-white/[0.02] hover:bg-yellow-500/10 border border-white/5 hover:border-yellow-500/30 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={car.images[0]}
                    alt={`${car.make} ${car.model}`}
                    className="w-16 h-12 object-cover rounded-lg bg-slate-900 border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-yellow-400 font-semibold uppercase">{car.make}</span>
                      <span className="badge-certified text-[10px] py-0.5 px-2 flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5" /> Certified
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      {car.model} <span className="text-xs font-normal text-slate-400">{car.variant}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {car.year} • {car.mileageFormatted} • {car.rtoReg}
                    </div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="font-mono text-base font-bold gold-text">{car.priceFormatted}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Est. {car.emiStartingFormatted}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              No luxury vehicles match your query "<span className="text-yellow-400">{query}</span>".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#07080B] border-t border-white/10 text-xs text-slate-500 flex justify-between">
          <span>Showing {results.length} verified luxury vehicles</span>
          <button 
            onClick={() => { setIsSearchOpen(false); navigateTo('inventory'); }}
            className="text-yellow-400 hover:underline"
          >
            Browse All Inventory →
          </button>
        </div>
      </div>
    </div>
  );
};
