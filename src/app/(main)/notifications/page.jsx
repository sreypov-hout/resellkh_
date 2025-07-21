"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { encryptId } from "@/utils/encryption";
import { useRouter } from "next/navigation";
import { getProductIdByNotificationId } from "@/components/services/getProductIdByNotId.service";
import {
  fetchAllNotifications,
  markNotificationAsRead,
  parseJwt,
  formatTimestamp,
} from "@/components/services/notification.service";

// Categorize notifications
const categorizeByTime = (notifications) => {
  const now = new Date();
  const today = [];
  const lastWeek = [];
  const older = [];

  notifications.forEach((notification) => {
    const notificationDate = new Date(notification.createdAt);
    const diffInDays = Math.floor(
      (now - notificationDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays < 1) {
      today.push(notification);
    } else if (diffInDays < 7) {
      lastWeek.push(notification);
    } else {
      older.push(notification);
    }
  });

  return { today, lastWeek, older };
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // This state is for initial load errors
  const [activeTab, setActiveTab] = useState("all");
  const [expandedNotifications, setExpandedNotifications] = useState(new Set());
  const [token, setToken] = useState(null);
  // Removed messageBox state as per user's request to not create new files/components for alerts

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors

        const fetchedToken = localStorage.getItem("token");
        if (!fetchedToken) throw new Error("Authentication token not found.");
        setToken(fetchedToken);

        const userData = parseJwt(fetchedToken);
        const userId = userData?.userId || userData?.id;
        if (!userId) throw new Error("User ID not found in token.");

        const fetchedNotifications = await fetchAllNotifications(
          fetchedToken,
          userId
        );

        const mappedNotifications = fetchedNotifications.map(
          (notification) => ({
            id: notification.id,
            type: notification.title,
            content: notification.content,
            avatar: notification.iconUrl,
            timestamp: formatTimestamp(notification.createdAt),
            unread: !notification.isRead,
            createdAt: notification.createdAt,
          })
        );

        setNotifications(mappedNotifications);
      } catch (err) {
        setError(err.message);
        console.error("Error loading notifications:", err); // Log initial load errors
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const handleNotificationClick = async (
    notificationId,
    newExpandedSet = null
  ) => {
    // This part handles expanding/collapsing the notification content
    if (notificationId === "__toggleExpandOnly__" && newExpandedSet) {
      setExpandedNotifications(newExpandedSet);
      return;
    }

    const notification = notifications.find((n) => n.id === notificationId);
    if (!notification) return;

    // Toggle expansion state
    const newExpanded = new Set(expandedNotifications);
    if (newExpanded.has(notificationId)) {
      newExpanded.delete(notificationId);
    } else {
      newExpanded.add(notificationId);
    }
    setExpandedNotifications(newExpanded);

    // Only proceed to mark as read if the notification is currently unread
    if (notification.unread) {
      // *** Optimistic UI Update ***
      // Immediately update the UI state to show as read.
      // This makes it disappear from the 'Unread' tab and changes its styling in 'All' tab.
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, unread: false } : n))
      );

      try {
        const currentToken = localStorage.getItem("token"); // Re-fetch token to ensure it's fresh
        const userData = parseJwt(currentToken);
        const userId = userData?.userId || userData?.id;

        if (currentToken && userId) {
          // Make the API call to mark as read on the server
          await markNotificationAsRead(currentToken, userId, notificationId);
          // If the API call succeeds, the UI is already updated optimistically.
          // No further action needed here.
        } else {
          throw new Error("Authentication details are missing.");
        }
      } catch (error) {
        console.error("Failed to mark notification as read on server:", error);

        // *** Revert UI State on API Failure ***
        // If the API call fails, revert the UI state back to unread.
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId ? { ...n, unread: true } : n
          )
        );

        // *** Removed alert() as per user's request ***
        // No visual feedback for this specific error, only console log.
        // If you need subtle feedback without a new component, consider
        // a temporary state variable for a small inline message.
      }
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    activeTab === "all" ? true : n.unread
  );

  const { today, lastWeek, older } = categorizeByTime(filteredNotifications);
  const allCount = notifications.length;
  const unreadCount = notifications.filter((n) => n.unread).length;

  if (loading) return <NotificationLoadingState />;
  if (error) return <NotificationErrorState error={error} />;

  return (
    <section className="w-full px-[7%] py-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-sm bg-opacity-95">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-3.5-3.5c-.9-.9-.9-2.1 0-3L20 7h-5M9 21V3m0 0L5 7m4-4l4 4"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Notifications
          </h1>
        </div>

        <NotificationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allCount={allCount}
          unreadCount={unreadCount}
        />

        {filteredNotifications.length === 0 ? (
          <NoNotificationsMessage activeTab={activeTab} />
        ) : (
          <div className="space-y-8">
            {today.length > 0 && (
              <NotificationSection
                title="Today"
                data={today}
                expandedNotifications={expandedNotifications}
                onNotificationClick={handleNotificationClick}
                token={token}
              />
            )}
            {lastWeek.length > 0 && (
              <NotificationSection
                title="Last week"
                data={lastWeek}
                expandedNotifications={expandedNotifications}
                onNotificationClick={handleNotificationClick}
                token={token}
              />
            )}
            {older.length > 0 && (
              <NotificationSection
                title="Earlier"
                data={older}
                expandedNotifications={expandedNotifications}
                onNotificationClick={handleNotificationClick}
                token={token}
              />
            )}
          </div>
        )}
      </div>
      {/* Removed MessageBox component as per user's request */}
    </section>
  );
}

// Subcomponents (NotificationLoadingState, NotificationErrorState, NotificationTabs, NoNotificationsMessage, NotificationSection)
// These remain mostly the same, but ensure NotificationSection has the 'token' prop.

function NotificationLoadingState() {
  return (
    <section className="w-full px-[7%] py-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <div className="text-gray-600 font-medium">
              Loading notifications...
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotificationErrorState({ error }) {
  return (
    <section className="w-full px-[7%] py-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-red-600 font-medium">Error: {error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function NotificationTabs({ activeTab, setActiveTab, allCount, unreadCount }) {
  return (
    <div className="flex justify-center items-center gap-8 mb-8">
      <div className="flex bg-gray-100 rounded-2xl p-1.5 shadow-inner">
        {["all", "unread"].map((tab) => {
          const isActive = activeTab === tab;
          const count = tab === "all" ? allCount : unreadCount;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                isActive
                  ? "bg-white text-gray-900 shadow-md transform scale-105"
                  : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
              }`}
            >
              <span
                className={`${
                  isActive
                    ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg"
                    : "bg-gray-300 text-gray-700"
                } text-xs font-bold px-2.5 py-1 rounded-full min-w-[24px] flex items-center justify-center transition-all duration-300`}
              >
                {count}
              </span>
              <span className="capitalize">{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NotificationSection({
  title,
  data,
  expandedNotifications,
  onNotificationClick,
  token,
}) {
  const router = useRouter();
  const [
    fetchingProductIdForNotification,
    setFetchingProductIdForNotification,
  ] = useState(null);

  if (!data.length) return null;

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  const handleViewFavoriteClick = async (e, notificationId) => {
    e.stopPropagation();

    if (!token) {
      console.error(
        "Authentication token is missing. Cannot fetch product ID."
      );
      // Removed alert as per user's request
      return;
    }

    setFetchingProductIdForNotification(notificationId);

    try {
      // const fetchedProductId = await getProductIdByNotificationId(
      //   notificationId,
      //   token
      // );
      const response = await getProductIdByNotificationId(
        notificationId,
        token
      );
      const fetchedProductId = response.payload;

      if (fetchedProductId) {
        router.push(
          `/product/${encodeURIComponent(encryptId(fetchedProductId))}`
        );
      } else {
        console.warn(
          `Product ID not found for notification ID: ${notificationId}.`
        );
        // Removed alert as per user's request
      }
    } catch (error) {
      console.error(
        "Error fetching product ID for favorite notification:",
        error
      );
      // Removed alert as per user's request
    } finally {
      setFetchingProductIdForNotification(null);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type.toLowerCase()) {
      case "favourite":
      case "favorite":
        return (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "order":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        );
      case "message":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-3.5-3.5c-.9-.9-.9-2.1 0-3L20 7h-5M9 21V3m0 0L5 7m4-4l4 4"
            />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const isExpanded = expandedNotifications.has(item.id);
          const shouldTruncate = item.content.length > 100;
          const displayContent = isExpanded
            ? item.content
            : truncateText(item.content, 100);
          const isFetchingThisProduct =
            fetchingProductIdForNotification === item.id;

          return (
            <div key={item.id} className="group relative">
              <div className="flex items-start gap-4 p-1">
                {/* Enhanced Avatar with notification type indicator */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={item.avatar || "/image-notifications.png"}
                    alt="notification icon"
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-xl object-cover shadow-md border-2 border-white"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                    {getNotificationIcon(item.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Enhanced notification card */}
                  <div
                    className={`relative rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border ${
                      item.unread
                        ? "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-md"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => onNotificationClick(item.id)}
                  >
                    {/* Unread indicator */}
                    {item.unread && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg animate-pulse"></div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Enhanced notification header */}
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-base font-bold text-gray-900">
                            {item.type}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                              item.unread
                                ? "bg-orange-100 text-orange-800"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.unread ? "New" : "Read"}
                          </span>
                        </div>

                        {/* Enhanced content */}
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {displayContent}
                          {shouldTruncate && (
                            <button
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 ml-2 font-medium transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                onNotificationClick(item.id);
                              }}
                            >
                              {isExpanded ? (
                                <>
                                  <span>show less</span>
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 15l7-7 7 7"
                                    />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <span>read more</span>
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </p>
                      </div>

                      {/* Enhanced timestamp */}
                      <div className="flex flex-col items-end justify-start">
                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                          {item.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Favorite Button */}
                  {item.type === "Favourite" && (
                    <div className="mt-3 flex justify-end">
                      <button
                        className={`group/btn relative overflow-hidden bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                          isFetchingThisProduct ? "animate-pulse" : ""
                        }`}
                        onClick={(e) => handleViewFavoriteClick(e, item.id)}
                        disabled={isFetchingThisProduct}
                      >
                        {/* Button background animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                        {/* Button content */}
                        <div className="relative flex items-center gap-2">
                          {isFetchingThisProduct ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Loading...</span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>View Favorite</span>
                              <svg
                                className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </>
                          )}
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NoNotificationsMessage({ activeTab }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
        <svg
          className="w-16 h-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 17h5l-3.5-3.5c-.9-.9-.9-2.1 0-3L20 7h-5M9 21V3m0 0L5 7m4-4l4 4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No {activeTab} notifications
      </h3>
      <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
        You're all caught up! When you have new notifications, they'll appear
        here.
      </p>
    </div>
  );
}
