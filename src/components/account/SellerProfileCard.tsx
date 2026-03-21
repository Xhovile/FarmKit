import React from 'react';
import { Store, MapPin, Briefcase, ShieldCheck } from 'lucide-react';
import { User as UserType } from '../../types';

interface SellerProfileCardProps {
  user: UserType;
  openEditSeller: () => void;
}

const SellerProfileCard: React.FC<SellerProfileCardProps> = ({
  user,
  openEditSeller,
}) => {
  if (!user.sellerProfile) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-emerald-100 dark:border-emerald-900/30">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
            <Store className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">Seller Profile</h3>
              {user.sellerProfile.verified && (
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              )}
            </div>
            <p className="text-sm text-gray-500">{user.sellerProfile.businessName}</p>
          </div>
        </div>
        <button
          onClick={openEditSeller}
          className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-100 transition-all text-sm"
        >
          Manage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <Briefcase className="w-5 h-5 text-emerald-500 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</p>
            <p className="text-gray-700 dark:text-gray-300 capitalize">{user.sellerProfile.category || 'Not set'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-emerald-500 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</p>
            <p className="text-gray-700 dark:text-gray-300">
              {[user.sellerProfile.district, user.sellerProfile.region].filter(Boolean).join(', ') || 'Not set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfileCard;
