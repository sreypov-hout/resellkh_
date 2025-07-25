export const postProduct = async (productData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    // Create URL with all necessary query parameters
    const queryParams = new URLSearchParams({
      productName: productData.productName,
      userId: productData.userId,
      mainCategoryId: productData.mainCategoryId,
      productPrice: productData.productPrice,
      discountPercent: productData.discountPercent || 0,
      productStatus: productData.productStatus || 'ON SALE',
      description: productData.description || '',
      location: productData.location || '',
      latitude: productData.latitude || 0,
      longitude: productData.longitude || 0,
      condition: productData.condition || '',
      telegramUrl: productData.telegramUrl || '' // Ensure this is included
    });

    // Create FormData for files
    const formData = new FormData();
    if (productData.files && productData.files.length > 0) {
      productData.files.forEach(file => {
        if (file instanceof File) {
          formData.append('files', file);
        } else if (file.url) {
          // Handle case where file is an object with URL (for drafts)
          fetch(file.url)
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], `image_${Date.now()}.jpg`, { type: 'image/jpeg' });
              formData.append('files', file);
            });
        }
      });
    }

    const response = await fetch(
      `https://comics-upset-dj-clause.trycloudflare.com/api/v1/products/upload?${queryParams.toString()}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Upload Error:', error.message);
    throw error;
  }
};