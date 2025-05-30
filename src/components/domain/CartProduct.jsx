import Image from "next/image";
import { FiHeart } from "react-icons/fi";

export default function ProductCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-xs relative">
      {/* Discount Tag */}
      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
        10% Off
      </div>

      {/* Product Image */}
      <div className="w-xl h-[300px] relative">
        <Image
          src="/images/product/cropped_hoodie.jpg" // replace with your actual image path
          alt="Cotton beige hoodie"
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg text-gray-900">
          cotton beige hoodies
        </h3>
        <p className="text-sm text-gray-600">oversize hoodie</p>
        <p className="text-sm text-gray-600">fast deal, clearing wardrobe selling as i don’t reach for it often</p>
        

        {/* Price */}
        <div className="flex items-center mt-2 space-x-2">
          <span className="text-orange-600 font-semibold text-lg">$18</span>
          <span className="text-gray-400 line-through">$20</span>
        </div>
      </div>

      {/* Wishlist Icon */}
      <div className="absolute bottom-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer">
        <FiHeart size={20} />
      </div>
    </div>
  );
}
