'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Notifications() {
  const allNotifications = [
    {
      id: 1,
      type: 'New Arrival',
      content:
        'Big Savings Inside! Don’t miss out on our limited-time sale. Get [Percentage]% off or [Specific Offer] on ...',
      avatar: '/images/avatar.jpg',
      timestamp: 'Just Now',
      unread: true,
    },
    {
      id: 2,
      type: 'New Arrival',
      content:
        'Limited Stock Alert! Popular items are selling fast. Grab yours before they’re gone! Shop now and avoid ...',
      avatar: '/images/avatar.jpg',
      timestamp: '30 mins ago',
      unread: true,
    },
    {
      id: 3,
      type: 'Promotion',
      content:
        'Free Shipping on All Orders! Shop your favorites and enjoy the convenience of free delivery straight to ...',
      avatar: '/images/avatar.jpg',
      timestamp: '1h ago',
      unread: false,
    },
    {
      id: 4,
      type: 'Promotion',
      content:
        'Free Shipping on All Orders! Shop your favorites and enjoy the convenience of free delivery straight to ...',
      avatar: '/images/avatar.jpg',
      timestamp: '19/05/2025',
      unread: false,
    },
  ];

  const [activeTab, setActiveTab] = useState('all');

  const filtered = allNotifications.filter((n) =>
    activeTab === 'all' ? true : n.unread
  );

  const today = filtered.filter(
    (n) => n.timestamp.includes('ago') || n.timestamp.toLowerCase().includes('now')
  );

  const lastWeek = filtered.filter((n) =>
    n.timestamp.includes('/') || n.timestamp.toLowerCase().includes('week')
  );

  return (
    <section className="w-full px-[7%] py-6">
      <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">Notifications</h1>

        {/* Tabs */}
        <div className="flex justify-center items-center gap-10 border-b pb-4 mb-6 text-sm sm:text-base">
        {['all', 'unread'].map((tab) => {
            const isActive = activeTab === tab;
            const count = tab === 'all'
            ? allNotifications.length
            : allNotifications.filter((n) => n.unread).length;

            return (
            <button key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 font-medium relative pb-1 transition ${
                    isActive ? 'text-black border-b-2 border-black' : 'text-gray-600'
                }`}
                >
                <span className="bg-orange-500 text-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                    {count}
                </span>
                <span>{tab === 'all' ? 'All' : 'Unread'}</span>
            </button>

            );
        })}
        </div>


        {/* Sections */}
        <Section title="Today" data={today} />
        <Section title="Last week" data={lastWeek} />
      </div>
    </section>
  );
}

function Section({ title, data }) {
  if (!data.length) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        🕴 {title}
      </h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="flex items-start gap-3 sm:gap-5">
            {/* Avatar */}
            <Image
            src="/image-notifications.png"
            alt="avatar"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
            />

            {/* Notification Box */}
            <div className="flex-1">
              <div className="bg-[#eee7e7] w-full rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-black">{item.type}</h3>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {item.content}
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap mt-2 sm:mt-0">
                  {item.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}