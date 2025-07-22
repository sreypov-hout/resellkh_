'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { fileStore } from '@/lib/fileStore'; // CORRECTED: lowercase 's'

export default function PhotoUploadPrompt() {
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    
    // Store the actual File objects in our simple store
    fileStore.files = Array.from(files).slice(0, 5);

    // Navigate to the next page
    router.push('/sell/new');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      className="bg-orange-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center h-80 p-6 text-center group hover:border-orange-400 hover:bg-orange-100 transition-colors duration-300 cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
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