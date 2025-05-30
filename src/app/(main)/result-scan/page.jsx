'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthNavbar from '@/components/layout/AuthNavbar';

export default function SResultsPage() {
  const searchParams = useSearchParams();
  const imgSrc = searchParams.get('imgSrc');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mockScanResults = [
    {
      id: 1,
      title: "Lululemon Cropped Full Zip",
      description:
        "Brand new white knitted top – washed but never worn. Free size but fits up to L/XL well",
      price: 7.5,
      originalPrice: 15,
      discount: "50% OFF",
      image: "/images/scan/lulu1.jpg",
    },
    {
      id: 2,
      title: "Lululemon Cropped",
      description: "Like new",
      price: 15,
      image: "/images/scan/lulu2.jpg",
    },
    {
      id: 3,
      title: "lululemon scuba hoodie",
      description: "* NOTE: it's for a kid (short), not for an adult.",
      price: 15,
      image: "/images/scan/lulu3.jpg",
    },
    {
      id: 4,
      title: "Lululemon Sweatshirt Women’s",
      description: "Worn once or twice. Bought in Japan open for nego",
      price: 10,
      image: "/images/scan/lulu4.jpg",
    },
  ];

  return (
    <>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Scanned image preview */}
        {imgSrc && (
          <div className="bg-[#f2edef] rounded-2xl p-6 mb-8 shadow">
            <h2 className="text-center text-base font-semibold text-gray-800 mb-4">
              Search any image with Lens
            </h2>
            <div className="flex justify-center">
              <img
                src={imgSrc}
                alt="Scanned Image"
                className="w-[300px] h-auto rounded-xl border object-contain"
              />
            </div>
          </div>
        )}

        {/* Grid section */}
        <h2 className="text-xl font-semibold mb-4">More to explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockScanResults.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                <div className="mt-2 text-sm font-bold text-orange-600">${item.price}</div>
                {item.originalPrice && (
                  <div className="text-xs line-through text-gray-400">
                    ${item.originalPrice}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
