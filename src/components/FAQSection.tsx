import React from 'react';
import { Book, CheckCircle2 } from 'lucide-react';

interface FAQSectionProps {
  t: (key: string) => string;
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('faq.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <FAQCard 
            q={t("faq.q1")}
            a={t("faq.a1")}
          />
          <FAQCard 
            q={t("faq.q2")}
            a={t("faq.a2")}
          />
          <FAQCard 
            q={t("faq.q3")}
            a={t("faq.a3")}
          />
          <FAQCard 
            q={t("faq.q4")}
            a={t("faq.a4")}
          />
        </div>
      </div>
    </section>
  );
};
