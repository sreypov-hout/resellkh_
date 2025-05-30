// File: src/app/(main)/profile/[userId]/page.jsx
'use client';

import ProfileBanner from '@/components/profile/ProfileBanner';
import ListingsGrid from '@/components/profile/ListingsGrid';
import ProfileTabs from '@/components/profile/ProfileTabs';
import CartPoduct from '@/components/domain/CartProduct';

export default function SellerProfilePage() {

 const userData = {
  name: 'Bou Leakhena',
  avatar: '/girl 2.jpg',
  cover: '/cover.jpg',
  rating: 4.8,
  reviewsCount: 112,
};

  return (
    <div className="max-w-7xl mx-auto p-4">
      <ProfileBanner isOwner={false} user={userData} />
      <ProfileTabs />
      <ListingsGrid editable={false} />
      <CartPoduct />
    </div>
  );
}
