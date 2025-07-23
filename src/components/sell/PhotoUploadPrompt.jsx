'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { setUploadedFiles } from '@/utils/fileStore'; // FIX: Import the file store
import { toast } from 'react-hot-toast';

export default function PhotoUploadPrompt() {
  const fileInputRef = useRef(null);
  const router = useRouter();

  // FIX: This function now processes the files and uses the store
  const handleFiles = (files) => {
    // Convert FileList to an array and validate
    const selectedFiles = Array.from(files).filter(file =>
      (file.type.startsWith('image/') || file.type.startsWith('video/')) &&
      file.size <= 20 * 1024 * 1024 // 20MB limit
    );

    if (selectedFiles.length === 0 && files.length > 0) {
        toast.error("No valid files selected. Please choose images or videos under 20MB.");
        return;
    }

    if (selectedFiles.length < files.length) {
        toast.error("Some files were too large (max 20MB) and were ignored.");
    }
    
    // Limit to 5 files
    const finalFiles = selectedFiles.slice(0, 5);

    // Store the files in our temporary in-memory store
    setUploadedFiles(finalFiles);
    
    // Redirect to the new sell page
    router.push('/sell/new');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
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