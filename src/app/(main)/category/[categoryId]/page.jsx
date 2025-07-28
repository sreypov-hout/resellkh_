// src/app/(main)/category/[categoryId]/page.jsx

import { getProductsByCategoryId } from "@/components/services/productCategory.service";
import CategoryClientPage from "./CategoryClientPage"; // We will create this next

/**
 * Fetches product data on the server.
 * @param {string} categoryId - The ID of the category.
 * @returns {Promise<Array>} A promise that resolves to the product data.
 */
async function getProducts(categoryId) {
  // Data is fetched here on the server before the page is sent to the user
  const productsData = await getProductsByCategoryId(categoryId);
  return productsData;
}

export default async function CategoryPage({ params }) {
  const { categoryId } = params;
  const initialProducts = await getProducts(categoryId); // Fetch initial data

  // Pass the server-fetched data to the client component
  return (
    <CategoryClientPage
      categoryId={categoryId}
      initialProducts={initialProducts}
    />
  );
}