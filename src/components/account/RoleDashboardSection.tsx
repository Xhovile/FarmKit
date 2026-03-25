import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  PlusCircle, 
  LayoutDashboard, 
  Heart, 
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { User as UserType } from '../../types';
import { useAccountRoleStats } from '../../hooks/useAccountRoleStats';

interface RoleDashboardSectionProps {
  user: UserType;
  t: (key: string) => string;
  setActiveTab: (tab: 'info' | 'market' | 'experts' | 'account') => void;
  openEditPersonal: () => void;
  openEditSeller: () => void;
  openEditOrganization: () => void;
  openUpgradeRole: () => void;
}

const RoleDashboardSection: React.FC<RoleDashboardSectionProps> = ({
  user,
  t,
  setActiveTab,
  openEditPersonal,
  openEditSeller,
  openEditOrganization,
  openUpgradeRole,
}) => {
  const stats = useAccountRoleStats(user);

  const isSellerOrOrg = ['seller', 'business', 'cooperative', 'ngo'].includes(user.primaryRole);

  const StatCard = ({ label, value, icon: Icon, colorClass, onClick }: any) => (
    <button
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all text-left group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-xl ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</div>
    </button>
  );

  const ActionButton = ({ label, icon: Icon, onClick, primary = false }: any) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
        primary 
          ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            {user.primaryRole.charAt(0).toUpperCase() + user.primaryRole.slice(1)} Dashboard
          </h3>
          <p className="text-xs text-gray-500">Quick overview of your {user.primaryRole} activities</p>
        </div>
        <div className="flex gap-2">
          {isSellerOrOrg ? (
            <ActionButton 
              label="Add Listing" 
              icon={PlusCircle} 
              primary 
              onClick={() => setActiveTab('market')} 
            />
          ) : (
            <ActionButton 
              label="Post Request" 
              icon={PlusCircle} 
              primary 
              onClick={() => setActiveTab('market')} 
            />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {user.primaryRole === 'buyer' ? (
          <>
            <StatCard 
              label="Saved" 
              value={stats.savedCount} 
              icon={Heart} 
              colorClass="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              onClick={() => setActiveTab('market')}
            />
            <StatCard 
              label="Open Requests" 
              value={stats.openRequests} 
              icon={Clock} 
              colorClass="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              onClick={() => setActiveTab('market')}
            />
            <StatCard 
              label="Matched" 
              value={stats.matchedRequests} 
              icon={CheckCircle2} 
              colorClass="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
              onClick={() => setActiveTab('market')}
            />
            <StatCard 
              label="Total Requests" 
              value={stats.totalRequests} 
              icon={ClipboardList} 
              colorClass="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              onClick={() => setActiveTab('market')}
            />
          </>
        ) : (
          <>
            <StatCard 
              label="Active" 
              value={stats.activeListings} 
              icon={ShoppingBag} 
              colorClass="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
              onClick={() => setActiveTab('market')}
            />
            <StatCard 
              label="Low Stock" 
              value={stats.lowStockListings} 
              icon={AlertCircle} 
              colorClass="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              onClick={() => setActiveTab('market')}
            />
            <StatCard 
              label="Sold" 
              value={stats.soldListings} 
              icon={CheckCircle2} 
              colorClass="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
              onClick={() => setActiveTab('market')}
            />
            <StatCard 
              label="Total" 
              value={stats.totalListings} 
              icon={ClipboardList} 
              colorClass="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              onClick={() => setActiveTab('market')}
            />
          </>
        )}
      </div>

      {/* Quick Tips / Empty State */}
      {((user.primaryRole === 'buyer' && stats.totalRequests === 0) || 
        (isSellerOrOrg && stats.totalListings === 0)) && (
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
            <PlusCircle className="w-6 h-6 text-primary" />
          </div>
          <h4 className="font-bold mb-1">Get Started</h4>
          <p className="text-sm text-gray-500 mb-4">
            {user.primaryRole === 'buyer' 
              ? "Post your first buying request to find sellers near you."
              : "List your first product to start selling on FarmKit."}
          </p>
          <button 
            onClick={() => setActiveTab('market')}
            className="text-primary font-bold text-sm hover:underline"
          >
            {user.primaryRole === 'buyer' ? 'Post Request' : 'Create Listing'} &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleDashboardSection;
