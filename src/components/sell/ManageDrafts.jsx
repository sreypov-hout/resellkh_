'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DraftCard from './DraftCard';
import { useSession } from 'next-auth/react';

export default function ManageDrafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchDrafts = async () => {
      setLoading(true);
      setError(null);

      if (status === 'authenticated') {
        try {
          const token = session.accessToken;
          const userId = session.user.id;

          if (!userId || !token) throw new Error('User ID or access token is missing.');

          const res = await axios.get(
            `https://trivia-worlds-wichita-stan.trycloudflare.com/api/v1/products/drafts/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
              },
            }
          );

          const draftsData = res.data?.payload || [];
          const activeDrafts = draftsData.filter((d) => d?.productStatus === 'DRAFT');
          setDrafts(activeDrafts);
        } catch (err) {
          console.error('Fetch drafts error:', err);
          if (err.response?.status !== 404) {
            setError(
              err.response?.data?.message ||
                err.message ||
                'Failed to load drafts. Please try again.'
            );
          }
          setDrafts([]);
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
        setError('You must be logged in to manage drafts.');
        setDrafts([]);
      }
    };

    fetchDrafts();
  }, [session, status]);

  const handleDraftDelete = (deletedId) => {
    setDrafts((prev) => prev.filter((draft) => draft.draftId !== deletedId));
  };

  if (loading) {
    return (
      <section className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[17px] font-semibold animate-pulse bg-gray-300 rounded w-40 h-6"></p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-300 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4">
        <p className="text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[17px] font-semibold">Manage Drafts</p>
      </div>

      {drafts.length === 0 ? (
        <p className="text-gray-600">You don't have any drafts saved yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {drafts.map((draft) => (
            <DraftCard
              key={draft.draftId}
              draft={draft}
              onDelete={handleDraftDelete}
              token={session.accessToken} // Pass the token here
            />
          ))}
        </div>
      )}
    </section>
  );
}