"use client";

import { useBookmark } from "@/context/BookmarkContext";
import CartInBookmarkPage from "@/components/profile/someComponent/CartInBookmarkPage";
import { useEffect, useState } from "react";
import { encryptId } from "@/utils/encryption";
import Image from "next/image"; // Import Next.js Image component for optimization

// A skeleton placeholder for a single card that matches the responsive layout
const SkeletonCard = () => (
    <div className="w-full animate-pulse">
        <div className="aspect-[4/3] w-full bg-gray-200 rounded-2xl"></div>
        <div className="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="mt-2 h-3 bg-gray-200 rounded w-full"></div>
        <div className="mt-1 h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="mt-4 flex justify-between items-center">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
    </div>
);

export default function FavoritePage() {
    const { bookmarks, isReady } = useBookmark();
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleError = (errorEvent) => {
            console.error("Error in FavoritePage:", errorEvent.error);
            setError(errorEvent.error.message);
        };
        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    // Your original encryption logic remains unchanged
    const getEncrypted = (id) => {
        try {
            if (!id) return "";
            const encrypted = encryptId(id.toString());
            return encodeURIComponent(encrypted);
        } catch (error) {
            console.error("Profile ID encryption failed:", error);
            return "";
        }
    };

    // Loading state now renders a grid of skeletons
    if (!isReady) {
        return (
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-200/80">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Favorites</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)}
                    </div>
                </div>
            </div>
        );
    }

    // Error state remains functionally the same, with slightly improved styling
    if (error) {
        return (
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-200/80">
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <h2 className="font-semibold text-xl mb-2">Something went wrong</h2>
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main content render
    return (
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="p-4 md:p-6 bg-white rounded-2xl border border-gray-200/80 min-h-[60vh]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Favorites</h2>
                {bookmarks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Image
                            src="/images/story set/no fav.jpg"
                            alt="No Listings"
                            width={300}
                            height={300}
                            className="w-full max-w-xs h-auto mb-6"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <h2 className="font-semibold text-xl mb-2">Nothing to see here yet</h2>
                        <p className="text-sm text-gray-600 max-w-md">
                            Start favoriting items to compare, shop, and keep track of things you love.
                        </p>
                    </div>
                ) : (
                    // This grid is now fully responsive, adjusting columns based on screen size.
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {bookmarks.map((item) => (
                            <CartInBookmarkPage
                                key={`${item.id}-${item.title}`}
                                // Pass the raw ID, the card component will handle encryption for navigation
                                id={item.id} 
                                imageUrl={item.imageUrl}
                                title={item.title}
                                description={item.description}
                                price={item.price || "0"}
                                originalPrice={item.originalPrice || null}
                                discountPercent={item.discountPercent || 0}
                                condition={item.condition}
                                location={item.location}
                                allImages={item.allImages}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
