// src/app/components/buy/OrderSummary.jsx
"use client";

import React, { useState, useEffect } from "react";
import OrderItem from "./OrderItem"; // Relative import is fine here

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const OrderSummary = ({ initialItems = [], onRemove, onCheckoutSelected }) => {
  // internal state for items, allowing quantity changes and maintaining structure
  const [items, setItems] = useState(initialItems);
  // Manage selected item IDs
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  // Initialize selected items to all items when component mounts or initialItems change
  useEffect(() => {
    setItems(initialItems);
    // Automatically select all items initially, as per common cart behavior
    setSelectedItemIds(initialItems.map(item => item.productId));
  }, [initialItems]);

  // Function to toggle selection of a single item
  const toggleItemSelection = (productId) => {
    setSelectedItemIds(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  // Function to toggle select all items
  const toggleSelectAll = () => {
    if (selectedItemIds.length === items.length) {
      // If all are selected, unselect all
      setSelectedItemIds([]);
    } else {
      // Otherwise, select all
      setSelectedItemIds(items.map(item => item.productId));
    }
  };

  // Function to handle quantity change from OrderItem
  const handleQuantityChange = (productId, newQuantity) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Filter items that are currently selected for calculations
  const selectedItems = items.filter(item => selectedItemIds.includes(item.productId));

  // Calculate total price of selected items
  const calculateSelectedTotalPrice = () => {
    return selectedItems.reduce((total, item) => {
      // Assuming item.productPrice and item.quantity exist and are numbers
      return total + (item.productPrice * item.quantity);
    }, 0);
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

  const subtotal = calculateSelectedTotalPrice();
  const deliveryFee = 2.0; // Fixed delivery fee (adjust as needed)
  const total = subtotal + (selectedItems.length > 0 ? deliveryFee : 0); // Only add delivery if items are selected

  return (
    <div className="w-full lg:w-1/2 bg-white p-6 lg:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      {/* Select All Checkbox */}
      <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
        <input
          type="checkbox"
          id="selectAll"
          className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500"
          checked={selectedItemIds.length === items.length && items.length > 0}
          onChange={toggleSelectAll}
        />
        <label htmlFor="selectAll" className="ml-2 text-lg font-medium text-gray-800">
          Select All ({selectedItemIds.length} / {items.length} items)
        </label>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <OrderItem
            key={item.productId}
            item={item}
            onRemove={onRemove} // Pass original onRemove to OrderItem's API call
            isSelected={selectedItemIds.includes(item.productId)}
            onToggleSelection={toggleItemSelection}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      {/* Pricing Summary for Selected Items */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-gray-700 mb-2">
          <span>Subtotal ({selectedItems.length} items)</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700 mb-2">
          <span>Delivery Fee</span>
          <span className="font-semibold">
            {selectedItems.length > 0 ? formatCurrency(deliveryFee) : formatCurrency(0)}
          </span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-4">
        {/* Assuming "Add Coupon Code" is a future feature or always available */}
        <button className="w-full flex items-center justify-center bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105">
          Add Coupon Code
          <ArrowRightIcon />
        </button>

        <button
          onClick={() => onCheckoutSelected(selectedItems)} // Pass selected items to checkout handler
          disabled={selectedItemIds.length === 0}
          className={`w-full flex items-center justify-center font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105
            ${selectedItemIds.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          Checkout Selected ({selectedItemIds.length})
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;