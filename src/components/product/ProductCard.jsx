// No 'use client' needed as button click doesn't change state within the component
import Image from 'next/image';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image 
          src={product.image} 
          alt={product.title} 
          width={300} 
          height={300} 
          className="w-full h-48 object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[#FF0000] text-white text-xs px-2 py-1 rounded-[50px]">
            10% OFF
          </span>
        )}
        {/* <button className="absolute bottom-auto right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors" aria-label="Bookmark product">
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.10547 1.14746H12.1055C12.4368 1.14746 12.7051 1.4157 12.7051 1.74707V18.1846C12.7048 18.595 12.3062 18.8758 11.9287 18.7578L11.8545 18.7285L7.19238 16.5771C6.86679 16.4269 6.49758 16.4079 6.16113 16.5205L6.01855 16.5771L1.35645 18.7285C0.95905 18.9117 0.506143 18.6221 0.505859 18.1846V1.74707L0.517578 1.62598C0.573584 1.35264 0.815572 1.14746 1.10547 1.14746Z" stroke="#2C2C2C" strokeWidth="0.8"/>
          </svg>
        </button> */}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between space-x-2 ">
          <span className="font-bold text-orange-500 ">{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-sm line-through ">{product.originalPrice}</span>
          )}
          <button className=" text-white px-4 py-2 rounded-[50px] font-medium hover:bg-orange-600 transition-colors right- p-2 bg-white rounded-full">
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.10547 1.14746H12.1055C12.4368 1.14746 12.7051 1.4157 12.7051 1.74707V18.1846C12.7048 18.595 12.3062 18.8758 11.9287 18.7578L11.8545 18.7285L7.19238 16.5771C6.86679 16.4269 6.49758 16.4079 6.16113 16.5205L6.01855 16.5771L1.35645 18.7285C0.95905 18.9117 0.506143 18.6221 0.505859 18.1846V1.74707L0.517578 1.62598C0.573584 1.35264 0.815572 1.14746 1.10547 1.14746Z" stroke="#2C2C2C" strokeWidth="0.8"/>
          </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;