// No 'use client' needed as button click doesn't change state within the component
import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory

const MoreFromSeller = () => {
  const products = [
    {
      id: 1,
      image: '/Product-Detail-Image/card-1.png',
      title: 'Recycled leather shoulder bag',
      description: 'A classic handbag of the Recycled leather...',
      price: '100',
      originalPrice: '200',
      isNew: false
    },
    {
      id: 2,
      image: '/Product-Detail-Image/card-2.png',
      title: 'Best Bow Hairstyles',
      description: 'Best hairstyles that will be perfect to suit...',
      price: '1.45',
      originalPrice: null,
      isNew: true // This will translate to "10% OFF" in ProductCard
    },
    {
      id: 3,
      image: '/Product-Detail-Image/card-3.png',
      title: 'Swatch High-Quality',
      description: 'Swatch Classic Timepiece Elegance meets...',
      price: '5',
      originalPrice: null,
      isNew: false
    },
    {
      id: 4,
      image: '/Product-Detail-Image/card-4.png',
      title: 'White Puller Cloud bag',
      description: 'Brand new White Puller Cloud bag selling at...',
      price: '5',
      originalPrice: null,
      isNew: false
    },
    {
      id: 5,
      image: '/Product-Detail-Image/card-5.png',
      title: 'JACK WILLS Men\'s',
      description: 'Sweatshirt/jumper',
      price: '29.5',
      originalPrice: null,
      isNew: true // This will translate to "10% OFF" in ProductCard
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">More from this seller</h2>
        <div className="flex space-x-2">
          {/* These buttons could use client-side logic if they actually paginate */}
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            originalPrice={product.originalPrice}
            // Conditionally set discountText based on isNew
            discountText={product.isNew ? "10% OFF" : null}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreFromSeller;