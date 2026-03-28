import React from 'react';
import { Book, Store, GraduationCap, UserCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BottomNavProps {
  t: (key: string) => string;
}

const NavAction: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-2xl transition-all duration-300 ${
      active
        ? 'bg-primary text-white shadow-md shadow-primary/10 scale-105'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
    }`}
  >
    <div className={`${active ? 'animate-bounce-subtle' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] md:text-sm font-bold uppercase tracking-wider ${active ? 'opacity-100' : 'opacity-70'}`}>
      {label}
    </span>
  </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ t }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    const stateFrom = location.state?.from;

    // Prioritize state-based tab if available
    if (stateFrom === 'market') return 'market';
    if (stateFrom === 'account') return 'account';
    if (stateFrom === 'experts') return 'experts';
    if (stateFrom === 'info') return 'info';

    if (path === '/' || path.startsWith('/info')) return 'info';
    if (path.startsWith('/market')) return 'market';
    if (path.startsWith('/experts')) return 'experts';
    if (path.startsWith('/account')) return 'account';
    
    // Default mappings for action pages
    if (
      path.startsWith('/item-detail') || 
      path.startsWith('/add-product') || 
      path.startsWith('/report') || 
      path.startsWith('/stock-action')
    ) {
      return 'market';
    }

    return 'info';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab: string, path: string) => {
    if (activeTab === tab) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-gray-700 z-50 md:relative md:bottom-auto md:bg-transparent md:border-none md:mt-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-center items-center gap-1 md:gap-4 py-2 md:py-0">
          <NavAction
            active={activeTab === 'info'}
            onClick={() => handleTabClick('info', '/')}
            icon={<Book className="w-5 h-5 md:w-4 md:h-4" />}
            label={t('common.home')}
          />

          <NavAction
            active={activeTab === 'market'}
            onClick={() => handleTabClick('market', '/market')}
            icon={<Store className="w-5 h-5 md:w-4 md:h-4" />}
            label={t('common.market')}
          />

          <NavAction
            active={activeTab === 'experts'}
            onClick={() => handleTabClick('experts', '/experts')}
            icon={<GraduationCap className="w-5 h-5 md:w-4 md:h-4" />}
            label={t('common.experts')}
          />

          <NavAction
            active={activeTab === 'account'}
            onClick={() => handleTabClick('account', '/account')}
            icon={<UserCircle className="w-5 h-5 md:w-4 md:h-4" />}
            label={t('common.account')}
          />
        </div>
      </div>
    </nav>
  );
};
