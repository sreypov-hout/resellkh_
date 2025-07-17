
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useBookmark } from "@/context/BookmarkContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Cart({
  id,
  imageUrl,
  title,
  description,
  price,
  originalPrice = null,
  discountText = null,
  showEditButton = false,
  onEdit = null,
}) {
  const { toggleBookmark, isBookmarked } = useBookmark();
  const bookmarked = isBookmarked(id);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const getDiscountPercent = () => {
    if (discountText) {
      const match = discountText.match(/\d+/);
      return match ? parseInt(match[0]) : null;
    }
    return null;
  };

  const handleToggle = (e) => {
    e.stopPropagation();

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

    if (bookmarked) {
      toast("Removed from favorites", {
        icon: (
          <svg
            className="text-gray-600"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M21 5C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H21Z"
              fill="currentColor"
            />
            <path
              d="M4 20V6C4 5.44772 4.44772 5 5 5C5.55228 5 6 5.44772 6 6V20C6 20.2652 6.10543 20.5195 6.29297 20.707C6.48051 20.8946 6.73478 21 7 21H17C17.2652 21 17.5195 20.8946 17.707 20.707C17.8946 20.5195 18 20.2652 18 20V6C18 5.44772 18.4477 5 19 5C19.5523 5 20 5.44772 20 6V20C20 20.7957 19.6837 21.5585 19.1211 22.1211C18.5585 22.6837 17.7957 23 17 23H7C6.20435 23 5.44151 22.6837 4.87891 22.1211C4.3163 21.5585 4 20.7957 4 20ZM15 6V4C15 3.73478 14.8946 3.48051 14.707 3.29297C14.5195 3.10543 14.2652 3 14 3H10C9.73478 3 9.4805 3.10543 9.29297 3.29297C9.10543 3.48051 9 3.73478 9 4V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V4C7 3.20435 7.3163 2.44151 7.87891 1.87891C8.44152 1.3163 9.20435 1 10 1H14C14.7956 1 15.5585 1.3163 16.1211 1.87891C16.6837 2.44151 17 3.20435 17 4V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6Z"
              fill="currentColor"
            />
          </svg>
        ),
        style: { borderRadius: "8px", background: "#fff", color: "#333" },
      });
    } else {
      toast.success("Added to favorites");
    }
  };

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(id);
    }
  };

  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transition-transform w-full sm:w-[220px] max-w-sm relative"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] sm:h-[220px]">
        {discountText && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full z-10 shadow">
            {discountText}
          </div>
        )}

Loun Siven, [7/16/2025 9:09 AM]


        {/* Edit Button */}
        {showEditButton && (
          <button
            onClick={handleEditClick}
            className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-105 z-10"
            title="Edit Product"
          >
            <svg
              className="w-4 h-4 text-gray-600 hover:text-orange-500 transition-colors"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}

        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          style={{ objectFit: "cover" }}
          className="rounded-t-2xl"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between px-4 py-3 flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {title}
          </h3>
          <p className="mt-1 text-[13px] text-gray-600 leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-[#F97316] font-bold text-sm">${price}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-[13px]">
                ${originalPrice}
              </span>
            )}
          </div>
          <div
            className={`cursor-pointer transition-transform duration-300 ${
              isAnimating ? "scale-125" : "scale-100"
            } ${bookmarked ? "text-orange-500" : "text-gray-400"}`}
            onClick={(e) => handleToggle(e)}
          >
            {bookmarked ? (
              <FaBookmark size={18} />
            ) : (
              <FaRegBookmark size={18} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}