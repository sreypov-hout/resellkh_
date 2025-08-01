import "./globals.css";
import { Poppins } from "next/font/google"; // Assuming you are using Poppins font
import Providers from "@/components/Providers";
import AuthNavbar from "@/components/layout/AuthNavbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // It's good practice to name the variable
});

export const metadata = {
  title: "ResellKH",
  description: "Your one-stop marketplace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        THIS IS THE FIX:
        Adding suppressHydrationWarning to the body tag tells Next.js to
        ignore attribute mismatches caused by browser extensions.
      */}
      <body className={`${poppins.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}