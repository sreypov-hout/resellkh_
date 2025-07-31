"use client";

import { useState, useEffect, useRef } from "react";
import ProductCart from "@/components/domain/ProductCart"; // Assuming this is the responsive version
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Skeleton placeholder that adapts to the responsive layout
const SkeletonCard = () => (
    <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
        <div className="w-full h-full animate-pulse bg-gray-200 rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] bg-gray-300"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-400 rounded w-1/3"></div>
                    <div className="h-5 w-5 bg-gray-400 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
);

export default function TrendingNow() {
    const [trendingItems, setTrendingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    // This function now scrolls by the container's width, making it responsive.
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    useEffect(() => {
        async function fetchTrending() {
            try {
                const res = await fetch(
                    `${API_BASE_URL}/products`
                );
                if (!res.ok) throw new Error(`API Error: ${res.status}`);

                const data = await res.json();
                const products = data.payload || [];
                
                // Your existing logic for filtering trending products
                const filtered = products
                    .filter((item) => item.productId >= 20 && item.productId <= 30)
                    .slice(0, 10);

                setTrendingItems(filtered);
            } catch (err) {
                console.error("Failed to fetch trending products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTrending();
    }, []);

    return (
        <section className="w-full py-8 md:py-12">
            <div className="container mx-auto px-1">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Trending Now
                    </h2>
                    {/* Scroll arrows are only shown if there are products to scroll */}
                    {!loading && trendingItems.length > 0 && (
                         <div className="flex gap-2">
                            <button
                                onClick={() => scroll("left")}
                                className="p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
                                aria-label="Scroll left"
                            >
                                <FiChevronLeft className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 transition-colors duration-200"
                                aria-label="Scroll right"
                            >
                                <FiChevronRight className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Scrollable Product Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar -mx-2" // Negative margin to align cards with container edges
                >
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : error ? (
                        <div className="w-full text-center py-10 text-red-500">
                            <p>Failed to load products. Please try again later.</p>
                            <p className="text-sm text-gray-500">{error}</p>
                        </div>
                    ) : trendingItems.length > 0 ? (
                        trendingItems.map((item) => {
                            // Safely calculate the price
                            const price =
                                typeof item.productPrice === "number"
                                    ? item.discountPercent > 0
                                        ? (item.productPrice * (100 - item.discountPercent)) / 100
                                        : item.productPrice
                                    : 0;

                            return (
                                // The wrapper now uses responsive percentage widths and `flex-shrink-0`
                                <div
                                    key={item.productId}
                                    className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2 snap-start"
                                >
                                    <ProductCart
                                        id={item.productId}
                                        imageUrl={item.fileUrls?.[0] || item.imageUrl || "/default-image.jpg"}
                                        title={item.productName}
                                        description={item.description}
                                        price={price.toFixed(2)}
                                        originalPrice={item.discountPercent > 0 ? item.productPrice : null}
                                        discountText={item.discountPercent > 0 ? `${item.discountPercent}% OFF` : null}
                                    />
                                </div>
                            );
                        })
                    ) : (
                         <div className="w-full text-center py-10 text-gray-500">
                            <p>No trending products found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
