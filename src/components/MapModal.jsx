'use client';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 11.5564,
  lng: 104.9282,
};

export default function MapModal({ isOpen, onClose, location }) {
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // optional but helpful
  });

  useEffect(() => {
    if (location) {
      setMapCenter(location);
    }
  }, [location]);

  if (!isOpen) return null;
  if (loadError) return <div className="text-red-500">Error loading map: {loadError.message}</div>;
  if (!isLoaded) return <div className="text-gray-500">Loading map...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-2xl shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-2">Nearby Listings</h2>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={13}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </div>
    </div>
  );
}
