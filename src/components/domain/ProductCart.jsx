"use client";
import Image from "next/image";
import { useBookmark } from "@/context/BookmarkContext";
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
  const { toggleBookmark, isBookmarked } = useBookmark();
  const bookmarked = isBookmarked(id);

  return (
    <div className="flex flex-col cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-transform w-[240px] h-[370px]">
      {/* Image Section */}
      <div className="relative w-full h-[240px]">
        {discountText && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full z-10 shadow">
            {discountText}
          </div>
        )}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="240px"
          style={{ objectFit: "cover" }}
          className="rounded-t-2xl"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between px-4 py-3 h-[130px]">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <p className="mt-1 text-[13px] text-gray-600 leading-snug line-clamp-2">{description}</p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="text-[#F97316] font-bold text-sm">${price}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-[13px]">${originalPrice}</span>
            )}
          </div>
          <div
            className={`cursor-pointer ${bookmarked ? "text-orange-500" : "text-gray-400"}`}
            onClick={() =>
              toggleBookmark({ id, imageUrl, title, description, price })
            }
          >
            {bookmarked ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
          </div>
        </div>
      </div>
    </div>
  );
}
