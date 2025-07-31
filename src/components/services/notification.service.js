// services/notificationService.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAllNotifications = async (token, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/notifications/all/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json", // Explicitly request JSON
        },
      }
    );

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      let errorDetails = "";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorJson = await response.json();
          errorDetails = `, Message: ${
            errorJson.message || JSON.stringify(errorJson)
          }`;
        } else {
          errorDetails = `, Response: ${await response.text()}`;
        }
      } catch (parseError) {
        errorDetails = `, No readable error details from server.`;
      }
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    const responseText = await response.text();
    if (!responseText) {
      return []; // Return empty array if no content
    }

    // Only parse if there is text content, assuming it should be JSON
    // If your backend can return non-JSON success for fetchAllNotifications,
    // you'd need a content-type check here too.
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
          // No Content-Type for request body if no body is sent,
          // but ensure Accept header is flexible for response handling.
          Accept: "*/*", // Accept any response type
        },
        // If your backend expects a body (e.g., userId), uncomment and adjust:
        // body: JSON.stringify({ userId }),
        // headers: {
        //   'Content-Type': 'application/json', // Add this if sending a body
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      let errorDetails = "";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorJson = await response.json();
          errorDetails = `, Message: ${
            errorJson.message || JSON.stringify(errorJson)
          }`;
        } else {
          errorDetails = `, Response: ${await response.text()}`;
        }
      } catch (parseError) {
        errorDetails = `, No readable error details from server.`;
      }
      throw new Error(`${errorMessage}${errorDetails}`);
    }

    // *** CRUCIAL FIX FOR SYNTAXERROR ***
    // Check if there's any response content before attempting to parse.
    // Also, check the content type to ensure it's JSON if you expect JSON.
    const responseText = await response.text(); // Read the response body as text first

    if (responseText) {
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          // If content is present AND it's JSON, then parse it
          return JSON.parse(responseText);
        } else {
          // If content is present but NOT JSON (e.g., plain text success message),
          // or if the server sends a 200 OK with some text, just acknowledge success.
          console.warn(
            `markNotificationAsRead received non-JSON success response: ${responseText}`
          );
          return { success: true, message: responseText }; // Return success with text message if any
        }
      } catch (parseError) {
        // This catch handles cases where responseText exists but is malformed JSON
        console.error(
          "Failed to parse markNotificationAsRead response as JSON:",
          parseError,
          "Response text:",
          responseText
        );
        return {
          success: true,
          message: "Operation successful, but response not JSON.",
        };
      }
    } else {
      // If responseText is empty (e.g., 204 No Content), it's still a success
      return { success: true };
    }
  } catch (error) {
    console.error("Error in markNotificationAsRead:", error);
    throw error;
  }
};

export const parseJwt = (token) => {
  try {
    if (!token) return null;
    // Ensure atob is available in your environment (client-side)
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Error parsing JWT:", e);
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

  // Fallback for older dates: format as a standard date string
  return notificationDate.toLocaleDateString();
};
