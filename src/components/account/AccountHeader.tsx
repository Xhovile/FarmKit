import React from 'react';
import { motion } from 'motion/react';
import { Settings, X, User, Camera } from 'lucide-react';
import { User as UserType } from '../../types';

interface AccountHeaderProps {
  user: UserType;
  showSettings: boolean;
  setShowSettings: (val: boolean) => void;
  settingsContent?: React.ReactNode;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({
  user,
  showSettings,
  setShowSettings,
  settingsContent,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden relative">
      {/* Profile Header */}
      <div className="h-32 bg-primary relative">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition-all z-50"
        >
          {showSettings ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
        </button>
      </div>

      <div className="px-8 pb-4">
        <div className="relative -mt-16 mb-6 flex justify-between items-end">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg bg-gray-100">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
            {showSettings && (
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                <Camera className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-gray-100 dark:border-gray-700 p-6 bg-gray-50/50 dark:bg-gray-900/20"
        >
          {settingsContent}
        </motion.div>
      )}
    </div>
  );
};

export default AccountHeader;
