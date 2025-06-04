import CategorySlider from "@/components/landing/CategorySlider";
import Banner from "@/components/landing/Banner";
import TrendingProducts from "@/components/landing/TrendingProducts";
import RecommendedList from "@/components/landing/RecommendedList";
import DailyBanner from "@/components/landing/DailyBanner";

export default function LandingPage() {
  return (
    <div className="w-full bg-white py-10">
      <div className="w-full px-[7%] max-w-[1440px] mx-auto">
        <Banner />
        <CategorySlider />
        <TrendingProducts />
        <RecommendedList />
        <DailyBanner />
      </div>
    </div>
  );
}
