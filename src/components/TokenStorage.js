'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function TokenStorage() {
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      localStorage.setItem('google_access_token', session.accessToken);
      console.log('Stored token in localStorage:', session.accessToken);
    }
  }, [session, status]);

  return null;
}
