'use client';

import { useState, useEffect, useMemo, useCallback, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import EditPhotoUploader from "@/components/sell/editPhotoUpload";
import CategorySelector from "@/components/sell/CategorySelector";
import ConditionSelector from "@/components/sell/ConditionSelector";
import ItemDetailForm from "@/components/sell/ItemDetailForm";
import DealMethod from "@/components/sell/DealMethod";
import PricingInput from "@/components/sell/PricingInput";
import { encryptId } from "@/utils/encryption";
import { deleteProduct } from "@/components/services/deleteProduct.service";
import { updateProduct } from "@/components/services/updateProduct.service";
import toast from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const staticCategories = [
    { id: 1, name: "Accessories" },
    { id: 2, name: "Beauty" },
    { id: 3, name: "Equipment Bag & Shoes" },
    { id: 4, name: "Book" },
    { id: 5, name: "Fashion" },
    { id: 6, name: "Home" },
    { id: 7, name: "Sports & Kids" },
    { id: 8, name: "Electronic" },
    { id: 9, name: "Vehicle" },
    { id: 10, name: "Other" },
];

// Skeleton component for a better loading experience
const EditPageSkeleton = () => (
    <div className="mx-auto px-[7%] py-8 animate-pulse">
        <div className="h-7 w-48 bg-gray-300 rounded-md mb-4"></div>
        <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column: Photo Uploader Skeleton */}
            <div className="flex-1 space-y-4">
                <div className="h-80 w-full bg-gray-300 rounded-lg"></div>
            </div>
            {/* Right Column: Form Fields Skeleton */}
            <div className="w-full md:w-1/2 space-y-8">
                {/* Repeats for each form section */}
                <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                </div>
                 <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    <div className="h-10 w-full bg-gray-300 rounded-md"></div>
                </div>
                 <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    <div className="h-24 w-full bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
        {/* Bottom Buttons Skeleton */}
        <div className="flex justify-between mt-8">
            <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-36 bg-gray-300 rounded-full"></div>
        </div>
    </div>
);


export default function EditProductPage({ params }) {
    const { productId } = use(params);
    const router = useRouter();
    const { data: session, status } = useSession();
    const dealMethodRef = useRef(null);

    const [filesToSave, setFilesToSave] = useState([]);
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [telegram, setTelegram] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [latLng, setLatLng] = useState({ lat: null, lng: null });
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [error, setError] = useState(null);
    const [originalProduct, setOriginalProduct] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?redirect=/edit-product/" + productId);
        }
    }, [status, router, productId]);

    const getEncrypted = (id) => {
        try {
            if (!id) return "";
            return encodeURIComponent(encryptId(id.toString()));
        } catch (error) {
            console.error("Profile ID encryption failed:", error);
            return "";
        }
    };

    useEffect(() => {
        if (productId && status === "authenticated") {
            const fetchProductData = async () => {
                try {
                    // Set loading state to true
                    setIsLoadingProduct(true);
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                        `${API_BASE_URL}/products/getproductbyuserid/${session.user.id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    const product = data.payload?.find((p) => p.productId === parseInt(productId));
                    if (!product) throw new Error("Product not found");
                    if (product.userId !== session.user.id) throw new Error("Unauthorized");

                    setOriginalProduct(product);
                    setTitle(product.productName || "");
                    setDescription(product.description || "");
                    setLocation(product.location || "");
                    setTelegram(product.telegramUrl || "");
                    setPrice(product.productPrice?.toString() || "");
                    setDiscount(product.discountPercent?.toString() || "");
                    setCondition(product.condition || "");
                    setLatitude(product.latitude);
                    setLongitude(product.longitude);
                    setLatLng({ lat: product.latitude, lng: product.longitude });

                    const cat = staticCategories.find((c) => c.id === product.mainCategoryId);
                    if (cat) setCategory(cat.name);

                } catch (err) {
                    console.error("Fetch error:", err);
                    setError(err.message);
                } finally {
                    // Set loading state to false after fetch completes
                    setIsLoadingProduct(false);
                }
            };
            fetchProductData();
        }
    }, [productId, status, session]);

    const initialFiles = useMemo(() => {
        if (originalProduct?.fileUrls?.length > 0) {
            return originalProduct.fileUrls.map((url, index) => ({
                id: `existing-${originalProduct.productId}-${index}`,
                url: url,
            }));
        }
        return [];
    }, [originalProduct]);

    const handleFilesChange = useCallback((newFiles) => {
        setFilesToSave(newFiles.filter(file => file instanceof File));
    }, []);

    const handleConfirmDelete = async () => {
        setShowDeletePopup(false);
        setIsLoading(true);
        try {
            await deleteProduct(productId, session.accessToken);
            toast.success("Product deleted successfully!");
            router.push(`/profile/${getEncrypted(session.user.id)}`);
        } catch (error) {
            toast.error(`Delete failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) return toast.error("Product name is required");
        if (!condition) return toast.error("Please select product condition");
        if (!price || isNaN(parseFloat(price))) return toast.error("Please enter a valid price");

        const telegramUrl = dealMethodRef.current?.validateTelegram?.();
        if (telegramUrl === null) return;

        setIsLoading(true);
        const cat = staticCategories.find((c) => c.name === category);
        
        const productData = {
            productName: title,
            userId: session.user.id,
            mainCategoryId: cat ? cat.id : null,
            productPrice: parseFloat(price),
            discountPercent: parseFloat(discount) || 0,
            description: description,
            location: location,
            condition: condition,
            telegramUrl: telegramUrl || '',
            latitude: latitude,
            longitude: longitude,
            productStatus: originalProduct?.productStatus || "ON SALE",
        };

        try {
            const result = await updateProduct(
                productId, 
                productData, 
                filesToSave, 
                session.accessToken
            );
            
            if (result) {
                toast.success("Product updated successfully!");
                router.push(`/profile/${getEncrypted(session.user.id)}`);
            } else {
                throw new Error('Update may have failed; no confirmation received.');
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.message || "Failed to update product");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingProduct) {
        return <EditPageSkeleton />;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="mx-auto px-[7%] py-8">
            {/* --- Delete Confirmation Popup --- */}
            {showDeletePopup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setShowDeletePopup(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="text-lg font-medium mb-4">
                            Are you sure you want to delete this product?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleConfirmDelete();
                                }}
                                className="px-4 py-2 rounded-full bg-orange-500 text-white"
                            >
                                Yes
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeletePopup(false);
                                }}
                                className="px-4 py-2 rounded-full bg-gray-400 text-white"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Edit Product</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                    <EditPhotoUploader
                        key={productId}
                        initialFiles={initialFiles}
                        onFilesChange={handleFilesChange}
                        productId={productId}
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                    <CategorySelector selected={category} onSelect={setCategory} categories={staticCategories} />
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
                                ref={dealMethodRef}
                                location={location} 
                                setLocation={setLocation} 
                                telegram={telegram} 
                                setTelegram={setTelegram}
                                setLatitude={setLatitude} 
                                setLongitude={setLongitude} 
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
            <div className="flex justify-between mt-8">
                <button 
                    disabled={isLoading} 
                    onClick={() => setShowDeletePopup(true)}
                    className="px-6 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 disabled:bg-gray-400"
                >
                    {isLoading ? "Deleting..." : "Delete"}
                </button>
                <button 
                    disabled={isLoading} 
                    onClick={handleSaveEdit} 
                    className="px-6 py-2 rounded-full text-white bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400"
                >
                    {isLoading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}