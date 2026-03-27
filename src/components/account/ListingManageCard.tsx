import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Eye, 
  Share2, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MarketListing } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ListingManageCardProps {
  listing: MarketListing;
  onEdit: (listing: MarketListing) => void;
  onDelete: (id: string) => void;
  onStatusToggle: (id: string, currentStatus: MarketListing['status']) => void;
  onRestock: (id: string, quantity: number, price: number) => Promise<void>;
  onViewDetails: (listing: MarketListing) => void;
}

const ListingManageCard: React.FC<ListingManageCardProps> = ({
  listing,
  onEdit,
  onDelete,
  onStatusToggle,
  onRestock,
  onViewDetails,
}) => {
  const [isRestocking, setIsRestocking] = useState(false);
  const [restockQty, setRestockQty] = useState(listing.quantity || 0);
  const [restockPrice, setRestockPrice] = useState(listing.price || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleRestock = async () => {
    try {
      setIsSubmitting(true);
      await onRestock(listing.id!, restockQty, restockPrice);
      setIsRestocking(false);
    } catch (err) {
      console.error('Restock failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusColors = {
    active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    sold: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    hidden: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
  };

  const available = listing.availableQuantity ?? listing.quantity ?? 0;
  const isLowStock = available > 0 && available <= (listing.quantity || 0) * 0.2;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
            {listing.imageUrl ? (
              <img 
                src={listing.imageUrl} 
                alt={listing.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white truncate pr-2">{listing.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColors[listing.status]}`}>
                    {listing.status}
                  </span>
                  {isLowStock && listing.status === 'active' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Low Stock
                    </span>
                  )}
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                
                <AnimatePresence>
                  {showMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowMenu(false)} 
                      />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 py-1 overflow-hidden"
                      >
                        <button 
                          onClick={() => { onEdit(listing); setShowMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" /> Edit Listing
                        </button>
                        <button 
                          onClick={() => { onStatusToggle(listing.id!, listing.status); setShowMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {listing.status === 'hidden' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          {listing.status === 'hidden' ? 'Make Active' : 'Hide Listing'}
                        </button>
                        <button 
                          onClick={() => { onDelete(listing.id!); setShowMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="truncate">{listing.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{available} / {listing.quantity} {listing.unit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{listing.viewsCount || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Share2 className="w-3.5 h-3.5" />
              <span>{listing.sharesCount || 0}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onViewDetails(listing)}
              className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              View
            </button>
            {listing.status === 'sold' ? (
              <button 
                onClick={() => setIsRestocking(!isRestocking)}
                className="px-3 py-1.5 text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Restock
              </button>
            ) : (
              <button 
                onClick={() => onEdit(listing)}
                className="px-3 py-1.5 text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Restock Panel */}
        <AnimatePresence>
          {isRestocking && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold">Restock Details</h5>
                  <button onClick={() => setIsRestocking(false)} className="text-gray-400 hover:text-gray-600">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">New Quantity ({listing.unit})</label>
                    <input 
                      type="number" 
                      value={restockQty}
                      onChange={e => setRestockQty(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Price (MWK)</label>
                    <input 
                      type="number" 
                      value={restockPrice}
                      onChange={e => setRestockPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleRestock}
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-primary text-white font-bold rounded-lg text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {isSubmitting ? 'Restocking...' : 'Confirm Restock'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ListingManageCard;
