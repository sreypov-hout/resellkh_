"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProfileBanner from "@/components/profile/ProfileBanner";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { decryptId } from "@/utils/encryption";

// --- Skeleton Components for Loading State ---

/**
 * @description Renders a skeleton placeholder for the profile banner.
 */
const ProfileBannerSkeleton = () => (
  <div className="relative mb-6">
    {/* Cover Image Placeholder */}
    <div className="h-48 w-full animate-pulse rounded-lg bg-gray-300 sm:h-64" />
    <div className="absolute bottom-0 left-6 flex -translate-y-1/2 transform items-end">
      {/* Avatar Placeholder */}
      <div className="mr-4 h-24 w-24 animate-pulse rounded-full border-4 border-white bg-gray-300 sm:h-32 sm:w-32" />
      <div className="flex flex-col gap-2">
        {/* Name Placeholder */}
        <div className="h-6 w-40 animate-pulse rounded bg-gray-300" />
        {/* Rating Placeholder */}
        <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
      </div>
    </div>
  </div>
);

/**
 * @description Renders a skeleton placeholder for the profile tabs and content.
 */
const ProfileTabsSkeleton = () => (
  <div className="mt-8">
    <div className="flex border-b border-gray-200">
      {/* Tab Placeholders */}
      <div className="mr-8 h-10 w-24 animate-pulse rounded-t-lg bg-gray-300" />
      <div className="mr-8 h-10 w-24 animate-pulse rounded-t-lg bg-gray-300" />
      <div className="h-10 w-24 animate-pulse rounded-t-lg bg-gray-300" />
    </div>
    {/* Tab Content Placeholder */}
    <div className="mt-6 h-64 w-full animate-pulse rounded-lg bg-gray-300" />
  </div>
);

/**
 * @description A wrapper component that combines all skeleton elements for the page.
 */
const SellerProfileSkeleton = () => (
  <div className="mx-auto max-w-full px-[7%] py-4">
    <ProfileBannerSkeleton />
    <ProfileTabsSkeleton />
  </div>
);

// --- Main Profile Client Component ---

export default function SellerProfileClient({ sellerId }) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "listings";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const [userData, setUserData] = useState(null);
  const [ratingSummary, setRatingSummary] = useState({ rating: 0, reviewsCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const numericSellerId = useMemo(() => {
    try {
      const decoded = decodeURIComponent(sellerId);
      const decrypted = decryptId(decoded);
      console.log("Encrypted sellerId from URL:", sellerId);
      console.log("Decrypted numeric sellerId:", decrypted);
      return decrypted;
    } catch (err) {
      console.error("Failed to decode or decrypt sellerId:", err);
      return null;
    }
  }, [sellerId]);

  useEffect(() => {
    // We set loading to true initially, and only set it to false
    // after the first data fetch attempt completes (successfully or not).
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!numericSellerId) {
      setError("Invalid seller ID");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const [profileRes, ratingRes] = await Promise.all([
          fetch(
            `https://trivia-worlds-wichita-stan.trycloudflare.com/api/v1/profile/${numericSellerId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          fetch(
            `https://trivia-worlds-wichita-stan.trycloudflare.com/api/v1/ratings/summary/${numericSellerId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        if (!profileRes.ok) throw new Error("Failed to load profile data");
        if (!ratingRes.ok) throw new Error("Failed to load rating summary");

        const profileData = await profileRes.json();
        const ratingData = await ratingRes.json();

        if (profileData?.payload) {
          setUserData({
            id: numericSellerId,
            name: `${profileData.payload.firstName || ""} ${profileData.payload.lastName || ""}`.trim(),
            avatar: profileData.payload.profileImage || null,
            cover: profileData.payload.coverImage || null,
          });
        }

        if (ratingData?.payload) {
          setRatingSummary({
            rating: ratingData.payload.rating,
            reviewsCount: ratingData.payload.reviewsCount,
          });
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching profile or rating:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [numericSellerId]);

  // Render skeleton UI while loading
  if (loading) return <SellerProfileSkeleton />;
  
  if (error) return <div className="p-6 text-center text-red-500 sm:p-8">{error}</div>;
  if (!userData) return <div className="p-6 text-center sm:p-8">Profile not found</div>;

  return (
    <div className="mx-auto max-w-full px-[7%] py-4">
      <ProfileBanner
        isOwner={true} // Note: This is hardcoded as per your original code
        user={{ ...userData }}
        rating={ratingSummary.rating}
        reviewsCount={ratingSummary.reviewsCount}
      />
      <ProfileTabs
        sellerId={numericSellerId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}