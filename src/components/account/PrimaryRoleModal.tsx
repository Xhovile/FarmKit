import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserCircle, Save } from 'lucide-react';
import { User as UserType } from '../../types';

interface PrimaryRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  selectedPrimaryRole: UserType['primaryRole'];
  setSelectedPrimaryRole: (role: UserType['primaryRole']) => void;
  handleSwitchPrimaryRole: () => Promise<void>;
  roleLabelMap: Record<UserType['primaryRole'], string>;
}

const PrimaryRoleModal: React.FC<PrimaryRoleModalProps> = ({
  isOpen,
  onClose,
  user,
  selectedPrimaryRole,
  setSelectedPrimaryRole,
  handleSwitchPrimaryRole,
  roleLabelMap,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          key="primary-role-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          key="primary-role-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-xl font-bold">Switch Primary Role</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-sm text-gray-500">
              Select which role you want to use as your primary view. This affects your default dashboard and navigation.
            </p>

            <div className="space-y-3">
              {user.roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedPrimaryRole(role)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                    selectedPrimaryRole === role
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      selectedPrimaryRole === role ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'
                    }`}>
                      <UserCircle className="w-6 h-6" />
                    </div>
                    <span className="font-bold">{roleLabelMap[role]}</span>
                  </div>
                  {selectedPrimaryRole === role && (
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                      <Save className="w-3 h-3" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button 
              onClick={handleSwitchPrimaryRole}
              disabled={selectedPrimaryRole === user.primaryRole}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              Confirm Switch
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PrimaryRoleModal;
