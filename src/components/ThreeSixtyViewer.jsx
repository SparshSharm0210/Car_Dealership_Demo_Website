import React, { useState, useRef } from 'react';
import { Rotate3d, MoveHorizontal, Maximize2, Minimize2, Sparkles } from 'lucide-react';

export const ThreeSixtyViewer = ({ images = [], carName = "Vehicle" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const totalFrames = images.length || 1;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diff = currentX - startX;
    
    // Sensitivity factor
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev - 1 + totalFrames) % totalFrames);
      } else {
        setCurrentIndex((prev) => (prev + 1) % totalFrames);
      }
      setStartX(currentX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative bg-[#07080C] rounded-2xl overflow-hidden border border-white/10 select-none transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl border-yellow-500/40 shadow-2xl' : 'h-96 w-full'
      }`}
    >
      {/* 360 Header Pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="badge-gold backdrop-blur-md bg-black/60 shadow-lg flex items-center gap-1.5 py-1 px-3">
          <Rotate3d className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} /> 
          360° Interactive Studio
        </span>
        <span className="text-[11px] font-mono text-slate-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          Angle: {Math.round((currentIndex / totalFrames) * 360)}°
        </span>
      </div>

      {/* Fullscreen Toggle */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 hover:text-yellow-400 transition-colors"
        title={isFullscreen ? "Exit Fullscreen Studio" : "Full Screen Studio"}
      >
        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
      </button>

      {/* Interactive Drag Area */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center relative group"
      >
        <img
          src={images[currentIndex] || images[0]}
          alt={`${carName} 360 view angle ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-100 pointer-events-none"
        />

        {/* Studio Lighting Radial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-black/30 pointer-events-none" />

        {/* Drag Hint overlay badge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs text-white shadow-xl opacity-90 group-hover:opacity-100 transition-opacity">
          <MoveHorizontal className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>Drag horizontally to rotate 360°</span>
        </div>
      </div>
    </div>
  );
};
