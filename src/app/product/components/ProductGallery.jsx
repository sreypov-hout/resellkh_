'use client'; // This component uses client-side hooks (useState, onClick)

import { useState } from 'react';
import Image from 'next/image';

const ProductGallery = ({ product }) => {
  // Define placeholder images or use the product.images array if available
  // Replace these with your actual image URLs for the hoodie
  const defaultImages = [
    '/path/to/your/main-hoodie-image.jpg', // Placeholder for the large main image
    '/path/to/your/hoodie-thumb1.jpg',   // Placeholder for the top thumbnail
    '/path/to/your/hoodie-thumb2.jpg',   // Placeholder for the second thumbnail
    '/path/to/your/hoodie-thumb3.jpg',   // Placeholder for the third thumbnail
    '/path/to/your/hoodie-thumb4.jpg',   // Placeholder for the fourth thumbnail (if exists)
  ];

  // Use product.images if available, otherwise fall back to default placeholders
  const images = product?.images?.length > 0 ? product.images : defaultImages;

  // Initialize selectedImage state to 0 (first image in the array)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fallback for when product data or images are not provided
  if (!product || !images || images.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        No product images available.
      </div>
    );
  }

  return (
    // Outer container for the gallery, potentially spanning columns in a grid layout
    <div className="flex gap-4"> {/* Changed to flex for horizontal arrangement of thumbs and main image */}
      {/* Thumbnails Column (left side) */}
      <div className="flex flex-col gap-2">
        {images.map((imgSrc, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`
              w-[70px] h-[70px] rounded-lg overflow-hidden relative flex-shrink-0
              border-2 transition-all duration-200
              ${selectedImageIndex === index ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <Image
              src={imgSrc}
              alt={`Product thumbnail ${index + 1}`}
              width={70}
              height={70}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Main Product Image (right side) */}
      <div className="flex-grow w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden relative border border-gray-200">
        <Image
          src={images[selectedImageIndex]} // Display the currently selected image
          alt="Main product image"
          fill // Use fill to make the image cover its parent container
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizes
          className="object-cover" // Ensure the image covers the container
          priority={selectedImageIndex === 0} // Prioritize loading the first image
        />
      </div>
    </div>
  );
};

export default ProductGallery;