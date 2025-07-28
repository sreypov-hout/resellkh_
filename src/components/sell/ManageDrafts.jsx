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
      // Set initial loading state while session is being determined
      setLoading(true);
      setError(null);

      if (status === 'authenticated') {
        try {
          const token = session.accessToken;
          const userId = session.user.id;

          if (!userId || !token) {
            throw new Error("User ID or access token is missing.");
          }

          const res = await axios.get(
            `https://trivia-worlds-wichita-stan.trycloudflare.com/api/v1/products/drafts/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
              },
            }
          );
          
          // Handle successful response, even if payload is empty
          const draftsData = res.data?.payload || [];
          const activeDrafts = draftsData.filter(d => d?.productStatus === "DRAFT");
          setDrafts(activeDrafts);

        } catch (err) {
          console.error('Fetch drafts error:', err);
          
          // Improved Error Handling:
          // A 404 error means the user has no drafts, which is not an error condition.
          // We will only set an error message for other, unexpected errors.
          if (err.response?.status !== 404) {
            setError(
              err.response?.data?.message ||
              err.message ||
              'Failed to load drafts. Please try again.'
            );
          }
           // If it is a 404, we do nothing, and the drafts will correctly remain an empty array.
           setDrafts([]); 
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
        setError('You must be logged in to manage drafts.');
        setDrafts([]);
      }
      // If status is 'loading', we simply wait, the loading state is already true.
    };

    fetchDrafts();
  }, [session, status]);

  if (loading) {
    return (
      <section className="p-4">
        <p className="text-gray-600">Loading drafts...</p>
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
            <DraftCard key={draft.draftId} draft={draft} />
          ))}
        </div>
      )}
    </section>
  );
}