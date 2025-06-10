"use client";
import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const toggleBookmark = (product) => {
    setBookmarks((prev) =>
      prev.find((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  
  const isBookmarked = (id) => {
    return bookmarks.some((item) => item.id === id);
  };  

  useEffect(() => {
  const stored = localStorage.getItem("bookmarks");
  if (stored) setBookmarks(JSON.parse(stored));
}, []);

useEffect(() => {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}, [bookmarks]);

  return (
    <>
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
      
    </BookmarkContext.Provider>
    

    </>
  );
};

export const useBookmark = () => useContext(BookmarkContext);
