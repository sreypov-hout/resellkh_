// src/app/(main)/layout.js
import ClientLayout from '@/app/ClientLayout';
import AuthNavbar from '@/components/layout/AuthNavbar';
import { BookmarkProvider } from '@/context/BookmarkContext';
import { Book } from 'lucide-react';

export const metadata = {
  title: 'ResellKH - Marketplace',
};

export default function MainLayout({ children }) {
//   return <ClientLayout>{children}</ClientLayout>;
return <>
<BookmarkProvider>
<AuthNavbar />
{children}
</BookmarkProvider>
</>
}

