import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, ShieldCheck, Upload, CheckCircle2, ArrowRight, ArrowLeft, 
  Sparkles, Camera, Car, Award, Clock 
} from 'lucide-react';

export const SellCar = () => {
  const { showToast, openBookTestDrive } = useApp();
  const [step, setStep] = useState(1);

  // Form Data State
  const [vehicle, setVehicle] = useState({
    year: '2022',
    make: 'Mercedes-Benz',
    model: 'E-Class E220d',
    mileage: '14000',
    rtoReg: 'DL-01 (Delhi North)',
    exteriorCondition: 'Excellent',
    interiorCondition: 'Pristine',
    accidents: 'No Accidents',
    serviceHistory: 'Full Dealer Service'
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80"
  ]);

  // Instant calculated valuation in INR
  const basePriceFormatted = "₹58.50 Lakh";
  const estimatedMinFormatted = "₹56.00 Lakh";
  const estimatedMaxFormatted = "₹60.50 Lakh";
  const instantOfferFormatted = "₹59.00 Lakh";

  const handleAddPhotoSimulated = () => {
    showToast('Uploaded sample vehicle photo');
    setUploadedPhotos(prev => [
      ...prev,
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80"
    ]);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl font-sans space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-yellow-400" /> Instant Algorithmic Valuation
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Sell or Trade Your Luxury Car in Delhi</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Receive a guaranteed instant buyout offer in under 60 seconds. Free doorstep vehicle inspection, instant bank transfer, and hassle-free RTO transfer.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
        {[
          { num: 1, label: 'Vehicle Specs' },
          { num: 2, label: 'Condition' },
          { num: 3, label: 'Photos' },
          { num: 4, label: 'Valuation' }
        ].map((s) => (
          <div 
            key={s.num}
            className={`py-3 px-2 rounded-xl border transition-all ${
              step >= s.num 
                ? 'bg-yellow-500/10 border-yellow-400 text-yellow-300 font-bold' 
                : 'bg-white/5 border-white/10 text-slate-500'
            }`}
          >
            <div className="text-[10px] text-slate-500">STEP 0{s.num}</div>
            <div className="truncate">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main Wizard Form Container */}
      <div className="glass-panel rounded-2xl p-6 md:p-10 border border-yellow-500/30 shadow-2xl space-y-6">
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Car className="w-5 h-5 text-yellow-400" /> Step 1: Vehicle Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Make / Manufacturer *</label>
                <select
                  value={vehicle.make}
                  onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Mercedes-Benz" className="bg-slate-900">Mercedes-Benz</option>
                  <option value="BMW" className="bg-slate-900">BMW</option>
                  <option value="Audi" className="bg-slate-900">Audi</option>
                  <option value="Porsche" className="bg-slate-900">Porsche</option>
                  <option value="Toyota" className="bg-slate-900">Toyota</option>
                  <option value="Land Rover" className="bg-slate-900">Land Rover</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Model Year *</label>
                <input
                  type="number"
                  required
                  value={vehicle.year}
                  onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Model & Trim *</label>
                <input
                  type="text"
                  required
                  value={vehicle.model}
                  onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
                  placeholder="e.g. E-Class E220d / 530i M Sport"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Current Odometer Reading (KM) *</label>
                <input
                  type="number"
                  required
                  value={vehicle.mileage}
                  onChange={(e) => setVehicle({ ...vehicle, mileage: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-slate-300 block mb-1">State RTO Registration Authority</label>
                <select
                  value={vehicle.rtoReg}
                  onChange={(e) => setVehicle({ ...vehicle, rtoReg: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                >
                  <option value="DL-01 (Delhi North)" className="bg-slate-900">DL-01 (Delhi North / Mall Road)</option>
                  <option value="DL-03 (Delhi Central)" className="bg-slate-900">DL-03 (Delhi Central / Sheikh Sarai)</option>
                  <option value="HR-26 (Gurugram)" className="bg-slate-900">HR-26 (Gurugram)</option>
                  <option value="UP-16 (Noida)" className="bg-slate-900">UP-16 (Gautam Buddh Nagar / Noida)</option>
                  <option value="Other State Registered" className="bg-slate-900">Other State (NOC Required)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button type="submit" className="btn-gold text-xs py-3 px-8 font-bold">
                Continue to Condition Assessment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400" /> Step 2: Vehicle Condition & History
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Exterior Body & Paint</label>
                <select
                  value={vehicle.exteriorCondition}
                  onChange={(e) => setVehicle({ ...vehicle, exteriorCondition: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Pristine" className="bg-slate-900">Pristine / Showroom (Zero scratches)</option>
                  <option value="Excellent" className="bg-slate-900">Excellent (Minor road chips)</option>
                  <option value="Good" className="bg-slate-900">Good (Light wear)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Interior Leather & Cabin</label>
                <select
                  value={vehicle.interiorCondition}
                  onChange={(e) => setVehicle({ ...vehicle, interiorCondition: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Pristine" className="bg-slate-900">Pristine (No wear)</option>
                  <option value="Excellent" className="bg-slate-900">Excellent</option>
                  <option value="Good" className="bg-slate-900">Good</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Accident History</label>
                <select
                  value={vehicle.accidents}
                  onChange={(e) => setVehicle({ ...vehicle, accidents: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="No Accidents" className="bg-slate-900">Zero Accidents / Clean Insurance Record</option>
                  <option value="Minor Cosmetic" className="bg-slate-900">Minor bumper cosmetic repair</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Service & Maintenance Records</label>
                <select
                  value={vehicle.serviceHistory}
                  onChange={(e) => setVehicle({ ...vehicle, serviceHistory: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Full Dealer Service" className="bg-slate-900">Full Official Dealer Service Records</option>
                  <option value="Specialist Maintained" className="bg-slate-900">Luxury Specialist Maintained</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary text-xs py-2.5 px-5">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" className="btn-gold text-xs py-3 px-8 font-bold">
                Continue to Photo Upload <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleNextStep} className="space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Camera className="w-5 h-5 text-yellow-400" /> Step 3: Vehicle Photos & Registration Proof
            </h3>

            {/* Drag & drop simulation zone */}
            <div 
              onClick={handleAddPhotoSimulated}
              className="border-2 border-dashed border-yellow-500/30 hover:border-yellow-400 bg-white/[0.02] hover:bg-yellow-500/5 rounded-2xl p-8 text-center cursor-pointer transition-all space-y-3"
            >
              <Upload className="w-10 h-10 text-yellow-400 mx-auto" />
              <div className="text-sm font-semibold text-white">Click or drag & drop high-res photos here</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Upload front 3/4 angle, rear, interior cabin, dashboard odometer, and RC registration copy.
              </p>
            </div>

            {/* Uploaded Thumbnails Preview */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-mono">Uploaded Previews ({uploadedPhotos.length}):</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {uploadedPhotos.map((img, idx) => (
                  <div key={idx} className="h-24 rounded-xl overflow-hidden bg-slate-900 border border-white/10 relative group">
                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white">
                      Uploaded ✓
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <button type="button" onClick={() => setStep(2)} className="btn-secondary text-xs py-2.5 px-5">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button type="submit" className="btn-gold text-xs py-3 px-8 font-bold">
                Calculate Guaranteed Valuation <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-fade-in text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase">
              <CheckCircle2 className="w-4 h-4" /> Instant Algorithmic Valuation Ready
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold text-white">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {vehicle.mileage} km • {vehicle.rtoReg} • {vehicle.exteriorCondition} Condition Verified
              </p>
            </div>

            {/* Price Offer Card */}
            <div className="glass-card rounded-2xl p-8 border border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 via-amber-900/10 to-transparent max-w-lg mx-auto space-y-4">
              <div className="text-xs text-slate-400 font-mono uppercase">INSTANT DEALERSHIP BUYOUT OFFER</div>
              <div className="font-mono text-4xl sm:text-5xl font-extrabold gold-text">
                {instantOfferFormatted}
              </div>
              <div className="text-xs text-slate-300 font-mono border-t border-white/10 pt-3 flex justify-between">
                <span>Estimated Market Range:</span>
                <strong className="text-white">{estimatedMinFormatted} - {estimatedMaxFormatted}</strong>
              </div>
            </div>

            {/* Perks breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto text-left text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <div className="font-semibold text-white">Instant Bank Wire</div>
                <div className="text-slate-400 text-[11px]">Direct RTGS / NEFT transfer on spot.</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <Car className="w-4 h-4 text-yellow-400" />
                <div className="font-semibold text-white">Free Doorstep Pickup</div>
                <div className="text-slate-400 text-[11px]">We collect the vehicle anywhere in Delhi NCR.</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <Clock className="w-4 h-4 text-yellow-400" />
                <div className="font-semibold text-white">Full RTO Clearance</div>
                <div className="text-slate-400 text-[11px]">Complete RTO transfer & NOC compliance.</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => {
                  showToast('Offer accepted! Supreet Motors appraisal director will contact you within 15 minutes.');
                }}
                className="w-full sm:w-auto btn-gold text-xs py-3.5 px-8 font-bold uppercase tracking-wider shadow-xl"
              >
                Accept Instant Buyout Offer
              </button>

              <button 
                onClick={() => setStep(1)} 
                className="w-full sm:w-auto btn-secondary text-xs py-3 px-6"
              >
                Recalculate Valuation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
