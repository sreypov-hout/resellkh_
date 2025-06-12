import { useState } from 'react';

export default function PricingInput({ price, setPrice, discount, setDiscount }) {
  const [currency, setCurrency] = useState('USD');

  const discountValue =
    price && discount ? ((price * discount) / 100).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      {/* Price Section */}
      <div className="p-5 border rounded-2xl bg-white space-y-3">
        <p className="font-semibold text-lg">Price</p>
        <div className="flex items-center gap-2">
          {/* Input */}
          <div className="relative flex-1">
            <span className="absolute top-3 left-5 text-black text-lg">
              {currency === 'USD' ? '$' : '៛'}
            </span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F0EAEB] text-black placeholder:text-gray-800 focus:outline-none"
            />
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center bg-[#F0EAEB] rounded-2xl p-1">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold ${
                currency === 'USD' ? 'bg-white text-black' : 'text-gray-800'
              }`}
            >
              $
            </button>
            <button
              onClick={() => setCurrency('KHR')}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold ${
                currency === 'KHR' ? 'bg-white text-black' : 'text-gray-800'
              }`}
            >
              <svg width="6" height="15" viewBox="0 0 6 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.54688 8.77734V13.8047C4.54688 14.6016 3.96094 15 2.78906 15H0.691406V13.3828C1.79297 13.3828 2.34375 13.1992 2.34375 12.832V8.77734H0.585938V7.16016H2.34375V5.55469L1.11328 4.39453L0.503906 3.80859C0.261719 3.58203 0.140625 3.35938 0.140625 3.14062C0.140625 2.97656 0.203125 2.81641 0.328125 2.66016L0.761719 2.08594L1.64062 0.9375H4.54688V2.55469H1.64062L4.54688 5.15625V7.16016H5.71875V8.77734H4.54688Z" fill="black"/>
              </svg>

            </button>
          </div>
        </div>
      </div>

      {/* Discount Section */}
      <div className="p-5 border rounded-2xl bg-white space-y-3">
        <p className="font-semibold text-lg">Discount %</p>
        <div className="flex items-center gap-2">
          {/* Input */}
          <div className="relative flex-1">
            <span className="absolute top-3 left-5 text-black text-lg">%</span>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F0EAEB] text-black placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          {/* Discount Value Display */}
          <div className="px-4 py-3 rounded-2xl border border-gray-800 text-black text-sm font-medium">
            {discountValue} <span className="text-gray-600">{currency === 'USD' ? '$' : '៛'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
