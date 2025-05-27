'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiMapPin, FiCamera } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapModal = dynamic(() => import('./MapModal'), { ssr: false });

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationLabel, setLocationLabel] = useState('All of Cambodia');
  const [mapOpen, setMapOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          setUserLocation(coords);
          setMapOpen(true);
        },
        () => {
          alert('Unable to get location.');
        }
      );
    } else {
      alert('Geolocation not supported');
    }
  };

  return (
    <header className="w-full border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-orange-500 font-bold text-xl flex items-center gap-2">
            <Image src="/LOGO.png" alt="Logo" width={195} height={78} />
          </div>

          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <Link href="#">Fashion</Link>
            <Link href="#">Accessories</Link>
            <Link href="#">Sport</Link>
            <Link href="#">Beauty</Link>
            <Link href="#">Book</Link>
            <Link href="#">All Categories</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/register">
              <span className="text-sm text-gray-700 hover:underline">Register</span>
            </Link>
            <Link href="/auth/login">
              <span className="text-sm text-gray-700 hover:underline">Log in</span>
            </Link>
            <Link href="/sell">
              <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600">
                Sell
              </button>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 border-t">
          {['Fashion', 'Accessories', 'Sport', 'Beauty', 'Book', 'All Categories'].map((item) => (
            <Link key={item} href="#">
              <span className="block text-sm text-gray-700">{item}</span>
            </Link>
          ))}
          <hr />
          <Link href="/auth/register">
            <span className="block text-sm text-gray-700">Register</span>
          </Link>
          <Link href="/auth/login">
            <span className="block text-sm text-gray-700">Log in</span>
          </Link>
          <Link href="/sell">
            <button className="w-full bg-orange-500 text-white text-sm px-4 py-2 rounded-full mt-2">
              Sell
            </button>
          </Link>
        </div>
      )}

      <div className="bg-gray-100 py-3 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-stretch gap-3 relative">
          <div className="flex flex-grow items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full text-sm bg-transparent outline-none"
            />
            <FiCamera className="text-gray-500 ml-2 cursor-pointer" />
          </div>

          <div className="relative">
            <button
              onClick={handleLocationClick}
              className="flex items-center bg-white rounded-full px-4 py-2 min-w-[200px] shadow-sm text-left"
            >
              <FiMapPin className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{locationLabel}</span>
            </button>
          </div>
        </div>
      </div>

      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} location={userLocation} />
    </header>
  );
}
