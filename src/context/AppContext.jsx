import React, { createContext, useContext, useState, useEffect } from 'react';
import { CARS } from '../data/cars';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCarId, setSelectedCarId] = useState('mercedes-e220d-amg');
  
  // Wishlist & Compare
  const [wishlist, setWishlist] = useState(['mercedes-e220d-amg', 'bmw-530i-m-sport']);
  const [compareList, setCompareList] = useState([]);
  
  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isBookTestDriveOpen, setIsBookTestDriveOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [bookTestDriveCar, setBookTestDriveCar] = useState(null);
  const [quickViewCar, setQuickViewCar] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [selectedBody, setSelectedBody] = useState('All');
  const [priceRange, setPriceRange] = useState(150.00); // in Lakhs
  const [maxMileage, setMaxMileage] = useState(50000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  // Scroll to top on page navigation with simulated loading transition
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab, selectedCarId]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navigateTo = (tab, carId = null) => {
    setActiveTab(tab);
    if (carId) {
      setSelectedCarId(carId);
    }
  };

  const toggleWishlist = (carId) => {
    setWishlist(prev => {
      const exists = prev.includes(carId);
      if (exists) {
        showToast('Removed from Saved Vehicles');
        return prev.filter(id => id !== carId);
      } else {
        showToast('Saved to Supreet Motors Wishlist ✨');
        return [...prev, carId];
      }
    });
  };

  const toggleCompare = (car) => {
    setCompareList(prev => {
      const exists = prev.some(c => c.id === car.id);
      if (exists) {
        showToast(`Removed ${car.make} ${car.model} from Compare`);
        return prev.filter(c => c.id !== car.id);
      } else {
        if (prev.length >= 3) {
          showToast('Comparison limit is 3 vehicles');
          return prev;
        }
        showToast(`Added ${car.make} ${car.model} to Compare`);
        return [...prev, car];
      }
    });
  };

  const openBookTestDrive = (car = null) => {
    setBookTestDriveCar(car || CARS[0]);
    setIsBookTestDriveOpen(true);
  };

  const openQuickView = (car) => {
    setQuickViewCar(car);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedBody('All');
    setPriceRange(150.00);
    setMaxMileage(50000);
    setSortBy('featured');
    showToast('Inventory filters reset to default');
  };

  const selectedCar = CARS.find(c => c.id === selectedCarId) || CARS[0];

  return (
    <AppContext.Provider value={{
      activeTab,
      navigateTo,
      selectedCarId,
      setSelectedCarId,
      selectedCar,
      wishlist,
      toggleWishlist,
      compareList,
      toggleCompare,
      isSearchOpen,
      setIsSearchOpen,
      isCompareOpen,
      setIsCompareOpen,
      isBookTestDriveOpen,
      setIsBookTestDriveOpen,
      isAnalyticsOpen,
      setIsAnalyticsOpen,
      bookTestDriveCar,
      openBookTestDrive,
      quickViewCar,
      setQuickViewCar,
      openQuickView,
      toastMessage,
      showToast,
      isLoading,
      // Filters
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
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
