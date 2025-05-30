// No 'use client' needed
import ProductCard from './ProductCard';

const OtherProducts = () => {
  const products = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
      title: 'Vintage White Hoodie',
      description: 'Comfortable vintage style hoodie...',
      price: '$7',
      originalPrice: null,
      isNew: false
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
      title: 'Coho Hoodie in brown',
      description: 'Coho Hoodie in brown...',
      price: '$12-$45.00',
      originalPrice: null,
      isNew: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
      title: 'Brandy Melville Graphic Hoodie',
      description: 'Brandy Melville Graphic Hoodie size one size...',
      price: '$22',
      originalPrice: null,
      isNew: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
      title: 'Brandy Hoodie',
      description: 'Brandy Melville Hoodie...',
      price: '$15',
      originalPrice: null,
      isNew: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
      title: 'OCT 100% cotton beige Hoodies',
      description: 'OCT 100% cotton beige Hoodies...',
      price: '$18',
      originalPrice: null,
      isNew: false
    }
  ];
  
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Other products you may like</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard key={`second-${product.id}`} product={product} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        {/* This button could use client-side logic if it loads more products dynamically */}
        <button className="bg-orange-500 text-white px-8 py-3 rounded-[50px] font-medium hover:bg-orange-600 transition-colors">
          View more
        </button>
      </div>
    </section>
  );
};

export default OtherProducts;