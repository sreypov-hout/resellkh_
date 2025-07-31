
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const deleteProduct = async (productId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Error deleting product: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in deleteProduct service:", error);
    throw error;
  }
};
