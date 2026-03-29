import React from 'react';
import { motion } from 'motion/react';
import { Settings, X, User, Camera } from 'lucide-react';
import { User as UserType } from '../../types';

interface AccountHeaderProps {
  user: UserType;
  showSettings: boolean;
  setShowSettings: (val: boolean) => void;
  t: (key: string) => string;
  settingsContent?: React.ReactNode;
  onAvatarUpload?: (file: File) => Promise<void>;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({
  user,
  showSettings,
  setShowSettings,
  t,
  settingsContent,
  onAvatarUpload,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarUpload) {
      setIsUploading(true);
      try {
        await onAvatarUpload(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {/* Profile Header */}
      <div className="h-32 bg-primary relative p-4">
        <div className="flex justify-end">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg ${
              showSettings 
                ? 'bg-white text-primary' 
                : 'bg-amber-400 text-primary hover:bg-amber-300'
            }`}
          >
            {showSettings ? (
              <>
                <X className="w-4 h-4" />
                <span>{t('common.cancel')}</span>
              </>
            ) : (
              <>
                <Settings className="w-4 h-4" />
                <span>{t('account.manageAndEdit')}</span>
              </>
            )}
          </button>
        </div>

        {/* Name in the blue area, just above the line */}
        <div className="absolute bottom-2 right-8">
          <h2 className="text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-90">
            {user.name || 'User Name'}
          </h2>
        </div>
      </div>

      <div className="px-8 pb-4">
        <div className="relative -mt-12 mb-6 flex justify-between items-start">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg bg-gray-100 relative">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User className="w-10 h-10" />
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            <button 
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>

          {/* Email in the white space */}
          <div className="pt-14 text-right flex-1 pl-4">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-300 break-all">
              {user.email}
            </p>
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
