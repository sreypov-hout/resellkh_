// src/components/profile/ListingsGrid.jsx
'use client';
import Image from 'next/image';

const mockListings = [
  {
    id: 1,
    title: 'cotton beige hoodies',
    description: 'oversize hoodie...',
    price: 18,
    originalPrice: 20,
    discount: '10% OFF',
    image: '/images/listing1.jpg'
  },
  {
    id: 2,
    title: 'Sanrio High–Quality',
    description: 'Trendy Charm Necklace...',
    price: 2,
    image: '/images/listing2.jpg'
  },
  {
    id: 3,
    title: 'Best Bow Hairstyles',
    description: 'Various hair types and lengths...',
    price: 5,
    originalPrice: 10,
    discount: '50% OFF',
    image: '/images/listing3.jpg'
  }
];

export default function ListingsGrid({ editable }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {mockListings.map(item => (
        <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm">
          <div className="relative">
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            {item.discount && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                {item.discount}
              </span>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-sm">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.description}</p>
            <div className="mt-2 text-sm font-bold text-orange-600">${item.price}</div>
            {item.originalPrice && (
              <div className="text-xs line-through text-gray-400">${item.originalPrice}</div>
            )}
            {editable && (
              <button className="mt-2 text-xs text-blue-600 hover:underline">Edit</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
