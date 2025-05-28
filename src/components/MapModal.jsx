'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 11.5564,
  lng: 104.9282, // Phnom Penh
};

export default function MapModal({ isOpen, onClose, location = null }) {
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // ✅ Load Google Maps with your API key
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  // ✅ Update center if location is passed
  useEffect(() => {
    if (location?.lat && location?.lng) {
      setMapCenter(location);
    }
  }, [location]);

  // ✅ Return nothing if modal is not open
  if (!isOpen) return null;

  // ✅ Handle loading and error states
  if (loadError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow text-red-500">
          Error loading map: {loadError.message}
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-[90%] max-w-2xl shadow-lg p-4 relative"
        onClick={(e) => e.stopPropagation()} // ⛔ Prevent modal from closing when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-3">Nearby Listings</h2>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13}>
          <Marker position={mapCenter} />
        </GoogleMap>
      </div>
    </div>
  );
}
