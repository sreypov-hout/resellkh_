'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiTarget } from 'react-icons/fi';
import { FaGlobeAsia } from 'react-icons/fa';

export default function LocationDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);
  const router = useRouter();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          router.push(`/listing-near-me?lat=${latitude}&lng=${longitude}`);
        },
        (error) => {
          alert('Location access denied. Please allow location permission.');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full lg:w-[800px]">
      {/* Main Button */}
      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center w-full rounded-full bg-[#f2edef] px-4 py-2 cursor-pointer"
      >
        <FiMapPin className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-700">All of cambodia</span>
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <ul className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-md z-20 text-sm text-gray-700 overflow-hidden">
          <li
            onClick={handleLocationClick}
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            <FiTarget className="text-gray-600" />
            Listing near me
          </li>
          <li
            onClick={() => {
              setDropdownOpen(false);
              router.push('/');
            }}
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            <FaGlobeAsia className="text-gray-600" />
            All of Cambodia
          </li>
        </ul>
      )}
    </div>
  );
}
