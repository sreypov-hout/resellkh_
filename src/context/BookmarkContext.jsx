"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  fetchFavouritesByUserId,
  addToFavourites,
  removeFromFavourites,
} from "@/components/services/bookMark.service";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [hasNewBookmark, setHasNewBookmark] = useState(false);
  const { data: session, status } = useSession();

  // Initialize bookmarks
  useEffect(() => {
    const initializeBookmarks = async () => {
      try {
        // 1. Always load from localStorage first (for instant UI)
        const localBookmarks = JSON.parse(
          localStorage.getItem("bookmarks") || "[]"
        );
        setBookmarks(localBookmarks);

        // 2. If authenticated, sync with API
        if (status === "authenticated") {
          try {
            const apiBookmarks = await fetchFavouritesByUserId(
              session.user.id,
              session.accessToken
            );

            const transformed = apiBookmarks.map(item => ({
              id: item.productId,
              imageUrl: item.product?.imageUrl || "",
              title: item.product?.title || "",
              description: item.product?.description || "",
              price: item.product?.price?.toString() || "0",
              originalPrice: item.product?.originalPrice?.toString() || null,
              discountPercent: item.product?.discountPercent || null,
            }));

            // Merge bookmarks (API takes precedence)
            const merged = [
              ...transformed,
              ...localBookmarks.filter(
                local => !transformed.some(api => api.id === local.id)
              ),
            ];

            setBookmarks(merged);
            localStorage.setItem("bookmarks", JSON.stringify(merged));
          } catch (apiError) {
            console.error("API sync failed, using local bookmarks", apiError);
          }
        }
      } catch (error) {
        console.error("Bookmark initialization failed", error);
      } finally {
        setIsReady(true);
      }
    };

    initializeBookmarks();
  }, [status, session?.user?.id]);

  // Save to localStorage on changes
  useEffect(() => {
    if (isReady) {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, isReady]);

  const toggleBookmark = async (product) => {
    try {
      const existing = bookmarks.some(item => item.id === product.id);
      let newBookmarks;

      if (existing) {
        newBookmarks = bookmarks.filter(item => item.id !== product.id);
        if (status === "authenticated") {
          await removeFromFavourites(product.id, session.user.id, session.accessToken);
        }
      } else {
        newBookmarks = [...bookmarks, {
          ...product,
          price: product.price?.toString() || "0",
          originalPrice: product.originalPrice?.toString() || null
        }];
        if (status === "authenticated") {
          await addToFavourites({
            productId: product.id,
            userId: session.user.id
          }, session.accessToken);
        }
        // Set flag when new bookmark is added
        setHasNewBookmark(true);
        // Clear the notification after 3 seconds
        setTimeout(() => setHasNewBookmark(false), 3000);
      }

      setBookmarks(newBookmarks);
    } catch (error) {
      console.error("Bookmark toggle failed", error);
      throw error;
    }
  };

  const clearNewBookmarkNotification = () => {
    setHasNewBookmark(false);
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      toggleBookmark,
      isBookmarked: (id) => bookmarks.some(item => item.id === id),
      isReady,
      hasNewBookmark,
      clearNewBookmarkNotification
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => useContext(BookmarkContext);