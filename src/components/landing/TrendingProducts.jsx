"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const trendingItems = [
  {
    name: "Asics x Jound GT-2160",
    description: "Selling a pair of lightly used Asics x JJJJound GT-2160s...",
    price: "$219",
    image: "/images/trending/shoe1.png",
  },
  {
    name: "ASICS gel nimbus 26",
    description: "No box but used less than 5 times...",
    price: "$150",
    oldPrice: "$180",
    discount: "15%",
    image: "/images/trending/shoe2.png",
  },
  {
    name: "Men's Asics Gel-Cumulus",
    description: "Very good condition Asics Gel-Cumulus...",
    price: "$50",
    image: "/images/trending/shoe3.png",
  },
  {
    name: "ASICS Japanese edition Denims",
    description: "Barely worn special denim edition...",
    price: "$100",
    image: "/images/trending/shoe4.png",
  },
  {
    name: "New Balance 327",
    description: "Size 36.5. Used once only.",
    price: "$32",
    image: "/images/trending/shoe5.png",
  },
];

export default function TrendingNow() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Trending now</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <FiChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-1"
        >
          {trendingItems.map((item, index) => (
            <div
              key={index}
              className="min-w-[220px] max-w-[220px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0"
            >
              <div className="relative h-[180px] w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
                    {item.discount} OFF
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold">{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {item.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
