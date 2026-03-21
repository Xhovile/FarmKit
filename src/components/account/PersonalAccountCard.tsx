import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Save } from 'lucide-react';
import { User as UserType } from '../../types';
import { malawiRegions, malawiDistrictsByRegion } from '../../data/constants';

interface PersonalAccountCardProps {
  user: UserType;
  t: (key: string) => string;
  isEditingProfile: boolean;
  setIsEditingProfile: (val: boolean) => void;
  profileFormData: any;
  setProfileFormData: (val: any) => void;
  handleProfileUpdate: () => Promise<void>;
  isSubmittingProfile: boolean;
  statusBadgeClassMap: Record<UserType['status'], string>;
  statusLabelMap: Record<UserType['status'], string>;
}

const PersonalAccountCard: React.FC<PersonalAccountCardProps> = ({
  user,
  t,
  isEditingProfile,
  setIsEditingProfile,
  profileFormData,
  setProfileFormData,
  handleProfileUpdate,
  isSubmittingProfile,
  statusBadgeClassMap,
  statusLabelMap,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
      <div className="flex justify-between items-start mb-6">
        {!isEditingProfile && (
          <div className="flex gap-2 mb-2">
            <span
              className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${statusBadgeClassMap[user.status]}`}
            >
              {statusLabelMap[user.status]}
            </span>
          </div>
        )}
      </div>

      {isEditingProfile ? (
        <motion.div 
          key="edit-profile"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('account.fullName')}</label>
              <input 
                type="text" 
                value={profileFormData.name}
                onChange={e => setProfileFormData({...profileFormData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Region</label>
              <select 
                value={profileFormData.region}
                onChange={e => setProfileFormData({...profileFormData, region: e.target.value, district: ''})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none appearance-none"
              >
                <option value="">Select Region</option>
                {malawiRegions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">District</label>
              <select 
                value={profileFormData.district}
                onChange={e => setProfileFormData({...profileFormData, district: e.target.value})}
                disabled={!profileFormData.region}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none appearance-none disabled:opacity-50"
              >
                <option value="">Select District</option>
                {profileFormData.region && malawiDistrictsByRegion[profileFormData.region as keyof typeof malawiDistrictsByRegion]?.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Area / Market</label>
              <input 
                type="text" 
                value={profileFormData.location}
                onChange={e => setProfileFormData({...profileFormData, location: e.target.value})}
                placeholder="e.g. Area 25, Limbe Market"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('account.phoneNumber')}</label>
              <input 
                type="tel" 
                value={profileFormData.phone}
                onChange={e => setProfileFormData({...profileFormData, phone: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('account.bio')}</label>
              <textarea 
                value={profileFormData.bio}
                onChange={e => setProfileFormData({...profileFormData, bio: e.target.value})}
                rows={1}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setIsEditingProfile(false)}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 transition-all"
            >
              {t('common.cancel')}
            </button>
            <button 
              onClick={handleProfileUpdate}
              disabled={isSubmittingProfile}
              className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingProfile ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSubmittingProfile ? 'Saving...' : t('common.save')}
            </button>
          </div>
        </motion.div>
      ) : (
        <div key="view-profile" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-1">{user?.name}</h2>
            <p className="text-gray-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> 
              {user?.region && user?.district ? `${user.district}, ${user.region}` : user?.location}
              {user?.region && user?.district && user?.location && ` (${user.location})`}
            </p>
          </div>

          {user?.bio && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('account.about')}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">"{user.bio}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalAccountCard;
