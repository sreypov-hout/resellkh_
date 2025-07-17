// src/components/services/ScanProduct.service.js
const API_BASE_URL = 'https://comics-upset-dj-clause.trycloudflare.com/api/v1'; // ✅ no space

export const searchProductsByImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${API_BASE_URL}/products/search-by-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to search products by image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching products by image:', error);
    throw error;
  }
};
