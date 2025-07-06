'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa';

export default function SellerInfo({ sellerId }) {
  const [user, setUser] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);

    if (!sellerId || !tokenFromStorage) return;

    const fetchProfileAndRating = async () => {
      try {
        const [profileRes, ratingRes] = await Promise.all([
          fetch(
            `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/profile/${sellerId}`,
            {
              headers: {
                Authorization: `Bearer ${tokenFromStorage}`,
                Accept: '*/*',
              },
            }
          ),
          fetch(
            `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/ratings/summary/${sellerId}`,
            {
              headers: {
                Authorization: `Bearer ${tokenFromStorage}`,
                Accept: '*/*',
              },
            }
          )
        ]);

        const profileData = await profileRes.json();
        const ratingSummary = await ratingRes.json();

        if (profileRes.ok && profileData.payload) {
          setUser(profileData.payload);
        } else {
          console.error('Failed to fetch seller:', profileData.message);
        }

        if (ratingRes.ok && ratingSummary.payload) {
          setRatingData(ratingSummary.payload);
        } else {
          console.error('Failed to fetch rating summary:', ratingSummary.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchProfileAndRating();
  }, [sellerId]);

  if (!user) {
    return <div className="text-gray-500">Loading seller info...</div>;
  }

  const rating = ratingData?.rating || 0;
  const reviewsCount = ratingData?.reviewsCount || 0;

  return (
    <div className="bg-[#EBE6E8] rounded-xl p-6 shadow-sm">
      {/* Clickable seller card */}
      <div
        className="flex items-center space-x-3 mb-4 cursor-pointer"
        onClick={() => router.push(`/profile/${sellerId}`)}
      >
        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
          <Image
            src={user.profileImage || '/default.jpg'}
            alt="Seller"
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{user.userName || 'Unknown Seller'}</h4>
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(rating) ? 'text-orange-500' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ms-4 mt-[2px]">{reviewsCount} reviews</span>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div className="text-sm text-t-black mb-4">
        <p>Tel: {user.phoneNumber || 'N/A'}</p>
      </div>

      {/* Telegram Button */}
      <a href={user.telegramUrl || '#'} target="_blank" rel="noopener noreferrer">
        <button className="w-full bg-orange-500 text-white py-2 rounded-[50px] font-medium hover:bg-orange-600 transition-colors">
          Telegram
        </button>
      </a>
    </div>
  );
}
