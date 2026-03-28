import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flag, X, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useTranslation } from '../hooks/useTranslation';

const ReportPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { 
    item?: any;
    type?: 'listing' | 'request' | 'seller';
  } | null;

  const [reportReason, setReportReason] = useState('');

  if (!state?.item) {
    navigate(-1);
    return null;
  }

  const { item, type } = state;

  const handleReport = () => {
    if (!reportReason.trim()) {
      toast.error(t('market.provideReason'));
      return;
    }
    // In a real app, this would be a database call
    console.log(`Reporting ${type} ${item.id || item.businessName} for: ${reportReason}`);
    toast.success(t('market.reportSuccess'));
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark-900 pb-24">
      <div className="sticky top-[56px] z-20 bg-neutral-50/80 dark:bg-dark-900/80 backdrop-blur-md px-4 py-4 border-b border-gray-200 dark:border-gray-800 mb-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.back')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3 text-rose-600">
                <Flag className="w-7 h-7" />
                {t('market.reportSuspicious')}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-3xl border border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t('market.reporting')}</p>
                <p className="text-lg font-bold">{item.title || item.businessName || item.commodity}</p>
                {item.sellerName && <p className="text-sm text-gray-500 mt-1">by {item.sellerName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                  {t('market.reasonForReport')}
                </label>
                <textarea 
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder={t('market.describeIssue')}
                  rows={6}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border-none rounded-3xl focus:ring-2 focus:ring-rose-500 outline-none text-sm shadow-inner"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                >
                  {t('common.cancel')}
                </button>
                <button 
                  onClick={handleReport}
                  className="flex-1 py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20 hover:bg-rose-700 transition-all"
                >
                  {t('market.submitReport')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportPage;
