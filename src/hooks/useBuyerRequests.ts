import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BuyerRequest, User } from '../types';

export const useBuyerRequests = (user: User | null) => {
  const [requests, setRequests] = useState<BuyerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setRequests([]);
      setLoading(false);
      return;
    }

    const requestsQuery = query(
      collection(db, 'buyer_requests'),
      where('buyerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      requestsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as BuyerRequest[];

        items.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });

        setRequests(items);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading buyer requests:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  return { requests, loading };
};
