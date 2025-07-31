// src/components/sell/PricingInput.jsx
import { useState, useEffect } from "react";

const EXCHANGE_RATE = 4100;
const MIN_USD_PRICE = 0.25;
const MAX_USD_PRICE = 40000;
const MIN_KHR_PRICE = Math.round(MIN_USD_PRICE * EXCHANGE_RATE);
const MAX_KHR_PRICE = Math.round(MAX_USD_PRICE * EXCHANGE_RATE);

export default function PricingInput({
  price,
  setPrice,
  discount,
  setDiscount,
}) {
  const [currency, setCurrency] = useState("USD");
  const [displayValue, setDisplayValue] = useState("");
  const [priceError, setPriceError] = useState("");
  const [rawInputPrice, setRawInputPrice] = useState("");

  useEffect(() => {
    const safePrice =
      price === null || price === undefined || isNaN(price) ? "" : price;

    if (safePrice === "") {
      setRawInputPrice("");
      setDisplayValue("");
      setPriceError("");
      return;
    }

    let valueToSetAsRawInput;
    let valueToDisplay;
    if (currency === "USD") {
      valueToSetAsRawInput = Number(safePrice);
      valueToDisplay = Number.isInteger(valueToSetAsRawInput)
        ? String(valueToSetAsRawInput)
        : valueToSetAsRawInput.toFixed(2);
    } else {
      const khrValue = Math.round(safePrice * EXCHANGE_RATE);
      valueToSetAsRawInput = khrValue;
      valueToDisplay = khrValue.toString();
    }

    setRawInputPrice(valueToSetAsRawInput);
    setDisplayValue(valueToDisplay);

    if (currency === "USD") {
      setPrice(valueToSetAsRawInput);
    } else {
      const usdValueForParent =
        Math.ceil((valueToSetAsRawInput * 100) / EXCHANGE_RATE) / 100;
      setPrice(usdValueForParent);
    }
  }, [price, currency, setPrice]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setDisplayValue("");
      setRawInputPrice("");
      setPrice("");
      setPriceError("");
      return;
    }

    const priceRegex = currency === "USD" ? /^\d*\.?\d{0,2}$/ : /^\d*$/;
    if (!priceRegex.test(newValue)) {
      return;
    }

    const potentialNumericValue = Number(newValue);
    let maxLimit = currency === "USD" ? MAX_USD_PRICE : MAX_KHR_PRICE;
    if (potentialNumericValue > maxLimit) {
      setPriceError(
        `Price cannot exceed ${
          currency === "USD" ? "$" : "៛"
        }${maxLimit.toLocaleString()}`
      );
      return;
    }

    let minLimit = currency === "USD" ? MIN_USD_PRICE : MIN_KHR_PRICE;
    if (potentialNumericValue !== 0 && potentialNumericValue < minLimit) {
      setPriceError(
        `Price must be at least ${
          currency === "USD"
            ? `$${MIN_USD_PRICE.toFixed(2)}`
            : `៛${MIN_KHR_PRICE.toLocaleString()}`
        }`
      );
    } else {
      setPriceError("");
    }

    setDisplayValue(newValue);
    setRawInputPrice(potentialNumericValue);

    if (currency === "USD") {
      setPrice(potentialNumericValue);
    } else {
      const usdValueForParent =
        Math.ceil((potentialNumericValue * 100) / EXCHANGE_RATE) / 100;
      setPrice(usdValueForParent);
    }
  };

  const handleCurrencyToggle = (newCurrency) => {
    setCurrency(newCurrency);
    setPriceError("");

    let convertedRawInputPrice = "";
    let convertedDisplayValue = "";

    if (rawInputPrice !== "") {
      if (newCurrency === "USD") {
        convertedRawInputPrice =
          Math.ceil((Number(rawInputPrice) * 100) / EXCHANGE_RATE) / 100;
        convertedDisplayValue = Number.isInteger(convertedRawInputPrice)
          ? String(convertedRawInputPrice)
          : convertedRawInputPrice.toFixed(2);
      } else {
        convertedRawInputPrice = Math.round(
          Number(rawInputPrice) * EXCHANGE_RATE
        );
        convertedDisplayValue = convertedRawInputPrice.toString();
      }
    }

    setRawInputPrice(convertedRawInputPrice);
    setDisplayValue(convertedDisplayValue);

    if (convertedRawInputPrice !== "") {
      if (newCurrency === "USD") {
        setPrice(convertedRawInputPrice);
      } else {
        const usdValueForParent =
          Math.ceil((Number(convertedRawInputPrice) * 100) / EXCHANGE_RATE) /
          100;
        setPrice(usdValueForParent);
      }
    } else {
      setPrice("");
    }
  };

  const safeDiscount =
    discount === null || discount === undefined ? "" : String(discount);
  const discountInUSD =
    price && discount ? (price * Number(discount)) / 100 : 0;
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
              className={`w-full h-[48px] pt-4 pl-10 pr-4 py-3 rounded-2xl bg-[#f1edef] text-black placeholder:text-gray-800 focus:outline-none ${
                priceError ? "border-2 border-red-500" : ""
              }`}
            />
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center h-[48px] bg-[#f1edef] rounded-2xl p-1">
            <button
              type="button"
              onClick={() => handleCurrencyToggle("USD")}
              className={`h-full px-4 py-2 rounded-2xl text-sm font-semibold ${
                currency === "USD" ? "bg-white text-black" : "text-gray-800"
              }`}
            >
              $
            </button>
            <button
              type="button"
              onClick={() => handleCurrencyToggle("KHR")}
              className={`h-full px-4 py-2 rounded-2xl text-sm font-semibold ${
                currency === "KHR" ? "bg-white text-black" : "text-gray-800"
              }`}
            >
              ៛
            </button>
          </div>
        </div>
        {priceError && (
          <p className="text-xs text-red-500 mt-1">{priceError}</p>
        )}
        <p className="text-xs text-gray-500">
          Min: {currency === "USD" ? `$${MIN_USD_PRICE}` : `៛${MIN_KHR_PRICE}`}{" "}
          - Max:{" "}
          {currency === "USD" ? `$${MAX_USD_PRICE}` : `៛${MAX_KHR_PRICE}`}{" "}
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
              value={safeDiscount}
              onChange={(e) => {
                const value = e.target.value;
                if (
                  /^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{1,2})?)$/.test(value) ||
                  value === ""
                ) {
                  setDiscount(value);
                }
              }}
              placeholder="0"
              className="w-full h-[48px] pt-4 pl-10 pr-4 py-3 rounded-2xl bg-[#f1edef] text-black placeholder:text-gray-800 focus:outline-none"
            />
          </div>

          <div
            className={`h-[48px] px-4 py-3 min-w-[100px] rounded-2xl border text-sm font-medium text-center flex items-center justify-center ${
              Number(safeDiscount) === 100 ? "text-green-500" : "text-black"
            }`}
          >
            {Number(safeDiscount) === 100
              ? "Free"
              : `- ${discountDisplay} ${currency === "USD" ? "$" : "៛"}`}
          </div>
        </div>
      </div>
    </div>
  );
}