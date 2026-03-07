import React from 'react';
import { Book, CheckCircle2 } from 'lucide-react';

interface FAQSectionProps {
  t: (en: string, ny: string) => string;
}

const FAQCard: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary transition-all">
    <div className="font-bold text-sm mb-3 flex items-start gap-3">
      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4 text-primary" />
      </div>
      {q}
    </div>
    <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed pl-9">
      {a}
    </div>
  </div>
);

export const FAQSection: React.FC<FAQSectionProps> = ({ t }) => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Book className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('Frequently Asked Questions', 'Mafunso Ofunsidwa Kawirikawiri')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <FAQCard 
            q={t("How do I save information for offline use?", "Ndingasunge bwanji zidziwitso kuti ndidzazigwiritse ntchito popanda intaneti?")}
            a={t("To save information for offline use, tap the download icon next to any farming guide or tip. All saved items can be accessed from your profile page.", "Kuti musunge zidziwitso zoti mudzazigwiritse ntchito popanda intaneti, dinani chizindikiro cha kutsitsa pambali pa ulangizi uliwonse wa ulimi. Zinthu zonse zosungidwa zitha kupezeka pa tsamba lanu la mbiri.")}
          />
          <FAQCard 
            q={t("How accurate are the market prices?", "Kodi mitengo ya msika ndi yoona bwanji?")}
            a={t("Market prices are updated daily from our network of on-ground partners at major markets across Malawi. Prices may vary slightly at your local market.", "Mitengo ya msika imaperekedwa tsiku ndi tsiku kuchokera ku gulu lathu la anthu ogwira nawo ntchito ku misika yaikulu ya m'Malawi. Mitengoyi ikhoza kusiyana pang'ono pa msika wanu wa pafupi.")}
          />
          <FAQCard 
            q={t("Can I sell my produce on the marketplace?", "Kodi ndingagulitse zokolola zanga pa msika uno?")}
            a={t("Yes! Any registered user can list products for sale. Simply go to the Marketplace tab, click 'Add Listing' and follow the instructions. Free users can post up to 3 listings per month.", "Inde! Aliyense amene walembetsa akhoza kulemba zokolola zake kuti azigulitse. Pitani ku mbali ya Msika, dinani 'Wonjezani Zokolola' ndikutsatira malangizo. Ogwiritsa ntchito aulere akhoza kulemba zokolola zosaposera zitatu pa mwezi.")}
          />
          <FAQCard 
            q={t("What are the benefits of Premium membership?", "Kodi ubwino wa kulembetsa kwa Premium ndi chani?")}
            a={t("Premium members receive personalized farming advice, unlimited marketplace listings, market price alerts, access to expert consultations, and offline access to all farming guides.", "Mamembala a Premium amalandira malangizo a ulimi okhudza iwo okha, kulemba zokolola zosazukuta, zizindikiro za mitengo ya msika, kupeza malangizo a akatswiri, ndi kupeza malangizo onse a ulimi popanda intaneti.")}
          />
        </div>
      </div>
    </section>
  );
};
