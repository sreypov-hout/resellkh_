const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const productService = {
  fetchRecommendedProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message || `Failed to fetch: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      const products = data.payload || [];

      // ✨ FIX: Sort products by creation time to show the newest items first.
      // This assumes your product object has a 'createdAt' field with a date string.
      products.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Sorts in descending order (newest to oldest)
      });

      return products;

    } catch (error) {
      console.error("Error fetching and sorting products:", error.message);
      // Re-throw the error so SWR can handle it
      throw error;
    }
  },
};
