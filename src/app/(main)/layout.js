// src/app/(main)/layout.js
import AuthNavbar from "@/components/layout/AuthNavbar";

export const metadata = {
  title: "ResellKH - Marketplace",
};

export default function MainLayout({ children }) {
  //   return <ClientLayout>{children}</ClientLayout>;
  return (
    <>
  
        <AuthNavbar />
        {children}
        <div className="h-[300px] w-full bg-gray-400 text-center">
          footer
        </div>
     
    </>
  );
}
