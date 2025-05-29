'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';

const product = {
  name: "Lululemon Cropped Full Zip Hoodie - XS/S - light grey",
  price: 7.5,
  originalPrice: 15,
  condition: "Like new",
  category: "Fashion",
  description:
    "I wore it just once for a chill outing, and it looked amazing. Super soft and lightweight – perfect for layering or wearing on its own. Honestly, I love it, but I have way too many similar tops, so I’m ...",
  images: [
    "/image1.png",
    "/image2.png",
    "/image3.png",
    "/images/video-thumb.png",
  ],
};

const seller = {
  name: "Bou Leakhena",
  phone: "+855 97 47 16039",
  avatar: "/Product-Detail-Image/avatar.jpg",
  reviews: 59,
  rating: 4,
};

const reviews = [
  { name: "Molly", date: "May 8, 2025", content: "great and friendly seller...", rating: 5, avatar: "/images/avatar1.jpg" },
  { name: "Rofath Nii", date: "Mar 22, 2025", content: "great seller & pleasant exp 💗", rating: 4, avatar: "/images/avatar2.jpg" },
  { name: "Engelina", date: "Mar 16, 2025", content: "seller was very nice and kind...", rating: 5, avatar: "/images/avatar3.jpg" },
  { name: "Christa", date: "Mar 16, 2025", content: "Adorable socks at great quality...", rating: 5, avatar: "/images/avatar4.jpg" },
];

const relatedProducts = [
  { id: 1, title: "Recycled leather shoulder bag", price: "$10", image: "/Product-Detail-Image/card1.png" },
  { id: 2, title: "Best Bow Hairstyle", price: "$5.50", image: "/images/bow.png", badge: "50% OFF" },
  { id: 3, title: "Sanrio High-Quality", price: "$2", image: "/images/sanrio.png" },
  { id: 4, title: "White Puffer Cloud bag", price: "$5", image: "/images/puffer.png" },
  { id: 5, title: "JACK WILLS Mens", price: "$22", original: "$70", image: "/images/jackwills.png", badge: "30% OFF" },
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

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating ? (
      <FaStar key={i} className="text-yellow-400 inline" />
    ) : (
      <FaRegStar key={i} className="text-gray-300 inline" />
    )
  );
};

export default function ProductDetail() {
  return (
    <div className="p-6 bg-white text-black">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2 flex items-center">
        <Link href="/">Home</Link>
        <FiChevronRight />
        <span className="text-orange-500">Detail</span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            {product.images.map((img, i) => (
              <Image key={i} src={img} width={70} height={70} alt={`thumb-${i}`} className="rounded-md border" />
            ))}
          </div>
          <Image src={product.images[0]} width={400} height={400} alt="main" className="rounded-md border" />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="text-red-500 text-xl mt-2">
            ${product.price.toFixed(2)}{' '}
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

      {/* Seller Info & Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Contact the seller</h3>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              alt="Seller"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Bou Leakhena</h4>
            <div className="flex text-yellow-400">★★★★★</div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">Tel: +855 97 416939</p>
        <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Message
        </button>
      </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-12">
        <h3 className="font-bold text-gray-900 mb-6">Reviews for Seller</h3>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={`https://images.unsplash.com/photo-${1494790108755 + index}?w=100&h=100&fit=crop&crop=face`}
                  alt={review.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <div className="flex text-yellow-400 text-sm">{'★'.repeat(review.rating)}</div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* More from this seller */}
      {/* More from Seller */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">More from this seller</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={`https://source.unsplash.com/random/300x300?sig=${id}`}
                alt={`Product ${id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">Sample Product {id}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">This is a sample description.</p>
                <div className="font-bold text-orange-500">$10</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    {/* </div> */}

      {/* Other Products */}
      <section className="mt-16">
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
      </section>
    </div>
  );
}
