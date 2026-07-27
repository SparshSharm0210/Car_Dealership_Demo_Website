import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Heart, Scale, Calendar, Phone, Menu, X, ShieldCheck, ChevronRight, BarChart3, Star } from 'lucide-react';

export const Navbar = () => {
  const { 
    activeTab, 
    navigateTo, 
    wishlist, 
    compareList, 
    setIsSearchOpen, 
    setIsCompareOpen,
    setIsAnalyticsOpen,
    openBookTestDrive 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'sell', label: 'Sell Your Car' },
    { id: 'finance', label: 'Finance & EMI' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-2xl transition-all">
      {/* Top Banner Announcement with Real Delhi Location & Rating */}
      <div className="bg-gradient-to-r from-amber-950/80 via-[#141722] to-amber-950/80 border-b border-yellow-500/20 py-2 px-4 text-xs font-medium text-amber-200/90 text-center flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="inline-flex items-center gap-1 text-yellow-400 font-semibold">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> 4.6★ Google Verified Dealer (10+ Reviews)
        </span>
        <span className="hidden md:inline text-white/30">•</span>
        <span className="hidden md:inline text-white/80">Shop 7, DDA Market, Near Model Town, Kalyan Vihar, Delhi 110033</span>
        <span className="hidden md:inline text-white/30">•</span>
        <a href="tel:09811717372" className="hover:underline flex items-center gap-1.5 text-yellow-400 font-mono">
          <Phone className="w-3.5 h-3.5" /> +91 98117 17372
        </a>
      </div>

      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('home')} 
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 via-amber-600 to-yellow-700 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#07080B] rounded-[10px] flex items-center justify-center font-serif text-xl font-bold text-yellow-400">
              S
            </div>
          </div>
          <div>
            <div className="font-serif text-xl font-extrabold tracking-wider gold-text leading-tight">
              SUPREET MOTORS
            </div>
            <div className="text-[9px] tracking-[0.25em] text-slate-400 uppercase font-mono">
              Delhi Pre-Owned Luxury
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`text-xs font-bold uppercase tracking-widest transition-all relative py-1.5 ${
                activeTab === link.id ? 'text-yellow-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions Bar */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Analytics Trigger Button */}
          <button 
            onClick={() => setIsAnalyticsOpen(true)}
            className="p-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 transition-colors border border-yellow-500/30 flex items-center gap-1.5 text-xs font-semibold"
            title="Dealership Executive Analytics"
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden xl:inline">Dealer Portal</span>
          </button>

          {/* Quick Search Trigger */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-yellow-400 transition-colors border border-white/10"
            title="Search Inventory"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Compare Trigger */}
          <button 
            onClick={() => setIsCompareOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-yellow-400 transition-colors border border-white/10 relative"
            title="Compare Vehicles"
          >
            <Scale className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-yellow-500 to-amber-600 text-[#07080B] font-bold text-[10px] rounded-full flex items-center justify-center border border-black shadow-md">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Trigger */}
          <button 
            onClick={() => navigateTo('inventory')}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-yellow-400 transition-colors border border-white/10 relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-yellow-500 to-amber-600 text-[#07080B] font-bold text-[10px] rounded-full flex items-center justify-center border border-black shadow-md">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Book Test Drive Button */}
          <button 
            onClick={() => openBookTestDrive()}
            className="btn-gold text-xs uppercase tracking-wider py-2.5 px-5"
          >
            <Calendar className="w-4 h-4" /> Book Test Drive
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button 
            onClick={() => setIsAnalyticsOpen(true)}
            className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
          >
            <BarChart3 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg bg-white/5 text-slate-300"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-yellow-400 border border-yellow-500/20"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07080B]/95 border-b border-yellow-500/20 px-6 py-6 space-y-4 backdrop-blur-2xl animate-fade-in">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigateTo(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between text-left py-2.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                  activeTab === link.id 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/10 text-yellow-400 border border-yellow-500/30' 
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button 
              onClick={() => {
                setIsAnalyticsOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" /> Dealership Performance Analytics
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setIsCompareOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Scale className="w-4 h-4 text-yellow-400" /> Compare ({compareList.length})
              </button>
              <button 
                onClick={() => {
                  navigateTo('inventory');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-yellow-400" /> Wishlist ({wishlist.length})
              </button>
            </div>
            <button 
              onClick={() => {
                openBookTestDrive();
                setMobileMenuOpen(false);
              }}
              className="w-full btn-gold text-xs py-3 font-bold uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" /> Book VIP Test Drive
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
