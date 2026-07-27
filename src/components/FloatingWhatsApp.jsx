import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { showToast } = useApp();

  const handleSend = (preset = null) => {
    const textToSend = preset || message || "Hello Elite Motors, I'm interested in viewing your luxury inventory.";
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/18005550199?text=${encoded}`, '_blank');
    showToast('Redirecting to VIP WhatsApp Concierge...');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 glass-panel rounded-2xl p-5 border border-yellow-500/30 shadow-2xl animate-fade-in text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg">
                  EM
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0B0C10] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white flex items-center gap-1">
                  VIP Concierge <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                </h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  ● Online | Responds in &lt; 2 mins
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/5 rounded-xl p-3 text-xs text-slate-300 mb-3 leading-relaxed">
            Welcome to Elite Motors Private Sales. How can our advisors assist your vehicle search today?
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5 mb-4">
            <button
              onClick={() => handleSend("Hi, I would like to schedule a private test drive.")}
              className="w-full text-left text-xs p-2 rounded-lg bg-white/[0.03] hover:bg-yellow-500/10 border border-white/5 hover:border-yellow-500/30 text-slate-200 transition-colors flex items-center justify-between"
            >
              <span>🏎️ Book Private Test Drive</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 opacity-50" />
            </button>
            <button
              onClick={() => handleSend("Hi, I'm looking for luxury financing and EMI quotes.")}
              className="w-full text-left text-xs p-2 rounded-lg bg-white/[0.03] hover:bg-yellow-500/10 border border-white/5 hover:border-yellow-500/30 text-slate-200 transition-colors flex items-center justify-between"
            >
              <span>💼 Request Bespoke Financing</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 opacity-50" />
            </button>
            <button
              onClick={() => handleSend("Hi, I would like to get an instant valuation to sell my vehicle.")}
              className="w-full text-left text-xs p-2 rounded-lg bg-white/[0.03] hover:bg-yellow-500/10 border border-white/5 hover:border-yellow-500/30 text-slate-200 transition-colors flex items-center justify-between"
            >
              <span>💰 Sell / Trade-In My Luxury Car</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 opacity-50" />
            </button>
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-emerald-300/40 relative group"
        title="WhatsApp VIP Concierge"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-black animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-black"></span>
      </button>
    </div>
  );
};
