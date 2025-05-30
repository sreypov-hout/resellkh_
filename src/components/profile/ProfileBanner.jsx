'use client';
import Image from 'next/image';

export default function ProfileBanner({ isOwner, user }) {
  const {
    name = 'Bou Leakhena',
    avatar = '/images/avatar.jpg',
    cover = '/images/profile-cover.jpg',
    rating = 4.5,
    reviewsCount = 59,
  } = user || {};

  return (
    <div className="relative w-full mb-6">
      {/* Cover Image */}
      {/* <div className="w-full h-[140px] rounded-2xl overflow-hidden">
        <Image
          src="/cover.jpg"
          alt="Cover"
          width={1200}
          height={140}
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className="relative w-full h-[140px] rounded-2xl overflow-hidden">
  <Image
    src="/cover.jpg"
    alt="Cover"
    fill
    className="object-cover"
  />
</div>


      {/* Info Card */}
      <div className="absolute left-6 -bottom-5 right-6 bg-white rounded-xl shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <Image
            src={avatar}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-base font-semibold text-black">{name}</h2>
            <p className="text-sm text-gray-500">Profile Detail &gt;</p>
          </div>
        </div>

        {/* Rating + Edit */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              {rating} <span className="text-orange-500">⭐</span>
            </p>
            <p className="text-xs text-gray-500">{reviewsCount} reviews</p>
          </div>

          {isOwner && (
            <button className="border px-4 py-1 rounded-full text-sm hover:bg-gray-100">
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
