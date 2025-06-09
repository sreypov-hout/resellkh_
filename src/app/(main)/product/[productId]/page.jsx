// src/app/product/page.jsx
// This is a Server Component by default

import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import SellerInfo from '@/components/product/SellerInfo';
import Reviews from '@/components/product/Reviews';
import MoreFromSeller from '@/components/product/MoreFromSeller';
import OtherProducts from '@/components/product/OtherProducts';
import ContactSellerHeader from '@/components/product/ContactSellerHeader';
import Footer from '@/components/layout/Footer';

const ProductPage = () => {
  // Define actual image URLs for the hoodie from the provided image
  // const hoodieImageUrls = [
  //   '/image1.png', // Main image on the right
  //   '/image2.png', // Top thumbnail
  //   '/image3.png', // Second thumbnail
  //   '/video.mp4', // Third thumbnail
  // ];
  

  const productData = {
    id: 'lulu-hoodie-123',
    name: 'Lululemon Cropped Full Zip Hoodie - XS/S - light grey',
    price: '$7.5',
    originalPrice: '$15',
    condition: 'Like new',
    category: 'Fashion',
    description: "I wore it just once for a chill outing, and it looked amazing. Super soft and lightweight - perfect for layering or wearing on its own. Honestly, I love it, but it's a way too many similar tops, so I'm...",
    // images: hoodieImageUrls, 
  };

  return (
                       //max-w-7xl           change to  px-[7%]
    <>
      <div className=" mx-auto px-4 sm:px-6 lg:px-[7%] py-4 bg-white text-black">
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span> / <span className="text-orange-500">Details</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Pass the productData to ProductGallery */}
          <ProductGallery product={productData} /> 
          <ProductDetails />
        </div>
        
        <ContactSellerHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div> 
            <SellerInfo />
          </div>
          <div className="lg:col-span-2"> 
            <Reviews />
          </div>
        </div>
        
        <MoreFromSeller />
        <OtherProducts />
        
      </div>
      <Footer />

      
    </>
  );
};

export default ProductPage;