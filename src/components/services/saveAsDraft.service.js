import axios from "axios";

const API_URL = "https://comics-upset-dj-clause.trycloudflare.com/api/v1/products";

export const saveAsDraft = async (formData, accessToken) => {
  // --- FIX #1: Add a check for the access token ---
  // This is the most important step. It will help you see if the token is missing.
  console.log("Attempting to save draft with token:", accessToken);

  if (!accessToken) {
    // If the token is null, undefined, or empty, throw an error immediately.
    // This prevents making a pointless API call that is guaranteed to fail.
    throw new Error("Authentication token is missing. Cannot save draft.");
  }

  try {
    const response = await axios.post(`${API_URL}/save-as-draft`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      // withCredentials is not typically needed for Bearer token auth,
      // but we can leave it if your server requires it for CORS.
      withCredentials: true, 
    });

    return response.data;

  } catch (error) {
    // --- FIX #2: Add more detailed error logging ---
    if (error.response) {
      // The request was made and the server responded with a status code (e.g., 401, 403, 500)
      console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      console.error("Response data:", error.response.data);
      
      if (error.response.status === 401) {
        // Provide a more helpful message for a 401 error
        throw new Error("Authorization failed. The token is likely expired or invalid. Please log in again.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error: No response received from the server.", error.request);
      throw new Error("Could not connect to the server. Please check your network connection.");
    } else {
      // Something else happened in setting up the request
      console.error("Axios Error:", error.message);
    }
    
    // Re-throw the error so the calling function can handle it if needed
    throw error;
  }
};