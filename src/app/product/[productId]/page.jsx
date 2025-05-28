'use client';
// import Header from '@/component/Header';
// import Footer from '@/component/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

const product = {
  name: "Lululemon Cropped Full Zip Hoodie - XS/S - light grey",
  price: 7.5,
  originalPrice: 15,
  condition: "Like new",
  category: "Fashion",
  description:
    "I wore it just once for a chill outing, and it looked amazing. Super soft and lightweight – perfect for layering or wearing on its own. Honestly, I love it, but I have way too many similar tops, so I’m ...",
  images: [
    "/images/image 5.png",
    "/images/img2.png",
    "/images/img3.png",
    "/images/video-thumb.png",
  ],
};

const seller = {
  name: "Bou Leakhena",
  phone: "+855 97 47 16039",
  avatar: "/images/avatar.jpg",
  reviews: 59,
  rating: 5,
};

const reviews = [
  { name: "Molly", date: "May 8, 2025", content: "great and friendly seller...", rating: 5 },
  { name: "Rofath Nii", date: "Mar 22, 2025", content: "great seller & pleasant exp 💗", rating: 4 },
  { name: "Engelina", date: "Mar 15, 2025", content: "seller was very nice and kind...", rating: 4 },
  { name: "Christa", date: "Mar 16, 2025", content: "Adorable socks at great quality...", rating: 5 },
];

const relatedProducts = [
  { title: "Recycled leather shoulder bag", price: "$10", image: "/images/bag1.png" },
  { title: "Best Bow Hairstyle", price: "$5.50", image: "/images/bow.png", badge: "50% OFF" },
  { title: "Sanrio High-Quality", price: "$2", image: "/images/sanrio.png" },
  { title: "White Puffer Cloud bag", price: "$5", image: "/images/puffer.png" },
  { title: "JACK WILLS Mens", price: "$22", original: "$70", image: "/images/jackwills.png", badge: "30% OFF" },
];

const otherProducts = [
  { title: "Uniqlo White Hoodie", price: "$7", image: "/images/uniqlo.png" },
  { title: "carla hoodie in brown", price: "$12", original: "$30.65", badge: "60% OFF", image: "/images/carla.png" },
  { title: "Brighter Ahead Graphic Hoodie", price: "$12", image: "/images/graphic.png" },
  { title: "Stussy hoodie", price: "$15", image: "/images/stussy.png" },
  { title: "OCE 100% cotton beige hoodies", price: "$18", image: "/images/oce.png" },
  { title: "cropped grey H&M jacket hoodie", price: "$5", image: "/images/hm.png" },
  { title: "Pink Coquette Laced", price: "$19", original: "$15.28", image: "/images/pinkdress.png", badge: "65% OFF" },
  { title: "Cheris Pink Babydoll Dress", price: "$13", image: "/images/cheris.png" },
  { title: "brandy melville cropped zip up", price: "$8", image: "/images/brandy.png" },
  { title: "Cropped hoodie", price: "$5", image: "/images/cropped.png" },
];

export default function ProductDetail() {
  return (
    <>
    {/* <Header></Header> */}
    <div className="p-6 max-w-screen-xl mx-auto bg-white text-black">
      <div className="text-sm text-gray-500 mb-2 flex items-center">
        <Link href="/">Home</Link>
        <FiChevronRight />
        <span>Detail</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image gallery */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            {product.images.map((img, i) => (
              <Image key={i} src={img} width={70} height={70} alt="thumb" className="rounded-md border" />
            ))}
          </div>
          <Image src={product.images[0]} width={400} height={400} alt="main" className="rounded-md border" />
        </div>

        {/* Right: Product info */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="text-red-500 text-xl mt-2">${product.price.toFixed(2)}{' '}
            <span className="text-gray-400 line-through text-sm ml-2">${product.originalPrice}</span>
          </div>
          <div className="mt-3 text-sm space-y-1">
            <p><strong>Condition:</strong> {product.condition}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm mt-2">{product.description}</p>
            <button className="mt-2 text-orange-500 font-medium">Read more</button>
          </div>
        </div>
      </div>

      {/* Seller & Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
        <div className="border p-4 rounded-md">
          <h2 className="font-semibold mb-3">Contact the seller</h2>
          <div className="flex items-center gap-4 mb-3">
            <Image src={seller.avatar} alt="avatar" width={50} height={50} className="rounded-full" />
            <div>
              <p className="font-medium">{seller.name}</p>
              <p className="text-sm text-gray-500">{seller.reviews} reviews</p>
            </div>
          </div>
          <p className="text-sm">Tel: {seller.phone}</p>
          <button className="bg-orange-500 text-white text-sm mt-3 px-4 py-2 rounded">Telegram</button>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-semibold mb-4">Reviews for Seller</h2>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="border-b pb-3">
                <p className="font-medium">{r.name} <span className="text-gray-400 text-sm ml-2">{r.date}</span></p>
                <p className="text-sm">{r.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More from this seller */}
      <div className="mt-16">
        <h2 className="text-lg font-semibold mb-4">More from this seller</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {relatedProducts.map((item, index) => (
            <div key={index} className="min-w-[180px] rounded-md border p-2 relative bg-white shadow-sm">
              {item.badge && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">{item.badge}</span>}
              <Image src={item.image} width={150} height={150} alt={item.title} className="rounded" />
              <p className="text-sm mt-2 font-medium leading-tight">{item.title}</p>
              <div className="text-orange-600 font-semibold text-sm">
                {item.price}{item.original && <span className="ml-2 line-through text-gray-400 text-xs">{item.original}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other products you may like */}
      <div className="mt-16">
        <h2 className="text-lg font-semibold mb-4">Other products you may like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {otherProducts.map((item, index) => (
            <div key={index} className="rounded-md border p-2 relative bg-white shadow-sm">
              {item.badge && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">{item.badge}</span>}
              <Image src={item.image} width={180} height={180} alt={item.title} className="rounded" />
              <p className="text-sm mt-2 font-medium leading-tight">{item.title}</p>
              <div className="text-orange-600 font-semibold text-sm">
                {item.price}{item.original && <span className="ml-2 line-through text-gray-400 text-xs">{item.original}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm">View more</button>
        </div>
      </div>

      {/* <Footer></Footer> */}
    </div>
    </>
  );
}
