"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const categories = [
  { name: "Dress", image: "/images/category/dress.jpg" },
  { name: "Jacket", image: "/images/category/jacket.jpg" },
  { name: "Bags", image: "/images/category/bags.jpg" },
  { name: "Backpack", image: "/images/category/backpack.jpg" },
  { name: "Jewelry", image: "/images/category/jewelry.jpg" },
  { name: "Shoes", image: "/images/category/shoes.jpg" },
  { name: "Sports", image: "/images/category/sports.jpg" },
  { name: "Sneakers", image: "/images/category/sneakers.jpg" },
];

export default function CategorySlider() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -260 : 260,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            What would you like to find?
          </h2>
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
          className="flex gap-10 overflow-x-auto scroll-smooth pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} 
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center w-[120px]"
            >
              <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden shadow-md bg-white mb-2">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm text-gray-800 text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
