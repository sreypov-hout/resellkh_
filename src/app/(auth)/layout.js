// src/app/(auth)/layout.js

export const metadata = {
  title: 'Login / Register - ResellKH',
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      
      <div>{children}</div>
    </html>
  );
}
