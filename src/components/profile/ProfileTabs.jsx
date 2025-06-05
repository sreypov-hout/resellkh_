<<<<<<< HEAD
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
=======
import { useState } from "react";
import ListingsWithFilter from "./ListingWithFilter";
import ReviewsSection from "./ReviewsSection";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="w-full py-8">
      <div className="flex px-6 space-x-6 mb-4">
        <button
          onClick={() => setActiveTab("listings")}
          className={`pb-2 text-sm font-medium ${
            activeTab === "listings"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 border-b-2 border-transparent"
          }`}
        >
          Listings
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 text-sm font-medium ${
            activeTab === "reviews"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 border-b-2 border-transparent"
          }`}
        >
          Reviews
        </button>
      </div>

      {activeTab === "listings" ? <ListingsWithFilter /> : <ReviewsSection />}
>>>>>>> 012a99af528bde3de99030490b7794b9fbe72c1c
    </div>
  );
}
