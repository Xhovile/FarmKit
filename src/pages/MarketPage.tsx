import React from 'react';
import { motion } from 'motion/react';
import { 
  ChartLine, 
  Search, 
  PlusCircle 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { marketPricesData, priceTrendData, marketplaceListings } from '../data/mockData';
import { MarketListingCard } from '../components/Cards';

interface MarketPageProps {
  t: (en: string, ny: string) => string;
  marketSearchQuery: string;
  setMarketSearchQuery: (query: string) => void;
  user: any;
  setIsAddProductModalOpen: (open: boolean) => void;
  setFormStep: (step: number) => void;
}

export const MarketPage: React.FC<MarketPageProps> = ({ 
  t, 
  marketSearchQuery, 
  setMarketSearchQuery, 
  user, 
  setIsAddProductModalOpen, 
  setFormStep 
}) => {
  return (
    <motion.div 
      key="market"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* Market Prices Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ChartLine className="w-6 h-6 text-primary" />
            {t('Market Prices (MK)', 'Mitengo ya pa Msika (MK)')}
          </h2>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {t('Updated: Today', 'Zasinthidwa: Lero')}
          </span>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="py-4 px-2 text-sm font-bold text-gray-500 uppercase tracking-wider">{t('Commodity', 'Zokolola')}</th>
                  <th className="py-4 px-2 text-sm font-bold text-gray-500 uppercase tracking-wider">Limbe</th>
                  <th className="py-4 px-2 text-sm font-bold text-gray-500 uppercase tracking-wider">Lilongwe</th>
                  <th className="py-4 px-2 text-sm font-bold text-gray-500 uppercase tracking-wider">Mzuzu</th>
                  <th className="py-4 px-2 text-sm font-bold text-gray-500 uppercase tracking-wider">{t('Unit', 'Muyeso')}</th>
                </tr>
              </thead>
              <tbody>
                {marketPricesData.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="py-4 px-2 font-bold">{row.commodity}</td>
                    <td className="py-4 px-2 text-primary font-medium">{row.limbe.toLocaleString()}</td>
                    <td className="py-4 px-2 text-primary font-medium">{row.lilongwe.toLocaleString()}</td>
                    <td className="py-4 px-2 text-primary font-medium">{row.mzuzu.toLocaleString()}</td>
                    <td className="py-4 px-2 text-gray-500 text-sm">per {row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Trends Chart */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {t('Price Trends (Last 5 Months)', 'Kayendedwe ka Mitengo (Myezi 5 Yapitayi)')}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickFormatter={(value) => `MK${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Legend iconType="circle" />
                <Line 
                  type="monotone" 
                  dataKey="maize" 
                  name={t('Maize', 'Chimanga')} 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#10b981' }} 
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="beans" 
                  name={t('Beans', 'Nyemba')} 
                  stroke="#f59e0b" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#f59e0b' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="rice" 
                  name={t('Rice', 'Mpunga')} 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6366f1' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            value={marketSearchQuery}
            onChange={(e) => setMarketSearchQuery(e.target.value)}
            placeholder={t('Search products or locations (e.g. Maize, Dedza)...', 'Sakani zokolola kapena malo (mwachitsanzo Chimanga, Dedza)...')}
            className="w-full px-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('Recent Listings', 'Zokolola Zaposachedwa')}</h2>
        <button 
          onClick={() => {
            if (user?.tier === 'Verified Seller') {
              setIsAddProductModalOpen(true);
              setFormStep(1);
            } else {
              alert(t('Only Verified Sellers can add products. Please upgrade in your account settings.', 'Alimi otsimikizika okha ndi omwe angathe kuwonjezera zokolola. Chonde sinthani mu akaunti yanu.'));
            }
          }}
          className="text-primary font-bold flex items-center gap-1 hover:underline group"
        >
          {t('Add Product', 'Wonjezani')} 
          <PlusCircle className={`w-5 h-5 ${user?.tier !== 'Verified Seller' ? 'opacity-50' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceListings
          .filter(item => 
            item.title.toLowerCase().includes(marketSearchQuery.toLowerCase()) || 
            item.description.toLowerCase().includes(marketSearchQuery.toLowerCase()) ||
            item.seller.location.toLowerCase().includes(marketSearchQuery.toLowerCase())
          )
          .map(item => (
            <MarketListingCard key={item.id} item={item} t={t} />
          ))
        }
      </div>
    </motion.div>
  );
};
