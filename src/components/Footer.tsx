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
              <span className="text-green-500">Farm</span><span className="text-indigo-600 dark:text-indigo-400">Kit</span>
            </h2>
            <p className="text-gray-400 mb-4">
              {t('Empowering farmers across Malawi with information and market access.', 'Kupatsapo mphamvu kwa alimi ku Malawi ndi chidziwitso ndi mwayi wofikira misika.')}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Users className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('Quick Links', 'Maulalo Osavuta')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('About Us', 'Za Ife')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('Contact Us', 'Tiyenimulumikize')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('FAQ', 'Mafunso')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('Contact Us', 'Tiyenimulumikize')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start"><MapPin className="w-4 h-4 mt-1 mr-2 text-primary" /> 123 Farm Road, Lilongwe</li>
              <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-primary" /> +265 1 234 5678</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t('Newsletter', 'Kalata ya Nkhani')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('Get the latest farming tips and market alerts.', 'Landirani malangizo a ulimi ndi zidziwitso za msika.')}</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none flex-1" />
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">{t('Join', 'Lowani')}</button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} FarmKit Malawi. {t('All rights reserved.', 'Maumwini onse ndi otetezedwa.')}</p>
        </div>
      </div>
    </footer>
  );
};
