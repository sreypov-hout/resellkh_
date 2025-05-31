import Image from "next/image";

export default function DailyBanner() {
  return (
    <section className="bg-[#f5f2f5] py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#ece6f0] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Your daily resell marketplace — shop <br />
              or sell second-hand today.
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              All from home, all with{" "}
              <span className="text-orange-500 font-semibold">ReSellKH</span>
            </p>
            <p className="mt-6 text-sm sm:text-base text-gray-500">
              Start You'r Daily Shopping with{" "}
              <span className="text-orange-500 font-semibold">ReSellKH</span>
            </p>
          </div>
          <div className="relative w-full h-[220px] flex justify-end">
            <div className="absolute top-0 left-8 w-[140px] h-[140px] rounded-xl overflow-hidden shadow-md z-0">
              <Image
                src="/images/banner/banner1.jpg"
                alt="Background Clothes"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-6 left-20 w-[140px] h-[140px] rounded-xl overflow-hidden shadow-md z-10">
              <Image
                src="/images/banner/banner2.jpg"
                alt="Middle Clothes"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[140px] h-[140px] rounded-xl overflow-hidden shadow-xl z-20">
              <Image
                src="/images/banner/banner3.jpg"
                alt="Front Clothes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
