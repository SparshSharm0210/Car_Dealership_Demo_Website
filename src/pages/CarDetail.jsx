import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CARS } from '../data/cars';
import { CarCard } from '../components/CarCard';
import { ThreeSixtyViewer } from '../components/ThreeSixtyViewer';
import { 
  ShieldCheck, Heart, Scale, Calendar, Phone, Share2, Download, 
  Check, FileText, Calculator, Zap, Gauge, Fuel, CheckCircle2, ChevronRight 
} from 'lucide-react';

export const CarDetail = () => {
  const { 
    selectedCar, 
    navigateTo, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare, 
    openBookTestDrive, 
    showToast 
  } = useApp();

  const car = selectedCar;
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'features', 'inspection', 'emi'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [view360Mode, setView360Mode] = useState(false);

  // EMI Calculator State inside CarDetail (in INR)
  const [downPaymentInr, setDownPaymentInr] = useState(Math.round(car.priceInr * 0.2));
  const [tenureMonths, setTenureMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(8.5);

  const loanAmount = Math.max(0, car.priceInr - downPaymentInr);
  const monthlyRate = interestRate / 12 / 100;
  const emiCalculated = Math.round(
    loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  ) || 0;

  const isWishlisted = wishlist.includes(car.id);
  const isCompared = compareList.some(c => c.id === car.id);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    showToast('Vehicle link copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    showToast(`Downloading Certified 150-Point Audit Report for ${car.make} ${car.model}...`);
  };

  const relatedCars = CARS.filter(c => c.id !== car.id && (c.make === car.make || c.bodyType === car.bodyType)).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <button onClick={() => navigateTo('inventory')} className="hover:text-white">Inventory</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-yellow-400 font-mono">{car.make}</span>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-white font-semibold truncate">{car.model}</span>
      </div>

      {/* Main Header & Title Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="badge-gold font-mono uppercase">{car.make}</span>
            <span className="badge-certified flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Certified CPO
            </span>
            <span className="text-xs text-slate-400 font-mono">Reg: {car.rtoReg}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {car.model} <span className="text-lg font-sans font-normal text-slate-400">{car.variant}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono">
            <span>Year: <strong className="text-white">{car.year}</strong></span>
            <span>•</span>
            <span>Driven: <strong className="text-white">{car.mileageFormatted}</strong></span>
            <span>•</span>
            <span>Ownership: <strong className="text-yellow-400">{car.owners}</strong></span>
          </div>
        </div>

        {/* Pricing Box & Quick Social Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            <div className="text-xs text-slate-400 font-mono uppercase">Certified Showroom Price</div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold gold-text">{car.priceFormatted}</div>
            <div className="text-xs text-slate-400 font-mono">Est. Financing from <span className="text-white font-semibold">{car.emiStartingFormatted}</span></div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(car.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isWishlisted ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-400' : ''}`} />
            </button>
            <button
              onClick={() => toggleCompare(car)}
              className={`p-3 rounded-xl border transition-colors ${
                isCompared ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
              title="Compare"
            >
              <Scale className="w-5 h-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Gallery Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {/* Studio Toggle (Photos vs 360 Studio) */}
          <div className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded-xl border border-white/10">
            <div className="flex gap-2">
              <button
                onClick={() => setView360Mode(false)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !view360Mode ? 'bg-yellow-500 text-[#07080B]' : 'text-slate-400 hover:text-white'
                }`}
              >
                HD Photography ({car.images.length})
              </button>
              <button
                onClick={() => setView360Mode(true)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  view360Mode ? 'bg-yellow-500 text-[#07080B]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> 360° Studio Viewer
              </button>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="text-xs text-yellow-400 hover:underline flex items-center gap-1 pr-2"
            >
              <Download className="w-3.5 h-3.5" /> Inspection PDF
            </button>
          </div>

          {view360Mode ? (
            <ThreeSixtyViewer images={car.threeSixtyImages} carName={`${car.make} ${car.model}`} />
          ) : (
            <div className="space-y-3">
              {/* Main Photo */}
              <div className="relative h-96 sm:h-[480px] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group">
                <img
                  src={car.images[selectedPhotoIndex] || car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-certified backdrop-blur-md bg-black/60 shadow-lg">
                    150-Point Verified
                  </span>
                </div>
              </div>

              {/* Photo Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedPhotoIndex === idx ? 'border-yellow-400 scale-105 shadow-lg' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Quick Purchase / Booking Panel */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-yellow-500/30 space-y-6 shadow-2xl">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Calendar className="w-5 h-5 text-yellow-400" /> Book Private Viewing
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => openBookTestDrive(car)}
                className="w-full btn-gold py-3.5 text-xs uppercase tracking-wider font-bold shadow-xl"
              >
                <Calendar className="w-4 h-4" /> Book VIP Test Drive
              </button>

              <a
                href={`https://wa.me/919811717372?text=${encodeURIComponent(`Hi Supreet Motors, I'm interested in the ${car.year} ${car.make} ${car.model} listed at ${car.priceFormatted}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-outline-gold py-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" /> WhatsApp Sales Manager
              </a>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Doorstep delivery available across Delhi NCR</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Clean State NOC & RTO transfer guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>1-Year comprehensive extended warranty</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-xs space-y-2 border border-white/5">
              <div className="font-semibold text-white">Need Auto Financing?</div>
              <p className="text-slate-400 text-[11px]">HDFC, ICICI, SBI & Axis Bank pre-approvals.</p>
              <button
                onClick={() => navigateTo('finance')}
                className="text-yellow-400 font-semibold text-xs hover:underline block"
              >
                Check Finance Eligibility →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Specs, Features, 150-Pt Inspection, EMI Calculator) */}
      <div className="space-y-6">
        <div className="flex border-b border-white/10 overflow-x-auto gap-4">
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'features', label: 'Features & Equipment' },
            { id: 'inspection', label: '150-Point Audit Report' },
            { id: 'emi', label: 'EMI Loan Calculator (₹)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-sm font-semibold whitespace-nowrap transition-colors relative ${
                activeTab === tab.id ? 'text-yellow-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Specs */}
        {activeTab === 'specs' && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-white">Vehicle Performance Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(car.specs).map(([key, val]) => (
                <div key={key} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
                  <span className="text-xs text-slate-400 font-mono uppercase">{key}</span>
                  <span className="font-semibold text-white text-sm mt-1">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Features */}
        {activeTab === 'features' && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-white">Factory Options & Installed Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {car.features.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 text-xs text-slate-200">
                  <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Inspection Report */}
        {activeTab === 'inspection' && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-yellow-400" /> Certified 150-Point Audit
                </h3>
                <p className="text-xs text-slate-400">Score: <strong className="text-emerald-400 font-mono">{car.inspectionScore}</strong> Verified by Supreet Motors Technicians</p>
              </div>
              <button onClick={handleDownloadPDF} className="btn-outline-gold text-xs py-2 px-4">
                Download PDF Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Powertrain & Transmission
                </div>
                <p className="text-slate-400">{car.inspectionDetails.engineTransmission}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Chassis, Frame & Exterior Paint
                </div>
                <p className="text-slate-400">{car.inspectionDetails.exteriorBody}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Interior & Digital Telemetry
                </div>
                <p className="text-slate-400">{car.inspectionDetails.interiorElectronics}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Brakes, Suspension & Tires
                </div>
                <p className="text-slate-400">{car.inspectionDetails.brakesTires}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Vehicle Specific EMI Calculator */}
        {activeTab === 'emi' && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6 animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-yellow-400" /> Custom Loan Breakdown for {car.model}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Down Payment</span>
                    <span className="text-yellow-400 font-mono">₹{downPaymentInr.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={car.priceInr * 0.5}
                    step="50000"
                    value={downPaymentInr}
                    onChange={(e) => setDownPaymentInr(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Loan Tenure</span>
                    <span className="text-yellow-400 font-mono">{tenureMonths} Months ({tenureMonths / 12} Yrs)</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="84"
                    step="12"
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Interest Rate</span>
                    <span className="text-yellow-400 font-mono">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="8.0"
                    max="14.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  />
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 border border-yellow-500/30 text-center flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-mono uppercase">ESTIMATED MONTHLY INSTALLMENT</div>
                  <div className="font-mono text-4xl font-extrabold gold-text my-2">₹{emiCalculated.toLocaleString('en-IN')} / mo</div>
                  <div className="text-xs text-slate-400 font-mono">
                    Total Amount Financed: <strong className="text-white">₹{loanAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button onClick={() => navigateTo('finance')} className="btn-gold text-xs py-3 w-full mt-4">
                  Apply for Bank Pre-Approval
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Similar Luxury Vehicles */}
      {relatedCars.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-white/10">
          <h3 className="font-serif text-2xl font-bold text-white">Similar Luxury Arrivals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCars.map((rc) => (
              <CarCard key={rc.id} car={rc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
