'use client';

import { useState, useEffect } from "react";
import useSWR from 'swr'; // --- ⭐️ 1. IMPORT useSWR ---
import ProductCart from "../domain/ProductCart";
import { productService } from "../services/allProduct.service";
import { eventService } from "../services/even.service";

// Skeleton loader for loading state
const SkeletonCard = () => (
  <div className="w-full animate-pulse bg-gray-100 p-4 rounded-lg">
    <div className="h-40 bg-gray-300 rounded-md mb-4" />
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
);

// --- ⭐️ 3. DEFINE THE FETCHER FUNCTION FOR SWR ---
const fetcher = () => productService.fetchRecommendedProducts();

export default function RecommendedList() {
  const [visibleCount, setVisibleCount] = useState(25);
  const [loadingMore, setLoadingMore] = useState(false);

  // --- ⭐️ 4. USE SWR FOR DATA FETCHING ---
  const { 
    data: items = [], // Default to an empty array
    error, 
    isLoading, 
    mutate // This function lets us trigger a re-fetch manually
  } = useSWR(
    'recommendedProducts', // A unique key for this data
    fetcher, 
    {
      refreshInterval: 30000, // Poll for new data every 30 seconds
      revalidateOnFocus: true, // Automatically refresh when the user focuses the tab
      revalidateOnReconnect: true // Automatically refresh on reconnect
    }
  );

  // --- ⭐️ 5. LISTEN FOR THE 'productAdded' EVENT ---
  useEffect(() => {
    const handleProductAdded = () => {
      console.log("New product added event received, revalidating list...");
      mutate(); // Trigger an immediate re-fetch
    };

    eventService.on('productAdded', handleProductAdded);

    return () => {
      eventService.remove('productAdded', handleProductAdded);
    };
  }, [mutate]);


  const handleViewMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 25);
      setLoadingMore(false);
    }, 600);
  };

  const itemsToShow = items.slice(0, visibleCount);

  return (
    <section className="w-full pt-5 md:pt-10 mb-10">
      <div className="w-full max-w-screen-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
          Recommended For You
        </h2>

        {error && (
          <p className="text-red-500 mb-4">
            Failed to load recommended products: {error.message}
          </p>
        )}

        {/* Grid: fully responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 xl:px-1 gap-3 justify-items-center">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))
            : itemsToShow.map((item) => {
                const originalPrice = Number(item.productPrice) || 0;
                const discountPercent = Number(item.discountPercent) || 0;
                const hasDiscount = discountPercent > 0;
                let finalPrice = originalPrice;

                if (hasDiscount) {
                  finalPrice = (originalPrice * (100 - discountPercent)) / 100;
                }

                if (isNaN(finalPrice)) finalPrice = 0;

                return (
                  <ProductCart
                    key={item.productId}
                    id={item.productId}
                    imageUrl={item.fileUrls?.[0] || "/images/placeholder.jpg"}
                    title={item.productName}
                    description={item.description}
                    price={finalPrice.toFixed(2)}
                    originalPrice={hasDiscount ? originalPrice : null}
                    discountText={hasDiscount ? `${discountPercent}% OFF` : null}
                  />
                );
              })}
        </div>

        {!isLoading && visibleCount < items.length && (
          <div className="text-center mt-8 md:mt-10">
            <button
              onClick={handleViewMore}
              disabled={loadingMore}
              className={`px-6 py-2 md:px-8 md:py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition flex items-center justify-center mx-auto ${
                loadingMore ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loadingMore ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                "View more"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}