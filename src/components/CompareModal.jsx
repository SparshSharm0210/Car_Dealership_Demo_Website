import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, ShieldCheck, Calendar, ArrowRight, Trash2 } from 'lucide-react';

export const CompareModal = () => {
  const { 
    isCompareOpen, 
    setIsCompareOpen, 
    compareList, 
    toggleCompare, 
    navigateTo, 
    openBookTestDrive 
  } = useApp();

  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-5xl glass-panel rounded-3xl border border-yellow-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              Vehicle Comparison Matrix <span className="text-xs text-yellow-400 font-mono font-normal">({compareList.length}/3 selected)</span>
            </h3>
            <p className="text-xs text-slate-400">Compare performance specifications, INR pricing, and certified features side-by-side.</p>
          </div>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {compareList.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="text-slate-500 text-4xl">⚖️</div>
              <h4 className="text-lg font-semibold text-white">No Vehicles Selected for Comparison</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Browse our luxury inventory and click the comparison icon on up to 3 cars to evaluate specifications side-by-side.
              </p>
              <button
                onClick={() => { setIsCompareOpen(false); navigateTo('inventory'); }}
                className="btn-gold text-xs py-2.5 px-5"
              >
                Browse Luxury Inventory
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compareList.map((car) => (
                <div key={car.id} className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header Image */}
                    <div className="relative h-40 rounded-xl overflow-hidden bg-slate-900 mb-3">
                      <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleCompare(car)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-slate-300 hover:text-rose-400 transition-colors"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-xs font-mono text-yellow-400 uppercase font-semibold">{car.make} • {car.rtoReg}</span>
                    <h4 className="font-serif text-base font-bold text-white mb-1">{car.model}</h4>
                    
                    <div className="font-mono text-xl font-bold gold-text mb-4">{car.priceFormatted}</div>

                    {/* Spec List Comparison */}
                    <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Year</span>
                        <span className="text-white font-medium">{car.year}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Odometer</span>
                        <span className="text-white font-medium">{car.mileageFormatted}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Horsepower</span>
                        <span className="text-yellow-400 font-semibold">{car.hp} HP</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">0-100 km/h</span>
                        <span className="text-white font-medium">{car.zeroToHundred}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Engine</span>
                        <span className="text-white font-medium text-right max-w-[150px] truncate">{car.engine}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Fuel & Drive</span>
                        <span className="text-white font-medium">{car.fuelType} ({car.drivetrain})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">Monthly EMI</span>
                        <span className="text-white font-mono font-semibold">{car.emiStartingFormatted}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-slate-400">150-Point Audit</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Passed
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setIsCompareOpen(false);
                        openBookTestDrive(car);
                      }}
                      className="w-full btn-gold text-xs py-2 font-bold"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Book Test Drive
                    </button>
                    <button
                      onClick={() => {
                        setIsCompareOpen(false);
                        navigateTo('car-detail', car.id);
                      }}
                      className="w-full btn-secondary text-xs py-2"
                    >
                      Full Details <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
