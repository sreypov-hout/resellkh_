// src/app/(main)/layout.js
import ClientLayout from '@/app/ClientLayout';
import AuthNavbar from '@/components/layout/AuthNavbar';

export const metadata = {
  title: 'ResellKH - Marketplace',
};

export default function MainLayout({ children }) {
//   return <ClientLayout>{children}</ClientLayout>;
return <>
<AuthNavbar />
{children}
</>
}

