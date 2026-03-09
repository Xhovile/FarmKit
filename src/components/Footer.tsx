import React from 'react';
import { Users, Share2, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  t: (en: string, ny: string) => string;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-secondary text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 font-serif">
              <span className="text-green-500">Farm</span><span className="text-emerald-600 dark:text-emerald-400">Kit</span>
            </h2>
            <p className="text-gray-400 mb-4">
              {t('Empowering farmers across Malawi with information and market access.', 'Kupatsapo mphamvu kwa alimi ku Malawi ndi chidziwitso ndi mwayi wofikira misika.')}
            </p>
            <div className="flex space-x-3">
              <span className="text-gray-400 cursor-default"><Users className="w-5 h-5" /></span>
              <span className="text-gray-400 cursor-default"><Share2 className="w-5 h-5" /></span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('Quick Links', 'Maulalo Osavuta')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><span className="cursor-default">{t('About Us', 'Za Ife')}</span></li>
              <li><span className="cursor-default">{t('Contact Us', 'Tiyenimulumikize')}</span></li>
              <li><span className="cursor-default">{t('FAQ', 'Mafunso')}</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('Contact Us', 'Tiyenimulumikize')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start"><MapPin className="w-4 h-4 mt-1 mr-2 text-primary" /> Lilongwe, Malawi</li>
              <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary" /> support@farmkit.mw</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('FarmKit Community', 'Gulu la FarmKit')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('Join thousands of farmers across Malawi sharing knowledge and growing together.', 'Lowani nawo alimi masauzande ambiri ku Malawi omwe akugawana nzeru ndikukula limodzi.')}</p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} FarmKit Malawi. {t('All rights reserved.', 'Maumwini onse ndi otetezedwa.')}</p>
        </div>
      </div>
    </footer>
  );
};
