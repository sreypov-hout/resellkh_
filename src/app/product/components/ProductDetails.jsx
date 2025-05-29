// 'use client' is optional here; the button itself doesn't have client-side state/effects.
// If the button were to trigger a client-side interaction (e.g., adding to cart with state management),
// then 'use client' would be required.
const ProductDetails = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lululemon Cropped Full Zip Hoodie - XS/S - light grey
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-orange-500">$7.5</span>
          <span className="text-lg text-gray-500 line-through">$15</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Condition:</span>
          <span className="text-gray-600">Like new</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Category:</span>
          <span className="text-gray-600">Fashion</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          I wore it just once for a chill outing, and it looked amazing. Super soft and lightweight - perfect for layering or wearing on its own. Honestly, I love it, but it's a way too many similar tops, so I'm...
        </p>
      </div>
      
      <button className=" bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
        Read More
      </button>
    </div>
  );
};

export default ProductDetails;