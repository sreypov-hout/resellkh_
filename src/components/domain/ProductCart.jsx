"use client";

import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useBookmark } from "@/context/BookmarkContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { encryptId } from "@/utils/encryption";

export default function ProductCart({
  id,
  imageUrl,
  title,
  description,
  price,
  originalPrice = null,
  discountText = null,
}) {
  const { toggleBookmark, isBookmarked, removeBookmark } = useBookmark();
  const { data: session } = useSession();
  const bookmarked = isBookmarked(id);
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const getDiscountPercent = () => {
    if (discountText) {
      const match = discountText.match(/\d+/);
      return match ? parseInt(match[0]) : null;
    }
    return null;
  };

  const handleToggle = (e) => {
    e.stopPropagation();

    if (!session) {
      if (bookmarked) {
        removeBookmark(id);
      }

      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      toast("Please login to save favorites", {
        icon: "🔒",
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#333",
          padding: "8px 16px",
        },
      });
      return;
    }

    toggleBookmark({
      id,
      imageUrl,
      title,
      description,
      price,
      originalPrice,
      discountPercent: getDiscountPercent(),
    });

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Fix here: use `id` prop, not undefined `product`
  const encryptedProductId = encodeURIComponent(encryptId(id));

  const handleCardClick = () => {
    router.push(`/product/${encryptedProductId}`);
  };

  if (session === "loading") {
    return null;
  }

  return (
    <div
      className="flex flex-col cursor-pointer bg-white rounded-2xl border border-gray-200 overflow-hidden transition-transform w-full sm:w-[240px] max-w-sm"
      onClick={handleCardClick}
    >
      <div className="relative w-full aspect-[4/3] sm:h-[220px]">
        {discountText && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full z-10 shadow">
            {discountText}
          </div>
        )}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          style={{ objectFit: "cover" }}
          className="object-center"
        />
      </div>

      <div className="flex flex-col justify-between px-4 py-3 flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
          <p className="mt-1 text-[13px] text-gray-600 leading-snug line-clamp-2 h-[35px]">
            {description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-[#F97316] font-bold text-sm">${price}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-[13px]">${originalPrice}</span>
            )}
          </div>
          <div
            className={`cursor-pointer relative group transition-transform duration-300 ${
              isAnimating ? "scale-125" : "scale-100"
            } ${bookmarked ? "text-orange-500" : "text-gray-400"}`}
            onClick={(e) => handleToggle(e)}
          >
            {bookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
            {!session && (
              <span className="absolute hidden group-hover:block -top-8 -left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Login to save
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
