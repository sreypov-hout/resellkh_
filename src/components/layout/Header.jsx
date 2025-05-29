'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiMapPin, FiCamera } from 'react-icons/fi';
import dynamic from 'next/dynamic';

const MapModal = dynamic(() => import('../MapModal'), { ssr: false });

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [locationLabel, setLocationLabel] = useState('All of cambodia');
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(coords);
          setMapOpen(true);
        },
        () => alert('Unable to get location')
      );
    } else {
      alert('Geolocation not supported');
    }
  };

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      {/* Top Bar */}
      <div className="max-w-screen-xl mx-auto px-4 py-3 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-y-3">
        {/* Logo */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <span className="text-black">ReSell</span>
            <span className="text-orange-500">KH</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex flex-wrap items-center space-x-5 text-sm font-medium text-gray-700">
          {['Fashion', 'Accessories', 'Sport', 'Beauty', 'Book', 'All Categories'].map((item) => (
            <a key={item} href="#" className="hover:text-orange-500 whitespace-nowrap">
              {item}
            </a>
          ))}
        </nav>

        {/* Auth & Sell */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/register" className="text-sm text-gray-700 hover:underline">Register</Link>
          <Link href="/login" className="text-sm text-gray-700 hover:underline">Log in</Link>
          <Link href="/sell">
            <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition">
              Sell
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          {['Fashion', 'Accessories', 'Sport', 'Beauty', 'Book', 'All Categories'].map((item) => (
            <a key={item} href="#" className="block text-sm text-gray-700">
              {item}
            </a>
          ))}
          <hr />
          <Link href="/register" className="block text-sm text-gray-700">Register</Link>
          <Link href="/login" className="block text-sm text-gray-700">Log in</Link>
          <Link href="/sell">
            <button className="w-full bg-orange-500 text-white text-sm px-4 py-2 rounded-full mt-2">
              Sell
            </button>
          </Link>
        </div>
      )}

      {/* Search & Location */}
      <div className="bg-gray-100 py-3 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-stretch gap-3">
          {/* Search Box */}
          <div className="flex flex-grow items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full text-sm bg-transparent outline-none"
            />
            <FiCamera className="text-gray-500 ml-2 cursor-pointer" />
          </div>

          {/* Location Button */}
          <button
            onClick={handleLocationClick}
            className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm text-left min-w-[180px]"
          >
            <FiMapPin className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{locationLabel}</span>
          </button>
        </div>
      </div>

      {/* Map Modal */}
      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} location={userLocation} />
    </header>
  );
}
