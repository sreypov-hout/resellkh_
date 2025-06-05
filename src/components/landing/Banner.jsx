import Image from "next/image";

export default function Banner() {
  return (
    <section className="w-full bg-white py-10 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-gray-900 font-[Poppins] leading-tight mb-3">
            We help you shop smarter
          </h1>
          <h2 className="text-[20px] sm:text-[28px] md:text-[32px] font-bold text-orange-500 font-[Poppins] mb-6 text-left ml-4 md:ml-20">
            one resold product at a time.
          </h2>

          <p className="text-[16px] sm:text-[17px] md:text-[18px] font-[Poppins] text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            Cambodia’s trusted online marketplace where buying and selling is
            fast, easy, and secure. Whether you're looking to declutter your
            home, start a side hustle, or find great deals on quality new and
            used products, ReSellKH is the perfect platform for you.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end gap-4">
          <div className="flex flex-col gap-4">
            <Image
              src="/images/banner/hero1.jpg"
              alt="Scan"
              width={100}
              height={120}
              className="rounded-xl object-cover w-[100px] h-[120px]"
            />
            <Image
              src="/images/banner/hero2.jpg"
              alt="Clothes"
              width={100}
              height={120}
              className="rounded-xl object-cover w-[100px] h-[120px]"
            />
          </div>
          <div className="relative w-[240px] h-[240px]">
            <div className="absolute  top-2 left-2 w-full h-full z-0 rounded-xl overflow-hidden">
              <Image
                src="/images/banner/hero4.jpg"
                alt="Blurred bg"
                fill
                className="object-cover opacity-60 blur-sm"
              />
            </div>

            <Image
              src="/images/banner/hero3.jpg"
              alt="Main"
              fill
              className="object-cover rounded-xl relative z-10 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
