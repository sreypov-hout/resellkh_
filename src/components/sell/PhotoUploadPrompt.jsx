// src/components/sell/PhotoUploadPrompt.jsx
'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useFiles } from '@/context/FileContext'; // Import the custom hook

export default function PhotoUploadPrompt() {
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { setUploadedFiles } = useFiles(); // Get the setter function from context

  const handleFiles = (files) => {
    // We get the raw File objects, not Data URLs
    const selectedFiles = Array.from(files).slice(0, 5);

    // Set the files in the global context state
    setUploadedFiles(selectedFiles);

    // Navigate to the next page
    router.push('/sell/new');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="bg-orange-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center h-80 p-6 text-center group hover:border-orange-400 hover:bg-orange-100 transition-colors duration-300 cursor-pointer"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="mb-4">
        <img src="/images/story set/image.jpg" alt="Upload Icon" className='w-[40px]' />
      </div>
      <div className="mb-4">
        <span className="px-6 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
          Select photos
        </span>
      </div>
      <p className="text-gray-700 text-[15px]">
        or drag photo here <br /> (up to 5 photos/videos)
      </p>
    </div>
  );
}