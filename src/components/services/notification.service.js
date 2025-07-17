// services/notificationService.js
const API_BASE_URL = "https://comics-upset-dj-clause.trycloudflare.com/api/v1";

export const fetchAllNotifications = async (token, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/notifications/all/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      return [];
    }

    const data = JSON.parse(responseText);
    return data.payload || data || [];

  } catch (error) {
    console.error("Error in fetchAllNotifications:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (token, userId, notificationId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/notifications/read/${userId}/${notificationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      return { success: true };
    }

    return JSON.parse(responseText);

  } catch (error)
 {
    console.error("Error in markNotificationAsRead:", error);
    throw error;
  }
};

export const parseJwt = (token) => {
  try {
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const notificationDate = new Date(timestamp);
  const diffInMs = now - notificationDate;
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMins < 1) return "Just Now";
  if (diffInMins < 60) return `${diffInMins} mins ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return notificationDate.toLocaleDateString();
};