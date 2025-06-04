'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageFullscreenModal from './ImageFullscreenModal'; // Import the fullscreen modal component

const ProductGallery = ({ product }) => {
  const defaultMediaItems = [
    'https://raw.githubusercontent.com/Ankhun/Next.js-E-Commerce-Page-Example/main/public/images/lulu-main.jpeg',
    'https://raw.githubusercontent.com/Ankhun/Next.js-E-Commerce-Page-Example/main/public/images/lulu-thumb1.jpeg',
    'https://raw.githubusercontent.com/Ankhun/Next.js-E-Commerce-Page-Example/main/public/images/lulu-thumb2.jpeg',
    'https://raw.githubusercontent.com/Ankhun/Next.js-E-Commerce-Page-Example/main/public/images/lulu-thumb3.jpeg',
    '/Product-Detail-Image/video.mp4', // Placeholder for a video thumbnail/still
  ];

  
  const mediaItems = product?.images?.length > 0 ? product.images : defaultMediaItems;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false); // State to control modal visibility

  const isSelectedMediaVideo = selectedImageIndex === (mediaItems.length - 1) && mediaItems.length > 0;

  // Filter out the video thumbnail for the fullscreen image modal
  const imagesForFullscreen = mediaItems.filter((_, idx) => !((idx === mediaItems.length - 1) && mediaItems.length > 0 && isSelectedMediaVideo));

  if (!product || !mediaItems || mediaItems.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8 border rounded-lg">
        No product images or media available.
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails Column */}
      <div className="flex flex-col gap-2">
        {mediaItems.map((itemSrc, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`
              w-[94px] h-[94px] rounded-lg overflow-hidden relative flex-shrink-0
              border-2 transition-all duration-200
              ${selectedImageIndex === index ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}
            `}
            aria-label={`Select media item ${index + 1}`}
          >
            <Image
              src={itemSrc}
              alt={`Product thumbnail ${index + 1}`}
              width={70}
              height={70}
              className="object-cover w-full h-full"
            />
            {/* Play icon overlay for the video thumbnail */}
            {index === (mediaItems.length - 1) && mediaItems.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Product Display Area */}
      <div className="flex-grow w-full h-[400px] md:h-[300px] lg:h-[400px] rounded-lg overflow-hidden relative border border-gray-200">
        {isSelectedMediaVideo ? (
          // Render Video Player if the selected media item is a video
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white">
            <video
              src="/Product-Detail-Image/video.mp4" // **IMPORTANT: Replace with your actual video URL**
              controls
              loop
              muted
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          // Render Image if the selected media item is an image
          <div
            // This is the click handler that opens the fullscreen modal
            onClick={() => setIsFullscreenOpen(true)}
            className="cursor-pointer w-full h-full relative"
          >
            <Image
              src={mediaItems[selectedImageIndex]}
              alt="Main product image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={selectedImageIndex === 0}
            />
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal - rendered conditionally */}
      <ImageFullscreenModal
        isOpen={isFullscreenOpen}
        images={imagesForFullscreen} // Pass filtered images to the modal
        selectedImageIndex={imagesForFullscreen.findIndex(src => src === mediaItems[selectedImageIndex])}
        onClose={() => setIsFullscreenOpen(false)} // Callback to close the modal
        onNavigate={(newModalIndex) => {
          const originalIndex = mediaItems.indexOf(imagesForFullscreen[newModalIndex]);
          setSelectedImageIndex(originalIndex !== -1 ? originalIndex : 0);
        }}
      />
    </div>
  );
};

export default ProductGallery;