import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, TrendingUp, BarChart3, PieChart, Users, DollarSign, Award, Calendar, ArrowUpRight } from 'lucide-react';

export const AnalyticsModal = () => {
  const { isAnalyticsOpen, setIsAnalyticsOpen } = useApp();
  const [timeRange, setTimeRange] = useState('30D');

  if (!isAnalyticsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-5xl glass-panel rounded-3xl border border-yellow-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-white">Dealership Executive Analytics</h3>
                <span className="badge-gold text-[10px]">Investor & Board View</span>
              </div>
              <p className="text-xs text-slate-400">SUPREET MOTORS • Shop 7 DDA Market, Model Town / Kalyan Vihar, Delhi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Time range pills */}
            <div className="flex bg-white/5 rounded-xl border border-white/10 p-0.5 text-xs font-mono">
              {['7D', '30D', '90D', '1Y'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    timeRange === t ? 'bg-yellow-500 text-[#07080B] font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAnalyticsOpen(false)}
              className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>MONTHLY SALES REVENUE</span>
                <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[11px]">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                </span>
              </div>
              <div className="font-mono text-3xl font-extrabold gold-text">₹4.85 Crore</div>
              <div className="text-[11px] text-slate-500">8 Luxury Vehicles Delivered</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>TOTAL QUALIFIED LEADS</span>
                <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[11px]">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +24.1%
                </span>
              </div>
              <div className="font-mono text-3xl font-extrabold text-white">184 Leads</div>
              <div className="text-[11px] text-slate-500">Test Drives & Valuations</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>AVG INVENTORY TURN</span>
                <span className="text-yellow-400 font-bold text-[11px]">Optimal Rate</span>
              </div>
              <div className="font-mono text-3xl font-extrabold text-white">14.2 Days</div>
              <div className="text-[11px] text-slate-500">Industry avg: 45 days</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>GOOGLE RATING</span>
                <span className="text-amber-400 font-bold text-[11px]">★ 4.6 / 5.0</span>
              </div>
              <div className="font-mono text-3xl font-extrabold text-white">4.6★</div>
              <div className="text-[11px] text-slate-500">Google Verified Dealer</div>
            </div>
          </div>

          {/* Realistic SVG Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Monthly Conversion Pipeline */}
            <div className="lg:col-span-7 glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-yellow-400" /> Lead Pipeline & Conversion Volume
                  </h4>
                  <p className="text-xs text-slate-400">Monthly breakdown of leads vs test drive bookings vs final sales</p>
                </div>
              </div>

              {/* Bar Chart Visual */}
              <div className="h-56 w-full flex items-end justify-between gap-4 pt-6 pb-2 border-b border-white/10">
                {[
                  { month: 'Feb', leads: 120, testDrives: 48, sales: 6 },
                  { month: 'Mar', leads: 145, testDrives: 58, sales: 7 },
                  { month: 'Apr', leads: 160, testDrives: 64, sales: 8 },
                  { month: 'May', leads: 150, testDrives: 60, sales: 7 },
                  { month: 'Jun', leads: 175, testDrives: 72, sales: 9 },
                  { month: 'Jul', leads: 184, testDrives: 78, sales: 10 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="w-full flex justify-center items-end gap-1.5 h-full">
                      {/* Leads bar */}
                      <div 
                        className="w-3 bg-white/20 rounded-t group-hover:bg-white/40 transition-all"
                        style={{ height: `${(item.leads / 200) * 100}%` }}
                        title={`Leads: ${item.leads}`}
                      />
                      {/* Test drives bar */}
                      <div 
                        className="w-3 bg-amber-500/60 rounded-t group-hover:bg-amber-400 transition-all"
                        style={{ height: `${(item.testDrives / 200) * 100}%` }}
                        title={`Test Drives: ${item.testDrives}`}
                      />
                      {/* Sales bar */}
                      <div 
                        className="w-3 bg-yellow-400 rounded-t group-hover:bg-yellow-300 transition-all shadow-lg"
                        style={{ height: `${(item.sales * 10 / 200) * 100}%` }}
                        title={`Sales: ${item.sales}`}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-400 pt-2 font-mono">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-white/20 rounded-sm"></span> Total Leads</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-500/60 rounded-sm"></span> Test Drives</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-yellow-400 rounded-sm"></span> Vehicles Delivered</span>
              </div>
            </div>

            {/* Chart 2: Marque Share Breakdown */}
            <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-yellow-400" /> Marque Sales Breakdown
              </h4>
              <p className="text-xs text-slate-400">Demand share across luxury brands in Delhi NCR</p>

              <div className="space-y-3 pt-2">
                {[
                  { marque: 'Mercedes-Benz', share: 34, count: '14 Units', color: 'bg-yellow-400' },
                  { marque: 'BMW M Motorsport', share: 28, count: '11 Units', color: 'bg-amber-500' },
                  { marque: 'Porsche Approved', share: 18, count: '7 Units', color: 'bg-yellow-600' },
                  { marque: 'Audi RS', share: 12, count: '5 Units', color: 'bg-slate-400' },
                  { marque: 'Land Rover / Toyota', share: 8, count: '3 Units', color: 'bg-emerald-400' }
                ].map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span>{m.marque}</span>
                      <span className="font-mono text-yellow-400">{m.share}% ({m.count})</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color}`} style={{ width: `${m.share}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 font-mono text-center mt-4">
                Highest Turnover Category: <strong className="text-white">Mercedes-Benz E-Class & BMW 5 Series</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
