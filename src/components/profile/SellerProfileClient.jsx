"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProfileBanner from "@/components/profile/ProfileBanner";
import ProfileTabs from "@/components/profile/ProfileTabs";

export default function SellerProfileClient({ sellerId }) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "listings";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const [userData, setUserData] = useState(null);
  const [ratingSummary, setRatingSummary] = useState({ rating: 0, reviewsCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchData() {
      setLoading(true);
      try {
        // Fetch profile info
        const profileRes = await fetch(
          `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/profile/${sellerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!profileRes.ok) throw new Error("Failed to load profile data");
        const profileData = await profileRes.json();

        // Fetch rating summary
        const ratingRes = await fetch(
          `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/ratings/summary/${sellerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!ratingRes.ok) throw new Error("Failed to load rating summary");
        const ratingData = await ratingRes.json();

        if (profileData?.payload) {
          setUserData({
            id: sellerId,
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [sellerId]);

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!userData) return <div className="p-8 text-center">Profile not found</div>;

  return (
    <div className="max-w-full px-[7%] py-4 mx-auto">
      <ProfileBanner
        isOwner={true}
        user={{ ...userData }}
        rating={ratingSummary.rating}
        reviewsCount={ratingSummary.reviewsCount}
      />
      <ProfileTabs sellerId={sellerId} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
