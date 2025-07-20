'use client';

import { SessionProvider } from 'next-auth/react';
import { BookmarkProvider } from '@/context/BookmarkContext';
import { Toaster } from 'react-hot-toast';
import TokenStorage from '@/components/TokenStorage';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ErrorBoundary>
        <BookmarkProvider>
          <Toaster position="right-bottom" />
          <TokenStorage />
          {children}
        </BookmarkProvider>
      </ErrorBoundary>
    </SessionProvider>
  );
}
