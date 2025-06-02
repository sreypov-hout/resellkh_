'use client'; // This component uses client-side hooks and event handlers

import Image from 'next/image';

const ImageFullscreenModal = ({ isOpen, images, selectedImageIndex, onClose, onNavigate }) => {
  if (!isOpen || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const validatedIndex = Math.max(0, Math.min(selectedImageIndex, images.length - 1));
  const currentImageSrc = images[validatedIndex]; // `images` is now expected to be an array of strings

  const handlePrev = () => {
    const newIndex = (validatedIndex - 1 + images.length) % images.length;
    onNavigate(newIndex);
  };

  const handleNext = () => {
    const newIndex = (validatedIndex + 1) % images.length;
    onNavigate(newIndex);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white text-2xl hover:text-gray-300 transition-colors"
        aria-label="Close full-screen image"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 z-40 p-3 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-opacity"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 z-40 p-3 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-opacity"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </>
      )}

      <div className="relative w-full h-full max-w-screen-xl max-h-screen-xl flex items-center justify-center">
        <Image
          src={currentImageSrc}
          alt="Full screen product image"
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default ImageFullscreenModal;