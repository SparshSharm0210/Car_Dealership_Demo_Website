import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, MapPin, Home, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const BookTestDriveModal = () => {
  const { isBookTestDriveOpen, setIsBookTestDriveOpen, bookTestDriveCar, showToast } = useApp();

  const [locationType, setLocationType] = useState('showroom'); // 'showroom' or 'doorstep'
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 11:30 AM');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM - 01:00 PM');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isBookTestDriveOpen || !bookTestDriveCar) return null;

  const dates = [
    { label: 'Today', sub: 'Jul 28' },
    { label: 'Tomorrow', sub: 'Jul 29' },
    { label: 'Thursday', sub: 'Jul 30' },
    { label: 'Friday', sub: 'Jul 31' },
    { label: 'Saturday', sub: 'Aug 01' }
  ];

  const slots = [
    '11:30 AM - 01:00 PM',
    '02:00 PM - 03:30 PM',
    '04:30 PM - 06:00 PM',
    '06:30 PM - 08:00 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast(`VIP Test Drive Reserved for ${bookTestDriveCar.make} ${bookTestDriveCar.model}!`);
  };

  const handleClose = () => {
    setIsBookTestDriveOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-yellow-500/30 overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Book VIP Test Drive</h3>
              <p className="text-xs text-slate-400">Supreet Motors • Model Town & Kalyan Vihar Showroom</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-white">Test Drive Booking Confirmed!</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your VIP Private Advisor has reserved the <span className="text-yellow-400 font-semibold">{bookTestDriveCar.make} {bookTestDriveCar.model}</span> for <span className="text-white font-medium">{selectedDate} ({selectedSlot})</span>.
            </p>
            <div className="bg-white/5 rounded-xl p-4 text-xs text-slate-400 max-w-md mx-auto text-left space-y-1">
              <div><strong className="text-white">Location:</strong> {locationType === 'showroom' ? 'Shop 7, DDA Market, Model Town / Kalyan Vihar, Delhi' : `Doorstep Delivery: ${formData.address || 'Your Residence'}`}</div>
              <div><strong className="text-white">Advisor Direct Line:</strong> +91 98117 17372</div>
              <div><strong className="text-white">Confirmation ID:</strong> #SM-TD-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
            <button onClick={handleClose} className="btn-gold text-xs py-2.5 px-6">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Selected Vehicle Snippet */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <img
                src={bookTestDriveCar.images[0]}
                alt={bookTestDriveCar.model}
                className="w-20 h-14 object-cover rounded-lg bg-slate-900 border border-white/10"
              />
              <div className="flex-1">
                <span className="text-[10px] font-mono text-yellow-400 uppercase font-semibold">{bookTestDriveCar.make} • {bookTestDriveCar.rtoReg}</span>
                <h4 className="text-sm font-bold text-white">{bookTestDriveCar.model}</h4>
                <div className="text-xs text-slate-400 font-mono">{bookTestDriveCar.priceFormatted} • {bookTestDriveCar.hp} HP</div>
              </div>
              <span className="badge-certified text-[10px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Ready for Drive
              </span>
            </div>

            {/* Step 1: Location Choice */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Choose Experience Location</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLocationType('showroom')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    locationType === 'showroom'
                      ? 'bg-yellow-500/10 border-yellow-400 text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Model Town Showroom</div>
                    <div className="text-[10px] text-slate-400">Shop 7 DDA Market, Kalyan Vihar</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLocationType('doorstep')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    locationType === 'doorstep'
                      ? 'bg-yellow-500/10 border-yellow-400 text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Home className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">White-Glove Doorstep</div>
                    <div className="text-[10px] text-slate-400">We bring vehicle to home/office in NCR</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Date Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block flex items-center justify-between">
                <span>Select Date</span>
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
              </label>
              <div className="grid grid-cols-5 gap-2">
                {dates.map((d, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(`${d.label}, ${d.sub}`)}
                    className={`py-2 px-1 rounded-xl text-center border transition-all ${
                      selectedDate.includes(d.label)
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-bold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs">{d.label}</div>
                    <div className="text-[10px] text-slate-500">{d.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time slot selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Preferred Time Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {slots.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSlot(s)}
                    className={`py-2 text-[11px] font-mono rounded-lg border text-center transition-all ${
                      selectedSlot === s
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sukhmani Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98117 17372"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {locationType === 'doorstep' && (
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Delivery Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street address, City, Pin Code"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full btn-gold text-xs py-3 font-bold uppercase tracking-wider shadow-lg"
            >
              Confirm VIP Test Drive Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
