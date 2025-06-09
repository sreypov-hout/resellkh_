'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '@/components/layout/Footer';

const mockMedia = [
  '/Product-Detail-Image/image1.png',
  '/Product-Detail-Image/image2.png',
  '/Product-Detail-Image/image3.png',
  '/Product-Detail-Image/video.mp4',
];

export default function FullscreenMediaPage({ params }) {
  const router = useRouter();
  const { productId, mediaIndex } = params;
  const index = parseInt(mediaIndex, 10);
  const media = mockMedia[index];
  const isVideo = media?.endsWith('.mp4');

  if (!media) {
    return <div className="text-center text-red-600 py-10">Media not found</div>;
  }

  const goTo = (i) => {
    if (i >= 0 && i < mockMedia.length) {
      router.push(`/product/${productId}/media/${i}`);
    }
  };

  const closePage = () => {
    router.push(`/product/${productId}`);
  };

  return (
    <>
      <main className="bg-white min-h-screen px-4 sm:px-6 lg:px-[7%] py-6 text-black">
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span> / <span className="text-orange-500">Detail</span>
        </nav>

        <div className="relative flex flex-col items-center justify-center">
          {/* Left arrow */}
          {index > 0 && (
            <button
              onClick={() => goTo(index - 1)}
              className="absolute left-0 top-[180px] bg-white text-black rounded-full p-2 shadow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Main media */}
          <div className="relative w-[376px] h-[376px] rounded-2xl overflow-hidden">
            {isVideo ? (
              <video
                src={media}
                controls
                autoPlay
                loop
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <Image
                src={media}
                alt={`media-${index}`}
                width={376}
                height={376}
                className="object-cover rounded-2xl"
                priority
              />
            )}
          </div>

          {/* Right arrow */}
          {index < mockMedia.length - 1 && (
            <button
              onClick={() => goTo(index + 1)}
              className="absolute right-0 top-[180px] bg-white text-black rounded-full p-2 shadow"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Close button */}
          <button
            onClick={closePage}
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-black text-2xl"
          >
            ×
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          {mockMedia.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative w-[94px] h-[94px] rounded-xl overflow-hidden border-2 ${
                i === index ? 'border-orange-500' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {item.endsWith('.mp4') ? (
                <>
                  <video muted className="w-full h-full object-cover">
                    <source src={item} />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              ) : (
                <Image
                  src={item}
                  alt={`thumb-${i}`}
                  width={70}
                  height={70}
                  className="object-cover w-full h-full"
                />
              )}
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
