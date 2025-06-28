'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';
import { isToday, isWithinInterval, parseISO, formatDistanceToNowStrict } from 'date-fns';

// Helper function to get the start of 'today' and '7 days ago' for robust filtering
const getIntervals = () => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Start of current day
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7); // Exactly 7 days ago from now
  const endOfYesterday = new Date(startOfToday);
  endOfYesterday.setDate(startOfToday.getDate() - 1); // End of the day before today

  return { startOfToday, sevenDaysAgo, endOfYesterday };
};

export default function NotificationsPage() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors before a new fetch
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Authentication: No token found. User needs to log in.');
        throw new Error('Authentication required: Please log in to view notifications.');
      }

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch (jwtError) {
        console.error('JWT Decode Error:', jwtError);
        throw new Error('Invalid authentication token. Please log in again.');
      }

      const userId = decoded?.id ?? decoded?.userId;

      if (!userId) {
        throw new Error('User ID not found in token. Token might be invalid or malformed.');
      }

      const apiUrl = `https://consumers-journalist-locate-keep.trycloudflare.com/api/v1/notifications/${userId}`;
      console.log(`Attempting to fetch notifications from: ${apiUrl}`);

      const res = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Good practice to include
        }
      });

      // Check for HTTP errors (e.g., 404, 500, 401, 403)
      if (!res.ok) {
        let errorData = {};
        try {
          errorData = await res.json(); // Try to parse JSON error message
        } catch (parseError) {
          // If response is not JSON (e.g., plain text 500 error)
          errorData.message = await res.text();
        }
        const errorMessage = errorData.message || res.statusText || `HTTP error! Status: ${res.status}`;
        console.error('API HTTP Error Response:', { status: res.status, body: errorData });
        throw new Error(`Failed to fetch notifications: ${errorMessage}`);
      }

      // Attempt to parse the response as JSON
      let responseData;
      try {
        responseData = await res.json();
      } catch (parseError) {
        // Handle cases where API returns non-JSON but successful status (e.g., empty string)
        console.error('Failed to parse API response as JSON:', parseError, 'Raw response:', await res.text());
        throw new Error('Received unparseable response from server.');
      }

      // --- CRITICAL FIX: Robust Data Handling ---
      let notificationsArray = [];

      if (Array.isArray(responseData)) {
        // Scenario 1: API returns a direct array (ideal)
        notificationsArray = responseData;
        console.log('API returned a direct array of notifications.');
      } else if (typeof responseData === 'object' && responseData !== null) {
        // Scenario 2: API returns an object that might contain the array
        // Check common property names like 'data', 'notifications', 'items', 'results'
        if (Array.isArray(responseData.data)) {
          notificationsArray = responseData.data;
          console.log('API returned an object with a "data" array.');
        } else if (Array.isArray(responseData.notifications)) {
          notificationsArray = responseData.notifications;
          console.log('API returned an object with a "notifications" array.');
        } else if (Object.keys(responseData).length === 0) {
          // Scenario 3: API returns an empty object {}
          console.warn('API returned an empty object, treating as no notifications.');
          notificationsArray = [];
        } else {
          // Scenario 4: API returned an object, but we couldn't find the array within expected properties
          console.error('API returned an object in unexpected format:', responseData);
          throw new Error('Server response format is unexpected. No notification array found.');
        }
      } else {
        // Scenario 5: API returned something completely unexpected (e.g., null, undefined, string, number)
        console.error('API returned data in completely unexpected format:', responseData);
        throw new Error('Received unexpected data format from server. Please try again.');
      }

      setAllNotifications(notificationsArray);

    } catch (err) {
      console.error('Full fetch process error:', err);
      setError(err.message);
      setAllNotifications([]); // Ensure it's an empty array on any error to prevent further `.filter` issues
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Ensure allNotifications is always an array before filtering (defensive programming)
  const filtered = Array.isArray(allNotifications)
    ? allNotifications.filter((n) => activeTab === 'all' ? true : n.unread)
    : [];

  const { startOfToday, sevenDaysAgo, endOfYesterday } = getIntervals();

  // Ensure `n.timestamp` exists and is parsable before using date-fns
  const today = filtered.filter(
    (n) => n.timestamp && !isNaN(parseISO(n.timestamp).getTime()) && isToday(parseISO(n.timestamp))
  );

  const lastWeek = filtered.filter(
    (n) => n.timestamp &&
           !isNaN(parseISO(n.timestamp).getTime()) && // Ensure timestamp is a valid date
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

  // Handle case where no notifications are found after successful loading and no errors
  if (allNotifications.length === 0 && !loading && !error) {
    return (
      <section className="w-full px-[7%] py-6">
        <div className="bg-white border border-gray-300 rounded-[24px] p-6 sm:p-10 shadow-sm text-center text-gray-600">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">Notifications</h1>
          <p>You have no notifications to display.</p>
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

        {/* Sections: filtered `data` passed to reflect `activeTab` */}
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
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <span role="img" aria-label="Time-based section">🕒</span> {title}
      </h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 sm:gap-5 ${item.unread ? 'font-bold' : ''}`}
          >
            <Image
              src={item.avatar || '/image-notifications.png'}
              alt={item.type ? `${item.type} notification avatar` : 'Notification avatar'}
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
                  {/* Format timestamp for display if it exists and is valid, otherwise fallback */}
                  {item.timestamp && !isNaN(parseISO(item.timestamp).getTime())
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