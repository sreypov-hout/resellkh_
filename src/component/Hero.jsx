export default function Hero() {
  return (
    <section className="px-6 py-12 text-center">
      <h1 className="text-3xl font-bold">We help you shop smarter</h1>
      <h2 className="text-xl text-orange-500 mt-2">one resold product at a time.</h2>
      <p className="mt-4 max-w-xl mx-auto text-gray-600">
        Cambodia’s trusted online marketplace where buying and selling is fast, easy, and secure...
      </p>
      <div className="flex justify-center items-center mt-8 gap-4">
        <img src="/images/sell1.jpg" className="rounded-xl w-32 h-32 object-cover" />
        <img src="/images/sell2.jpg" className="rounded-xl w-48 h-32 object-cover" />
        <img src="/images/sell3.jpg" className="rounded-xl w-32 h-32 object-cover" />
      </div>
    </section>
  );
}
