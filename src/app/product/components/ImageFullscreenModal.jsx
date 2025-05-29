// 'use client'; // This component uses client-side hooks and event handlers

// import Image from 'next/image';

// const ImageFullscreenModal = ({ isOpen, images, selectedImageIndex, onClose, onNavigate }) => {
//   // If the modal is not open, or there are no images, or the images array is invalid, don't render anything.
//   if (!isOpen || !Array.isArray(images) || images.length === 0) {
//     return null;
//   }

//   // Ensure selectedImageIndex is within valid bounds
//   const validatedIndex = Math.max(0, Math.min(selectedImageIndex, images.length - 1));
//   const currentImageSrc = images[validatedIndex];

//   // Function to navigate to the previous image
//   const handlePrev = () => {
//     // Calculate the new index, wrapping around to the end if at the beginning
//     const newIndex = (validatedIndex - 1 + images.length) % images.length;
//     onNavigate(newIndex);
//   };

//   // Function to navigate to the next image
//   const handleNext = () => {
//     // Calculate the new index, wrapping around to the beginning if at the end
//     const newIndex = (validatedIndex + 1) % images.length;
//     onNavigate(newIndex);
//   };

//   return (
//     // Overlay container: fixed position, covers whole screen, dark background, centered content
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
//       {/* Close Button */}
//       <button
//         onClick={onClose} // Calls the onClose prop to close the modal
//         className="absolute top-4 right-4 z-50 text-white text-2xl hover:text-gray-300 transition-colors"
//         aria-label="Close full-screen image"
//       >
//         {/* SVG for a close icon (X) */}
//         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
//         </svg>
//       </button>

//       {/* Previous Image Navigation Button */}
//       {/* Render only if there's more than one image to navigate */}
//       {images.length > 1 && (
//         <button
//           onClick={handlePrev}
//           className="absolute left-4 z-40 p-3 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-opacity"
//           aria-label="Previous image"
//         >
//           {/* SVG for a left arrow */}
//           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
//           </svg>
//         </button>
//       )}

//       {/* Next Image Navigation Button */}
//       {/* Render only if there's more than one image to navigate */}
//       {images.length > 1 && (
//         <button
//           onClick={handleNext}
//           className="absolute right-4 z-40 p-3 bg-white bg-opacity-20 rounded-full text-white hover:bg-opacity-40 transition-opacity"
//           aria-label="Next image"
//         >
//           {/* SVG for a right arrow */}
//           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
//           </svg>
//         </button>
//       )}

//       {/* Fullscreen Image Display */}
//       <div className="relative w-full h-full max-w-screen-xl max-h-screen-xl flex items-center justify-center">
//         <Image
//           src={currentImageSrc}
//           alt="Full screen product image"
//           fill // `fill` property makes the image cover the parent div, which is then constrained by max-w/h
//           sizes="100vw" // Indicates the image will be as wide as the viewport (critical for performance)
//           className="object-contain" // Ensures the entire image is visible, fitting within the container
//           priority // Prioritizes loading this image as it's the primary content of the modal
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageFullscreenModal;