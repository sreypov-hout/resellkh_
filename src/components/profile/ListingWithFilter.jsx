"use client";

import { useState, useEffect } from "react";
import Cart from "./someComponent/Cart";

const SkeletonCard = () => (
  <div className="w-full animate-pulse bg-gray-100 p-4 rounded-lg">
    <div className="aspect-square bg-gray-300 rounded-lg mb-3" />
    <div className="h-4 bg-gray-300 rounded-full w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 rounded-full w-1/2 mb-1" />
    <div className="h-4 bg-gray-300 rounded-full w-1/3" />
  </div>
);

export default function ListingsWithFilter({ userId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [condition, setCondition] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!userId) throw new Error("User ID not provided");

        const response = await fetch(
          `https://trivia-worlds-wichita-stan.trycloudflare.com/api/v1/products/getproductbyuserid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const formattedProducts = Array.isArray(data.payload)
          ? data.payload.map((product) => ({
              ...product,
              fileUrls: Array.isArray(product.fileUrls)
                ? product.fileUrls.map((url) =>
                    url.startsWith("http") ? url : `https://${url}`
                  )
                : [],
            }))
          : [];

        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [userId]);

  let filteredProducts = products.filter((p) => {
    const matchesSearch =
      (p.productName &&
        p.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.description &&
        p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCondition =
      !condition ||
      (p.condition &&
        p.condition.toLowerCase().trim() === condition.toLowerCase().trim());
    const matchesStatus =
      !status ||
      (p.productStatus &&
        p.productStatus.toLowerCase() === status.toLowerCase());

    return matchesSearch && matchesCondition && matchesStatus;
  });

  if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
  } else if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
  }

  if (loading) {
    return (
      <div className="p-1 md:p-6">
        <div className="p-1 rounded-[24px] border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:max-w-xs">
                <div className="h-10 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
            {[...Array(10)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 text-sm">Error: {error}</div>
    );
  }

  return (
    <div className="p-1 md:p-6">
      <div className="p-3 rounded-[24px] border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Listings</h2>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-xs">
              <svg
                className="absolute top-[9px] left-3 w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 25"
              >
                <path d="M18.02 17.4L22.3 21.68l-1.41 1.41-4.28-4.28a9 9 0 11 1.41-1.41zM11 20a9 9 0 100-18 9 9 0 000 18z" />
              </svg>
              <input
                type="text"
                placeholder="Search Listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-full text-sm text-gray-800 hover:bg-gray-100"
            >
              Filters
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="w-full lg:w-[310px] bg-white border rounded-2xl shadow p-4 mb-4 space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Sort</div>
              <div className="space-y-1">
                {[
                  { label: "Recent", value: "" },
                  { label: "Price - High to Low", value: "price-high" },
                  { label: "Price - Low to High", value: "price-low" },
                ].map(({ label, value }) => (
                  <label key={value} className="block">
                    <input
                      type="radio"
                      name="sort"
                      value={value}
                      checked={sortBy === value}
                      onChange={() => setSortBy(value)}
                      className="mr-2"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Item Condition
              </div>
              <div className="space-y-1">
                {["Brand New", "Like New", "Lightly Used", "Well Used", "Heavily Used"].map((c) => (
                  <label key={c} className="block">
                    <input
                      type="radio"
                      name="condition"
                      value={c}
                      checked={condition === c}
                      onChange={() => setCondition(c)}
                      className="mr-2"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Listings status
              </div>
              <div className="space-y-1">
                {["draft", "sold out", "on sale"].map((s) => (
                  <label key={s} className="block">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={status === s}
                      onChange={() => setStatus(s)}
                      className="mr-2"
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => {
                  setSortBy("");
                  setCondition("");
                  setStatus("");
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="bg-orange-500 text-white text-sm px-4 py-[6px] rounded-full hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Product Grid or Empty */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img
              src="/images/story set/no listings.jpg"
              alt="No Listings"
              className="w-[250px] sm:w-[300px] md:w-[350px] h-auto mb-6"
            />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">@user</span> doesn&apos;t have any listings yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
            {filteredProducts.map((item) => {
              const price =
                typeof item.productPrice === "number"
                  ? item.discountPercent
                    ? (item.productPrice * (100 - item.discountPercent)) / 100
                    : item.productPrice
                  : 0;

              const firstImageUrl =
                item.fileUrls?.[0] || "/images/default-product.png";

              return (
                <Cart
                  key={item.productId}
                  id={item.productId}
                  imageUrl={firstImageUrl}
                  title={item.productName}
                  description={item.description}
                  price={price.toFixed(2)}
                  originalPrice={
                    item.discountPercent ? item.productPrice : null
                  }
                  discountText={
                    item.discountPercent ? `${item.discountPercent}% OFF` : null
                  }
                  showEditButton={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
