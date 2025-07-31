'use client';
import { createContext, useContext, useState } from 'react';

const FileContext = createContext();

export function FileProvider({ children }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <FileContext.Provider value={{ uploadedFiles, setUploadedFiles }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  return useContext(FileContext);
}