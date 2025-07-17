import ProductCart from "@/components/domain/ProductCart";

export default function ProductGrid() {
  const products = [
    {
      imageUrl: "/images/product/cropped_hoodie.jpg",
      title: "cotton beige hoodies",
      description: "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
      price: 18,
      originalPrice: 20,
      discountText: "10% Off",
    },
    {
      imageUrl: "/images/product/cropped_hoodie.jpg",
      title: "cotton beige hoodies",
      description: "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
      price: 18,
      originalPrice: 20,
      discountText: "10% Off",
    },
    {
      imageUrl: "/images/product/cropped_hoodie.jpg",
      title: "cotton beige hoodies",
      description: "oversize hoodie. fast deal, clearing wardrobe selling as I don’t reach for it often",
      price: 18,
      originalPrice: 20,
      discountText: "10% Off",
    },
    {
      imageUrl: "/images/product/cropped_hoodie.jpg",
      title: "plain white t-shirt",
      description: "basic cotton tee. worn twice.",
      price: 10,
    },
    {
      imageUrl: "/images/product/cropped_hoodie.jpg",
      title: "plain white t-shirt",
      description: "basic cotton tee. worn twice.",
      price: 10,
    },
  ];

  return (
    <main className="flex flex-wrap gap-4 p-6">
      {products.map((item) => (
        <ProductCart
          key={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
          price={item.price}
          originalPrice={item.originalPrice}
          discountText={item.discountText}
          onBookmarkClick={() => alert(`Bookmarked ${item.title}`)}
          onAddToCart={() => alert(`Added ${item.title} to cart`)}
        />
      ))}
    </main>
  );
} 
