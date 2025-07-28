export const updateProduct = async (
  productId,
  productData,
  newFiles,
  token
) => {
  try {
    // Create query parameters for all product data
    const queryParams = new URLSearchParams();
    for (const key in productData) {
      if (productData[key] !== null && productData[key] !== undefined) {
        queryParams.append(key, productData[key]);
      }
    }

    const formData = new FormData();
    if (newFiles && newFiles.length > 0) {
      newFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    const url = `https://trivia-worlds-wichita-stan.trycloudflare.com/api/v1/products/updateproduct/${productId}?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Let browser set Content-Type for multipart/form-data
      },
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = "Failed to update product";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};