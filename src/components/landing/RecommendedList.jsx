'use client';

import { useState, useEffect } from "react";
import useSWR from 'swr';
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

// Define the fetcher function for SWR
const fetcher = () => productService.fetchRecommendedProducts();

export default function RecommendedList() {
  const [visibleCount, setVisibleCount] = useState(25);
  const [loadingMore, setLoadingMore] = useState(false);

  // Use SWR for data fetching, caching, and revalidation
  const { 
    data: items = [], // Default to an empty array to prevent errors
    error, 
    isLoading, 
    mutate // Function to trigger a manual re-fetch
  } = useSWR(
    'recommendedProducts', // A unique key for this data
    fetcher, 
    {
      refreshInterval: 30000,      // Poll for new data every 30 seconds
      revalidateOnFocus: true,     // Automatically refresh when the user focuses the tab
      revalidateOnReconnect: true  // Automatically refresh on network reconnect
    }
  );

  // Listen for the 'productAdded' event to trigger a refresh
  useEffect(() => {
    const handleProductAdded = () => {
      console.log("New product added event received, revalidating list...");
      mutate(); // Trigger an immediate re-fetch and sort
    };

    eventService.on('productAdded', handleProductAdded);

    // Cleanup listener on component unmount
    return () => {
      eventService.remove('productAdded', handleProductAdded);
    };
  }, [mutate]);


  const handleViewMore = () => {
    setLoadingMore(true);
    // Simulate network delay for a smoother user experience
    setTimeout(() => {
      setVisibleCount((prev) => prev + 25);
      setLoadingMore(false);
    }, 600);
  };

  // Memoize the items to show to prevent re-slicing on every render
  const itemsToShow = items.slice(0, visibleCount);

  return (
    <section className="w-full pt-5 md:pt-10 mb-10">
      <div className="w-full max-w-screen-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
          Recommended For You
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center">
            Failed to load recommended products. Please try again later.
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
                    originalPrice={hasDiscount ? originalPrice.toFixed(2) : null}
                    discountText={hasDiscount ? `${discountPercent}% OFF` : null}
                  />
                );
              })}
        </div>

        {/* "View More" Button */}
        {!isLoading && visibleCount < items.length && (
          <div className="text-center mt-8 md:mt-10">
            <button
              onClick={handleViewMore}
              disabled={loadingMore}
              className={`px-6 py-2 md:px-8 md:py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors flex items-center justify-center mx-auto disabled:opacity-75 disabled:cursor-not-allowed`}
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
