import React from 'react';
import { User } from '../../types';
import { ShieldCheck, Upload, AlertTriangle } from 'lucide-react';

interface Props {
  user: User;
  openUpload: () => void;
}

const VerificationCenter: React.FC<Props> = ({ user, openUpload }) => {
  const verification = user.verification || { status: 'none' };

  const statusMap = {
    none: 'Not Verified',
    pending: 'Under Review',
    verified: 'Verified',
    rejected: 'Rejected',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 space-y-6">
      
      <div>
        <h3 className="text-2xl font-black flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
          Verification Center
        </h3>
        <p className="text-sm text-gray-500">
          Build trust and unlock better visibility on FarmKit.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Verified Badge', desc: 'Get a checkmark on all your listings' },
          { title: 'Trust & Safety', desc: 'Buyers prefer verified sellers' },
          { title: 'Better Visibility', desc: 'Rank higher in marketplace search' },
          { title: 'Priority Support', desc: 'Get faster help from our team' },
        ].map((benefit, i) => (
          <div key={i} className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-800/50">
            <p className="text-sm font-bold text-indigo-900 dark:text-indigo-300">{benefit.title}</p>
            <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700">
        <p className="text-sm text-gray-500">Status</p>
        <p className="text-lg font-bold">{statusMap[verification.status as keyof typeof statusMap]}</p>
      </div>

      {/* Rejection */}
      {verification.status === 'rejected' && (
        <div className="p-4 rounded-2xl bg-red-50 text-red-600 flex gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span>{verification.rejectionReason || 'Verification was rejected'}</span>
        </div>
      )}

      {/* Action */}
      {(verification.status === 'none' || verification.status === 'rejected') && (
        <button
          onClick={openUpload}
          className="w-full px-4 py-3 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <Upload className="w-5 h-5" />
          Submit Verification
        </button>
      )}

      {verification.status === 'pending' && (
        <p className="text-sm text-gray-500">
          Your verification is under review. You will be notified once approved.
        </p>
      )}
    </div>
  );
};

export default VerificationCenter;
