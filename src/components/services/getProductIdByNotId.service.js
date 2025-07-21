const API_BASE_URL = "https://comics-upset-dj-clause.trycloudflare.com/api/v1";

export const getProductIdByNotificationId = async (notificationId, token) => {
  // Renamed parameters and function for clarity
  try {
    const response = await fetch(
      `${API_BASE_URL}/notifications/getproductidbynotid/${notificationId}`, // Use notificationId here
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorJson.message || "Unknown error"
          }`
        );
      } catch {
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorText || "Unknown error"
          }`
        );
      }
    }

    const data = await response.json();
    // Here, `data` is the number (product ID), so just return it
    return data;
  } catch (error) {
    console.error("Error fetching product ID by notification ID:", error); // Updated error message
    throw error;
  }
};
