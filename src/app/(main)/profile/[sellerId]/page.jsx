import SellerProfileClient from "@/components/profile/SellerProfileClient";
import { decryptId } from "@/utils/encryption";
import { notFound } from 'next/navigation';

export default async function SellerProfilePage({ params }) {
  const encryptedSellerId = params?.sellerId;

  // If there's no ID in the URL, show the not found page.
  if (!encryptedSellerId) {
    notFound();
  }

  try {
    // We try to decode and decrypt the ID.
    const decoded = decodeURIComponent(encryptedSellerId);
    decryptId(decoded);
  } catch (error) {
    // If decryption fails, we'll log the error to the server console for debugging.
    // This does NOT mean the application has crashed.
    

    // This function will stop rendering the page and show the user your 'not-found' page.
    notFound();
  }

  // This part of the code will only run if the decryption is successful.
  return <SellerProfileClient sellerId={encryptedSellerId} />;
}