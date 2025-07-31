'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * NOTE: To hide the scrollbar, add the following CSS to your global stylesheet (e.g., globals.css):
 *
 * .no-scrollbar::-webkit-scrollbar {
 * display: none;
 * }
 * .no-scrollbar {
 * -ms-overflow-style: none;
 * scrollbar-width: none;
 * }
 */

const isVideoMime = async (url) => {
  try {
    // Use a HEAD request to get headers without downloading the full file
    const res = await fetch(url, { method: 'HEAD' });
    const type = res.headers.get('Content-Type');
    return type?.startsWith('video/');
  } catch (err) {
    console.error('Error checking MIME type:', err);
    return false; // Assume it's not a video on error
  }
};

// Simple skeleton box component for loading states
const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const ProductGallery = ({ product }) => {
  const mediaItems = product?.fileUrls ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mediaTypes, setMediaTypes] = useState([]); // Stores 'video' or 'image' for each item

  useEffect(() => {
    const detectMediaTypes = async () => {
      // Check each URL to determine if it's a video or image
      const types = await Promise.all(
        mediaItems.map(async (url) => (await isVideoMime(url) ? 'video' : 'image'))
      );
      setMediaTypes(types);
    };

    if (mediaItems.length > 0) {
      detectMediaTypes();
    }
  }, [mediaItems]);

  // Show a skeleton UI while media types are being determined to prevent layout shifts
  if (mediaTypes.length !== mediaItems.length) {
    return (
      <div className="flex flex-row gap-3 w-full max-w-full overflow-hidden">
        {/* Thumbnails skeleton (vertical column) */}
        <div className="flex flex-col gap-2">
          {[...Array(Math.min(mediaItems.length, 5) || 1)].map((_, i) => (
            <SkeletonBox
              key={i}
              className="w-[84px] h-[64px] sm:w-[94px] sm:h-[94px] rounded-lg"
            />
          ))}
        </div>

        {/* Main media skeleton */}
        <div className="flex-grow w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden border border-gray-200 relative">
          <SkeletonBox className="w-full h-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 w-full max-w-full overflow-hidden">
      {/* Thumbnails - vertical layout with hidden scrollbar */}
      <div className="flex flex-col gap-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto no-scrollbar">
        {mediaItems.map((src, index) => {
          const isVideo = mediaTypes[index] === 'video';

          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              aria-current={selectedIndex === index ? 'true' : undefined}
              className={`relative w-[84px] h-[64px] sm:w-[94px] sm:h-[94px] rounded-lg overflow-hidden border transition-all flex-shrink-0 ${
                selectedIndex === index
                  ? 'border-orange-500 ring-2 ring-orange-500'
                  : 'border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500'
              }`}
            >
              {isVideo ? (
                <video
                  src={src}
                  muted
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  width={94}
                  height={94}
                  className="w-full h-full object-cover"
                  priority={index < 5} // Prioritize loading for the first few images
                />
              )}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 pointer-events-none">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Media Display */}
      <div className="flex-grow w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden border border-gray-200 relative">
        {mediaItems.length > 0 ? (
          mediaTypes[selectedIndex] === 'video' ? (
            <video
              key={mediaItems[selectedIndex]} // Add key to force re-render on source change
              src={mediaItems[selectedIndex]}
              controls
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <Link
              href={`/product/${product.productId}/media/${selectedIndex}`}
              className="block w-full h-full relative"
            >
              <Image
                src={mediaItems[selectedIndex]}
                alt="Main product image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </Link>
          )
        ) : (
          // Placeholder for when there are no images
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
             <Image
                  src={'/images/placeholder.jpg'}
                  alt="Placeholder image"
                  fill
                  className="object-cover"
              />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
