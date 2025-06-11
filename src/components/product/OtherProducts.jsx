'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const allProducts = [
  {
    id: 1,
    image: '/Product-Detail-Image/more-1.png',
    title: 'Vintage White Hoodie',
    description: 'Comfortable vintage style hoodie...',
    price: '7',
    originalPrice: null,
  },
  {
    id: 2,
    image: '/Product-Detail-Image/more-2.png',
    title: 'Coho Hoodie in brown',
    description: 'Coho Hoodie in brown...',
    price: '12-$45.00',
    originalPrice: null,
  },
  {
    id: 3,
    image: '/Product-Detail-Image/more-3.png',
    title: 'Brandy Melville Graphic Hoodie',
    description: 'Graphic Hoodie size one size...',
    price: '22',
    originalPrice: null,
  },
  {
    id: 4,
    image: '/Product-Detail-Image/more-4.png',
    title: 'Brandy Hoodie',
    description: 'Brandy Melville Hoodie...',
    price: '15',
    originalPrice: null,
  },
  {
    id: 5,
    image: '/Product-Detail-Image/more-5.png',
    title: 'OCT 100% cotton beige Hoodies',
    description: 'Beige cotton hoodie...',
    price: '18',
    originalPrice: null,
  },
  {
    id: 6,
    image: '/Product-Detail-Image/more-6.png',
    title: 'Classic Black Hoodie',
    description: 'Simple black hoodie...',
    price: '25',
    originalPrice: '30',
  },
  {
    id: 7,
    image: '/Product-Detail-Image/more-7.png',
    title: 'Urban Street Hoodie',
    description: 'Street-style hoodie...',
    price: '35',
    originalPrice: null,
  },
  {
    id: 8,
    image: '/Product-Detail-Image/more-8.png',
    title: 'Tie-Dye Hoodie',
    description: 'Trendy tie-dye pattern...',
    price: '40',
    originalPrice: '45',
  },
  {
    id: 9,
    image: '/Product-Detail-Image/more-9.png',
    title: 'Khaki Zip Hoodie',
    description: 'Full-zip khaki hoodie...',
    price: '28',
    originalPrice: null,
  },
  {
    id: 10,
    image: '/Product-Detail-Image/more-10.png',
    title: 'Oversized Fleece Hoodie',
    description: 'Warm fleece hoodie...',
    price: '32',
    originalPrice: null,
  },
  {
    id: 11,
    image: '/Product-Detail-Image/more-11.png',
    title: 'Oversized Fleece Hoodie',
    description: 'Warm fleece hoodie...',
    price: '32',
    originalPrice: '40',
  }
];

const PRODUCTS_PER_LOAD = 10;

const OtherProducts = () => {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  };

  const getDiscountText = (price, originalPrice) => {
    const numericPrice = parseFloat(price);
    const numericOriginal = parseFloat(originalPrice);
    if (!isNaN(numericPrice) && !isNaN(numericOriginal) && numericOriginal > numericPrice) {
      const discount = Math.round(((numericOriginal - numericPrice) / numericOriginal) * 100);
      return `${discount}% OFF`;
    }
    return null;
  };

  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Other products you may like</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            originalPrice={product.originalPrice}
            discountText={getDiscountText(product.price, product.originalPrice)}
          />
        ))}
      </div>

      {visibleCount < allProducts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors"
          >
            View more
          </button>
        </div>
      )}
    </section>
  );
};

export default OtherProducts;
