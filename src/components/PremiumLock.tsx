import React from 'react';
import { motion } from 'motion/react';
import { Lock, Crown, ArrowRight } from 'lucide-react';

interface PremiumLockProps {
  children: React.ReactNode;
  isLocked: boolean;
  t: (key: string) => string;
  onUpgrade: () => void;
  featureKey: string;
}

export const PremiumLock: React.FC<PremiumLockProps> = ({ 
  children, 
  isLocked, 
  t, 
  onUpgrade,
  featureKey
}) => {
  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative group">
      <div className="filter blur-md pointer-events-none select-none opacity-50">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
        <motion.div 
          key="premium-lock-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-primary/20 text-center max-w-sm w-full"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/30">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black mb-2 text-gray-900 dark:text-white">
            {t(featureKey)}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            {t('account.premiumFeatureDesc')}
          </p>
          <button 
            onClick={onUpgrade}
            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Lock className="w-5 h-5" />
            {t('account.unlockNow')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export const PremiumBadge: React.FC<{ t: (key: string) => string }> = ({ t }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-200 dark:border-amber-800 shadow-sm">
    <Crown className="w-3 h-3" />
    {t('account.premium')}
  </div>
);
