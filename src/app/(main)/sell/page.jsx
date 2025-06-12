import PhotoUploadPrompt from '@/components/sell/PhotoUploadPrompt';
import SellDirectly from '@/components/sell/SellDirectly';
import ManageDrafts from '@/components/sell/ManageDrafts';
import Footer from '@/components/layout/Footer';

export default function SellDashboardPage() {
  return (
    <>
     
        <div className="mx-auto px-[7%] py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">List it yourself</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Find your own buyers</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* LEFT: Photo Upload */}
            <div>
              <div>
                <PhotoUploadPrompt />
              </div>
            </div>

            {/* RIGHT: Sell Directly */}
            <div>
              {/* Header with title and beta */}
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Sell Directly</h2>
                  <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Beta
                  </span>
                </div>
              <div className="bg-[#E4E4E4] rounded-3xl p-6 shadow-sm relative">

                {/* Header with title and beta
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Sell Directly</h2>
                  <span className="bg-orange-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    Beta
                  </span>
                </div> */}

                <SellDirectly />
              </div>
            </div>
          </div>

          {/* BOTTOM: Draft management */}
          <div className="mt-12">
            <ManageDrafts />
          </div>
        </div>

        <Footer />
      
    </>
  );
}
