import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiries',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    showToast('Your message has been received by our VIP Concierge team.');
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16 font-sans">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-semibold uppercase tracking-widest">
          <Phone className="w-4 h-4 text-yellow-400" /> Private Concierge Advisory
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white">Contact Elite Motors Flagship</h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Schedule a private showroom viewing, arrange white-glove transport, or speak directly with our exotic vehicle acquisition specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info & Map (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-400" /> Flagship Showroom
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Beverly Hills Flagship Location</div>
                  <div className="text-slate-400">9450 Wilshire Boulevard, Beverly Hills, CA 90212</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Toll-Free VIP Line</div>
                  <a href="tel:+18005550199" className="text-yellow-400 hover:underline">+1 (800) 555-ELITE (+1 800-555-0199)</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Email Advisory</div>
                  <a href="mailto:concierge@elitemotors.com" className="text-slate-300 hover:text-white">concierge@elitemotors.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-white">Showroom Hours</div>
                  <div className="text-slate-400">Monday - Friday: 9:00 AM - 8:00 PM PST</div>
                  <div className="text-slate-400">Saturday: 10:00 AM - 6:00 PM PST</div>
                  <div className="text-slate-400">Sunday: By Private VIP Appointment Only</div>
                </div>
              </div>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <a
                href="https://wa.me/18005550199"
                target="_blank"
                rel="noreferrer"
                className="w-full btn-outline-gold py-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp VIP Concierge
              </a>
            </div>
          </div>

          {/* Dark Luxury Map Placeholder Visual */}
          <div className="relative h-64 rounded-2xl overflow-hidden border border-yellow-500/30 bg-[#0A0D14] flex items-center justify-center group shadow-xl">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="z-10 text-center space-y-2 p-6 glass-panel rounded-xl border border-white/10 max-w-xs">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="font-serif font-bold text-white text-sm">9450 Wilshire Blvd</div>
              <p className="text-[10px] text-slate-400">Beverly Hills, California</p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="btn-gold text-[10px] py-1.5 px-3 inline-block"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-2xl p-6 md:p-10 border border-yellow-500/30 shadow-2xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-white/10 pb-4">
              Private Message & Appointment Booking
            </h3>

            {isSent ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">Message Transmitted Successfully</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  A Senior Client Advisor from Elite Motors Beverly Hills will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="btn-gold text-xs py-2.5 px-6"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jonathan Sterling"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jonathan@sterling.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Inquiry Category</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                  >
                    <option value="General Inquiries" className="bg-slate-900">General Showroom Inquiries</option>
                    <option value="Vehicle Purchase" className="bg-slate-900">Vehicle Purchase / Inquire on Specific Car</option>
                    <option value="Sell / Trade-in" className="bg-slate-900">Sell / Trade-In Luxury Vehicle</option>
                    <option value="Financing & Lease" className="bg-slate-900">Custom Financing & Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Message / Special Requests</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the vehicle you are looking for or any specific requests..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold text-xs py-3.5 font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send VIP Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
