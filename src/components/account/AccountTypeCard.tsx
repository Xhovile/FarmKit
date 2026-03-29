import React from 'react';
import { motion } from 'motion/react';
import { UserCircle, CheckCircle2, Calendar } from 'lucide-react';
import { User as UserType } from '../../types';

interface AccountTypeCardProps {
  user: UserType;
  t: (key: string) => string;
  roleLabelMap: Record<UserType['primaryRole'], string>;
  statusLabelMap: Record<UserType['status'], string>;
}

const AccountTypeCard: React.FC<AccountTypeCardProps> = ({
  user,
  t,
  roleLabelMap,
  statusLabelMap,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden group"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
      
      <div className="p-8 relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
              <UserCircle className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">{t('account.accountProfile')}</h4>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">{t('account.membershipDetails')}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-gray-50/50 dark:bg-gray-700/30 rounded-3xl border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('account.primaryRoleLabel')}</p>
            </div>
            <p className="text-base font-black text-gray-900 dark:text-white capitalize">{roleLabelMap[user.primaryRole]}</p>
          </div>
          
          <div className="p-5 bg-gray-50/50 dark:bg-gray-700/30 rounded-3xl border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-3 h-3 text-gray-400" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('account.memberSinceLabel')}</p>
            </div>
            <p className="text-base font-black text-gray-900 dark:text-white">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
            </p>
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('account.authorizedRoles')}</h4>
            <div className="h-px flex-1 bg-gray-100 dark:bg-gray-700 ml-4" />
          </div>
          
          <div className="flex flex-wrap gap-2.5">
            {user.roles?.map((role) => (
              <motion.div
                key={role}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-2xl border text-xs font-black flex items-center gap-2.5 transition-all duration-300 ${
                  user.primaryRole === role 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary/50'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${user.primaryRole === role ? 'bg-white animate-pulse' : 'bg-gray-300 dark:bg-gray-600'}`} />
                {roleLabelMap[role]}
                {user.primaryRole === role && <CheckCircle2 className="w-3.5 h-3.5" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountTypeCard;
