// src/app/(main)/category/[categoryId]/CategoryClientPage.jsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr"; // Import useSWR
import { getProductsByCategoryId } from "@/components/services/productCategory.service";
import ProductCart from "@/components/domain/ProductCart";

const categoryDisplayNames = {
  1: "Accessories",
  2: "Beauty",
  3: "Equipment, Bag & Shoes",
  4: "Book",
  5: "Fashion",
  6: "Home",
  7: "Sports & Kids",
  8: "Electronic",
  9: "Vehicle",
  10: "Other"
};

/**
 * SWR fetcher function.
 * It uses your existing service function to get the data.
 * @param {string} categoryId - The key passed by SWR (which is the categoryId).
 */
const fetcher = (categoryId) => getProductsByCategoryId(categoryId);

export default function CategoryClientPage({ categoryId, initialProducts }) {
  const parsedCategoryId = parseInt(categoryId);
  const [visibleCount, setVisibleCount] = useState(10);

  // Use the SWR hook for data fetching
  const {
    data: products,
    error,
    isLoading
  } = useSWR(parsedCategoryId, fetcher, {
    fallbackData: initialProducts, // Use the server-fetched data on initial load
    revalidateOnFocus: false, // Optional: disable re-fetching when window gets focus
  });

  // Handle 401 Unauthorized error from the fetcher
  if (error && error.message.includes('401')) {
    // It's better to use Next.js's router for navigation in client components
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    // Render nothing while redirecting
    return null;
  }

  const itemsToShow = products ? products.slice(0, visibleCount) : [];
  const handleViewMore = () => setVisibleCount((prev) => prev + 10);
  const categoryName = categoryDisplayNames[parsedCategoryId] || "All Items";

  // SWR provides a clear isLoading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // SWR provides a clear error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h2 className="font-semibold text-xl mb-2">Error loading products</h2>
        <span className="text-sm text-gray-600">{error.message}</span>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex ps-[7%] mt-3 items-center">
        <p className=" text-gray-500 flex items-center">
          <Link href="/">Home</Link>
        </p>
        <svg
          className="mx-1"
          width="20"
          height="20"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.98558 5.06864C7.32339 4.7931 7.8211 4.8128 8.13643 5.12775L13.0048 9.99638C13.1679 10.1596 13.2563 10.3779 13.2563 10.6044C13.2563 10.8309 13.1681 11.0488 13.0048 11.2127L8.13633 16.0811C7.80004 16.417 7.2557 16.417 6.92029 16.0811C6.58388 15.7451 6.58388 15.2006 6.92019 14.8648L11.1802 10.6044L6.92029 6.34407C6.60492 6.02908 6.5852 5.53088 6.86112 5.19302L6.92025 5.12769L6.98558 5.06864Z"
            fill="#343A40"
          />
        </svg>
        <span className="pointer-events-none text-orange-500">
          {categoryName}
        </span>
      </div>

      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-800">
                {products.length}+ items found for '{categoryName}' in Cambodia
              </h2>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="/images/story set/no listings.jpg"
                  alt="No Listings"
                  className="w-[350px] h-auto mb-6"
                />
                <h2 className="font-semibold text-xl mb-2">
                  Nothing to see here yet
                </h2>
                <span className="text-sm text-gray-600">
                  Try another category.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-items-center">
                {itemsToShow.map((item) => {
                  const price =
                    item.discountPercent && !isNaN(item.discountPercent)
                      ? (item.productPrice * (100 - item.discountPercent)) / 100
                      : item.productPrice;

                  return (
                    <ProductCart
                      key={item.productId}
                      id={item.productId}
                      imageUrl={item.fileUrls?.[0] || "/images/default-product.png"}
                      title={item.productName}
                      description={item.description}
                      price={price.toFixed(2)}
                      originalPrice={
                        item.discountPercent ? item.productPrice : null
                      }
                      discountText={
                        item.discountPercent
                          ? `${item.discountPercent}% OFF`
                          : null
                      }
                      location={item.location}
                      condition={item.condition}
                    />
                  );
                })}
              </div>
            )}

            {visibleCount < products.length && (
              <div className="w-full text-center mt-6 mb-1">
                <button
                  onClick={handleViewMore}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                >
                  View more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}