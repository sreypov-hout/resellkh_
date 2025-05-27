const categories = [
  { name: "Dress", image: "/images/dress.png" },
  { name: "Jacket", image: "/images/jacket.png" },
  { name: "Bags", image: "/images/bags.png" },
  { name: "Backpack", image: "/images/backpack.png" },
  { name: "Jewelry", image: "/images/jewelry.png" },
  { name: "Shoes", image: "/images/shoes.png" },
  { name: "Sports", image: "/images/sports.png" },
  { name: "Sneakers", image: "/images/sneakers.png" }
];

export default function ProductList() {
  return (
    <section className="px-6 py-8">
      <h2 className="text-xl font-bold mb-4">What would you like to find?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-50 rounded-xl p-4">
            <img src={cat.image} alt={cat.name} className="h-24 w-24 object-contain" />
            <span className="mt-2">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
