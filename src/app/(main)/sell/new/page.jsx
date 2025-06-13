'use client';

import { useState } from 'react';
import PhotoUploader from '@/components/sell/PhotoUploader';
import CategorySelector from '@/components/sell/CategorySelector';
import ConditionSelector from '@/components/sell/ConditionSelector';
import ItemDetailForm from '@/components/sell/ItemDetailForm';
import DealMethod from '@/components/sell/DealMethod';
import PricingInput from '@/components/sell/PricingInput';
import Footer from '@/components/layout/Footer';

export default function SellNewPage() {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [telegram, setTelegram] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  return (
    <>
      <div className="mx-auto px-[7%] py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">List and items</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Image Upload */}
          <div className="flex-1 space-y-4">
            <PhotoUploader files={files} setFiles={setFiles} />
          </div>

          {/* Right: Dynamic Form */}
          <div className="w-full md:w-1/2 space-y-6">
            <CategorySelector selected={category} onSelect={setCategory} />

            {category && (
              <>
                <ConditionSelector selected={condition} onSelect={setCondition} />
                <ItemDetailForm
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                />
                <DealMethod
                  location={location}
                  setLocation={setLocation}
                  telegram={telegram}
                  setTelegram={setTelegram}
                />
                <PricingInput
                  price={price}
                  setPrice={setPrice}
                  discount={discount}
                  setDiscount={setDiscount}
                />
              </>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="text-end mt-8">
          <button className="bg-orange-500 text-white font-bold px-6 py-2 rounded-xl hover:bg-orange-600">
            List now
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
