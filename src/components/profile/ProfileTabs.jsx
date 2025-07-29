// ProfileTabs.jsx
import ListingsWithFilter from "./ListingWithFilter";
import ReviewsSection from "./ReviewsSection";

export default function ProfileTabs({ sellerId, activeTab, setActiveTab }) {
  return (
    <div className="w-full py-6 md:py-8">
      {/* Tab Header */}
      <div className="flex flex-wrap sm:flex-nowrap px-2 sm:px-6 space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide mb-4">
        <button
          onClick={() => setActiveTab("listings")}
          className={`pb-2 text-sm whitespace-nowrap font-medium ${
            activeTab === "listings"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 border-b-2 border-transparent"
          }`}
        >
          Listings
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-2 text-sm whitespace-nowrap font-medium ${
            activeTab === "reviews"
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 border-b-2 border-transparent"
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full sm:px-5">
        {activeTab === "listings" ? (
          <ListingsWithFilter userId={sellerId} />
        ) : (
          <ReviewsSection sellerId={sellerId} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}
