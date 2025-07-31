"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useBookmark } from "@/context/BookmarkContext";
import { toast } from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { encryptId } from "@/utils/encryption";

export default function CartInBookmarkPage({
    id,
    imageUrl,
    title,
    description,
    price,
    originalPrice = null,
    discountPercent = 0,
    condition,
    location,
    allImages = []
}) {
    const { data: session } = useSession();
    const { toggleBookmark, isBookmarked } = useBookmark();
    const bookmarked = isBookmarked(id);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    // Your original logic for safe defaults remains unchanged
    const safeImageUrl = imageUrl || allImages?.[0] || "/images/placeholder-product.jpg";
    const safeTitle = title || "Untitled Product";
    const safeDescription = description || "No description available";
    const safePrice = price?.toString() || "0";
    const discountText = discountPercent > 0 ? `${discountPercent}% OFF` : null;

    // Your original bookmark handling logic remains unchanged
    const handleBookmarkClick = async (e) => {
        e.stopPropagation();
        if (!session) {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            toast("Please login to save favorites");
            return;
        }
        if (isProcessing) return;
        
        if (bookmarked) {
            setShowModal(true);
        } else {
            setIsProcessing(true);
            try {
                await toggleBookmark({ id, imageUrl: safeImageUrl, title: safeTitle, description: safeDescription, price: safePrice, originalPrice: originalPrice?.toString(), discountPercent, condition, location, allImages });
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 300);
            } catch (error) {
                toast.error(error.message || "Failed to update favorites");
            } finally {
                setIsProcessing(false);
            }
        }
    };

    // Your original confirmation logic remains unchanged
    const confirmRemove = async () => {
        setIsProcessing(true);
        try {
            await toggleBookmark({ id });
            setShowModal(false);
        } finally {
            setIsProcessing(false);
        }
    };

    // Your original navigation logic remains unchanged
    const handleCardClick = () => {
        const encryptedId = encodeURIComponent(encryptId(id.toString()));
        router.push(`/product/${encryptedId}`);
    };

    return (
        <>
            {/* RESPONSIVE CHANGE: 
              - Removed `sm:w-[220px]` and `max-w-sm`.
              - `w-full` makes the card take the full width of its grid column.
              - `h-full` ensures all cards in a row have the same height.
            */}
            <div 
                className="flex flex-col bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-300 w-full h-full group cursor-pointer hover:shadow-lg hover:-translate-y-1" 
                onClick={handleCardClick}
            >
                {/* RESPONSIVE CHANGE: 
                  - Removed fixed height `sm:h-[220px]`.
                  - `aspect-[4/3]` creates a responsive container that maintains its aspect ratio.
                */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {discountText && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full z-10 shadow">
                            {discountText}
                        </div>
                    )}
                    <Image
                        src={safeImageUrl}
                        alt={safeTitle}
                        fill
                        // RESPONSIVE CHANGE: Updated sizes attribute for better image optimization in a grid
                        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/e2e8f0?text='; }}
                    />
                </div>

                <div className="flex flex-col justify-between p-3 flex-grow">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1" title={safeTitle}>{safeTitle}</h3>
                        <p className="mt-1 text-xs text-gray-600 leading-snug line-clamp-2 h-[32px]">{safeDescription}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-baseline space-x-1">
                            <span className="text-orange-500 font-bold text-base">${safePrice}</span>
                            {originalPrice && (
                                <span className="text-gray-400 line-through text-xs">${originalPrice}</span>
                            )}
                        </div>
                        <div
                            className={`cursor-pointer transition-all duration-300 ${isAnimating ? "scale-125" : "scale-100"} ${bookmarked ? "text-orange-500" : "text-gray-400 hover:text-orange-400"} ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
                            onClick={handleBookmarkClick}
                        >
                            {bookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showModal}
                onClose={() => !isProcessing && setShowModal(false)}
                onConfirm={confirmRemove}
                title="Remove from Favorites?"
                message="Are you sure you want to remove this item from your favorites?"
                isProcessing={isProcessing}
            />
        </>
    );
}
