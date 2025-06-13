'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function LocationPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleConfirm = () => {
    alert('Location confirmed!');
    // You can also pass coordinates to a context or localStorage here
  };

  return (
    <main className="w-full h-screen relative">
      {/* Embedded Google Map */}
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?q=Phnom+Penh,Cambodia&key=YOUR_GOOGLE_MAPS_API_KEY"
        allowFullScreen
      ></iframe>

      {/* Red Map Pin (center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10">
        <MapPin className="text-red-600 w-10 h-10" />
      </div>

      {/* Confirm Button */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={handleConfirm}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg"
        >
          Confirm
        </button>
      </div>
    </main>
  );
}
