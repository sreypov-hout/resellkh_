'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

export default function FullscreenImagePage() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('src');
  const router = useRouter();

  if (!imageUrl) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        No image found.
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-white relative flex flex-col items-center justify-center overflow-hidden">
      {/* Close Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-5 right-5 text-gray-800 hover:text-black text-xl z-50"
        aria-label="Close Fullscreen"
      >
        <FaTimes />
      </button>

      {/* Fullscreen Image */}
      <div className="max-w-3xl w-full px-4">
        <div className="relative w-full aspect-[3/4] max-h-[80vh] mx-auto shadow-md rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt="Fullscreen product image"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
