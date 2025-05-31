import Image from "next/image";

export default function Banner() {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
            We help you shop smarter
          </h1>
          <h2 className="text-xl sm:text-2xl text-orange-500 font-semibold mb-6">
            one resold product at a time.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Cambodia’s trusted online marketplace where buying and selling is fast,
            easy, and secure. Whether you're looking to declutter your home, start a
            side hustle, or find great deals on quality new and used products,
            ReSellKH is the perfect platform for you.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end gap-6">
          <div className="flex flex-col gap-4">
            <Image
              src="/images/banner/hero1.png"
              alt="Scan"
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
            <Image
              src="/images/banner/hero2.png"
              alt="Clothes"
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
            <Image
              src="/images/banner/hero3.png"
              alt="Snap photo"
              width={80}
              height={80}
              className="rounded-xl object-cover"
            />
          </div>

          <div className="relative w-[240px] h-[240px] sm:w-[260px] sm:h-[260px]">
            <div className="absolute top-4 left-4 w-full h-full bg-black/10 blur-lg rounded-2xl z-0" />
            <Image
              src="/images/banner/hero4.png"
              alt="Main view"
              fill
              className="rounded-2xl object-cover relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
