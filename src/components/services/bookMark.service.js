// context/BookmarkContext.js
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

// --- START: Your provided API functions (assuming these are in a separate file like services/favorites.js) ---
// For demonstration, I'm including them directly here. In a real app, you'd import them.
const API_BASE = "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/favourites";

export async function fetchFavouritesByUserId(userId, token) {
    token = token || localStorage.getItem("token");
    if (!userId || !token) {
    throw new Error("User ID and token are required to fetch favorites.");
    }
  const res = await fetch(`${API_BASE}/with-products/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch favorites: ${error}`);
  }

  const json = await res.json();
  return Array.isArray(json.payload) ? json.payload : [];
}

export async function addToFavourites(body, token) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to add favorite: ${error}`);
  }

  return await res.json();
}

export async function removeFromFavourites(productId, userId, token) {
  const res = await fetch(`${API_BASE}?userId=${userId}&productId=${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to remove favorite: ${error}`);
  }

  return await res.json();
}
// --- END: Your provided API functions ---


const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [newBookmarkAdded, setNewBookmarkAdded] = useState(false); // State for notification dot

  // NOTE: You'll need to manage userId and token for your API calls.
  // For this example, I'm using placeholder values.
  // In a real Next.js app, you'd get userId and token from your authentication system
  // (e.g., NextAuth.js, or a custom auth context).
  const userId = "your_static_user_id_here"; // Replace with actual user ID
  const userToken = "your_static_auth_token_here"; // Replace with actual auth token

  // Function to load bookmarks from backend or localStorage on initial mount
  useEffect(() => {
    const loadBookmarks = async () => {
      if (typeof window !== "undefined") {
        // Try to load from localStorage first for immediate display
        const savedBookmarks = localStorage.getItem("bookmarks");
        if (savedBookmarks) {
          setBookmarks(JSON.parse(savedBookmarks));
        }

        // Then fetch from backend to ensure data is up-to-date
        try {
          // Ensure userId and userToken are available before fetching
          if (userId && userToken) {
            const fetchedBookmarks = await fetchFavouritesByUserId(userId, userToken);
            setBookmarks(fetchedBookmarks);
            localStorage.setItem("bookmarks", JSON.stringify(fetchedBookmarks)); // Update localStorage with backend data
          } else {
            console.warn("User ID or Token not available for fetching favorites.");
          }
        } catch (error) {
          console.error("Failed to fetch bookmarks from backend:", error);
          toast.error("Failed to load favorites from server. Displaying local data.");
          // If backend fetch fails, rely on localStorage data if available
        } finally {
          setIsReady(true);
        }
      }
    };

    loadBookmarks();
  }, [userId, userToken]); // Re-run if userId or userToken changes (e.g., user logs in/out)

  // Effect to save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (isReady && typeof window !== "undefined") {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, isReady]);

  const isBookmarked = useCallback((id) => {
    return bookmarks.some((item) => item.id === id);
  }, [bookmarks]);

  const toggleBookmark = async (product) => {
    const bookmarked = isBookmarked(product.id);
    let updatedBookmarks;

    // Optimistic UI update
    if (bookmarked) {
      updatedBookmarks = bookmarks.filter((item) => item.id !== product.id);
      setBookmarks(updatedBookmarks);
      setNewBookmarkAdded(false); // If removed, ensure dot is off
      toast("Removed from favorites", {
        icon: <svg className="text-gray-600" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 5C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6C2 5.44772 2.44772 5 3 5H21Z" fill="currentColor" />
          <path d="M4 20V6C4 5.44772 4.44772 5 5 5C5.55228 5 6 5.44772 6 6V20C6 20.2652 6.10543 20.5195 6.29297 20.707C6.48051 20.8946 6.73478 21 7 21H17C17.2652 21 17.5195 20.8946 17.707 20.707C17.8946 20.5195 18 20.2652 18 20V6C18 5.44772 18.4477 5 19 5C19.5523 5 20 5.44772 20 6V20C20 20.7957 19.6837 21.5585 19.1211 22.1211C18.5585 22.6837 17.7957 23 17 23H7C6.20435 23 5.44151 22.6837 4.87891 22.1211C4.3163 21.5585 4 20.7957 4 20ZM15 6V4C15 3.73478 14.8946 3.48051 14.707 3.29297C14.5195 3.10543 14.2652 3 14 3H10C9.73478 3 9.4805 3.10543 9.29297 3.29297C9.10543 3.48051 9 3.73478 9 4V6C9 6.55228 8.55228 7 8 7C7.44772 7 7 6.55228 7 6V4C7 3.20435 7.3163 2.44151 7.87891 1.87891C8.44152 1.3163 9.20435 1 10 1H14C14.7956 1 15.5585 1.3163 16.1211 1.87891C16.6837 2.44151 17 3.20435 17 4V6C17 6.55228 16.5523 7 16 7C15.4477 7 15 6.55228 15 6Z" fill="currentColor" />
        </svg>,
        style: { borderRadius: "8px", background: "#fff", color: "#333" },
      });

      // Call backend API to remove
      try {
        await removeFromFavourites(product.id, userId, userToken);
      } catch (error) {
        console.error("Failed to remove from backend:", error);
        toast.error("Failed to remove from favorites on server. Please try again.");
        // Revert UI if backend fails
        setBookmarks(bookmarks);
      }
    } else {
      updatedBookmarks = [...bookmarks, product];
      setBookmarks(updatedBookmarks);
      setNewBookmarkAdded(true); // Set notification for new bookmark
      toast.success("Added to favorites");

      // Call backend API to add
      try {
        await addToFavourites({ userId, productId: product.id }, userToken); // Assuming backend expects userId and productId
      } catch (error) {
        console.error("Failed to add to backend:", error);
        toast.error("Failed to add to favorites on server. Please try again.");
        // Revert UI if backend fails
        setBookmarks(bookmarks.filter((item) => item.id !== product.id));
        setNewBookmarkAdded(false); // Turn off dot if add failed
      }
    }
  };

  const resetNewBookmarkAdded = useCallback(() => {
    setNewBookmarkAdded(false);
  }, []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, isReady, newBookmarkAdded, resetNewBookmarkAdded }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
}