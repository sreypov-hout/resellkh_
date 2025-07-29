"use client";

import { useState, useEffect, useRef } from "react";
import LocationDropdown from "./navbar/LocationDropdown";
import SearchBar from "./navbar/SearchBar";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import ImageScanModal from "./navbar/ImageScanModal";
import ConfirmLogout from "./navbar/Confirmlogout";
import { encryptId } from "@/utils/encryption";
import { Store, LayoutDashboard, ShoppingCart } from "lucide-react";
import { fetchUserProfile } from "../services/userprofile.service";
import {
  parseJwt,
  fetchAllNotifications,
} from "@/components/services/notification.service";

export default function AuthNavbar() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [scanOpen, setScanOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [hasUnread, setHasUnread] = useState(false);
  const [imageError, setImageError] = useState(false);

  const profileRef = useRef(null);
  const desktopCategoryRef = useRef(null);
  const mobileCategoryRef = useRef(null);
  const isSigningOut = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  const categoryMap = {
    accessories: 1,
    beauty: 2,
    equipment_bag_shoes: 3,
    book: 4,
    fashion: 5,
    home: 6,
    sports_kids: 7,
    electronic: 8,
    vehicle: 9,
    other: 10,
  };

  const topCategories = [
    { name: "Fashion", key: "fashion" },
    { name: "Accessories", key: "accessories" },
    { name: "Equipment & Shoes", key: "equipment_bag_shoes" },
    { name: "Beauty", key: "beauty", showOn: "lg" },
    { name: "Book", key: "book", showOn: "lg" },
  ];

  const dropdownCategories = [
    { name: "Home", key: "home" },
    { name: "Sports & Kids", key: "sports_kids" },
    { name: "Electronic", key: "electronic" },
    { name: "Vehicle", key: "vehicle" },
    { name: "Other", key: "other" },
  ];

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.id &&
      session?.accessToken
    ) {
      const loadUserProfile = async () => {
        try {
          const userId = session.user.id;
          const token = session.accessToken;
          const profileData = await fetchUserProfile(userId, token);
          setUser({
            id: profileData.userId,
            name: `${profileData.firstName || ""} ${
              profileData.lastName || ""
            }`,
            avatar:
              profileData.profileImage ||
              "https://gateway.pinata.cloud/ipfs/QmYkedcDzkvyCZbPtzmztQZ7uANVYFiqBXTJbERsJyfcQm", // Fallback avatar
          });
          localStorage.setItem("token", token);
          localStorage.setItem("userId", String(session.user.id));
          setImageError(false); // Reset image error when user data is loaded
        } catch (err) {
          console.error("Failed to load user profile:", err);
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        } finally {
        }
      };

      loadUserProfile();
    } else if (status === "unauthenticated") {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  }, [session, status]);

  // KEY FIX: This useEffect hook has been updated to handle 401 errors.
  useEffect(() => {
    isSigningOut.current = false;

    if (user && session?.accessToken) {
      const handleAuthError = () => {
        if (isSigningOut.current) return;
        isSigningOut.current = true;
        console.warn("Session expired. Signing out.");
        localStorage.clear();
        signOut({ callbackUrl: "/login?session_expired=true" });
      };

      const fetchCartCount = async () => {
        try {
          const res = await fetch(
            `https://trivia-worlds-wichita-stan.trycloudflare.com/api/v1/cart/count?userId=${user.id}`,
            { headers: { Authorization: `Bearer ${session.accessToken}` } }
          );

          if (res.status === 401) {
            handleAuthError();
            return;
          }

          if (res.ok) {
            const data = await res.json();
            setCartItemCount(data.payload?.count || 0);
          } else {
            console.error("Failed to fetch cart count:", res.status);
          }
        } catch (err) {
          console.error("Error fetching cart count:", err);
        }
      };

      const checkUnread = async () => {
        try {
          const allNotifications = await fetchAllNotifications(
            session.accessToken,
            user.id
          );
          if (allNotifications) {
            const unreadExists = allNotifications.some((n) => !n.isRead);
            setHasUnread(unreadExists);
          }
        } catch (err) {
          console.error("Error checking unread notifications:", err);
          // Assuming the service function throws an error with a 'status' property
          if (err.status === 401) {
            handleAuthError();
          }
        }
      };

      fetchCartCount();
      checkUnread();

      const handleCartUpdate = () => fetchCartCount();
      window.addEventListener("cart-updated", handleCartUpdate);
      return () => window.removeEventListener("cart-updated", handleCartUpdate);
    } else {
      setCartItemCount(0);
      setHasUnread(false);
    }
  }, [user, session]);

  // Effect to handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (
        desktopCategoryRef.current &&
        !desktopCategoryRef.current.contains(event.target) &&
        mobileCategoryRef.current &&
        !mobileCategoryRef.current.contains(event.target)
      ) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setProfileOpen(false);
    setCategoryOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    setShowLogoutModal(false);
    localStorage.clear();
    signOut({ callbackUrl: "/" });
  };

  const handleSellClick = () => {
    if (user) {
      router.push("/sell");
    } else {
      router.push("/login");
    }
  };

  const getEncryptedProfileId = (id) => {
    try {
      if (!id) return "";
      return encodeURIComponent(encryptId(id.toString()));
    } catch (error) {
      console.error("Profile ID encryption failed:", error);
      return "";
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="w-full sticky top-0 z-[200] bg-white px-[7%] py-4 ">
      <div className="max-w-screen-full mx-auto flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <img
            src="/images/auth/logo.jpg"
            alt="ResellKH Logo"
            onClick={() => router.push("/")}
            className="text-2xl cursor-pointer h-[40px]"
          />

          <nav className="hidden md:flex gap-6 text-sm text-gray-800">
            {topCategories.map((cat) => (
              <Link
                key={cat.key}
                href={`/category/${categoryMap[cat.key]}`}
                className={`hover:text-orange-500 ${
                  cat.showOn === "lg" ? "md:hidden lg:block" : ""
                }`}
              >
                {cat.name}
              </Link>
            ))}
            <div className="relative" ref={desktopCategoryRef}>
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="group flex items-center gap-1 text-gray-800 hover:text-orange-500"
              >
                <svg
                  className="w-5 h-5 group-hover:text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.99829 4.75C5.99829 4.33579 6.33408 4 6.74829 4H17.2483C17.6625 4 17.9983 4.33579 17.9983 4.75C17.9983 5.16421 17.6625 5.5 17.2483 5.5H6.74829C6.33408 5.5 5.99829 5.16421 5.99829 4.75ZM5.99829 10C5.99829 9.58579 6.33408 9.25 6.74829 9.25H17.2483C17.6625 9.25 17.9983 9.58579 17.9983 10C17.9983 10.4142 17.6625 10.75 17.2483 10.75H6.74829C6.33408 10.75 5.99829 10.4142 5.99829 10ZM5.99829 15.25C5.99829 14.8358 6.33408 14.5 6.74829 14.5H17.2483C17.6625 14.5 17.9983 14.8358 17.9983 15.25C17.9983 15.6642 17.6625 16 17.2483 16H6.74829C6.33408 16 5.99829 15.6642 5.99829 15.25Z" />
                  <path d="M1.98828 4.75C1.98828 4.19772 2.436 3.75 2.98828 3.75H2.99828C3.55057 3.75 3.99828 4.19772 3.99828 4.75V4.76C3.99828 5.31228 3.55057 5.76 2.99828 5.76H2.98828C2.436 5.76 1.98828 5.31228 1.98828 4.76V4.75Z" />
                  <path d="M1.98828 15.25C1.98828 14.6977 2.436 14.25 2.98828 14.25H2.99828C3.55057 14.25 3.99828 14.6977 3.99828 15.25V15.26C3.99828 15.8123 3.55057 16.26 2.99828 16.26H2.98828C2.436 16.26 1.98828 15.8123 1.98828 15.26V15.25Z" />
                  <path d="M1.98828 10C1.98828 9.44772 2.436 9 2.98828 9H2.99828C3.55057 9 3.99828 9.44772 3.99828 10V10.01C3.99828 10.5623 3.55057 11.01 2.99828 11.01H2.98828C2.436 11.01 1.98828 10.5623 1.98828 10.01V10Z" />
                </svg>
                <span className="group-hover:text-orange-500">
                  All Categories
                </span>
              </button>
              {categoryOpen && (
                <div className="absolute z-50 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2">
                  {dropdownCategories.map((cat) => (
                    <Link
                      key={cat.key}
                      href={`/category/${categoryMap[cat.key]}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-4 text-gray-700 text-sm">
            {!user ? (
              <>
                <Link
                  href="/register"
                  className="hover:text-orange-500 font-medium"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="hover:text-orange-500 font-medium"
                >
                  Log in
                </Link>
                <button
                  onClick={handleSellClick}
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-orange-600"
                >
                  Sell
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/favourites"
                  className="cursor-pointer hover:text-orange-500"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3C3 2.20435 3.31607 1.44129 3.87868 0.87868C4.44129 0.316071 5.20435 0 6 0L18 0C18.7956 0 19.5587 0.316071 20.1213 0.87868C20.6839 1.44129 21 2.20435 21 3V23.25C20.9999 23.3857 20.9631 23.5188 20.8933 23.6351C20.8236 23.7515 20.7236 23.8468 20.604 23.9108C20.4844 23.9748 20.3497 24.0052 20.2142 23.9988C20.0787 23.9923 19.9474 23.9492 19.8345 23.874L12 19.6515L4.1655 23.874C4.05256 23.9492 3.92135 23.9923 3.78584 23.9988C3.65033 24.0052 3.5156 23.9748 3.396 23.9108C3.2764 23.8468 3.17641 23.7515 3.10667 23.6351C3.03694 23.5188 3.00007 23.3857 3 23.25V3ZM6 1.5C5.60218 1.5 5.22064 1.65804 4.93934 1.93934C4.65804 2.22064 4.5 2.60218 4.5 3V21.849L11.5845 18.126C11.7076 18.0441 11.8521 18.0004 12 18.0004C12.1479 18.0004 12.2924 18.0441 12.4155 18.126L19.5 21.849V3C19.5 2.60218 19.342 2.22064 19.0607 1.93934C18.7794 1.65804 18.3978 1.5 18 1.5H6Z"
                      fill="black"
                    />
                  </svg>
                </Link>

                <Link
                  href="/notifications"
                  className="cursor-pointer hover:text-orange-500"
                >
                  <div className="relative">
                    <svg
                      className="w-6 h-6 stroke-[1.5] stroke-gray-900"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.0243 3.63745C10.8868 3.63745 7.52426 6.99995 7.52426 11.1375V14.75C7.52426 15.5125 7.19926 16.6749 6.81176 17.3249L5.37426 19.7125C4.48676 21.1875 5.09926 22.825 6.72426 23.375C12.1118 25.175 17.9243 25.175 23.3118 23.375C24.8243 22.875 25.4868 21.0875 24.6618 19.7125L23.2243 17.3249C22.8493 16.6749 22.5243 15.5125 22.5243 14.75V11.1375C22.5243 7.01245 19.1493 3.63745 15.0243 3.63745Z" />
                      <path d="M17.3379 4.00005C16.9504 3.88755 16.5504 3.80005 16.1379 3.75005C14.9379 3.60005 13.7879 3.68755 12.7129 4.00005C13.0754 3.07505 13.9754 2.42505 15.0254 2.42505C16.0754 2.42505 16.9754 3.07505 17.3379 4.00005Z" />
                      <path d="M18.7754 23.825C18.7754 25.8875 17.0879 27.575 15.0254 27.575C14.0004 27.575 13.0504 27.15 12.3754 26.475C11.7004 25.8 11.2754 24.85 11.2754 23.825" />
                    </svg>
                    {hasUnread && (
                      <span className="absolute left-3 -top-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    )}
                  </div>
                </Link>

                <div className="relative" ref={profileRef}>
                  {!imageError ? (
                    <Image
                      src={user.avatar}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover cursor-pointer flex-shrink-0"
                      onClick={() => setProfileOpen((prev) => !prev)}
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      unoptimized={true}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer text-gray-600 text-xs font-medium"
                      onClick={() => setProfileOpen((prev) => !prev)}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-30">
                      <Link
                        href={`/profile/${getEncryptedProfileId(user.id)}`}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 px-4 py-3 border-b">
                          {!imageError ? (
                            <Image
                              src={user.avatar}
                              alt="User Avatar"
                              width={50}
                              height={50}
                              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                              onError={handleImageError}
                              unoptimized={true}
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-lg font-medium">
                              {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              View your profile
                            </p>
                          </div>
                        </div>
                      </Link>

                      <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full px-4 py-3 rounded-b-xl flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-[1.5] stroke-gray-900"
                        >
                          <path d="M8.89844 7.56023C9.20844 3.96023 11.0584 2.49023 15.1084 2.49023H15.2384C19.7084 2.49023 21.4984 4.28023 21.4984 8.75023V15.2702C21.4984 19.7402 19.7084 21.5302 15.2384 21.5302H15.1084C11.0884 21.5302 9.23844 20.0802 8.90844 16.5402" />
                          <path d="M15.0011 12H3.62109" />
                          <path d="M5.85 8.65039L2.5 12.0004L5.85 15.3504" />
                        </svg>
                        <span className="ps-2">Log out</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSellClick}
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-orange-600"
                >
                  Sell
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div className="block lg:hidden w-full space-y-2">
            <nav className="flex justify-center py-2 md:hidden lg:hidden gap-6 text-sm">
              {topCategories
                .filter((cat) => !cat.showOn)
                .map((cat) => (
                  <Link
                    key={cat.key}
                    href={`/category/${categoryMap[cat.key]}`}
                    className="hover:text-orange-500"
                  >
                    {cat.name}
                  </Link>
                ))}
              <div className="relative" ref={mobileCategoryRef}></div>
            </nav>
            <LocationDropdown />
            <SearchBar />
          </div>

          <div className="hidden lg:flex gap-3 w-full items-start">
            <div className="w-[66%]">
              <SearchBar />
            </div>
            <div className="w-[34%]">
              <LocationDropdown />
            </div>
          </div>
        </div>
      </div>

      <ImageScanModal open={scanOpen} onClose={() => setScanOpen(false)} />
      <ConfirmLogout
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Are you sure that you want to log out?"
      />
    </div>
  );
}
