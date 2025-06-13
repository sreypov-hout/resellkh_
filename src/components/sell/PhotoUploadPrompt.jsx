// components/PhotoUploadPrompt.jsx
'use client';
import Link from 'next/link';
import { ImagePlus } from 'lucide-react';

export default function PhotoUploadPrompt() {
  return (
    <Link href="/sell/new" className="block">
      <div className="bg-orange-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center h-80 p-6 text-center group hover:border-orange-400 hover:bg-orange-100 transition-colors duration-300">
        <div className="mb-4">
          <ImagePlus className="w-12 h-12 text-gray-400 group-hover:text-orange-500" />
        </div>
        <div className="mb-4">
          <span className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg shadow-sm group-hover:bg-orange-600">
            Select photos
          </span>
        </div>
        <p className="text-gray-500">
          or drag photo here <br /> (up to 5 photos/videos)
        </p>
      </div>
    </Link>
  );
}
