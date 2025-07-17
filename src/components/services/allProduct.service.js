export const productService = {
  fetchRecommendedProducts: async () => {
    try {
      const response = await fetch(
        "https://comics-upset-dj-clause.trycloudflare.com/api/v1/products"
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message || `Failed to fetch: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      return data.payload || [];
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  },
};
