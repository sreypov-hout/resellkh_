'use client';
import Image from 'next/image';
<<<<<<< HEAD
=======
import { FaStar } from 'react-icons/fa';
>>>>>>> 012a99af528bde3de99030490b7794b9fbe72c1c

export default function ProfileBanner({ isOwner, user }) {
  const {
    name = 'Bou Leakhena',
    avatar = '/images/avatar.jpg',
<<<<<<< HEAD
    cover = '/images/profile-cover.jpg',
    rating = 4.5,
    reviewsCount = 59,
=======
    cover = 'cover.jpg',
    rating = null,
    reviewsCount = null,
>>>>>>> 012a99af528bde3de99030490b7794b9fbe72c1c
  } = user || {};

  return (
    <div className="relative w-full mb-6">
      {/* Cover Image */}
<<<<<<< HEAD
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
=======
      <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
        <Image
          src={cover}
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>


      {/* Info Card */}
      <div className="absolute left-6 h-[100px] -bottom-5 right-6 bg-white rounded-xl shadow px-6 py-4 flex items-center justify-between">
>>>>>>> 012a99af528bde3de99030490b7794b9fbe72c1c
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
<<<<<<< HEAD
            <p className="text-sm font-medium text-gray-800">
              {rating} <span className="text-orange-500">⭐</span>
            </p>
            <p className="text-xs text-gray-500">{reviewsCount} reviews</p>
=======
            {reviewsCount > 0 ? (
              <>
                <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  {rating}
                  <FaStar className="w-[15px] h-[15px] text-orange-500" />
                </p>
                <p className="text-xs text-gray-500">{reviewsCount} reviews</p>

              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-800 pe-[30px]">N/A</p>
                <p className="text-xs text-gray-500 pe-1">No reviews yet</p>
              </>
            )}
>>>>>>> 012a99af528bde3de99030490b7794b9fbe72c1c
          </div>

          {isOwner && (
            <button className="border px-4 py-1 rounded-full text-sm hover:bg-gray-100">
              Edit Profile
            </button>
          )}
        </div>
<<<<<<< HEAD
=======

>>>>>>> 012a99af528bde3de99030490b7794b9fbe72c1c
      </div>
    </div>
  );
}
