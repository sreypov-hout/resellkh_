"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Cart from "@/components/profile/someComponent/Cart";

export default function ResultSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const result = [
    {
      id: 1,
      imageUrl: "/images/recommended/bally.jpg",
      title: "Bally Original Leather NoteBook",
      description: "Original Box. Never used.",
      productPrice: 15,
    },
    {
      id: 2,
      imageUrl: "/images/recommended/charles.jpg",
      title: "Charles & Keith Leather Metallic",
      description:
        "No visual flaws, only the handle is asymmetric... Comes with a dust bag.",
      productPrice: 29,
    },
    {
      id: 3,
      imageUrl: "/images/recommended/watch.jpg",
      title: "Watch",
      description:
        "One Piece Men's High-Quality Silicone Strap Watch Richard Quartz Men’s Watch",
      productPrice: 450,
      discountPercent: 25, // from $600
    },
    {
      id: 4,
      imageUrl: "/images/recommended/bike.jpg",
      title: "French carbon engineer bicycle",
      description:
        "Highly negotiable. Used once only. Bicycle too small for me.",
      productPrice: 500,
    },
    {
      id: 5,
      imageUrl: "/images/recommended/bracelet.jpg",
      title: "H bracelet",
      description: "Genuine titanium steel H bracelet. Condition: 10/10",
      productPrice: 30,
      discountPercent: 40, // from $50
    },
    {
      id: 6,
      imageUrl: "/images/recommended/luminox.jpg",
      title: "Luminox Navy SEAL Whiteout",
      description:
        "Rarely seen now in the secondary market. SEAL Ref. 3507.WO “Whiteout”.",
      productPrice: 35,
    },
    {
      id: 7,
      imageUrl: "/images/recommended/floral.jpg",
      title: "Floral sandals",
      description:
        "Size 8.5. Lightly used (~5 times). Clearing due to no space.",
      productPrice: 9.5,
    },
    {
      id: 8,
      imageUrl: "/images/recommended/calvin.jpg",
      title: "Calvin Klein T-Shirts",
      description:
        "First two never worn before, last one has been worn < 5 times.",
      productPrice: 20,
    },
    {
      id: 9,
      imageUrl: "/images/recommended/cloudbag.jpg",
      title: "White Puffer Cloud bag",
      description:
        "Brand New White Puffer Cloud Bag selling at $15. Second pic tote bags $5 each!",
      productPrice: 5,
    },
    {
      id: 10,
      imageUrl: "/images/recommended/lululemon.jpg",
      title: "Lululemon Cropped Full Zip",
      description:
        "Brand new white knitted top – washed but never worn. Free size, fits up to UK6 well.",
      productPrice: 7.5,
      discountPercent: 50, // from $15
    },
    {
      id: 11,
      imageUrl: "/images/recommended/racket.jpg",
      title: "BADMINTON RACKET MUSCLE",
      description: "* NOTE: It’s for a kid (short), not for an adult.",
      productPrice: 16,
    },
    {
      id: 12,
      imageUrl: "/images/recommended/seventh.jpg",
      title: "Seventh Stores V2 Hoodie size M",
      description: "Worn once or twice. Bought in Japan. Open for negotiation.",
      productPrice: 3,
    },
    {
      id: 13,
      imageUrl: "/images/recommended/redwing.jpg",
      title: "RedWing Iron Ranger 8080",
      description:
        "Size 8.5D. Well taken care of. Slight negotiations welcome.",
      productPrice: 20,
    },
    {
      id: 14,
      imageUrl: "/images/recommended/miu_jeans.jpg",
      title: "MIU ICONIC DENIM JEANS",
      description: "SGD 507 - Credit Card. SGD 490 - PayNow. Retail SGD 1,670",
      productPrice: 8,
    },
    {
      id: 15,
      imageUrl: "/images/recommended/newbag.jpg",
      title: "Brand new bag",
      description: "No brand. Brand new, but put in the cabinet for awhile.",
      productPrice: 10,
    },
    {
      id: 16,
      imageUrl: "/images/recommended/nb327.jpg",
      title: "New Balance 327",
      description: "Size 38.5. Used once only.",
      productPrice: 32,
    },
    {
      id: 17,
      imageUrl: "/images/recommended/laptop.jpg",
      title: "Brand new Women’s Laptop",
      description:
        "Laptop backpack. Fits 13 inch laptop / iPad / tablet users.",
      productPrice: 6,
    },
    {
      id: 18,
      imageUrl: "/images/recommended/babydress.jpg",
      title: "Baby sky blue shift dress work",
      description: "Worn less than 5 times. XS. Light blue color. Excellent.",
      productPrice: 7.5,
      discountPercent: 50, // from $15
    },
    {
      id: 19,
      imageUrl: "/images/recommended/miu_sweats.jpg",
      title: "Miu Miu Logo Sweatpants",
      description: "Retail SGD 1,960. Excellent condition (see pictures).",
      productPrice: 5,
    },
    {
      id: 20,
      imageUrl: "/images/recommended/title.jpg",
      title: "Title product",
      description:
        "UNIQLOCK Montu Blue Palm Leaf Shirt XLv. Casual with pearl button.",
      productPrice: 22,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(10);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const itemsToShow = result.slice(0, visibleCount);

  return (
    <>
      <div className="flex ps-[7%] mt-3 items-center">
        <p className=" text-gray-500 flex items-center">
          <Link href="/">Home</Link>
        </p>
        <svg className='mx-1' width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.98558 5.06864C7.32339 4.7931 7.8211 4.8128 8.13643 5.12775L13.0048 9.99638C13.1679 10.1596 13.2563 10.3779 13.2563 10.6044C13.2563 10.8309 13.1681 11.0488 13.0048 11.2127L8.13633 16.0811C7.80004 16.417 7.2557 16.417 6.92029 16.0811C6.58388 15.7451 6.58388 15.2006 6.92019 14.8648L11.1802 10.6044L6.92029 6.34407C6.60492 6.02908 6.5852 5.53088 6.86112 5.19302L6.92025 5.12769L6.98558 5.06864Z" fill="#343A40" />
        </svg>

        <span className="pointer-events-none text-orange-500">
          Search results for "{query}"
        </span>
      </div>
      {/* <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {query ? (
          <p className="text-lg text-gray-700">
            Showing results for: <strong>{query}</strong>
          </p>
        ) : (
          <p className="text-lg text-gray-500">No query provided.</p>
        )}
        You can add product fetch logic here based on `query`
      </div> */}
      <div className="px-[7%]">
        <div className="p-4 md:p-6">
          <div className="p-4 rounded-[24px] border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-800">
                100+ search results for '{query}' in Cambodia
              </h2>
            </div>

            {/* Listing Grid or Empty State */}
            {result.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <img
                  src="/images/story set/no listing.jpg"
                  alt="No Listings"
                  className="w-[350px] h-auto mb-6"
                />
                <h2 className="font-semibold text-xl mb-2">
                  Nothing to see here yet
                </h2>
                <span className="text-sm text-gray-600">
                  Start favoriting items to compare, shop, and keep track of
                  things you love.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {itemsToShow.map((item) => {
                  let price;

                  if (typeof item.productPrice === "number") {
                    if (
                      typeof item.discountPercent === "number" &&
                      !isNaN(item.discountPercent)
                    ) {
                      price =
                        (item.productPrice * (100 - item.discountPercent)) /
                        100;
                    } else {
                      price = item.productPrice;
                    }
                  } else {
                    price = 0;
                  }

                  return (
                    <Cart
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      description={item.description}
                      price={price.toFixed(2)}
                      originalPrice={
                        item.discountPercent ? item.productPrice : null
                      }
                      discountText={
                        item.discountPercent
                          ? `${item.discountPercent}% OFF`
                          : null
                      }
                    />
                  );
                })}
              </div>
            )}
            {visibleCount < result.length && (
              <div className=" w-full text-center mt-6 mb-1">
                <button
                  onClick={handleViewMore}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                >
                  View more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
