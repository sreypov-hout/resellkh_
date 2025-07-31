
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
/**
 * Fetch the profile of a user by ID using their JWT token.
 * @param {string|number} userId - The ID of the user.
 * @param {string} token - The JWT access token.
 * @returns {Promise<object>} The user profile data.
 */
export const fetchUserProfile = async (userId, token) => {
  if (!userId || !token) {
    throw new Error("User ID or authentication token is missing.");
  }

  const url = `${API_BASE_URL}/profile/${userId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Try to extract a message from error response body
      const errorBody = await response.json().catch(() => null);
      const errorMessage =
        errorBody?.message || `Failed to fetch user profile (Status ${response.status})`;
      throw new Error(errorMessage);
    }

    const result = await response.json();

    if (!result?.payload) {
      throw new Error("Profile data missing from response.");
    }

    return result.payload; // { payload: { userId, firstName, lastName, profileImage, ... } }
  } catch (err) {
    console.error("Error in fetchUserProfile:", err.message);
    throw err;
  }
};
