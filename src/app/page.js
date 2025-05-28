'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import dynamic from 'next/dynamic';

// 💡 Dynamically import the modal so it's only rendered on the client
const MapModal = dynamic(() => import('@/components/MapModal'), { ssr: false });

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <Hero />

      <div className="p-4 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Show Nearby Listings
        </button>
      </div>

      <ProductList />

      <MapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        location={{ lat: 11.5564, lng: 104.9282 }}
      />
    </main>
  );
}
