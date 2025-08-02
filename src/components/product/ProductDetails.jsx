'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Skeleton Box component
const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Skeleton loader mimicking ProductDetails layout
const ProductDetailsSkeleton = () => (
  <div className="space-y-6">
    <div>
      <SkeletonBox className="w-3/4 h-10 mb-2" />
      <div className="flex items-center space-x-4">
        <SkeletonBox className="w-24 h-8 rounded" />
        <SkeletonBox className="w-20 h-6 rounded" />
        <SkeletonBox className="w-12 h-6 rounded" />
      </div>
    </div>

    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center">
          <SkeletonBox className="w-24 h-5 rounded mr-2" />
          <SkeletonBox className="w-48 h-5 rounded" />
        </div>
      ))}
    </div>

    <div>
      <SkeletonBox className="w-32 h-6 mb-3 rounded" />
      <SkeletonBox className="w-full h-16 rounded" />
    </div>
  </div>
);

const ProductDetails = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const maxDescriptionLength = 70;

  if (!product) return <ProductDetailsSkeleton />;

  const {
    productId: id,
    productName,
    productPrice,
    discountPercent,
    condition,
    categoryName,
    productStatus,
    location,
    description = '',
  } = product;

  const productPriceNumber = Number(productPrice);
  const hasDiscount = discountPercent > 0;
  const discountedPrice = hasDiscount
    ? (productPriceNumber * (100 - discountPercent)) / 100
    : productPriceNumber;

  const isTruncated = description.length > maxDescriptionLength;
  const displayedDescription =
    isExpanded || !isTruncated
      ? description
      : description.substring(0, maxDescriptionLength) + '...';

  const handleAddToCart = async () => {
    if (!session) {
      toast('Please login to add items to cart', {
        icon: '🔒',
        style: {
          borderRadius: '8px',
          background: '#fff',
          color: '#333',
          padding: '8px 16px',
        },
      });
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return false;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in.');
      return false;
    }

    if (!id) {
      toast.error('Product ID is missing.');
      return false;
    }

    const quantityToAdd = 1;
    const apiUrl = `${API_BASE_URL}/cart/add?productId=${id}&quantity=${quantityToAdd}`;

    // Optimistic UI update
    window.dispatchEvent(
      new CustomEvent('cart-updated', {
        detail: { type: 'increment', quantity: quantityToAdd },
      })
    );

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message || 'Failed to add to cart due to server error.';
        throw new Error(message);
      }

      toast.success(result?.message || 'Product added to cart!');
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add product to cart.');

      // Revert optimistic update
      window.dispatchEvent(
        new CustomEvent('cart-updated', {
          detail: { type: 'decrement', quantity: quantityToAdd },
        })
      );

      return false;
    }
  };

  const handleCheckout = async () => {
    const success = await handleAddToCart();
    if (success) {
      router.push('/buy/payment');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[32px] font-bold text-gray-900 mb-2 line-clamp-1">{productName}</h1>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-orange-500">${discountedPrice.toFixed(2)}</span>
          {hasDiscount && (
            <>
              <span className="text-xl text-gray-500 line-through">
                ${productPriceNumber.toFixed(2)}
              </span>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-24">Condition:</span>
          <span className="text-gray-600">{condition}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-24">Category:</span>
          <span className="text-gray-600">{categoryName}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-24">Status:</span>
          <span className="text-gray-600">{productStatus}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-900 w-24">Location:</span>
          <span className="text-gray-600 ps-5 block">{location}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Description</h3>
        <p className="text-gray-600 leading-relaxed ">
          {displayedDescription}
          {isTruncated && (
            <span
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-1 text-orange-500 cursor-pointer hover:underline"
            >
              {isExpanded ? ' See less' : ' See more'}
            </span>
          )}
        </p>

        {/* Buttons are commented out, but you can enable if needed */}
        {/* <button
          onClick={handleAddToCart}
          className="mt-4 mr-2 bg-orange-500 text-white px-6 py-2 rounded-full text-[16px] hover:bg-orange-600 transition-colors"
        >
          Add to cart
        </button>

        <button
          onClick={handleCheckout}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full text-[16px] hover:bg-orange-600 transition-colors"
        >
          Check out
        </button> */}
      </div>
    </div>
  );
};

export default ProductDetails;
