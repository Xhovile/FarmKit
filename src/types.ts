export interface MarketListing {
  id?: string;
  title: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  availableQuantity?: number;
  soldQuantity?: number;
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
  imageUrls?: string[];
  status: 'active' | 'sold' | 'hidden';
  createdAt: any;
  updatedAt?: any;

  viewsCount?: number;
  sharesCount?: number;
  savesCount?: number;

  // Machinery / tools
  condition?: string;
  brand?: string;
  model?: string;
  capacity?: string;
  fuelType?: string;

  // Seeds
  seedType?: string;
  variety?: string;
  packSize?: string;
  season?: string;
  germinationRate?: string;

  // Livestock
  breed?: string;
  age?: string;
  sex?: string;
  healthStatus?: string;
  vaccinationStatus?: string;

  // Agro-inputs
  inputType?: string;
  usage?: string;
  expiryDate?: string;
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
