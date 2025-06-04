import Image from "next/image";

export default function DailyBanner() {
  return (
    <section className="w-full bg-[#f0eaed] py-10 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 font-quicksand">
        {/* Text Side */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-gray-900 leading-snug mb-4">
            Your daily resell marketplace — shop
            <br className="hidden sm:block" />
            or sell second-hand today.
            <br className="hidden sm:block" />
            All from home, all with <span className="text-orange-500">ReSellKH</span>
          </h2>
          <p className="text-[15px] sm:text-[17px] md:text-[20px] text-gray-600 font-medium">
            Start You'r Daily Shopping with{" "}
            <span className="text-orange-500 font-semibold">ReSellKH</span>
          </p>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-[480px] flex flex-col sm:flex-row items-center justify-center gap-4 relative">
          <div className="flex gap-4">
            <Image
              src="/images/banner/banner1.jpg"
              alt="bg1"
              width={160}
              height={160}
              className="rounded-xl object-cover shadow-md w-[140px] h-[140px] md:w-[160px] md:h-[160px]"
            />
            <Image
              src="/images/banner/banner2.jpg"
              alt="bg2"
              width={160}
              height={160}
              className="rounded-xl object-cover shadow-md w-[140px] h-[140px] md:w-[160px] md:h-[160px]"
            />
          </div>

          {/* Top-layer image - disable absolute for tablets, use relative stacking */}
          <div className="md:absolute md:top-10 md:left-12 w-[150px] h-[150px] md:w-[160px] md:h-[160px]">
            <Image
              src="/images/banner/banner3.jpg"
              alt="bg3"
              width={160}
              height={160}
              className="rounded-xl object-cover shadow-lg w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
