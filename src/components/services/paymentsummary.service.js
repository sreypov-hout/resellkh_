// src/services/paymentsummary.service.js
const API_BASE_URL = "hhttps://trivia-worlds-wichita-stan.trycloudflare.com/api/v1";

export const getPaymentSummaryBySellerId = async (sellerId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/seller/${sellerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // This error handling for failed requests is good.
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

    // *** FIX STARTS HERE ***
    // 1. Read the response as text first.
    const responseText = await response.text();

    // 2. Check if the response text is empty. If so, return a default value.
    if (!responseText) {
      // An empty array is a safe default for a list of payments.
      return [];
    }

    // 3. If there is text, now we can safely parse it.
    const data = JSON.parse(responseText);
    // *** FIX ENDS HERE ***


    // IMPORTANT: This logic for finding the data within the response is kept from your original code.
    // If your API directly returns an array of payment records, use 'data || []'
    return data.payload || data.orders || data || [];

  } catch (error) {
    console.error("Error fetching payment summary:", error);
    throw error;
  }
};