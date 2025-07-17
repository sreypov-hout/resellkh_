"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Cart from "@/components/profile/someComponent/Cart";
import { fetchNearbyProducts } from "@/components/services/nearBy.service";

// --- Helper Components for different UI states ---

// Loading Spinner Component
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
    <p className="text-gray-600">
      Getting your location and fetching nearby products...
    </p>
  </div>
);

// Location Error Component
const LocationErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-red-500 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <h2 className="font-semibold text-xl mb-2 text-red-600">Location Access Required</h2>
    <p className="text-gray-600 mb-4 max-w-md">{error}</p>
    <button
      onClick={onRetry}
      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
    >
      Allow Access & Retry
    </button>
    <p className="text-sm text-gray-500 mt-4">
      Please allow location access to see products near you.
    </p>
  </div>
);

// API/General Error Component
const ApiErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-red-500 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h2 className="font-semibold text-xl mb-2 text-red-600">Failed to Load Products</h2>
    <p className="text-gray-600 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
    >
      Retry
    </button>
  </div>
);

// Empty State Component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <img
      src="/images/story set/no listing.jpg"
      alt="No Listings Found"
      className="w-[350px] h-auto mb-6"
    />
    <h2 className="font-semibold text-xl mb-2">No listings found near you</h2>
    <p className="text-gray-600">Try expanding your search radius or check back later.</p>
  </div>
);

// --- Main Page Component ---

export default function ListingNearMePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Function to get user's location, wrapped in a Promise
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation is not supported by your browser."));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "To find listings near you, please grant location access in your browser settings and try again.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Your location information is currently unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get your location timed out.";
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000, // Cache location for 10 minutes
        }
      );
    });
  };

  // Main data fetching logic, wrapped in useCallback for stability
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setLocationError(null);

    try {
      // 1. Get user's location
      const location = await getUserLocation();

      // 2. Fetch nearby products using the location
      const nearbyProducts = await fetchNearbyProducts(
        location.latitude,
        location.longitude
      );
      setProducts(nearbyProducts);

    } catch (err) {
      // 3. Handle errors separately (location vs. other API errors)
      if (err.message.includes("Geolocation") || err.message.includes("location")) {
        setLocationError(err.message);
      } else {
        setError("An unexpected error occurred while fetching products.");
      }
      console.error("Fetching data error:", err); // Log error for debugging
    } finally {
      // 4. Stop loading state
      setLoading(false);
    }
  }, []);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Transform API product data to match what the Cart component expects
  const transformProduct = (product) => {
    const price =
      typeof product.productPrice === "number" && typeof product.discountPercent === "number"
        ? (product.productPrice * (100 - product.discountPercent)) / 100
        : product.productPrice || 0;

    return {
      id: product.productId,
      imageUrl: product.fileUrls?.[0] || "/images/placeholder.jpg",
      title: product.productName,
      description: product.description,
      price: price.toFixed(2),
      originalPrice:
        product.discountPercent > 0 ? product.productPrice.toFixed(2) : null,
      discountText:
        product.discountPercent > 0 ? `${product.discountPercent}% OFF` : null,
    };
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingState />;
    }
    if (locationError) {
      return <LocationErrorState error={locationError} onRetry={fetchData} />;
    }
    if (error) {
      return <ApiErrorState error={error} onRetry={fetchData} />;
    }
    if (products.length === 0) {
      return <EmptyState />;
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {products.map((product) => {
          const transformedProduct = transformProduct(product);
          return <Cart key={transformedProduct.id} {...transformedProduct} />;
        })}
      </div>
    );
  };

  return (
    <>
      <div className="flex ps-[7%] mt-3 items-center">
        <p className="text-gray-500 flex items-center">
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
          Listing near me
        </span>
      </div>

      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-800">
                {loading
                  ? "Loading..."
                  : `${products.length} listings found near you`}
              </h2>
              <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
                <svg
                  className="text-gray-600"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.28906 7.77998V17.51C2.28906 19.41 3.63906 20.19 5.27906 19.25L7.62906 17.91C8.13906 17.62 8.98906 17.59 9.51906 17.86L14.7691 20.49C15.2991 20.75 16.1491 20.73 16.6591 20.44L20.9891 17.96C21.5391 17.64 21.9991 16.86 21.9991 16.22V6.48998C21.9991 4.58998 20.6491 3.80998 19.0091 4.74998L16.6591 6.08998C16.1491 6.37998 15.2991 6.40998 14.7691 6.13998L9.51906 3.51998C8.98906 3.25998 8.13906 3.27998 7.62906 3.56998L3.29906 6.04998C2.73906 6.36998 2.28906 7.14998 2.28906 7.77998Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.55859 4V17"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.7305 6.62012V20.0001"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Less than 5km</span>
              </div>
            </div>

            {/* Content Area */}
            {renderContent()}

          </div>
        </div>
      </div>
    </>
  );
}