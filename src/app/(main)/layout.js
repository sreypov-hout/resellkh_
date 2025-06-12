// src/app/(main)/layout.js
import AuthNavbar from "@/components/layout/AuthNavbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "ResellKH - Marketplace",
};

export default function MainLayout({ children }) {
  //   return <ClientLayout>{children}</ClientLayout>;
  return (
    <>
  
        <AuthNavbar />
        
        {children}
        <Footer />
     
    </>
  );
}
