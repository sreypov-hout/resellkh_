// src/app/(main)/layout.js
import AuthNavbar from "@/components/layout/AuthNavbar";
import Footer from "@/components/layout/Footer";
import { FileProvider } from '@/context/FileContext'; // Import the provider

export const metadata = {
  title: "ResellKH - Marketplace",
};

export default function MainLayout({ children }) {
  return (
    <>
      <FileProvider> {/* Add the provider here */}
        <AuthNavbar />
        <main className="pt-[2px] md:pt-[7px] lg:pt-0"> 
          {children}
        </main>
        <Footer />
      </FileProvider>
    </>
  );
}