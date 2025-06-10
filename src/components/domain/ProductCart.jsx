"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default function ProductCart({
  id,
  imageUrl,
  title,
  description,
  price,
  originalPrice = null,
  discountText = null,
}) {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  return (
    <div className="flex flex-col cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden transition-transform w-full sm:w-[240px] max-w-sm">
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] sm:h-[220px]">
        {discountText && (
          <div className="absolute top-2 left-2 cursor-pointer bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full z-10 shadow">
            {discountText}
          </div>
        )}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          style={{ objectFit: "cover" }}
          className="object-center cursor-pointer"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between px-4 py-3 flex-grow">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 truncate cursor-pointer">
            {title}
          </h3>
          <p className="mt-1 text-[13px] text-gray-600 leading-snug line-clamp-2 h-[35px] cursor-default">
            {description}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-[#F97316] font-bold text-sm cursor-default">${price}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-[13px]">
                ${originalPrice}
              </span>
            )}
          </div>
          <div
            className={`cursor-pointer ${
              bookmarked ? "text-orange-500" : "text-gray-400"
            }`}
            onClick={toggleBookmark}
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
