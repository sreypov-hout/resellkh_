"use client";

import { useState } from "react";
import Image from "next/image";
import { FiBookmark } from "react-icons/fi";

const recommendedItems = [
  {
    name: "Bally Original Leather NoteBook",
    description: "Original Box\nNever used",
    price: "$15",
    image: "/images/recommended/bally.jpg",
  },
  {
    name: "Charles & Keith Leather Metallic",
    description:
      "No visual flaws, only the handle is asymmetric... Comes with a dust back.",
    price: "$29",
    image: "/images/recommended/charles.jpg",
  },
  {
    name: "watch",
    description:
      "One Piece Men's High-Quality Silicone Strap Watch Richard Quartz Men’s Watch",
    price: "$450",
    oldPrice: "$600",
    discount: "45%",
    image: "/images/recommended/watch.jpg",
  },
  {
    name: "French carbon engineer bicycle",
    description:
      "Highly negotiable.\nUsed once only.\nBicycle too small for me.",
    price: "$500",
    image: "/images/recommended/bike.jpg",
  },
  {
    name: "H bracelet",
    description: "Genuine titanium steel H bracelet.\nCondition: 10/10",
    price: "$30",
    oldPrice: "$50",
    discount: "32%",
    image: "/images/recommended/bracelet.jpg",
  },
  {
    name: "Luminox Navy SEAL Whiteout",
    description:
      "Rarely seen now in the secondary market. SEAL Ref. 3507.WO “Whiteout”.",
    price: "$35",
    image: "/images/recommended/luminox.jpg",
  },
  {
    name: "Floral sandals",
    description: "Size 8.5\nLightly used (~5 times)\nClearing due to no space.",
    price: "$9.50",
    image: "/images/recommended/floral.jpg",
  },
  {
    name: "Calvin Klein T-Shirts",
    description:
      "First two never worn before, last one has been worn < 5 times.",
    price: "$20",
    image: "/images/recommended/calvin.jpg",
  },
  {
    name: "White Puffer Cloud bag",
    description:
      "Brand New White Puffer Cloud Bag selling at $15. Second pic tote bags $5 each!",
    price: "$5",
    image: "/images/recommended/cloudbag.jpg",
  },
  {
    name: "Lululemon Cropped Full Zip",
    description:
      "Brand new white knitted top – washed but never worn. Free size, fits up to UK6 well.",
    price: "$7.5",
    oldPrice: "$15",
    discount: "50%",
    image: "/images/recommended/lululemon.jpg",
  },

  {
    name: "BADMINTON RACKET MUSCLE",
    description: "* NOTE: It’s for a kid (short), not for an adult.",
    price: "$16",
    image: "/images/recommended/racket.jpg",
  },
  {
    name: "Seventh Stores V2 Hoodie size M",
    description: "Worn once or twice. Bought in Japan. Open for nego.",
    price: "$3",
    image: "/images/recommended/seventh.jpg",
  },
  {
    name: "RedWing Iron Ranger 8080",
    description: "Size 8.5D. Well taken care of. Slight negotiations welcome.",
    price: "$20",
    image: "/images/recommended/redwing.jpg",
  },
  {
    name: "MIU ICONIC DENIM JEANS",
    description: "SGD 507 - Credit Card\nSGD 490 - PayNow\nRetail SGD 1,670",
    price: "$8",
    image: "/images/recommended/miu_jeans.jpg",
  },
  {
    name: "Brand new bag",
    description: "No brand. Brand new, but put in the cabinet for awhile",
    price: "$10",
    image: "/images/recommended/newbag.jpg",
  },
  {
    name: "New Balance 327",
    description: "Size 38.5\nUsed once only.",
    price: "$32",
    image: "/images/recommended/nb327.jpg",
  },
  {
    name: "Brand new Women’s Laptop",
    description: "Laptop backpack. Fits 13 inch laptop / iPad / tablet users.",
    price: "$6",
    image: "/images/recommended/laptop.jpg",
  },
  {
    name: "Baby sky blue shift dress work",
    description: "Worn less than 5 times. XS. Light blue color. Excellent.",
    price: "$7.5",
    oldPrice: "$15",
    discount: "50%",
    image: "/images/recommended/babydress.jpg",
  },
  {
    name: "Miu Miu Logo Sweatpants",
    description: "Retail SGD 1,960. Excellent condition (see pictures).",
    price: "$5",
    image: "/images/recommended/miu_sweats.jpg",
  },
  {
    name: "Title product",
    description:
      "UNIQLOCK Montu Blue Palm Leaf Shirt XLv. Casual with pearl button.",
    price: "$22",
    image: "/images/recommended/title.jpg",
  },
  {
    name: "Maverick series leather watch",
    description:
      "Preloved years ago. Have to replace battery your own. Not for fussy buyer.",
    price: "$20",
    image: "/images/recommended/maverick.jpg",
  },
  {
    name: "Daniel Wellington Watch",
    description:
      "Daniel Wellington Sheffield Silver Dapper Watch - Black. Diameter 38mm / 7mm.",
    price: "$13",
    image: "/images/recommended/wellington.jpg",
  },
  {
    name: "Lululemon Scuba Oversized",
    description:
      "Pre-owned - Good. Might have a few signs of wear, but all imperfections shown.",
    price: "$22",
    image: "/images/recommended/scuba.jpg",
  },
  {
    name: "B-600 Muscle Badminton Racket",
    description: "2 rackets. Free jump rope. With old grip. Sold as-is.",
    price: "$15",
    image: "/images/recommended/b600.jpg",
  },
  {
    name: "Authentic Van Cleef & Arpels",
    description:
      "Mother-of-pearl 1 stone. Color/features vary due to nature of gem.",
    price: "$19",
    image: "/images/recommended/vancleef.jpg",
  },
  {
    name: "Size M Seventh Store",
    description: "Also willing to trade for a size L. Well used hoodie.",
    price: "$10",
    image: "/images/recommended/seventhstore.jpg",
  },
  {
    name: "america flag, USA Knitted",
    description: "* NOTE: It’s for a kid (short), not for an adult.",
    price: "$16",
    image: "/images/recommended/flagknit.jpg",
  },
  {
    name: "Shoulder bag hand white leather",
    description: "Like new. Good condition. No dustbag.",
    price: "$10",
    image: "/images/recommended/whitebag.jpg",
  },
  {
    name: "Authentic Zara Men Blouse Shirt",
    description:
      "Preloved years ago. Replace battery if needed. Not for fussy buyer.",
    price: "$20",
    image: "/images/recommended/zara.jpg",
  },
  {
    name: "Black leather shoulder bag",
    description:
      "Black real leather. Carry on shoulder/crossbody. Size: 25x10x17cm",
    price: "$10",
    image: "/images/recommended/blackbag.jpg",
  },
  {
    name: "Roadbike",
    description: "Preloved roadbike with phone holder. No trade.",
    price: "$125",
    image: "/images/recommended/roadbike.jpg",
  },
  {
    name: "[new] beauty josen sunscreen",
    description:
      "beauty of joseon relief sun - used once only so it's still full but no box!! rfs: switched to new sunscreen.",
    price: "$9",
    image: "/images/recommended/josen.jpg",
  },
  {
    name: "Solid wood coffee table",
    description:
      "Black real leather shoulder bag with double strap. Can carry on shoulder or crossbody.",
    price: "$25",
    image: "/images/recommended/table.jpg",
  },
  {
    name: "Love and Co necklace",
    description: "Got it as a gift but don’t wear it.",
    price: "$7",
    image: "/images/recommended/love.jpg",
  },
  {
    name: "Anurak Mens shirt white",
    description:
      "Tailored light blue cotton stripes shirt with mother of pearl buttons. Cut away collar, split yoke.",
    price: "$11",
    image: "/images/recommended/anurak.jpg",
  },
  {
    name: "Authentic Gucci GG Rubber",
    description: "Black real leather. Refer to Gucci’s official size guide.",
    price: "$10",
    image: "/images/recommended/gucci_rubber.jpg",
  },
  {
    name: "Chanel Pink Mini Handle Bag",
    description:
      "Like new Chanel mini clutch bag. Paid for 5k+ in retail. Comes with full set, bought in Singapore MBS.",
    price: "$50",
    image: "/images/recommended/chanel_pink.jpg",
  },
  {
    name: "Puma HYROX Edition Shorts",
    description: "Authentic from JD Sports. Used very few times.",
    price: "$6",
    image: "/images/recommended/puma.jpg",
  },
  {
    name: "Black Backpack",
    description:
      "Feel free to ask for more pics. Bought a year ago but kept in storage. Prefer tote bags now.",
    price: "$8",
    image: "/images/recommended/backpack.jpg",
  },
  {
    name: "UNIQLO ARMY GREEN BLOUSE",
    description: "Fits size 2XL. ptp 63cm, length down 64cm.",
    price: "$4",
    image: "/images/recommended/uniqlo_green.jpg",
  },

  {
    name: "Anta Shockwave Pro 5 US 9",
    description:
      "Preloved shockwave 5 pro basketball shoe. Still has decent traction. Can be used for outdoor court.",
    price: "$14",
    image: "/images/recommended/anta.jpg",
  },
  {
    name: "Love Bonito Lime Green",
    description:
      "Brand: Love Bonito\nSize: Small\nSelling $10 with tracked mail postage",
    price: "$3",
    image: "/images/recommended/bonito.jpg",
  },
  {
    name: "Starry Co ’Josie’ necklace",
    description: "Worn once to try, didn’t like the way it looked on me.",
    price: "$6",
    image: "/images/recommended/josie.jpg",
  },
  {
    name: "[Female] Black & White Top",
    description: "Size stated in shirt is L but fits more like M.",
    price: "$5",
    image: "/images/recommended/blacktop.jpg",
  },
  {
    name: "Gucci Black Ballerina",
    description:
      "Bought in MBS Singapore, only come with item only. Enforced base with anti-slip.",
    price: "$15",
    image: "/images/recommended/gucci_ballerina.jpg",
  },
  {
    name: "Starry Co ’Josie’ necklace",
    description: "Worn once to try, didn’t like the way it looked on me.",
    price: "$6",
    image: "/images/recommended/josie.jpg",
  },
  {
    name: "[Female] Black & White Top",
    description: "Size stated in shirt is L but fits more like M.",
    price: "$5",
    image: "/images/recommended/blacktop.jpg",
  },
  {
    name: "Gucci Black Ballerina",
    description:
      "Bought in MBS Singapore, only come with item only. Enforced base with anti-slip.",
    price: "$15",
    image: "/images/recommended/gucci_ballerina.jpg",
  },
  {
    name: "Starry Co ’Josie’ necklace",
    description: "Worn once to try, didn’t like the way it looked on me.",
    price: "$6",
    image: "/images/recommended/josie.jpg",
  },
  {
    name: "[Female] Black & White Top",
    description: "Size stated in shirt is L but fits more like M.",
    price: "$5",
    image: "/images/recommended/blacktop.jpg",
  },
  {
    name: "Gucci Black Ballerina",
    description:
      "Bought in MBS Singapore, only come with item only. Enforced base with anti-slip.",
    price: "$15",
    image: "/images/recommended/gucci_ballerina.jpg",
  },
    {
    name: "america flag, USA Knitted",
    description: "* NOTE: It’s for a kid (short), not for an adult.",
    price: "$16",
    image: "/images/recommended/flagknit.jpg",
  },
  {
    name: "Shoulder bag hand white leather",
    description: "Like new. Good condition. No dustbag.",
    price: "$10",
    image: "/images/recommended/whitebag.jpg",
  },
  {
    name: "Authentic Zara Men Blouse Shirt",
    description:
      "Preloved years ago. Replace battery if needed. Not for fussy buyer.",
    price: "$20",
    image: "/images/recommended/zara.jpg",
  },
  {
    name: "Black leather shoulder bag",
    description:
      "Black real leather. Carry on shoulder/crossbody. Size: 25x10x17cm",
    price: "$10",
    image: "/images/recommended/blackbag.jpg",
  },
  {
    name: "Roadbike",
    description: "Preloved roadbike with phone holder. No trade.",
    price: "$125",
    image: "/images/recommended/roadbike.jpg",
  },
  {
    name: "[new] beauty josen sunscreen",
    description:
      "beauty of joseon relief sun - used once only so it's still full but no box!! rfs: switched to new sunscreen.",
    price: "$9",
    image: "/images/recommended/josen.jpg",
  },
  {
    name: "Solid wood coffee table",
    description:
      "Black real leather shoulder bag with double strap. Can carry on shoulder or crossbody.",
    price: "$25",
    image: "/images/recommended/table.jpg",
  },
  {
    name: "Love and Co necklace",
    description: "Got it as a gift but don’t wear it.",
    price: "$7",
    image: "/images/recommended/love.jpg",
  },
];

export default function RecommendedList() {
  const [visibleCount, setVisibleCount] = useState(25);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 25);
  };

  const itemsToShow = recommendedItems.slice(0, visibleCount);

  return (
    <section className="w-full bg-white py-10">
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Recommended For You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {itemsToShow.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <div className="relative w-full h-[160px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                {item.discount && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                    {item.discount} Off
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 whitespace-pre-line">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm font-semibold text-orange-500">
                    {item.price}
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through text-xs ml-2">
                        {item.oldPrice}
                      </span>
                    )}
                  </div>
                  <FiBookmark className="text-gray-500 w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < recommendedItems.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleViewMore}
              className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              View more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
