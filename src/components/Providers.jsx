'use client';

import { SessionProvider } from 'next-auth/react';
import { BookmarkProvider } from '@/context/BookmarkContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ErrorBoundary>
        <BookmarkProvider>
          <Toaster position="right-bottom" />
          {children}
        </BookmarkProvider>
      </ErrorBoundary>
    </SessionProvider>
  );
}
