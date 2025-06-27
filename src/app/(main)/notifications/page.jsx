'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode'; // Corrected named import for jwt-decode
import { isToday, isWithinInterval, parseISO, formatDistanceToNowStrict } from 'date-fns';

// Helper function to get the start of 'today' and '7 days ago' for robust filtering
const getIntervals = () => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of current day
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7); // Exactly 7 days ago from now (might include today if it's the 7th day)
  // For "last week" meaning "past 7 days *excluding today*", adjust the end to just before today
  const endOfYesterday = new Date(startOfToday);
  endOfYesterday.setDate(startOfToday.getDate() - 1); // End of the day before today

  return { startOfToday, sevenDaysAgo, endOfYesterday };
};

export default function NotificationsPage() { // Changed component name back to NotificationsPage for clarity
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to store any fetch errors
  const [activeTab, setActiveTab] = useState('all');

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors before a new fetch
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, we can't fetch. Log error and set message.
        console.warn('No authentication token found. User needs to log in.');
        throw new Error('Authentication required: Please log in to view notifications.');
      }

      const decoded = jwtDecode(token);
      // Use nullish coalescing for userId for safer access
      const userId = decoded?.id ?? decoded?.userId;

      if (!userId) {
        throw new Error('User ID not found in token. Token might be invalid or malformed.');
      }

      // --- API Endpoint: Make sure this is correct for your backend ---
      const apiUrl = `https://consumers-journalist-locate-keep.trycloudflare.com/api/v1/notifications/${userId}`;
      console.log(`Fetching notifications from: ${apiUrl}`); // Debugging API call

      const res = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in headers for authorization
        }
      });

      if (!res.ok) {
        // Attempt to parse a more specific error message from the response body
        const errorData = await res.json().catch(() => ({})); // Catch JSON parsing errors
        const errorMessage = errorData.message || res.statusText || `HTTP error! Status: ${res.status}`;
        throw new Error(`Failed to fetch notifications: ${errorMessage}`);
      }

      const data = await res.json();
      setAllNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.message); // Set the user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Dependency array is empty so it runs once on mount.
    // If you need to re-fetch on user ID change or token change, add them here.
  }, []);

  // Filter notifications based on activeTab
  const filtered = allNotifications.filter((n) =>
    activeTab === 'all' ? true : n.unread
  );

  const { startOfToday, sevenDaysAgo, endOfYesterday } = getIntervals();

  const today = filtered.filter(
    (n) => n.timestamp && isToday(parseISO(n.timestamp))
  );

  const lastWeek = filtered.filter(
    (n) => n.timestamp &&
           !isToday(parseISO(n.timestamp)) && // Exclude today's notifications
           isWithinInterval(parseISO(n.timestamp), { start: sevenDaysAgo, end: endOfYesterday })
  );

  if (loading) {
    return (
      <div className="w-full text-center py-10 text-gray-600">
        Loading notifications...
      </div>
    );
  }

  if (error) {
    return (
      <section className="w-full px-[7%] py-6">
        <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm text-center text-red-700">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">Error</h1>
          <p className="mb-6">{error}</p>
          <button
            onClick={fetchNotifications} // Allows retrying the fetch
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Handle case where no notifications are found after successful loading
  if (allNotifications.length === 0 && !loading && !error) {
    return (
      <section className="w-full px-[7%] py-6">
        <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm text-center text-gray-600">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">Notifications</h1>
          <p>You have no notifications.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-[7%] py-6">
      <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">Notifications</h1>

        {/* Tabs */}
        <div className="flex justify-center items-center gap-10 border-b pb-4 mb-6 text-sm sm:text-base">
          {['all', 'unread'].map((tab) => {
            const isActive = activeTab === tab;
            const count =
              tab === 'all'
                ? allNotifications.length
                : allNotifications.filter((n) => n.unread).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 font-medium relative pb-1 transition ${
                  isActive
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600'
                }`}
                role="tab"
                aria-selected={isActive}
                id={`tab-${tab}`}
                aria-controls={`panel-${tab}`}
              >
                {/* Only show badge if count is greater than 0 */}
                {count > 0 && (
                  <span className="bg-orange-500 text-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
                <span>{tab === 'all' ? 'All' : 'Unread'}</span>
              </button>
            );
          })}
        </div>

        {/* Sections: Filtered `data` is passed to reflect `activeTab` */}
        <Section title="Today" data={today} />
        <Section title="Last week" data={lastWeek} />

        {/* Message if no notifications match the current filter */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No {activeTab === 'unread' ? 'unread ' : ''}notifications found for this period.
          </div>
        )}
      </div>
    </section>
  );
}

function Section({ title, data }) {
  // Only render the section if there's data for it
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        {/* Using a more accessible Unicode character or an actual icon component */}
        <span role="img" aria-label="Clock icon">🕒</span> {title}
      </h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 sm:gap-5 ${item.unread ? 'font-bold' : ''}`} // Optional: Highlight unread items
          >
            {/* Using item.avatar if available, otherwise the fallback image */}
            <Image
              src={item.avatar || '/image-notifications.png'}
              alt={item.type ? `${item.type} notification avatar` : 'Notification avatar'} // More descriptive alt text
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex-1">
              <div className="bg-[#eee7e7] w-full rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-black">
                    {item.type || 'General Notification'}
                  </h3>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                    {item.content || 'No content provided.'}
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap mt-2 sm:mt-0">
                  {/* Format timestamp for display if it exists, otherwise provide a fallback */}
                  {item.timestamp
                    ? formatDistanceToNowStrict(parseISO(item.timestamp), { addSuffix: true })
                    : 'Unknown time'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}