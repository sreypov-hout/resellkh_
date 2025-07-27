// src/components/sell/PricingInput.jsx
import { useState, useEffect } from "react";

const EXCHANGE_RATE = 4100; // Using a more realistic exchange rate
const MAX_USD_PRICE = 2000000;
const MAX_KHR_PRICE = 820000000; // 2,000,000 * 4100

export default function PricingInput({ price, setPrice, discount, setDiscount }) {
  const [currency, setCurrency] = useState("USD");
  const [displayValue, setDisplayValue] = useState("");

  // Effect to update the display value when the underlying USD price or currency changes
  useEffect(() => {
    if (price === "" || price === null || isNaN(price)) {
      setDisplayValue("");
      return;
    }

    if (currency === "USD") {
      // If the stored price is an integer, display it as such (e.g., "100")
      // Otherwise, show two decimal places (e.g., "99.99")
      const formattedPrice = Number.isInteger(Number(price))
        ? String(price)
        : Number(price).toFixed(2);
      setDisplayValue(formattedPrice);
    } else {
      // Convert the stored USD price to KHR for display
      const khrValue = Math.round(price * EXCHANGE_RATE);
      setDisplayValue(khrValue.toString());
    }
  }, [price, currency]);

  // Handler for when the user types in the input field
  const handleInputChange = (e) => {
    let value = e.target.value;

    // Prevent non-numeric characters for both currencies
    if (/[^0-9.]/.test(value)) {
        return;
    }
    
    setDisplayValue(value);

    const numericValue = Number(value);
    if (value === "" || isNaN(numericValue)) {
      setPrice(""); // Clear the price if input is empty or invalid
      return;
    }

    // Update the internal USD price based on the current currency
    if (currency === "USD") {
      if (numericValue > MAX_USD_PRICE) return;
      setPrice(numericValue);
    } else {
      if (numericValue > MAX_KHR_PRICE) return;
      // Convert KHR input back to USD for storage
      const usdValue = numericValue / EXCHANGE_RATE;
      setPrice(usdValue);
    }
  };

  // Calculate the discount amount in the selected currency for display
  const discountInUSD = price && discount ? (price * Number(discount)) / 100 : 0;
  const discountDisplay =
    currency === "USD"
      ? discountInUSD.toLocaleString("en-US", { maximumFractionDigits: 2 })
      : Math.round(discountInUSD * EXCHANGE_RATE).toLocaleString("en-US");

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="p-5 border rounded-2xl bg-white space-y-3">
        <p className="font-semibold text-[17px]">Price</p>
        <div className="flex items-center gap-2">
          {/* Input Field */}
          <div className="relative flex-1">
            <span className="absolute top-3 left-5 text-black text-lg">
              {currency === "USD" ? "$" : "៛"}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={displayValue}
              onChange={handleInputChange}
              placeholder={currency === "USD" ? "0.00" : "0"}
              className="w-full h-[48px] pt-4 pl-10 pr-4 py-3 rounded-2xl bg-[#f1edef] text-black placeholder:text-gray-800 focus:outline-none"
            />
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center h-[48px] bg-[#f1edef] rounded-2xl p-1">
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`h-full px-4 py-2 rounded-2xl text-sm font-semibold ${
                currency === "USD" ? "bg-white text-black" : "text-gray-800"
              }`}
            >
              $
            </button>
            <button
              type="button"
              onClick={() => setCurrency("KHR")}
              className={`h-full px-4 py-2 rounded-2xl text-sm font-semibold ${
                currency === "KHR" ? "bg-white text-black" : "text-gray-800"
              }`}
            >
              ៛
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Max:{" "}
          {currency === "USD"
            ? `$${MAX_USD_PRICE.toLocaleString()}`
            : `៛${MAX_KHR_PRICE.toLocaleString()}`}
        </p>
      </div>

      {/* Discount Section */}
      <div className="p-5 border rounded-2xl bg-white space-y-3">
        <p className="font-semibold text-[17px]">Discount %</p>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute top-3 left-5 text-black text-lg">%</span>
            <input
              type="text"
              inputMode="decimal"
              value={discount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,3}(\.\d{0,2})?$/.test(value) && Number(value) <= 100) {
                  setDiscount(value);
                }
              }}
              placeholder="0"
              className="w-full h-[48px] pt-4 pl-10 pr-4 py-3 rounded-2xl bg-[#f1edef] text-black placeholder:text-gray-800 focus:outline-none"
            />
          </div>

          <div
            className={`h-[48px] px-4 py-3 min-w-[100px] rounded-2xl border text-sm font-medium text-center flex items-center justify-center ${
              Number(discount) === 100 ? "text-green-500" : "text-black"
            }`}
          >
            {Number(discount) === 100
              ? "Free"
              : `- ${discountDisplay} ${currency === "USD" ? "$" : "៛"}`}
          </div>
        </div>
      </div>
    </div>
  );
}