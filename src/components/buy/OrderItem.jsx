// src/app/components/buy/OrderItem.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Assuming you use next/image for optimized images

const OrderItem = ({ item, onRemove, isSelected, onToggleSelection, onQuantityChange }) => {
  // Essential check: Ensure item is not null or undefined before attempting to render
  if (!item) {
    console.warn("OrderItem received a null or undefined item prop.");
    return null; // Do not render anything if item data is missing
  }

  // Internal state for quantity, initialized from prop
  const [quantity, setQuantity] = useState(item.quantity || 1);

  // Update internal quantity if item.quantity prop changes (e.g., from parent re-fetching)
  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  // Function to handle the API call for removing an item
  const handleRemoveClick = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const productIdToRemove = item.productId;

      if (!token) {
        alert("Authentication token not found. Please log in to remove items.");
        console.error("Authentication token not found. Cannot remove item.");
        return;
      }

      const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/cart/remove?productId=${productIdToRemove}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown removal error' }));
        throw new Error(`Failed to remove item: ${errorData.message || response.statusText}`);
      }

      // If the API call is successful, then call the parent's onRemove
      // to update the UI state by filtering out this product.
      onRemove(productIdToRemove);
      console.log(`Product ${productIdToRemove} removed from cart successfully.`);

    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert(`Failed to remove item: ${error.message}`);
    }
  };

  const handleQuantityUpdate = (type) => {
    let newQuantity;
    if (type === "increase") {
      newQuantity = quantity + 1;
    } else if (type === "decrease" && quantity > 1) {
      newQuantity = quantity - 1;
    } else {
      return; // Do nothing if quantity is 1 and trying to decrease further
    }
    setQuantity(newQuantity);
    onQuantityChange(item.productId, newQuantity); // Notify parent component
  };

  // Helper for currency formatting (USD - $)
  const formatCurrency = (amount) => {
    const numericAmount = typeof amount === 'number' ? amount : 0;
    return new Intl.NumberFormat('en-US', { // Changed to 'en-US' locale
      style: 'currency',
      currency: 'USD', // Changed to 'USD'
      minimumFractionDigits: 2, // USD typically uses 2 decimal places
      maximumFractionDigits: 2,
    }).format(numericAmount);
  };

  return (
    <div className="flex items-start py-4">
      {/* Checkbox for selection */}
      <div className="mr-4 mt-1 flex-shrink-0">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500"
          checked={isSelected}
          onChange={() => onToggleSelection(item.productId)}
        />
      </div>

      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden mr-4">
        {item.fileUrls && item.fileUrls.length > 0 ? (
          <Image
            src={item.fileUrls[0]}
            alt={item.productName || "Product image"}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Image</div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{item.productName || "Unknown Product"}</h3>
        <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
          {item.description || "No description available."}
        </p>
        {/* Price Info */}
        <p className="font-medium text-gray-800">
          {formatCurrency(item.productPrice)}
        </p>
      </div>

      <div className="flex-shrink-0 flex flex-col items-end justify-between ml-4">
        {/* Remove Button (now positioned at the top-right of the item) */}
        <button
          onClick={handleRemoveClick}
          className="text-gray-400 hover:text-red-500 transition-colors mb-2"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6L18.4 19.1a2 2 0 0 1-2 1.9H7.6a2 2 0 0 1-2-1.9L5 6m1 0L6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2l0 2" />
          </svg>
        </button>

        {/* Quantity Selector */}
        <div className="flex items-center">
          <button
            onClick={() => handleQuantityUpdate("decrease")}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-12 h-8 text-center border-t border-b border-gray-300 text-gray-800 focus:outline-none"
          />
          <button
            onClick={() => handleQuantityUpdate("increase")}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;