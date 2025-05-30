// src/components/profile/ProfileTabs.jsx
'use client';

export default function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex space-x-6 border-b text-sm mb-4">
      <button
        onClick={() => onTabChange('listings')}
        className={`pb-2 ${activeTab === 'listings' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
      >
        Listings
      </button>
      <button
        onClick={() => onTabChange('reviews')}
        className={`pb-2 ${activeTab === 'reviews' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
      >
        Reviews
      </button>
    </div>
  );
}
