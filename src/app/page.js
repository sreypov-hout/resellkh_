'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';

// 💡 Dynamically load MapModal (client-side only)
const MapModal = dynamic(() => import('@/components/MapModal'), { ssr: false });

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🧱 Header */}
      <Header />

      {/* 🎯 Hero Section */}
      <Hero />

      {/* 📍 Nearby Listings Button */}
      <div className="mt-6 mb-10 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition"
        >
          Show Nearby Listings
        </button>
      </div>

      {/* 🛒 Product Grid Section */}
      <ProductList />

      {/* 🗺️ Location Modal */}
      <MapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        location={{ lat: 11.5564, lng: 104.9282 }} // Phnom Penh default
      />
    </main>
  );
}
