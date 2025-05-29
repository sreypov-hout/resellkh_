// No 'use client' needed
import ProductCard from './ProductCard';

const MoreFromSeller = () => {
  const products = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      title: 'Recycled leather shoulder bag',
      description: 'A classic handbag of the Recycled leather...',
      price: '$100',
      originalPrice: '$200',
      isNew: false
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=300&fit=crop',
      title: 'Best Bow Hairstyles',
      description: 'Best hairstyles that will be perfect to suit...',
      price: '$1.45',
      originalPrice: null,
      isNew: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      title: 'Swatch High-Quality',
      description: 'Swatch Classic Timepiece Elegance meets...',
      price: '$5',
      originalPrice: null,
      isNew: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      title: 'White Puller Cloud bag',
      description: 'Brand new White Puller Cloud bag selling at...',
      price: '$5',
      originalPrice: null,
      isNew: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
      title: 'JACK WILLS Men\'s',
      description: 'Sweatshirt/jumper',
      price: '$29.5/6',
      originalPrice: null,
      isNew: true
    }
  ];
  
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">More from this seller</h2>
        <div className="flex space-x-2">
          {/* These buttons could use client-side logic if they actually paginate */}
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MoreFromSeller;