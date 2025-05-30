'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiCamera } from 'react-icons/fi';
import ImageScanModal from './ImageScanModal';

const sampleResults = [
  'shelf',
  'shirt dress',
  'shoes',
  'shorts',
  'shoulder bag',
  'shopping trolley',
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [scanOpen, setScanOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredResults([]);
        setScanOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setFilteredResults([]);
    } else {
      const results = sampleResults.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results);
      setScanOpen(false); // close scan if typing
    }
  };

  const handleScanClick = () => {
    setQuery('');
    setFilteredResults([]);
    setScanOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {!scanOpen && (
        <div className=" absolute w-full rounded-2xl bg-[#f2edef] shadow-sm border border-gray-200">
          {/* Search Input Row */}
          <div className="flex items-center px-4 py-2">
            <FiSearch className="text-gray-500 mr-2 text-base" />
            <input
              type="text"
              placeholder="Search for anything"
              value={query}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-sm text-black placeholder-gray-500"
            />
            <FiCamera
              className="text-gray-500 ml-2 text-lg cursor-pointer"
              onClick={handleScanClick}
            />
          </div>

          {/* Suggestions */}
          {filteredResults.length > 0 && (
            <ul className="border-t border-gray-300 text-sm text-gray-800">
              {filteredResults.map((item, index) => (
                <li
                  key={index}
                  className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery(item);
                    setFilteredResults([]);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {scanOpen && (
  <div className="relative rounded-2xl bg-[#f2edef] ">
    <ImageScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
  </div>
)}

    </div>
  );
}
