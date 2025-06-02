'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMapPin, FiCamera } from 'react-icons/fi';
import { BsBookmark, BsBell } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';
import Image from 'next/image';
import SearchBar from './navbar/SearchBar';
import LocationDropdown from './navbar/LocationDropdown';
import ImageScanModal from './navbar/ImageScanModal';
import Link from 'next/link';
export default function AuthNavbar({ user = { name: 'User', avatar: '/image.png' } }) {
  const [scanOpen, setScanOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full px-[7%] py-6">
      <div className="max-w-screen-full mx-auto flex flex-col gap-3">
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          {/* Logo */}
            <img src="/logo.png" alt="ResellKH Logo" onClick={() => router.push('/')}
            className="text-2xl cursor-pointer h-[40px] "/>
          

          {/* Category Links */}
          <nav className="hidden md:flex gap-6 text-sm text-gray-800">
            <Link href="#" className="hover:text-orange-500">Fashion</Link>
            <Link href="#" className="hover:text-orange-500">Accessories</Link>
            <Link href="#" className="hover:text-orange-500">Sport</Link>
            <Link href="#" className="hover:text-orange-500">Beauty</Link>
            <Link href="#" className="hover:text-orange-500">Book</Link>
            <Link href="#" className="hover:text-orange-500 flex items-center gap-1">
                <BiCategoryAlt className="text-[17px]" /> All Categories 
            </Link>
          </nav>

          {/* Icons + Avatar + Sell */}
          <div className="flex items-center gap-4 text-gray-700 text-lg">
            <Link href="/" className="cursor-pointer hover:text-orange-500">
            <BsBookmark className="cursor-pointer hover:text-orange-500" />
            </Link>
            <Link href="/notifications" className="cursor-pointer hover:text-orange-500">
            <div className="relative">
              <BsBell className="cursor-pointer text-xl hover:text-orange-500" />
              <span className="absolute left-2 -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </div>
            </Link>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full object-cover cursor-pointer"
            />
            <button
              onClick={() => router.push('/sell')}
              className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-orange-600"
            >
              Sell
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 mt-2">
         
          <SearchBar />
          <LocationDropdown />

        </div>
      </div>

      {/* Image Scan Modal */}
      <ImageScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
      

      
    </header>
  );
}
