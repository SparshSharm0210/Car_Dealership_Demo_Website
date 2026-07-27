import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CARS } from '../data/cars';
import { CarCard } from '../components/CarCard';
import { 
  Filter, RotateCcw, LayoutGrid, List, SlidersHorizontal, Search, X, Check 
} from 'lucide-react';

export const Inventory = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    selectedFuel,
    setSelectedFuel,
    selectedTransmission,
    setSelectedTransmission,
    selectedBody,
    setSelectedBody,
    priceRange,
    setPriceRange,
    maxMileage,
    setMaxMileage,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    resetFilters
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const brands = ['All', 'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Toyota', 'Land Rover', 'Volvo', 'Mini'];
  const fuels = ['All', 'Diesel', 'Petrol', 'Electric', 'Hybrid'];
  const transmissions = ['All', 'Automatic', 'Dual-Clutch'];
  const bodyTypes = ['All', 'Sedan', 'SUV', 'Coupe'];

  // Filtering Logic
  const filteredCars = CARS.filter(car => {
    const matchesSearch = 
      !searchQuery ||
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.rtoReg.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBrand = selectedBrand === 'All' || car.make.toLowerCase() === selectedBrand.toLowerCase();
    const matchesFuel = selectedFuel === 'All' || car.fuelType.toLowerCase() === selectedFuel.toLowerCase();
    const matchesTransmission = selectedTransmission === 'All' || car.transmission.toLowerCase().includes(selectedTransmission.toLowerCase());
    const matchesBody = selectedBody === 'All' || car.bodyType.toLowerCase() === selectedBody.toLowerCase();
    const matchesPrice = car.priceRaw <= priceRange;
    const matchesMileage = car.mileageKm <= maxMileage;

    return matchesSearch && matchesBrand && matchesFuel && matchesTransmission && matchesBody && matchesPrice && matchesMileage;
  });

  // Sorting Logic
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceInr - b.priceInr;
    if (sortBy === 'price-high') return b.priceInr - a.priceInr;
    if (sortBy === 'year-new') return b.year - a.year;
    if (sortBy === 'mileage-low') return a.mileageKm - b.mileageKm;
    return 0; // default featured
  });

  const activeFilterCount = [
    selectedBrand !== 'All',
    selectedFuel !== 'All',
    selectedTransmission !== 'All',
    selectedBody !== 'All',
    priceRange < 150.00,
    maxMileage < 50000,
    searchQuery !== ''
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-semibold">Supreet Motors Certified Collection</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white">Showroom Inventory (Delhi NCR)</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden btn-secondary text-xs py-2 px-4 flex items-center gap-2"
          >
            <Filter className="w-4 h-4 text-yellow-400" /> Filters ({activeFilterCount})
          </button>
          <span className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-white">{sortedCars.length}</strong> of {CARS.length} luxury vehicles
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-yellow-400" /> Filter Vehicles
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-yellow-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Search Keyword / RTO</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. E-Class, 530i, DL-01..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Brand / Marque</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {brands.map(b => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b)}
                    className={`w-full text-left text-xs py-1.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                      selectedBrand === b 
                        ? 'bg-yellow-500/20 text-yellow-300 font-semibold border border-yellow-500/30' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{b}</span>
                    {selectedBrand === b && <Check className="w-3 h-3 text-yellow-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider in Lakhs */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Max Price</span>
                <span className="text-yellow-400 font-mono">₹{priceRange} Lakh</span>
              </div>
              <input
                type="range"
                min="25.00"
                max="150.00"
                step="5.00"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>₹25 Lakh</span>
                <span>₹1.50 Cr+</span>
              </div>
            </div>

            {/* Body Type Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Body Style</label>
              <div className="grid grid-cols-2 gap-1.5">
                {bodyTypes.map(bt => (
                  <button
                    key={bt}
                    onClick={() => setSelectedBody(bt)}
                    className={`py-1.5 px-2 rounded-lg text-xs border text-center transition-all ${
                      selectedBody === bt
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {bt}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuel Type Filter */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-2 block">Fuel / Powertrain</label>
              <div className="grid grid-cols-2 gap-1.5">
                {fuels.map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedFuel(f)}
                    className={`py-1.5 px-2 rounded-lg text-xs border text-center transition-all ${
                      selectedFuel === f
                        ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Mileage Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                <span>Max Odometer</span>
                <span className="text-yellow-400 font-mono">{maxMileage.toLocaleString()} km</span>
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="2000"
                value={maxMileage}
                onChange={(e) => setMaxMileage(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Top Control Bar */}
          <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Active Filter Tags */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-mono">Active:</span>
              {selectedBrand !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs flex items-center gap-1">
                  Brand: {selectedBrand}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('All')} />
                </span>
              )}
              {selectedBody !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs flex items-center gap-1">
                  Body: {selectedBody}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBody('All')} />
                </span>
              )}
              {selectedFuel !== 'All' && (
                <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs flex items-center gap-1">
                  Fuel: {selectedFuel}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedFuel('All')} />
                </span>
              )}
              {activeFilterCount === 0 && (
                <span className="text-xs text-slate-400 italic">None (Showing all vehicles)</span>
              )}
            </div>

            {/* Sorting & Layout View Toggle */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-yellow-400"
              >
                <option value="featured" className="bg-slate-900">Featured First</option>
                <option value="price-low" className="bg-slate-900">Price: Low to High</option>
                <option value="price-high" className="bg-slate-900">Price: High to Low</option>
                <option value="year-new" className="bg-slate-900">Year: Newest</option>
                <option value="mileage-low" className="bg-slate-900">Mileage: Lowest</option>
              </select>

              <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-yellow-500 text-[#07080B]' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-yellow-500 text-[#07080B]' : 'text-slate-400 hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Grid / List */}
          {sortedCars.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedCars.map((car) => (
                <CarCard key={car.id} car={car} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-16 text-center space-y-4 border border-white/10">
              <div className="text-4xl text-slate-600">🏎️</div>
              <h3 className="font-serif text-xl font-bold text-white">No Luxury Vehicles Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No vehicles match your active search filters. Try widening your price range or resetting brand selections.
              </p>
              <button onClick={resetFilters} className="btn-gold text-xs py-2.5 px-6">
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
