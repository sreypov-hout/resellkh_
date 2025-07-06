"use client";

import { FaStar } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function ProfileBanner({ isOwner, user, rating = 0, reviewsCount = 0 }) {
  const { name, avatar, cover, id } = user || {};

  return (
    <div className="relative w-full mb-12">
      {/* Cover Image */}
      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden bg-gray-100">
        {cover ? (
          <Image src={cover} alt="Cover" fill className="object-cover w-full h-full" priority />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-100 to-purple-100" />
        )}
      </div>

      {/* Info Card */}
      <div className="absolute left-6 -bottom-5 right-6 h-[100px] bg-white rounded-xl shadow-md px-6 py-4 flex items-center justify-between z-10">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
            {avatar ? (
              <Image src={avatar} alt="User Avatar" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-600">{name?.charAt(0)?.toUpperCase() || "U"}</span>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-base font-semibold text-black line-clamp-1">{name || "User"}</h2>
            <Link href={`/profile/${id}`} className="text-sm text-gray-500 hover:text-orange-500 transition-colors">
              Profile Detail &gt;
            </Link>
          </div>
        </div>

        {/* Rating + Edit Button */}
        <div className="flex items-center gap-6">
          <div className="text-right min-w-[80px]">
            {reviewsCount > 0 ? (
              <>
                <p className="text-sm font-medium text-gray-800 flex items-center justify-end gap-1">
                  {rating.toFixed(1)}
                  <FaStar className="w-3.5 h-3.5 text-orange-500" />
                </p>
                <p className="text-xs text-gray-500">
                  {reviewsCount} review{reviewsCount !== 1 ? "s" : ""}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-800">No ratings</p>
                <p className="text-xs text-gray-500">Not rated yet</p>
              </>
            )}
          </div>

          {isOwner && (
            <Link
              href="/profile/edit-profile"
              className="border border-gray-300 px-4 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
