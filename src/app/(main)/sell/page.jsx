import PhotoUploadPrompt from '@/components/sell/PhotoUploadPrompt';
import SellDirectly from '@/components/sell/SellDirectly';
import ManageDrafts from '@/components/sell/ManageDrafts';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path
import axios from 'axios';

// --- SERVER-SIDE FUNCTION TO FETCH DRAFTS ---
async function getUserDrafts(userId, token) {
    if (!userId || !token) {
        return [];
    }
    try {
        const res = await axios.get(
            `https://comics-upset-dj-clause.trycloudflare.com/api/v1/products/drafts/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
                cache: 'no-store'
            }
        );
        // Return only active drafts
        return (res.data?.payload || []).filter(d => d?.productStatus === "DRAFT");
    } catch (error) {
        // A 404 from this endpoint just means no drafts exist, so we return an empty array.
        if (error.response?.status !== 404) {
            console.error('Failed to fetch drafts on server:', error.message);
        }
        return [];
    }
}


// --- SERVER COMPONENT (Default Export for the page) ---
export default async function SellDashboardPage() {
    const session = await getServerSession(authOptions);
    const initialDrafts = await getUserDrafts(session?.user?.id, session?.accessToken);

    return (
        <>
            <div className="mx-auto px-4 sm:px-6 lg:px-[7%] py-6 sm:py-10">
                <div className="mb-6">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">List it yourself</h1>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Find your own buyers</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                    <div>
                        <PhotoUploadPrompt />
                    </div>
                    <div>
                        <div className="flex flex-col items-start lg:items-end text-left lg:text-right mb-4 gap-2">
                            <div className="flex items-center justify-start lg:justify-end">
                                <h1 className="text-lg sm:text-xl font-bold text-gray-950">Sell to Brandname</h1>
                                <span className="ml-2 bg-orange-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Beta</span>
                            </div>
                            <p className="text-sm sm:text-base text-black font-medium">No listing needed, sell directly to us</p>
                        </div>
                        <div className="bg-[#E4E4E4] rounded-3xl p-4 sm:p-6 shadow-sm">
                            <SellDirectly />
                        </div>
                    </div>
                </div>
                <div className="mt-10 sm:mt-12">
                    {/* The ManageDrafts component now receives its data from the server */}
                    <ManageDrafts initialDrafts={initialDrafts} />
                </div>
            </div>
        </>
    );
}