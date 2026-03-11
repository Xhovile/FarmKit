export interface MarketListing {
  id?: string;
  title: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  deliveryMethod: string;
  description: string;
  businessName: string;
  phone: string;
  sellerId: string;
  sellerName: string;
  sellerTier: string;
  verified: boolean;
  imageUrl: string | null;
  status: 'active' | 'sold' | 'hidden';
  createdAt: any; // Using any for serverTimestamp
}

export interface BuyerRequest {
  id?: string;
  commodity: string;
  category: string;
  quantity: number;
  unit: string;
  priceRange: string;
  location: string;
  description: string;
  buyerId: string;
  buyerName: string;
  phone: string;
  status: 'active' | 'fulfilled' | 'closed';
  createdAt: any;
}
