// services/nearBy.service.js

// Using a placeholder for your actual API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches products near a given geographical coordinate.
 * @param {number} latitude - The latitude of the user's location.
 * @param {number} longitude - The longitude of the user's location.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} Throws an error if the network response is not ok.
 */
export const fetchNearbyProducts = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/nearby/${latitude}/${longitude}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // Create an error with a message that can be shown to the user
      throw new Error(`Failed to fetch listings. Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the payload, or an empty array if the payload is missing/falsy
    return data.payload || [];

  } catch (error) {
    // Log the detailed error for developers, then re-throw it for the component to handle
    console.error("Error fetching nearby products:", error);
    throw error;
  }
};