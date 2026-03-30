import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserRoundCheck, ClipboardCheck, ArrowRight } from 'lucide-react';
import { User as UserType } from '../../types';

interface AccountHealthCardProps {
  user: UserType;
  t: (key: string) => string;
  onVerify: () => void;
  onCompleteProfile: () => void;
}

const getCompletion = (user: UserType) => {
  let score = 20;

  if (user.name) score += 15;
  if (user.phone) score += 15;
  if (user.region) score += 10;
  if (user.district) score += 10;
  if (user.location) score += 10;
  if (user.bio) score += 10;
  if (user.emailVerified) score += 10;
  if (user.verification?.status === 'verified') score += 10;

  return Math.min(score, 100);
};

const AccountHealthCard: React.FC<AccountHealthCardProps> = ({
  user,
  t,
  onVerify,
  onCompleteProfile,
}) => {
  const profileCompletion = getCompletion(user);
  const verificationStatus = user.verification?.status || 'none';

  const verificationLabel =
    verificationStatus === 'verified'
      ? 'Verified'
      : verificationStatus === 'pending'
        ? 'Pending'
        : verificationStatus === 'rejected'
          ? 'Rejected'
          : 'Not verified';

  const verificationClass =
    verificationStatus === 'verified'
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
      : verificationStatus === 'pending'
        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
        : verificationStatus === 'rejected'
          ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';

  const nextStep =
    verificationStatus !== 'verified'
      ? 'Complete verification'
      : profileCompletion < 100
        ? 'Finish profile details'
        : 'Account ready';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              Account Health
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Status, readiness, and next action.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <UserRoundCheck className="w-4 h-4 text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Verification
              </p>
            </div>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${verificationClass}`}>
              {verificationLabel}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardCheck className="w-4 h-4 text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Profile completion
              </p>
            </div>
            <p className="text-2xl font-black text-gray-900 dark:text-white">
              {profileCompletion}%
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">
            Next step
          </p>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {nextStep}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onVerify}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all"
          >
            Verify account
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onCompleteProfile}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Complete profile
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountHealthCard;
