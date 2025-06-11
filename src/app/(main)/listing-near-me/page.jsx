"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Cart from "@/components/profile/someComponent/Cart";

export default function ListingNearMePage() {
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

  ];

  return (
    <>
      <div className="flex ps-[7%] mt-3 items-center">
        <p className=" text-gray-500 flex items-center">
          <Link href="/">Home</Link>
        </p>
        <svg
          className="inline-block w-4 mx-1"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4305 10.6641L8.86053 15.9766C8.47555 16.3437 7.85303 16.3437 7.47214 15.9766L6.54655 15.0937C6.16157 14.7266 6.16157 14.1328 6.54655 13.7695L10.4946 10.0039L6.54655 6.23828C6.16157 5.87109 6.16157 5.27734 6.54655 4.91406L7.46804 4.02344C7.85303 3.65625 8.47555 3.65625 8.85643 4.02344L14.4264 9.33594C14.8154 9.70313 14.8154 10.2969 14.4305 10.6641Z"
            fill="#2C2C2C"
          />
        </svg>

        <span className="pointer-events-none text-orange-500">
          Listing near me
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
  {/* Title */}
  <h2 className="text-sm md:text-lg lg:text-lg font-semibold text-gray-800">
    11 found results of listing near you in Cambodia
  </h2>

  {/* Distance Info */}
  <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
    <svg  className="text-white" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.28906 7.77998V17.51C2.28906 19.41 3.63906 20.19 5.27906 19.25L7.62906 17.91C8.13906 17.62 8.98906 17.59 9.51906 17.86L14.7691 20.49C15.2991 20.75 16.1491 20.73 16.6591 20.44L20.9891 17.96C21.5391 17.64 21.9991 16.86 21.9991 16.22V6.48998C21.9991 4.58998 20.6491 3.80998 19.0091 4.74998L16.6591 6.08998C16.1491 6.37998 15.2991 6.40998 14.7691 6.13998L9.51906 3.51998C8.98906 3.25998 8.13906 3.27998 7.62906 3.56998L3.29906 6.04998C2.73906 6.36998 2.28906 7.14998 2.28906 7.77998Z" stroke="#4b5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.55859 4V17" stroke="#4b5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.7305 6.62012V20.0001" stroke="#4b5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    <span>Less than 5km</span>
  </div>
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
                  No location data provided.
                </h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 px-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {result.map((item) => {
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
            
          </div>
        </div>
      </div>
    </>
  );
}
