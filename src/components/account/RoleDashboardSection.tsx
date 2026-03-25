import React from 'react';
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Building2,
  ClipboardList,
  HandHelping,
  MapPin,
  Package,
  Store,
  Users,
} from 'lucide-react';
import { User as UserType } from '../../types';
import { useAccountRoleStats } from '../../hooks/useAccountRoleStats';

type Tab = 'info' | 'market' | 'experts' | 'account';

interface RoleDashboardSectionProps {
  user: UserType;
  t: (key: string) => string;
  setActiveTab: (tab: Tab) => void;
  openEditPersonal: () => void;
  openEditSeller: () => void;
  openEditOrganization: () => void;
  openUpgradeRole: () => void;
}

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
  <div className="rounded-2xl bg-gray-50 dark:bg-gray-700/40 p-4 border border-gray-100 dark:border-gray-700">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-xl font-black">{value}</p>
  </div>
);

interface ActionButtonProps {
  label: string;
  description: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, description, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-bold">{label}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
    </div>
  </button>
);

export const RoleDashboardSection: React.FC<RoleDashboardSectionProps> = ({
  user,
  t,
  setActiveTab,
  openEditPersonal,
  openEditSeller,
  openEditOrganization,
  openUpgradeRole,
}) => {
  const stats = useAccountRoleStats(user);

  const locationLabel =
    [user.location, user.district, user.region].filter(Boolean).join(', ') || 'Location not set';

  const verificationLabel =
    user.status === 'verified'
      ? 'Verified'
      : user.status === 'premium'
      ? 'Premium'
      : 'Basic';

  const roleMeta = {
    buyer: {
      icon: Bookmark,
      title: 'Buyer Overview',
      subtitle: 'Find products, save listings, and track your buyer activity.',
      highlight: locationLabel,
      stats: [
        { label: 'Saved Listings', value: stats.savedCount },
        { label: 'Open Requests', value: stats.openRequests },
        { label: 'Matched Requests', value: stats.matchedRequests },
        { label: 'Closed Requests', value: stats.closedRequests },
      ],
      actions: [
        {
          label: 'Browse Marketplace',
          description: 'Explore supply and demand in FarmKit.',
          onClick: () => setActiveTab('market'),
        },
        {
          label: 'Edit Personal Account',
          description: 'Update your phone, region, district, and bio.',
          onClick: openEditPersonal,
        },
        {
          label: 'Become Seller / Organisation',
          description: 'Add a new role to unlock seller or organisation features.',
          onClick: openUpgradeRole,
        },
      ],
      emptyMessage:
        stats.savedCount === 0 && stats.totalRequests === 0
          ? 'You have not saved any listings or posted any buyer requests yet.'
          : '',
    },
    seller: {
      icon: Store,
      title: 'Seller Overview',
      subtitle: 'Manage your listings and track how your seller account is performing.',
      highlight: user.sellerProfile?.businessName || 'Seller profile not completed',
      stats: [
        { label: 'Active Listings', value: stats.activeListings },
        { label: 'Sold Listings', value: stats.soldListings },
        { label: 'Low Stock', value: stats.lowStockListings },
        { label: 'Account Status', value: verificationLabel },
      ],
      actions: [
        {
          label: 'Manage Listings',
          description: 'Go to the market page to add, edit, and manage listings.',
          onClick: () => setActiveTab('market'),
        },
        {
          label: 'Edit Seller Profile',
          description: 'Update your seller details, category, and delivery method.',
          onClick: openEditSeller,
        },
        {
          label: 'Add Another Role',
          description: 'Expand your account into business, cooperative, or NGO mode.',
          onClick: openUpgradeRole,
        },
      ],
      emptyMessage:
        stats.totalListings === 0
          ? 'You do not have any listings yet. Start by adding your first listing.'
          : '',
    },
    business: {
      icon: Building2,
      title: 'Business Overview',
      subtitle: 'Present your business identity clearly and manage listings professionally.',
      highlight: user.organizationProfile?.organizationName || 'Business profile not completed',
      stats: [
        { label: 'Active Listings', value: stats.activeListings },
        { label: 'Sold Listings', value: stats.soldListings },
        { label: 'Low Stock', value: stats.lowStockListings },
        { label: 'Verification', value: verificationLabel },
      ],
      actions: [
        {
          label: 'Manage Listings',
          description: 'Go to the market page to manage business listings.',
          onClick: () => setActiveTab('market'),
        },
        {
          label: 'Edit Business Profile',
          description: 'Update your organisation identity and contact details.',
          onClick: openEditOrganization,
        },
        {
          label: 'Add Another Role',
          description: 'Expand this account further if needed.',
          onClick: openUpgradeRole,
        },
      ],
      emptyMessage:
        stats.totalListings === 0
          ? 'Your business profile exists, but you have not published any listings yet.'
          : '',
    },
    cooperative: {
      icon: Users,
      title: 'Cooperative Overview',
      subtitle: 'Show your cooperative identity, commodities, and supply strength clearly.',
      highlight: user.organizationProfile?.organizationName || 'Cooperative profile not completed',
      stats: [
        { label: 'Active Listings', value: stats.activeListings },
        { label: 'Sold Listings', value: stats.soldListings },
        { label: 'Low Stock', value: stats.lowStockListings },
        { label: 'Members', value: user.organizationProfile?.memberCount || '—' },
      ],
      actions: [
        {
          label: 'Manage Listings',
          description: 'Go to the market page to manage cooperative listings.',
          onClick: () => setActiveTab('market'),
        },
        {
          label: 'Edit Cooperative Profile',
          description: 'Update cooperative area, members, and main commodities.',
          onClick: openEditOrganization,
        },
        {
          label: 'Add Another Role',
          description: 'Expand this account further if needed.',
          onClick: openUpgradeRole,
        },
      ],
      emptyMessage:
        stats.totalListings === 0
          ? 'Your cooperative profile exists, but no cooperative listings have been published yet.'
          : '',
    },
    ngo: {
      icon: HandHelping,
      title: 'NGO / Agency Overview',
      subtitle: 'Present your organisation clearly without forcing a seller-first identity.',
      highlight: user.organizationProfile?.organizationName || 'Organisation profile not completed',
      stats: [
        { label: 'Focus Area', value: user.organizationProfile?.focusArea || '—' },
        { label: 'District', value: user.organizationProfile?.district || '—' },
        { label: 'Region', value: user.organizationProfile?.region || '—' },
        { label: 'Verification', value: verificationLabel },
      ],
      actions: [
        {
          label: 'Edit Organisation Profile',
          description: 'Update your institution identity, services, and coverage.',
          onClick: openEditOrganization,
        },
        {
          label: 'Explore Market',
          description: 'See what buyers and sellers are posting on FarmKit.',
          onClick: () => setActiveTab('market'),
        },
        {
          label: 'Add Another Role',
          description: 'Expand this account if you need additional modes.',
          onClick: openUpgradeRole,
        },
      ],
      emptyMessage:
        !user.organizationProfile?.focusArea && !user.organizationProfile?.servicesOffered
          ? 'Your organisation profile exists, but the service and focus details still need strengthening.'
          : '',
    },
  } as const;

  const current = roleMeta[user.primaryRole];
  const RoleIcon = current.icon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <RoleIcon className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-black">{current.title}</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">{current.subtitle}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{current.highlight}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {current.stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      {current.emptyMessage && (
        <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-700/20 p-4">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-gray-400 mt-0.5" />
            <p className="text-sm text-gray-600 dark:text-gray-300">{current.emptyMessage}</p>
          </div>
        </div>
      )}

      <div>
        <h4 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-3">
          Priority Actions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {current.actions.map((action) => (
            <ActionButton
              key={action.label}
              label={action.label}
              description={action.description}
              onClick={action.onClick}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">
          <Package className="w-4 h-4" />
          Listings: {stats.totalListings}
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">
          <ClipboardList className="w-4 h-4" />
          Requests: {stats.totalRequests}
        </span>
        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold">
          <Bookmark className="w-4 h-4" />
          Saved: {stats.savedCount}
        </span>
      </div>
    </div>
  );
};

export default RoleDashboardSection;
