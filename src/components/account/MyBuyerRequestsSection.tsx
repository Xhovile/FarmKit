import React, { useMemo, useState } from 'react';
import { BuyerRequest, User } from '../../types';
import { useBuyerRequests } from '../../hooks/useBuyerRequests';
import BuyerRequestManageCard from './BuyerRequestManageCard';
import { ClipboardList, PlusCircle } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface MyBuyerRequestsSectionProps {
  user: User;
  t: (key: string) => string;
  setActiveTab: (tab: 'info' | 'market' | 'experts' | 'account') => void;
  onUpdateBuyerRequestStatus: (
    request: BuyerRequest,
    nextStatus: 'open' | 'matched' | 'closed'
  ) => Promise<void> | void;
}

const MyBuyerRequestsSection: React.FC<MyBuyerRequestsSectionProps> = ({
  user,
  t,
  setActiveTab,
  onUpdateBuyerRequestStatus,
}) => {
  const navigate = useNavigate();
  const { requests, loading } = useBuyerRequests(user);
  const [tab, setTab] = useState<'open' | 'matched' | 'closed'>('open');

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => item.status === tab);
  }, [requests, tab]);

  const handleOpenDetails = (request: BuyerRequest) => {
    navigate(`/item-detail/${request.id}`, { state: { item: request, type: 'buyer_request', from: 'account' } });
  };

  const handleEdit = (request: BuyerRequest) => {
    navigate('/add-product', { state: { editingRequest: request, isRequest: true, from: 'account' } });
  };

  const handleToggleStatus = async (request: BuyerRequest) => {
    const nextStatus = request.status === 'closed' ? 'open' : 'closed';
    await onUpdateBuyerRequestStatus(request, nextStatus);
  };

  const counts = {
    open: requests.filter((item) => item.status === 'open').length,
    matched: requests.filter((item) => item.status === 'matched').length,
    closed: requests.filter((item) => item.status === 'closed').length,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-indigo-600" />
            {t('account.myBuyerRequests')}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {t('account.manageRequestsDesc')}
          </p>
        </div>

        <button
          onClick={() => {
            navigate('/add-product', { state: { isRequest: true, from: 'account' } });
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5" />
          {t('account.postRequest')}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setTab('open')}
          className={`rounded-2xl px-4 py-3 text-sm font-bold ${
            tab === 'open'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          {t('account.open')} ({counts.open})
        </button>

        <button
          onClick={() => setTab('matched')}
          className={`rounded-2xl px-4 py-3 text-sm font-bold ${
            tab === 'matched'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          {t('account.matched')} ({counts.matched})
        </button>

        <button
          onClick={() => setTab('closed')}
          className={`rounded-2xl px-4 py-3 text-sm font-bold ${
            tab === 'closed'
              ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
              : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          {t('account.closed')} ({counts.closed})
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-700/30 p-6 text-sm text-gray-500">
          {t('account.loadingRequests')}
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-10 text-center">
          <h4 className="text-lg font-bold mb-2">
            {t('account.noRequestsTitle').replace('{status}', t(`account.${tab}`))}
          </h4>
          <p className="text-sm text-gray-500">
            {tab === 'open' && t('account.noOpenRequests')}
            {tab === 'matched' && t('account.noMatchedRequests')}
            {tab === 'closed' && t('account.noClosedRequests')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((request) => (
            <BuyerRequestManageCard
              key={request.id}
              request={request}
              onOpenDetails={handleOpenDetails}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBuyerRequestsSection;
