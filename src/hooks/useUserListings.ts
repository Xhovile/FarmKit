import { useState, useEffect } from 'react';
import { MarketListing, User } from '../types';
import { api } from '../lib/api';

export const useUserListings = (user: User | null) => {
  const [listings, setListings] = useState<MarketListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    if (!user?.uid) return;
    try {
      setLoading(true);
      const data = await api.get('/api/users/me/listings');
      setListings(data as MarketListing[]);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching user listings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    const interval = setInterval(fetchListings, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [user?.uid]);

  const relistListing = async (id: string, updates: { quantity?: number; price?: number }) => {
    try {
      const updated = await api.post(`/api/market-listings/${id}/relist`, updates);
      setListings(prev => prev.map(l => l.id === id ? updated : l));
      return updated;
    } catch (err: any) {
      console.error('Error relisting listing:', err);
      throw err;
    }
  };

  const updateListingStatus = async (id: string, status: MarketListing['status']) => {
    try {
      const updated = await api.put(`/api/market-listings/${id}`, { status });
      setListings(prev => prev.map(l => l.id === id ? updated : l));
      return updated;
    } catch (err: any) {
      console.error('Error updating listing status:', err);
      throw err;
    }
  };

  const deleteListing = async (id: string) => {
    try {
      await api.delete(`/api/market-listings/${id}`);
      setListings(prev => prev.filter(l => l.id !== id));
    } catch (err: any) {
      console.error('Error deleting listing:', err);
      throw err;
    }
  };

  return {
    listings,
    loading,
    error,
    refresh: fetchListings,
    relistListing,
    updateListingStatus,
    deleteListing
  };
};
