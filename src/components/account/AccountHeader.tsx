import React from 'react';
import { Settings, X, User, Camera } from 'lucide-react';
import { User as UserType } from '../../types';

interface AccountHeaderProps {
  user: UserType;
  isEditingProfile: boolean;
  setIsEditingProfile: (val: boolean) => void;
}

const AccountHeader: React.FC<AccountHeaderProps> = ({
  user,
  isEditingProfile,
  setIsEditingProfile,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="h-32 bg-primary relative">
        <button 
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition-all"
        >
          {isEditingProfile ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
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
            {isEditingProfile && (
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                <Camera className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
